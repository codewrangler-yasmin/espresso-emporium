import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { IoIosWarning } from "react-icons/io";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import Swal from "sweetalert2";
import { sendEmailVerification } from "firebase/auth";
import auth from "../firebase/firebase.init";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(null);

  const handleEmailVerification = () => {
    setTimeout(() => {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // Show SweetAlert for email verification confirmation
          Swal.fire({
            icon: "success",
            title: "Verification Email Sent!",
            text: "Please check your email inbox or spam folder to verify your account.",
            customClass: {
              confirmButton: "bg-green-500 hover:bg-green-500 text-white", // Tailwind classes for the button
            },
          });
        })
        .catch((error) => {
          console.error("Error sending verification email:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to send verification email. Please try again later.",
            confirmButtonColor: "#d33", // Customize the button color for error
          });
        });
    }, 1800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const agreed = form.agree.checked;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check for detailed password validation errors
    if (!passwordRegex.test(password)) {
      // Detailed checks if regex fails
      const errors = [];
      if (!/[a-z]/.test(password)) {
        errors.push(
          "Password must contain at least one lowercase letter (a-z)."
        );
      }
      if (!/[A-Z]/.test(password)) {
        errors.push(
          "Password must contain at least one uppercase letter (A-Z)."
        );
      }
      if (!/\d/.test(password)) {
        errors.push("Password must contain at least one number (0-9).");
      }
      if (!/[@$!%*?&]/.test(password)) {
        errors.push(
          "Password must contain at least one special character (e.g., @, $, !, %, *, ?, &)."
        );
      }
      if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
      }

      setValidationErrors(errors);
      return;
    }
    setErrorMessage("");

    if (!agreed) {
      setErrorMessage("You must agree with the privacy policy to proceed!");
      return;
    }
    setErrorMessage("");
    setValidationErrors([]);

    createUser(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);

        const createdAt = userCredential?.user?.metadata?.creationTime;
        const emailVerified = userCredential?.user?.emailVerified;

        const newUser = { name, email, createdAt, emailVerified };
        // save new user info to the database

        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              console.log("user created in DB");
            }
          });

        form.reset(); // Reset the form
        // Show success message using SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Your account has been successfully created.",
          customClass: {
            confirmButton: "bg-green-500 hover:bg-green-500 text-white", // Tailwind classes for the button
          },
        });

        // Trigger email verification
        handleEmailVerification();
      })
      .catch((error) => {
        console.log("Error", error.message);
        const errorCode = error.code;
        const firebaseErrorMessages = {
          "auth/user-not-found":
            "No account found with this email. Please sign up.",
          "auth/wrong-password": "Incorrect password. Please try again.",
          "auth/invalid-email": "The email address is badly formatted.",
          "auth/email-already-in-use":
            "This email is already in use. Try logging in.",
        };
        setErrorMessage(
          firebaseErrorMessages[errorCode] || "An unexpected error occurred."
        );
      });
  };

  return (
    <div className="container mx-auto py-12">
      <div className="bg-beige p-12 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-coffee mb-4 font-title">
          Sign Up
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Join us to explore and enjoy a personalized experience with our coffee
          blends. Sign up today!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
            />
          </div>

          {/* Password Input */}
          <div className=" relative">
            <label className="block text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
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

          {/* Confirm Password Input */}
          <div className="relative">
            <label className="block text-lg font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-300"
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-11 text-lg"
            >
              {showConfirmPassword ? <PiEyeClosed /> : <PiEye />}
            </button>
          </div>

          {/* Agree Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="agree"
              className="h-5 w-5 text-brown-500 border-gray-300 rounded focus:ring-brown-300"
            />
            <label htmlFor="agree" className="text-gray-600">
              I agree with the{" "}
              <Link
                to="/"
                className="text-brown-500 underline hover:text-brown-600"
              >
                privacy policy
              </Link>
              .
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="btn w-full px-6 py-2 bg-brown-500 rounded-md shadow-md hover:bg-brown-600 font-title text-coffee text-2xl border-2 border-coffee hover:border-coffee"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Redirect to Login */}
        <p className="mt-6 text-center text-gray-600">
          Already registered?{" "}
          <Link
            to="/signIn"
            className="text-brown-500 underline hover:text-brown-600"
          >
            Log in
          </Link>
        </p>
        {errorMessage && (
          <p className="text-lg text-red-600 flex items-center gap-2">
            <IoIosWarning />
            {errorMessage}
          </p>
        )}
        {validationErrors && validationErrors.length > 0 && (
          <div className="mt-4 text-red-600">
            {validationErrors.map((error, index) => (
              <p key={index} className="flex items-start gap-2">
                <IoIosWarning /> {error}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
