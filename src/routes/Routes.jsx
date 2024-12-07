import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home, { loader as coffeeLoader } from "../pages/Home";
import AddCoffee from "../components/AddCoffee";
import UpdateCoffee, {
  loader as updateLoader,
} from "../components/UpdateCoffee";
import SignIn from "../components/SignIn";
import CoffeeDetails from "../components/coffeeDetails";
import SignUp from "../components/SignUp";
import Users, { loader as userLoader } from "../components/Users";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: coffeeLoader,
      },
      {
        path: "/addCoffee",
        element: <AddCoffee />,
      },
      {
        path: "/updateCoffee/:id",
        element: <UpdateCoffee />,
        loader: updateLoader,
      },
      {
        path: "/coffeeDetails/:id",
        element: <CoffeeDetails />,
        loader: updateLoader,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/users",
        element: (
          <PrivateRoute>
            {" "}
            <Users />
          </PrivateRoute>
        ),
        loader: userLoader,
      },
    ],
  },
]);

export default router;
