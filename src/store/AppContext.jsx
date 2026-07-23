import { createContext, useState, useEffect } from "react";
import * as categoriesApi from "../services/categoriesApi";
import * as moviesApi from "../services/moviesApi";
import * as showTimesApi from "../services/showTimesApi";
import * as bookingsApi from "../services/bookingsApi";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";

export const AppContext = createContext({
  activeMenu: "categories",
  changeActiveMenu: () => {},
  //
  categories: [],
  addCategory: () => {},
  editCategory: () => {},
  deleteCategory: () => {},
  //
  movies: [],
  addMovie: () => {},
  editMovie: () => {},
  deleteMovie: () => {},
  //
  showTimes: [],
  addShowTime: () => {},
  editShowTime: () => {},
  deleteShowTime: () => {},

  //
  bookings: [],
});

const AppContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  //   categories
  const [activeMenu, setActiveMenu] = useState("categories");
  const [categories, setCategories] = useState([]);

  //   movies
  const [movies, setMovies] = useState([]);

  //   showTimes
  const [showTimes, setShowTimes] = useState([]);

  //
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchMovies();
    fetchShowTimes();
    fetchBookings();
  }, [token, activeMenu]);

  const changeActiveMenu = (menu) => {
    setActiveMenu(menu);
  };
  // categories
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

  //   movies

  const fetchMovies = async () => {
    try {
      const data = await moviesApi.getMovies(token);
      console.log("movies fetching");
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const addMovie = async (movieData) => {
    try {
      const response = await moviesApi.addMovie(movieData);
      setMovies((prevMovies) => [...prevMovies, response]);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Failed to add movie",
      };
    }
  };

  const editMovie = async (id, updatedMovie) => {
    try {
      await moviesApi.editMovie(id, updatedMovie);
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === id ? { ...movie, ...updatedMovie } : movie,
        ),
      );
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Failed to edit movie",
      };
    }
  };

  const deleteMovie = async (id) => {
    try {
      await moviesApi.deleteMovie(id);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Failed to delete movie",
      };
    }
  };

  //   showTimes

  const fetchShowTimes = async () => {
    try {
      const data = await showTimesApi.getShowTimes(token);
      setShowTimes(data);
    } catch (error) {
      console.error("Error fetching show times:", error);
    }
  };

  const addShowTime = async (showTimeData) => {
    try {
      const response = await showTimesApi.addShowTime(showTimeData);
      const newShowTime = {
        id: response.name,
        ...showTimeData,
      };
      setShowTimes((prevShowTimes) => [...prevShowTimes, newShowTime]);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Failed to add show time",
      };
    }
  };

  const editShowTime = async (id, updatedShowTime) => {
    try {
      await showTimesApi.editShowTime(id, updatedShowTime);
      setShowTimes((prevShowTimes) =>
        prevShowTimes.map((showTime) =>
          showTime.id === id ? { ...showTime, ...updatedShowTime } : showTime,
        ),
      );
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Failed to edit show time",
      };
    }
  };

  const deleteShowTime = async (id) => {
    try {
      await showTimesApi.deleteShowTime(id);
      setShowTimes((prevShowTimes) =>
        prevShowTimes.filter((showTime) => showTime.id !== id),
      );
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Failed to delete show time",
      };
    }
  };

  //   bookings
  const fetchBookings = async () => {
    try {
      const response = await bookingsApi.getBookings(token);
      console.log(response);
      const data = response.map((booking) => {
        const showTime = showTimes.find((st) => st.id === booking.showTimeId);
        const movie = movies.find((m) => m.id === showTime?.movieId);
        return {
          ...booking,
          showTime: showTime
            ? { date: showTime.date, time: showTime.time }
            : null,
          movie: movie ? { title: movie.name } : null,
        };
      });

      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const contextValue = {
    activeMenu,
    changeActiveMenu,
    categories,
    addCategory,
    editCategory,
    deleteCategory,
    movies,
    addMovie,
    editMovie,
    deleteMovie,
    showTimes,
    addShowTime,
    editShowTime,
    deleteShowTime,
    bookings,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
