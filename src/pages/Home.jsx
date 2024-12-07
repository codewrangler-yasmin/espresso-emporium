import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { BsCupHot } from "react-icons/bs";
import { Link, useLoaderData } from "react-router-dom";
import Banner from "../components/banner";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import Features from "../components/Features";
import InstagramFeed from "../components/InstagramFeed";
import { AuthContext } from "../providers/AuthProvider";

export async function loader() {
  try {
    const res = await fetch("http://localhost:5000/coffee");
    if (!res.ok) {
      throw new Error("Failed to fetch Coffees");
    }
    const loadedCoffees = await res.json();
    return { loadedCoffees };
  } catch (error) {
    console.error("Error in loader", error);
    return { loadedCoffees: [] };
  }
}

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loadedCoffees } = useLoaderData();
  const [coffees, setCoffees] = useState(loadedCoffees);

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this!",
      icon: "warning",
      confirmButtonText: "Ok",
      customClass: {
        confirmButton: "btn bg-red-500 hover:bg-red-500 text-white font-accent", // Tailwind classes for the button
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Good Luck!!!",
                text: "Deleted coffee details",
                icon: "success",
                customClass: {
                  confirmButton:
                    "btn bg-green-500 hover:bg-green-500 text-white font-accent", // Tailwind classes for the button
                },
              });

              const remainingCoffees = coffees.filter(
                (coffee) => coffee._id !== _id
              );
              setCoffees(remainingCoffees);
            }
          });
      }
    });
  };

  return (
    <>
      <Banner />
      <Features />
      <div className="bg-custom-home bg-center bg-no-repeat bg-cover py-12">
        <div className="container mx-auto flex flex-col justify-center gap-5">
          <p className="text-center">-- Sip & Savor --</p>
          <h3 className=" font-title text-shadow text-coffee text-4xl text-center">
            Our Popular Products
          </h3>
          {user && (
            <div className="text-center">
              <Link to="/addCoffee">
                <button className="btn px-6 py-2 bg-brown-500 rounded-md shadow-md hover:bg-brown-600 font-title text-coffee text-2xl border-2 border-coffee hover:border-coffee">
                  <span>Add Coffee</span> <BsCupHot />
                </button>
              </Link>
            </div>
          )}
        </div>{" "}
        <div className="container mx-auto grid grid-cols-2 gap-4 py-20">
          {coffees.map((coffee) => (
            <div
              key={coffee._id}
              className="bg-beige p-8 rounded-lg flex justify-between gap-8 items-center"
            >
              <img className="h-52" src={coffee.photo} alt="" />
              <div className="flex flex-col">
                <p className="flex items-center gap-4">
                  <span className="font-semibold">Name:</span>
                  <span>{coffee.name}</span>
                </p>
                <p className="flex items-center gap-4">
                  <span className="font-semibold">Chef:</span>
                  <span>{coffee.chef}</span>
                </p>
                <p className="flex items-center gap-4">
                  <span className="font-semibold">Category:</span>
                  <span>{coffee.category}</span>
                </p>
                <p className="flex items-center gap-4">
                  <span className="font-semibold">Price:</span>
                  <span>{coffee.price}</span>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link to={`/coffeeDetails/${coffee._id}`}>
                  <button className="btn bg-brown-500 text-xl text-white  hover:bg-brown-600">
                    <FaEye />
                  </button>
                </Link>
                {user && (
                  <Link to={`/updateCoffee/${coffee._id}`}>
                    <button className="btn bg-black text-xl text-white hover:bg-black/70">
                      <FaEdit />
                    </button>
                  </Link>
                )}
                {user && (
                  <button
                    onClick={() => handleDelete(coffee._id)}
                    className="btn bg-red-500 text-xl text-white hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instagram feed */}
      <InstagramFeed />
    </>
  );
};

export default Home;
