const Banner = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-black text-white h-[800px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-80 bg-banner bg-no-repeat"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-title">
            Would you like a Cup of Delicious Coffee?
          </h1>
          <p className="text-md md:text-lg mb-6">
            It&apos;s coffee time - Sip & Savor - Relaxation in every sip! Get
            the nostalgia back!!
            <br />
            Your companion of every moment! Enjoy the beautiful moments and make
            them memorable.
          </p>
          <button className="bg-[#E3B577] hover:bg-brown-600 text-coffee text-2xl font-title font-semibold py-2 px-6 rounded">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
