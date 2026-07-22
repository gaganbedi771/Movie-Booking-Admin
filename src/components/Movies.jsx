import React, { useContext, useState } from "react";
import { AppContext } from "../store/AppContext";

const Movies = () => {
  const {
    movies,
    addMovie,
    editMovie,
    deleteMovie,
  } = useContext(AppContext);

  const initialForm = {
    poster: "",
    heroImage: "",
    name: "",
    description: "",
    director: "",
    genre: "",
    releaseDate: "",
    language: "",
    imdbRating: "",
    trailer: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (editingId) {
      await editMovie(editingId, formData);
      setEditingId(null);
    } else {
      await addMovie(formData);
    }

    setFormData(initialForm);
  };

  const editHandler = (movie) => {
    setEditingId(movie.id);
    setFormData(movie);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
  };

  return (
    <div className="container py-4">

{/* movie adding form */}

      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">
            {editingId ? "Edit Movie" : "Add Movie"}
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={submitHandler}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">Movie Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Director</label>
                <input
                  type="text"
                  name="director"
                  className="form-control"
                  value={formData.director}
                  onChange={changeHandler}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Genre</label>
                <input
                  type="text"
                  name="genre"
                  className="form-control"
                  value={formData.genre}
                  onChange={changeHandler}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Language</label>
                <input
                  type="text"
                  name="language"
                  className="form-control"
                  value={formData.language}
                  onChange={changeHandler}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Release Date</label>
                <input
                  type="date"
                  name="releaseDate"
                  className="form-control"
                  value={formData.releaseDate}
                  onChange={changeHandler}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">IMDB Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  name="imdbRating"
                  className="form-control"
                  value={formData.imdbRating}
                  onChange={changeHandler}
                />
              </div>

              

              <div className="col-md-12 mb-3">
                <label className="form-label">Poster Image URL</label>
                <input
                  type="text"
                  name="poster"
                  className="form-control"
                  value={formData.poster}
                  onChange={changeHandler}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">Hero Section Image URL</label>
                <input
                  type="text"
                  name="heroImage"
                  className="form-control"
                  value={formData.heroImage}
                  onChange={changeHandler}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">Trailer Link</label>
                <input
                  type="text"
                  name="trailer"
                  className="form-control"
                  value={formData.trailer}
                  onChange={changeHandler}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  rows="4"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={changeHandler}
                />
              </div>

            </div>

            <button className="btn btn-primary me-2">
              {editingId ? "Update Movie" : "Add Movie"}
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

      {/* Movies display list */}

      <div className="card">
        <div className="card-header">
          <h4 className="mb-0">Movies</h4>
        </div>

        <div className="card-body">

          {movies.length === 0 ? (
            <p className="text-muted mb-0">No movies added.</p>
          ) : (
            <div className="table-responsive">

              <table className="table table-bordered align-middle">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Poster</th>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Language</th>
                    <th>Rating</th>
                    <th>Release</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {movies.map((movie, index) => (
                    <tr key={movie.id}>
                      <td>{index + 1}</td>

                      <td>
                        <img
                          src={movie.poster}
                          alt={movie.name}
                          width="60"
                          height="80"
                          className="object-fit-cover"
                        />
                      </td>

                      <td>{movie.name}</td>
                      <td>{movie.genre}</td>
                      <td>{movie.language}</td>
                      <td>{movie.imdbRating}</td>
                      <td>{movie.releaseDate}</td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => editHandler(movie)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteMovie(movie.id)}
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default Movies;