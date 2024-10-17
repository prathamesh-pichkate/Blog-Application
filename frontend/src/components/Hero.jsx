const Hero = () => {
  return (
    <div className="flex justify-center w-full mb-6 lg:mb-20">
      <div
        className="
            w-[95vw] h-[40vh] 
            lg:mx-[10vh] my-[3vh] 
            bg-gradient-to-r from-orange-400 to-yellow-500 
            rounded shadow-lg 
            flex items-center justify-center text-center
            lg:px-10"
      >
        <div>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to Our Blog!
          </h1>
          <p className="text-white text-lg sm:text-xl">
            Discover stories, ideas, and insights that inspire and inform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
