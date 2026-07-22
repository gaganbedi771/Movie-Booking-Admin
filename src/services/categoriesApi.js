import { dbUrl } from "../config/config";

export const getCategories = async (token) => {
  try {
    const response = await fetch(`${dbUrl}/categories.json?auth=${token}`);
    const data = await response.json();

    const categoriesArray = Object.entries(data).map(([id, value]) => ({
      id,
      ...value,
    }));
    return categoriesArray;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const addCategory = async (category) => {
  try {
    const response = await fetch(`${dbUrl}/categories.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const editCategory = async (id, updatedCategory) => {
  try {
    const response = await fetch(`${dbUrl}/categories/${id}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCategory),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await fetch(`${dbUrl}/categories/${id}.json`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
