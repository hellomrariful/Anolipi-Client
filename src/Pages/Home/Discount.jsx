import { Link } from "react-router-dom";

const Discount = () => {
  return (
    <div>
      <div className="p-6 py-12 dark:bg-violet-400 dark:text-gray-900 bg-blue-500 rounded-xl mt-20">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-4xl tracki font-bold text-white font-heading">
              Up to 50% Off
            </h2>
            <div className="space-x-2 text-center py-2 lg:py-0 ">
              <span className=" text-white">
                Don’t Miss The 50% Discount if You Register Today.
              </span>
            </div>
            <Link
              to={"/register"}
              className="px-2 text-center   py-2 rounded-md border block dark:bg-gray-50 dark:text-gray-900 dark:border-gray-400 text-white ml-20"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
