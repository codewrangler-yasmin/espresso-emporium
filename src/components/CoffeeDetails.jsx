import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";

const CoffeeDetails = () => {
  // Correctly call the `useLoaderData` hook
  const { loadedCoffee } = useLoaderData();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto py-12">
      {/* Back to home button */}
      <button
        onClick={handleGoHome}
        className="flex gap-3 font-title text-shadow text-coffee items-center text-2xl"
      >
        <FaArrowLeft /> Back to home
      </button>

      {/* Coffee Details Card */}
      <div className="bg-beige p-12 rounded-lg flex flex-col md:flex-row justify-center items-center gap-6 my-12">
        <div>
          <img src={loadedCoffee.photo} alt={loadedCoffee.name} className="" />
        </div>
        <div className="text-gray-700">
          <h2 className="text-3xl font-bold text-coffee mb-4">
            {loadedCoffee.name}
          </h2>
          <p className="mb-2">
            <strong>Chef:</strong> {loadedCoffee.chef}
          </p>
          <p className="mb-2">
            <strong>Supplier:</strong> {loadedCoffee.supplier}
          </p>
          <p className="mb-2">
            <strong>Category:</strong> {loadedCoffee.category}
          </p>
          <p className="mb-2">
            <strong>Taste:</strong> {loadedCoffee.taste}
          </p>
          <p className="mb-2">
            <strong>Price:</strong> ${loadedCoffee.price}
          </p>
          <p>
            <strong>Details:</strong> {loadedCoffee.details}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
