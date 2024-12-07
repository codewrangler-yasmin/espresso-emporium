import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../assets/images/more/googleIcon.png";
import { IoIosWarning } from "react-icons/io";
import { PiEye, PiEyeClosed } from "react-icons/pi";

const SignIn = () => {
  const navigate = useNavigate();
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log({ email, password });
    // Add your login API or form handling logic here
    signInUser(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        e.target.reset();

        const lastSignInTime = userCredential?.user?.metadata?.lastSignInTime;

        const loginInfo = { email, lastSignInTime };

        fetch("https://coffee-store-server-blush-zeta.vercel.app/users", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginInfo),
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        navigate("/addCoffee");
      })
      .catch((error) => {
        const errorCode = error.code;
        const firebaseErrorMessages = {
          "auth/user-not-found":
            "No account found with this email. Please sign up.",
          "auth/wrong-password": "Incorrect password. Please try again.",
          "auth/invalid-email": "The email address is badly formatted.",
          "auth/email-already-in-use":
            "This email is already in use. Try logging in.",
          "auth/too-many-requests":
            "Too many login attempts. Please try again later.",
        };

        setError(
          firebaseErrorMessages[errorCode] || "An unexpected error occurred."
        );
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((userCredential) => {
        console.log(userCredential.user);

        navigate("/addCoffee");
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  return (
    <div className="container mx-auto py-12">
      <div className="bg-beige p-12 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-coffee mb-4 font-title">
          Log In
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Welcome back! Log in to access your personalized coffee experience.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-11 text-lg"
            >
              {showPassword ? <PiEyeClosed /> : <PiEye />}
            </button>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="h-5 w-5 text-brown-500 border-gray-300 rounded focus:ring-brown-300"
            />
            <label htmlFor="remember" className="text-gray-600">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center flex flex-col gap-3">
            <button
              type="submit"
              className="btn w-full px-6 py-2 bg-brown-500 rounded-md shadow-md hover:bg-brown-600 font-title text-coffee text-2xl border-2 border-coffee hover:border-coffee"
            >
              Log In
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-white w-full"
            >
              <img className="w-8" src={googleIcon} alt="" />
              Login with Google Account{" "}
            </button>
          </div>
        </form>

        {/* Redirect to Sign Up */}
        <p className="mt-6 text-center text-gray-600">
          Not registered yet?{" "}
          <Link
            to="/signup"
            className="text-brown-500 underline hover:text-brown-600"
          >
            Sign up here
          </Link>
        </p>
        {error && (
          <p className="text-lg text-red-600 flex items-center gap-2">
            <IoIosWarning />
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
