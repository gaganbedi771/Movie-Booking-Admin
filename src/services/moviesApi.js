import { dbUrl } from "../config/config";

export const getMovies = async (token) => {
    try {
        const response= await fetch(`${dbUrl}/movies.json?auth=${token}`);
        const data = await response.json();
        const moviesArray = Object.entries(data).map(([id, value]) => ({
            id,
            ...value,
        }));
        return moviesArray;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addMovie = async (movieData) => {
    try {
        const response = await fetch(`${dbUrl}/movies.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding movie:", error);
        throw error;
    }
};

export const editMovie = async (id, updatedMovie) => {
    try {
        const response = await fetch(`${dbUrl}/movies/${id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovie),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error editing movie:", error);
        throw error;
    }
};

export const deleteMovie = async (id) => {
    try {
        await fetch(`${dbUrl}/movies/${id}.json`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw error;
    }
};