import { useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export async function loader() {
  try {
    const res = await fetch(
      "https://coffee-store-server-blush-zeta.vercel.app/users"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Users");
    }
    const loadedUser = await res.json();
    return { loadedUser };
  } catch (error) {
    console.error("Error in loader", error);
    return { loadedUser: [] };
  }
}

const Users = () => {
  const { loadedUser } = useLoaderData();
  const [users, setUsers] = useState(loadedUser);
  console.log(loadedUser);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleDeleteUser = (_id) => {
    console.log(_id);

    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: "Deleted!",
    //       text: "Your file has been deleted.",
    //       icon: "success",
    //     });
    //   }
    // });

    Swal.fire({
      //   title: "Are you sure?",
      //   text: "Are you sure you want to delete this user!",
      //   icon: "warning",
      //   confirmButtonText: "Yes!",

      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn bg-red-500 hover:bg-red-500 text-white font-accent", // Tailwind classes for the button
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://coffee-store-server-blush-zeta.vercel.app/users/${_id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Deleted user details",
                icon: "success",
                customClass: {
                  confirmButton:
                    "btn bg-green-500 hover:bg-green-500 text-white font-accent", // Tailwind classes for the button
                },
              });

              const remainingUsers = users.filter(
                (coffee) => coffee._id !== _id
              );
              setUsers(remainingUsers);
            }
          });
      }
    });
  };

  return (
    <div className="container mx-auto py-8">
      <button
        onClick={handleGoHome}
        className="flex gap-3 font-title text-shadow text-coffee items-center text-2xl"
      >
        <FaArrowLeft /> Back to home
      </button>
      <div className="bg-beige p-6 rounded-lg shadow-md my-8">
        <h2 className="text-2xl font-bold text-coffee mb-4 font-title">
          {users.length} available users
        </h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-white text-gray-700">
              <th className="px-4 py-2 border border-gray-300 text-left">
                Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Email
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Created Account
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Last Login
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                User Verified
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">
                  {user.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {user.email}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {user.createdAt}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {user.lastSignInTime}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {user.emailVerified ? "Verified" : "Not yet verified"}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center space-x-3">
                  {/* Edit Button
                  <button className="px-2 py-1 bg-brown-500 text-white rounded hover:bg-brown-600 shadow-md">
                    Edit
                  </button> */}
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn bg-red-500 text-xl text-white hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
