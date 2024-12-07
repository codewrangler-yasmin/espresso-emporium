import cupIcon from "../assets/images/icons/1.png";
import badgeIcon from "../assets/images/icons/2.png";
import beansIcon from "../assets/images/icons/3.png";
import paperCupIcon from "../assets/images/icons/4.png";

const Features = () => {
  return (
    <div>
      {" "}
      {/* Features Section */}
      <div className="bg-beige py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col gap-4 p-8">
              <div>
                <img src={cupIcon} alt="" />
              </div>
              <h3 className="text-3xl font-title text-coffee">Awesome Aroma</h3>
              <p className="text-sm text-gray-600">
                You will definitely be a fan of the design & aroma of your
                coffee
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col gap-4 p-8">
              <div>
                <img src={badgeIcon} alt="" />
              </div>
              <h3 className="text-3xl font-title text-coffee">High Quality</h3>
              <p className="text-sm text-gray-600">
                We served the coffee to you maintaining the best quality
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col gap-4 p-8">
              <div>
                <img src={beansIcon} alt="" />
              </div>

              <h3 className="text-3xl font-title text-coffee">Pure Grades</h3>
              <p className="text-sm text-gray-600">
                The coffee is made of the green coffee beans which you will love
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col gap-4 p-8">
              <div>
                <img src={paperCupIcon} alt="" />
              </div>
              <h3 className="text-3xl font-title text-coffee">
                Proper Roasting
              </h3>
              <p className="text-sm text-gray-600">
                Your coffee is brewed by first roasting the green coffee beans
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
