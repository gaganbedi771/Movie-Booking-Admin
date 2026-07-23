import { dbUrl } from "../config/config";

export const getBookings = async (token) => {
  try {
    const response = await fetch(`${dbUrl}/bookings.json?auth=${token}`);
    const data = await response.json();
    const bookingsArray = Object.entries(data).map(([id, value]) => ({
      _id: id,
      ...value,
    }));
    return bookingsArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
