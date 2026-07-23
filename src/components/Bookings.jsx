import { useContext, useEffect } from "react";
import { AppContext } from "../store/AppContext";

const Bookings = () => {
  const { bookings } = useContext(AppContext);

  console.log(bookings);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-semibold mb-6">All Bookings</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Booking ID</th>
              <th className="text-left px-4 py-3">User</th>
              <th className="text-left px-4 py-3">Tickets</th>
              <th className="text-left px-4 py-3">Movie</th>
              <th className="text-left px-4 py-3">Showtime</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{booking._id}</td>

                  <td className="px-4 py-3">
                    <div className="text-gray-500 text-xs">
                      {booking.userEmail}
                    </div>
                  </td>

                  <td className="px-4 py-3">{booking.numberOfTickets}</td>

                  <td className="px-4 py-3">{booking.movie.title}</td>

                  <td className="px-4 py-3">
                    {booking.showTime.date} | {booking.showTime.time}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
