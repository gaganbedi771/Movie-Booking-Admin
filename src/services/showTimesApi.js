import { dbUrl } from "../config/config";

export const getShowTimes = async (token) => {
    try {
        const response= await fetch(`${dbUrl}/showTimes.json?auth=${token}`);
        const data = await response.json();
        const showTimesArray = Object.entries(data).map(([id, value]) => ({
            id,
            ...value,
        }));
        return showTimesArray;
    } catch (error) {
         console.log(error);
        throw error;
    }
}

export const addShowTime = async (showTimeData) => {
    try {
        const response = await fetch(`${dbUrl}/showTimes.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(showTimeData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
         console.log(error);
        throw error;
    }
}

export const editShowTime = async (id, updatedShowTime) => {
    try {
        const response = await fetch(`${dbUrl}/showTimes/${id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedShowTime),
        });
        const data = await response.json();
        return data;
    } catch (error) {
         console.log(error);
        throw error;
    }
}

export const deleteShowTime = async (id) => {
    try {
        await fetch(`${dbUrl}/showTimes/${id}.json`, {
            method: "DELETE",
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}