import React, { useContext, useState } from "react";
import { AppContext } from "../store/AppContext";

const Categories = () => {
  const { categories, addCategory, editCategory, deleteCategory } =
    useContext(AppContext);

  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) return;

    if (editingId) {
      editCategory(editingId, categoryName);
      setEditingId(null);
    } else {
      const data = await addCategory(categoryName);
      if (!data.success) {
        alert(data.message);
        return;
      }
    }

    setCategoryName("");
  };

  const editHandler = (category) => {
    setEditingId(category.id);
    setCategoryName(category.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setCategoryName("");
  };

  return (
    <div className="container py-4">
      {/* Add/Edit Form */}
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">
            {editingId ? "Edit Category" : "Add Category"}
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">Category Name</label>

              <input
                type="text"
                className="form-control"
                placeholder="e.g. Now Playing"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <button className="btn btn-primary me-2">
              {editingId ? "Update Category" : "Add Category"}
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

      {/* Categories List */}
      <div className="card">
        <div className="card-header">
          <h4 className="mb-0">Categories</h4>
        </div>

        <div className="card-body">
          {categories.length === 0 ? (
            <p className="text-muted mb-0">No categories found.</p>
          ) : (
            <table className="table table-bordered align-middle">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>#</th>
                  <th>Category</th>
                  <th style={{ width: "180px" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>

                    <td>{category.name}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editHandler(category)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteCategory(category.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
