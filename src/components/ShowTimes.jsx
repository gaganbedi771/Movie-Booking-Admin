import React, { useContext, useState } from "react";
import { AppContext } from "../store/AppContext";

const ShowTimes = () => {
  const {
    movies,
    categories,
    showTimes,
    addShowTime,
    editShowTime,
    deleteShowTime,
  } = useContext(AppContext);

  const initialForm = {
    movieId: "",
    date: "",
    time: "",
    categoryIds: [],
  };
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const categoryChangeHandler = (id) => {
    setFormData((prev) => {
      const exists = prev.categoryIds.includes(id);

      return {
        ...prev,
        categoryIds: exists
          ? prev.categoryIds.filter((catId) => catId !== id)
          : [...prev.categoryIds, id],
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !formData.movieId ||
      !formData.date ||
      !formData.time ||
      formData.categoryIds.length === 0
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editingId) {
      await editShowTime(editingId, formData);
      setEditingId(null);
    } else {
      await addShowTime(formData);
    }

    setFormData(initialForm);
  };

  const editHandler = (show) => {
    setEditingId(show.id);

    setFormData({
      movieId: show.movieId,
      date: show.date,
      time: show.time,
      categoryIds: show.categoryIds,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
  };

  return (
    <div className="container py-4">


      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">
            {editingId ? "Edit Show Time" : "Add Show Time"}
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={submitHandler}>

            <div className="row">

              <div className="col-md-4 mb-3">
                <label className="form-label">Movie</label>

                <select
                  className="form-select"
                  name="movieId"
                  value={formData.movieId}
                  onChange={changeHandler}
                >
                  <option value="">Select Movie</option>

                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={changeHandler}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Time</label>

                <input
                  type="time"
                  className="form-control"
                  name="time"
                  value={formData.time}
                  onChange={changeHandler}
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Assign Categories
                </label>

                <div className="row">

                  {categories.map((category) => (
                    <div className="col-md-3 mb-2" key={category.id}>
                      <div className="form-check">

                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={formData.categoryIds.includes(category.id)}
                          onChange={() =>
                            categoryChangeHandler(category.id)
                          }
                          id={category.id}
                        />

                        <label
                          className="form-check-label"
                          htmlFor={category.id}
                        >
                          {category.name}
                        </label>

                      </div>
                    </div>
                  ))}

                </div>
              </div>

            </div>

            <button className="btn btn-primary me-2">
              {editingId ? "Update Show Time" : "Add Show Time"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}

          </form>
        </div>
      </div>

      {/* list of added showtimes */}

      <div className="card">
        <div className="card-header">
          <h4 className="mb-0">Show Times</h4>
        </div>

        <div className="card-body">

          {showTimes.length === 0 ? (
            <p className="text-muted mb-0">
              No show times added.
            </p>
          ) : (
            <div className="table-responsive">

              <table className="table table-bordered align-middle">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Movie</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Categories</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {showTimes.map((show, index) => {
                    const movie = movies.find(
                      (m) => m.id === show.movieId
                    );

                    const categoryNames = (show.categoryIds || [])
                      .map((id) => categories.find((cat) => cat.id === id)?.name)
                      .filter(Boolean)
                      .join(", ");

                    return (
                      <tr key={show.id}>

                        <td>{index + 1}</td>

                        <td>{movie?.name}</td>

                        <td>{show.date}</td>

                        <td>{show.time}</td>

                        <td>{categoryNames}</td>

                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => editHandler(show)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deleteShowTime(show.id)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default ShowTimes;