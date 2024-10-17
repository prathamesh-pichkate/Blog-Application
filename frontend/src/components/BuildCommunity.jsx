import { FilePlus2, BookMarked } from "lucide-react";

const BuildCommunity = () => {
  return (
    <div className="flex flex-col md:mx-[10vh] py-8 space-y-6">
      <h1 className="text-2xl lg:text-3xl font-medium">
        Creating Something New
      </h1>

      <div className="flex flex-col md:flex-row md:flex-wrap items-center gap-6 md:gap-10">
        {/* Create Blog Card */}
        <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-2xl w-full px-6 py-6 md:w-auto hover:border-orange-500 transition">
          <a
            href="/"
            className="p-2 rounded-full bg-orange-200 border border-orange-400"
          >
            <FilePlus2 className="w-6 h-6 text-orange-500" />
          </a>
          <h3 className="text-xl font-serif">Create Blog</h3>
        </div>

        {/* Whitelist Card */}
        <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-2xl w-full px-6 py-6 md:w-auto hover:border-orange-500 transition">
          <a
            href="/"
            className="p-2 rounded-full bg-orange-200 border border-orange-400"
          >
            <BookMarked className="w-6 h-6 text-orange-500" />
          </a>
          <h3 className="text-xl font-serif">Whitelist</h3>
        </div>
      </div>
    </div>
  );
};

export default BuildCommunity;
