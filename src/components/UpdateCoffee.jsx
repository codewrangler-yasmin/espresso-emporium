import Swal from "sweetalert2";

import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";

export async function loader({ params }) {
  try {
    const res = await fetch(`http://localhost:5000/coffee/${params.id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch Coffees");
    }
    const loadedCoffee = await res.json();
    return { loadedCoffee };
  } catch (error) {
    console.error("Error in loader", error);
    return { loadedCoffee: [] };
  }
}

const UpdateCoffee = () => {
  const { loadedCoffee } = useLoaderData();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleUpdateCoffee = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const chef = form.chef.value;
    const supplier = form.supplier.value;
    const taste = form.taste.value;
    const category = form.category.value;
    const details = form.details.value;
    const photo = form.photo.value;
    const price = form.price.value;

    const updatedCoffee = {
      name,
      chef,
      supplier,
      taste,
      category,
      details,
      photo,
      price,
    };

    fetch(`http://localhost:5000/coffee/${loadedCoffee._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            text: `${loadedCoffee.name} updated successfully.`,
            icon: "success",
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "bg-green-500 hover:bg-green-500 text-white", // Tailwind classes for the button
            },
          });
        }
      });
  };

  return (
    <div className="container mx-auto py-20 flex flex-col gap-4">
      <button
        onClick={handleGoHome}
        className="flex gap-3 font-title text-shadow text-coffee items-center text-2xl"
      >
        <FaArrowLeft /> Back to home
      </button>
      <div className="bg-beige p-12 rounded-lg flex flex-col gap-6 *:w-7/12 *:mx-auto">
        <h3 className=" font-title text-shadow text-coffee text-3xl text-center">
          Update <span className="text-5xl">{loadedCoffee.name}</span> Coffee
          Details
        </h3>
        <p className="text-center text-gray-500">
          Effortlessly manage coffee inventory which allows to add and update
          coffee profiles with precision, including essential details to ensure
          every coffee blend is documented in one convenient place.
        </p>
        <div className="p-8 rounded-lg mx-auto">
          <form onSubmit={handleUpdateCoffee}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter coffee name"
                  defaultValue={loadedCoffee.name}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Chef
                </label>
                <input
                  type="text"
                  name="chef"
                  placeholder="Enter coffee chef"
                  defaultValue={loadedCoffee.chef}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Supplier
                </label>
                <input
                  type="text"
                  name="supplier"
                  placeholder="Enter coffee supplier"
                  defaultValue={loadedCoffee.supplier}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Taste
                </label>
                <input
                  type="text"
                  name="taste"
                  placeholder="Enter coffee taste"
                  defaultValue={loadedCoffee.taste}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="Enter coffee category"
                  defaultValue={loadedCoffee.category}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Details
                </label>
                <input
                  type="text"
                  name="details"
                  placeholder="Enter coffee details"
                  defaultValue={loadedCoffee.details}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Photo
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Enter photo URL"
                  defaultValue={loadedCoffee.photo}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  defaultValue={loadedCoffee.price}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
                />
              </div>
            </div>
            <div className="mt-6 text-center flex w-full">
              <button
                type="submit"
                className="btn w-full px-6 py-2 bg-brown-500 rounded-md shadow-md hover:bg-brown-600 font-title text-coffee text-2xl border-2 border-coffee hover:border-coffee"
              >
                Update Coffee Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCoffee;
