import cup1 from "../assets/images/cups/1.png";
import cup2 from "../assets/images/cups/2.png";
import cup3 from "../assets/images/cups/3.png";
import cup4 from "../assets/images/cups/4.png";
import cup5 from "../assets/images/cups/5.png";
import cup6 from "../assets/images/cups/6.png";
import cup7 from "../assets/images/cups/7.png";
import cup8 from "../assets/images/cups/8.png";

const InstagramFeed = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <p className="text-center">Follow Us Now</p>
        <h3 className=" font-title text-shadow text-coffee text-4xl text-center">
          Follow on Instagram
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-5 py-12">
        <div>
          <img className="w-full" src={cup1} alt="" />
        </div>
        <div>
          <img className="w-full" src={cup2} alt="" />
        </div>
        <div>
          <img className="w-full" src={cup3} alt="" />
        </div>
        <div>
          <img className="w-full" src={cup4} alt="" />
        </div>
        <div>
          <img className="w-full" src={cup5} alt="" />
        </div>
        <div>
          <img className="w-full" src={cup6} alt="" />
        </div>
        <div>
          <img className="w-full" src={cup7} alt="" />
        </div>
        <div>
          <img className="w-full" src={cup8} alt="" />
        </div>
      </div>
    </div>
  );
};

export default InstagramFeed;
