import { createContext, useState,useEffect } from "react";
import * as categoriesApi from "../services/categoriesApi";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "react"; 

export const AppContext = createContext({
  categories: [],
  addCategory: () => {},
  editCategory: () => {},
  deleteCategory: () => {},
  activeMenu: "categories",
  changeActiveMenu: () => {},
});

const AppContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState("categories");
  const [categories, setCategories] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchCategories();
  }, [token]);

  const changeActiveMenu = (menu) => {
    setActiveMenu(menu);
  };

  const fetchCategories = async () => {
    try {
      const data = await categoriesApi.getCategories(token);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addCategory = async (categoryName) => {
    try {
      const response = await categoriesApi.addCategory({ name: categoryName });
      const newCategory = {
        id: response.name,
        name: categoryName,
      };
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Failed to add category",
      };
    }
  };

  const editCategory = async (id, newName) => {
    try {
      await categoriesApi.editCategory(id, { name: newName });
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? { ...category, name: newName } : category,
        ),
      );
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Failed to edit category",
      };
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoriesApi.deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id),
      );
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Failed to delete category",
      };
    }
  };

  const contextValue = {
    activeMenu,
    changeActiveMenu,
    categories,
    addCategory,
    editCategory,
    deleteCategory,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
