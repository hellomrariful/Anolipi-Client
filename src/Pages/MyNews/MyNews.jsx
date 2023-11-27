import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyNews = ({ declineText }) => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  // const {id} = declineText;

  console.log(declineText);

  const { data: newses = [], refetch } = useQuery({
    queryKey: ["newses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/newses");
      // console.log(res.data);
      return res.data;
    },
  });

  const UserNews = newses.filter((item) => item.authorEmail === user.email);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/newses/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">#</div>
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Feedback
              </th>
              <th scope="col" className="px-6 py-3">
                Premium
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
              <th scope="col" className="px-6 py-3 pl-10">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {UserNews?.map((news, index) => (
              <tr
                key={news._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">{index + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {news.title}
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full me-2">
                      {news.status === "Approve" ? (
                        <span className="text-green-500">Approve</span>
                      ) : news.status === "Decline" ? (
                        <span className="text-red-500">Decline</span>
                      ) : (
                        <span className="">Pending</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full me-2">
                      {news.isPremium === "Yes" ? (
                        <span className="text-green-500">Yes</span>
                      ) : (
                        <div>
                          <button
                            className="text-blue-600 underline"
                            onClick={openModal}
                          >
                            See
                          </button>

                          {/* Main modal */}

                          <div>
                            {isModalOpen && (
                              <div
                                id="default-modal"
                                tabIndex="-1"
                                aria-hidden="true"
                                className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-500 bg-opacity-50"
                              >
                                <div className="relative p-4 w-full max-w-2xl max-h-full">
                                  {/* Modal content */}
                                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    {/* Modal header */}
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Terms of Service
                                      </h3>
                                      <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="default-modal"
                                        onClick={closeModal}
                                      >
                                        <svg
                                          className="w-3 h-3"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 14 14"
                                        >
                                          <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                          />
                                        </svg>
                                        <span className="sr-only">
                                          Close modal
                                        </span>
                                      </button>
                                    </div>
                                    {/* Modal body */}
                                    <div className="p-4 md:p-5 space-y-4">
                                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"></p>
                                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        The European Union’s General Data
                                        Protection Regulation (G.D.P.R.) goes
                                        into effect on May 25 and is meant to
                                        ensure a common set of data rights in
                                        the European Union. It requires
                                        organizations to notify users as soon as
                                        possible of high-risk data breaches that
                                        could personally affect them.
                                      </p>
                                    </div>
                                    {/* Modal footer */}
                                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                      <button
                                        data-modal-hide="default-modal"
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        // onClick={handleAccept}
                                      >
                                        I accept
                                      </button>
                                      <button
                                        data-modal-hide="default-modal"
                                        type="button"
                                        className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                        // onClick={handleDecline}
                                      >
                                        Decline
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full me-2">
                      {news.isPremium === "Yes" ? (
                        <span className="text-green-500">Yes</span>
                      ) : (
                        <span className="">No</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {news.status === "Approve" ? (
                    <p>
                      <Link
                        className="text-blue-600 underline"
                        to={`/newsDetails/${news._id}`}
                      >
                        Click
                      </Link>
                    </p>
                  ) : news.status === "Decline" ? (
                    <Link to={`/updateNews/${news._id}`}>
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Update
                      </button>
                    </Link>
                  ) : (
                    <p>Wait!</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link to={`/updateNews/${news._id}`}>
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(news._id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyNews;
