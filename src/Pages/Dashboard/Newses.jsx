import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";

const Newses = () => {
  const axiosSecure = useAxiosSecure();
  const { data: newses = [] } = useQuery({
    queryKey: ["newses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newses");
      return res.data;
    },
  });

  const itemsPerPage = 5;
  const allNews = Array.from({ length: newses.length }, (_, i) => i + 1);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = allNews.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Info
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Publisher
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentNews.map((newsIndex) => {
              const news = newses[newsIndex - 1];
              return (
                <tr
                  key={news._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 content-center  text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={news?.authorPhoto}
                      alt="users image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {news.authorName}
                      </div>
                      <div className="font-normal text-gray-500">
                        {news.authorEmail}
                      </div>
                    </div>
                  </th>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4">{news.title}</td>
                  <td className="px-6 py-4">{news.publisherName}</td>
                  <td className="px py-4">
                    {moment(news.date).format("D-M-YY")}
                  </td>
                  <td className="px-8 py-4">
                    <button
                      type="button"
                      title="Open details"
                      className="rounded-full text-black font-extrabold hover:bg-slate-400 dark:text-gray-600 p-2  hover:dark:bg-gray-700 focus:dark:bg-gray-700"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-5 fill-current">
                        <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* page */}
        <nav className="flex px-6 items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <div>
            Page {currentPage} of {Math.ceil(newses.length / itemsPerPage)}
          </div>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"></span>
          <ul className="flex justify-between items-center gap-5">
            <Link>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </Link>
            {Array.from(
              { length: Math.ceil(newses.length / itemsPerPage) },
              (_, i) => (
                <Link key={i + 1}>
                  <button
                    onClick={() => handlePageChange(i + 1)}
                    disabled={currentPage === i + 1}
                  >
                    {i + 1}
                  </button>
                </Link>
              )
            )}
            <Link><button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(newses.length / itemsPerPage)
                }
              >
                Next
              </button></Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Newses;
