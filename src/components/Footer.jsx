import { Link } from "react-router-dom";
import coffeeCupIcon from "../assets/images/more/logo1.png";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-custom-footer bg-cover bg-no-repeat bg-center py-12">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col gap-6 w-[40%]">
          <img className="w-20" src={coffeeCupIcon} alt="" />
          <h3 className="text-4xl text-coffee font-title text-shadow">
            Espresso Emporium
          </h3>
          <p className="text-gray-500 font-accent">
            Always ready to be your friend. Come & Contact with us to share your
            memorable moments, to share with your best companion.
          </p>
          <div className="flex gap-3 items-center text-3xl text-coffee">
            <Link to="/">
              <FaFacebook />
            </Link>
            <Link to="/">
              <FaTwitter />
            </Link>
            <Link to="/">
              <FaInstagram />
            </Link>
            <Link to="/">
              <FaLinkedin />
            </Link>
          </div>
          <h3 className="text-4xl text-coffee font-title text-shadow">
            Get in touch
          </h3>
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex gap-3 items-center text-coffee">
              <FaPhone />
              <span>+88 01533 333 333</span>
            </Link>
            <Link to="/" className="flex gap-3 items-center text-coffee">
              <FaEnvelope />
              <span>info@gmail.com</span>
            </Link>
            <Link to="/" className="flex gap-3 items-center text-coffee">
              <FaLocationPin />
              <span>72, Wall street, King Road, Dhaka</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-[30%]">
          <h3 className="text-4xl text-coffee font-title text-shadow">
            Contact with Us
          </h3>
          <form action="" className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              id=""
              placeholder="Name"
              className="py-2 px-3 rounded-md"
            />
            <input
              type="text"
              name="email"
              id=""
              placeholder="Email"
              className="py-2 px-3 rounded-md"
            />
            <textarea
              placeholder="Message"
              className="py-2 px-3 rounded-md h-44"
            ></textarea>
            <input
              type="submit"
              value="Send Message"
              className="font-title text-xl btn bg-transparent w-4/12 rounded-full border border-coffee hover:bg-coffee hover:text-white"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
