// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import moment from "moment";
// import { useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";

// const Newses = () => {
//   const axiosSecure = useAxiosSecure();
//   const { data: newses = [], refetch } = useQuery({
//     queryKey: ["newses"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/newses");
//       return res.data;
//     },
//   });

//   const declineTextValue = useRef();

//   console.log(declineTextValue);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const declineTerms = () => {
//     closeModal();
//   };

//   const handleButtonClick = (id) => {
//     const textareaValue = declineTextValue.current.value;
//     const declineText = { textareaValue, id };

//     axiosSecure.post("/decline", declineText).then((res) => {
//       console.log(res.data);
//       if (res.data.insertedId) {
//         const displaySuccessToast = () => {
//           toast.dismiss("error-toast");
//           toast.success("Feedback Added, Now Click Decline", {
//             id: "error-toast",
//             duration: 2000,
//             style: {
//               padding: "14px",
//               color: "#524FF5",
//             },
//             iconTheme: {
//               primary: "#A1F65E",
//               secondary: "#FFFFFF",
//             },
//           });
//         };
//         displaySuccessToast();
//       }
//     });
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/newses/${id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             refetch();
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your file has been deleted.",
//               icon: "success",
//             });
//           }
//         });
//       }
//     });
//   };

//   const handleApprove = (id) => {
//     axiosSecure.patch(`/newses/approve/${id}`).then((res) => {
//       refetch();
//       if (res.data.modifiedCount > 0) {
//         const displaySuccessToast = () => {
//           toast.dismiss("error-toast");
//           toast.success("Articles Approved", {
//             id: "error-toast",
//             duration: 2000,
//             style: {
//               padding: "14px",
//               color: "#524FF5",
//             },
//             iconTheme: {
//               primary: "#A1F65E",
//               secondary: "#FFFFFF",
//             },
//           });
//         };
//         displaySuccessToast();
//       }
//     });

//     setIsDetailsVisible(false);
//   };

//   const handlePremium = (id) => {
//     axiosSecure.patch(`/newses/${id}`).then((res) => {
//       refetch();
//       if (res.data.modifiedCount > 0) {
//         const displaySuccessToast = () => {
//           toast.dismiss("error-toast");
//           toast.success("Articles Approved in Premium Category", {
//             id: "error-toast",
//             duration: 2000,
//             style: {
//               padding: "14px",
//               color: "#524FF5",
//             },
//             iconTheme: {
//               primary: "#A1F65E",
//               secondary: "#FFFFFF",
//             },
//           });
//         };
//         displaySuccessToast();
//       }
//     });

//     setIsDetailsVisible(false);
//   };

//   const handleDecline = (id) => {
//     axiosSecure.patch(`/newses/decline/${id}`).then((res) => {
//       refetch();
//       if (res.data.modifiedCount > 0) {
//         const displaySuccessToast = () => {
//           toast.dismiss("error-toast");
//           toast.success("Article decline", {
//             id: "error-toast",
//             duration: 2000,
//             style: {
//               padding: "14px",
//               color: "#524FF5",
//             },
//             iconTheme: {
//               primary: "#A1F65E",
//               secondary: "#FFFFFF",
//             },
//           });
//         };
//         displaySuccessToast();
//       }
//     });

//     setIsDetailsVisible(false);
//   };

//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedNews, setSelectedNews] = useState(null);
//   const [isDetailsVisible, setIsDetailsVisible] = useState(false);

//   const detailsButtonRef = useRef(null);

//   const itemsPerPage = 5;
//   const allNews = Array.from({ length: newses.length }, (_, i) => i + 1);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentNews = allNews.slice(startIndex, endIndex);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleDetailsClick = (newsId) => {
//     setSelectedNews(newsId);
//     setIsDetailsVisible(true);
//   };

//   return (
//     <div>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Info
//               </th>

//               <th scope="col" className="px-6 py-3">
//                 Title
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Publisher
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Date
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Status
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 IsPremium
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentNews.map((newsIndex) => {
//               const news = newses[newsIndex - 1];
//               return (
//                 <tr
//                   key={news._id}
//                   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 >
//                   <th
//                     scope="row"
//                     className="flex items-center px-6 py-4 content-center  text-gray-900 whitespace-nowrap dark:text-white"
//                   >
//                     <img
//                       className="w-10 h-10 rounded-full"
//                       src={news?.authorPhoto}
//                       alt="users image"
//                     />
//                     <div className="ps-3">
//                       <div className="text-base font-semibold">
//                         {news.authorName}
//                       </div>
//                       <div className="font-normal text-gray-500">
//                         {news.authorEmail}
//                       </div>
//                     </div>
//                   </th>

//                   <td className="px-6 py-4">{news.title}</td>
//                   <td className="px-6 py-4">{news.publisherName}</td>
//                   <td className="px py-4">
//                     {moment(news.date).format("D-M-YY")}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div className="h-2.5 w-2.5 rounded-full me-2">
//                         {news.status === "Approve" ? (
//                           <span className="text-green-500">Approve</span>
//                         ) : news.status === "Decline" ? (
//                           <span className="text-red-500">Decline</span>
//                         ) : (
//                           <span className="">Pending</span>
//                         )}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div className="h-2.5 w-2.5 rounded-full me-2">
//                         {news.isPremium === "Yes" ? (
//                           <span className="text-green-500">Yes</span>
//                         ) : (
//                           <span className="">No</span>
//                         )}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-8 py-4">
//                     <button
//                       onClick={() => handleDetailsClick(news._id)}
//                       type="button"
//                       title="Open details"
//                       className="rounded-full text-black font-extrabold hover:bg-slate-400 dark:text-gray-600 p-2 hover:dark:bg-gray-700 focus:dark:bg-gray-700"
//                       ref={detailsButtonRef}
//                     >
//                       <svg viewBox="0 0 24 24" className="w-6 h-5 fill-current">
//                         <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
//                       </svg>
//                     </button>
//                     {selectedNews === news._id && isDetailsVisible && (
//                       <div className="grid gap-2">
//                         <button
//                           type="button"
//                           className="px-2 py-1 bg-green-500 text-white rounded-md"
//                           onClick={() => handleApprove(news._id)}
//                         >
//                           Approve
//                         </button>
//                         <button
//                           type="button"
//                           className="px-2 py-1 bg-green-500 text-white rounded-md"
//                           onClick={() => handlePremium(news._id)}
//                         >
//                           Premium
//                         </button>

//                         <div>
//                           <button
//                             onClick={openModal}
//                             className="px-3 py-1 bg-red-500 text-white rounded-md"
//                             type="button"
//                           >
//                             Feedback
//                           </button>

//                           {isModalOpen && (
//                             <div
//                               id="default-modal"
//                               tabIndex="-1"
//                               aria-hidden="true"
//                               className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
//                             >
//                               <div className="relative p-4 w-full max-w-2xl max-h-full bg-slate-300">
//                                 {/* Modal content */}
//                                 <div className="relative rounded-lg shadow dark:bg-gray-700 bg-slate-300">
//                                   {/* Modal header */}
//                                   <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//                                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                                       Take a look why your article got decline.
//                                     </h3>
//                                     <button
//                                       type="button"
//                                       onClick={closeModal}
//                                       className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                                     >
//                                       <svg
//                                         className="w-3 h-3"
//                                         aria-hidden="true"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 14 14"
//                                       >
//                                         <path
//                                           stroke="currentColor"
//                                           strokeLinecap="round"
//                                           strokeLinejoin="round"
//                                           strokeWidth="2"
//                                           d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                                         />
//                                       </svg>
//                                       <span className="sr-only">
//                                         Close modal
//                                       </span>
//                                     </button>
//                                   </div>
//                                   {/* Modal body */}

//                                   <div className="p-4  md:p-5 space-y-4 ">
//                                     <textarea
//                                       name="declineText"
//                                       cols="78"
//                                       rows="10"
//                                       required
//                                       ref={declineTextValue}
//                                     ></textarea>
//                                   </div>
//                                   <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
//                                     {news.status === "Decline" ? (
//                                       <button
//                                         onClick={() => handleDecline(news._id)}
//                                         disabled
//                                         className="text-white bg-red-800 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 cursor-pointer"
//                                       >
//                                         Already Decline
//                                       </button>
//                                     ) : (
//                                       <button
//                                         onClick={() =>
//                                           handleButtonClick(news._id)
//                                         }
//                                         type="button"
//                                         className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
//                                       >
//                                         Submit Feedback
//                                       </button>
//                                     )}

//                                     {news.status === "Decline" ? (
//                                       <button
//                                         onClick={() =>
//                                           handleButtonClick(news._id)
//                                         }
//                                         disabled
//                                         type="button"
//                                         className="cursor-pointer ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
//                                       >
//                                         Already Submit Feedback
//                                       </button>
//                                     ) : (
//                                       <button
//                                         onClick={() => handleDecline(news._id)}
//                                         className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                                       >
//                                         Decline Now
//                                       </button>
//                                     )}
//                                   </div>

//                                   {/* Modal footer */}
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         <button
//                           type="button"
//                           className="px-2 py-1 bg-gray-500 text-white rounded-md"
//                           onClick={() => handleDelete(news._id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {/* pagination */}
//         <nav
//           className="flex px-6 items-center flex-column flex-wrap md:flex-row justify-between pt-4"
//           aria-label="Table navigation"
//         >
//           <div>
//             Page {currentPage} of {Math.ceil(newses.length / itemsPerPage)}
//           </div>
//           <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"></span>
//           <ul className="flex justify-between items-center gap-5">
//             <Link>
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//             </Link>
//             {Array.from(
//               { length: Math.ceil(newses.length / itemsPerPage) },
//               (_, i) => (
//                 <Link key={i + 1}>
//                   <button
//                     onClick={() => handlePageChange(i + 1)}
//                     disabled={currentPage === i + 1}
//                   >
//                     {i + 1}
//                   </button>
//                 </Link>
//               )
//             )}
//             <Link>
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={
//                   currentPage === Math.ceil(newses.length / itemsPerPage)
//                 }
//               >
//                 Next
//               </button>
//             </Link>
//           </ul>
//         </nav>
//       </div>
//       <Toaster position="top-center" reverseOrder={true}></Toaster>
//     </div>
//   );
// };

// export default Newses;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import moment from "moment";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const Newses = () => {
  const axiosSecure = useAxiosSecure();
  const { data: newses = [], refetch } = useQuery({
    queryKey: ["newses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newses");
      return res.data;
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const declineTextValue = useRef();

  const handelUpdate = (id) => {
    const textareaValue = declineTextValue.current.value;
    const declineText = { textareaValue };
    axiosSecure.patch(`/newses/${id}`, declineText).then((res) => {
      console.log(res.data);
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const declineTerms = () => {
    closeModal();
  };

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
        axiosSecure.delete(`/newses/${id}`).then((res) => {
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

  const handleApprove = (id) => {
    axiosSecure.patch(`/newses/approve/${id}`).then((res) => {
      refetch();
      if (res.data.modifiedCount > 0) {
        const displaySuccessToast = () => {
          toast.dismiss("error-toast");
          toast.success("Articles Approved", {
            id: "error-toast",
            duration: 2000,
            style: {
              padding: "14px",
              color: "#524FF5",
            },
            iconTheme: {
              primary: "#A1F65E",
              secondary: "#FFFFFF",
            },
          });
        };
        displaySuccessToast();
      }
    });

    setIsDetailsVisible(false);
  };

  const handlePremium = (id) => {
    axiosSecure.patch(`/newses/${id}`).then((res) => {
      refetch();
      if (res.data.modifiedCount > 0) {
        const displaySuccessToast = () => {
          toast.dismiss("error-toast");
          toast.success("Articles Approved in Premium Category", {
            id: "error-toast",
            duration: 2000,
            style: {
              padding: "14px",
              color: "#524FF5",
            },
            iconTheme: {
              primary: "#A1F65E",
              secondary: "#FFFFFF",
            },
          });
        };
        displaySuccessToast();
      }
    });

    setIsDetailsVisible(false);
  };

  const handleDecline = (id) => {
    axiosSecure.patch(`/newses/decline/${id}`).then((res) => {
      refetch();
      if (res.data.modifiedCount > 0) {
        const displaySuccessToast = () => {
          toast.dismiss("error-toast");
          toast.success("Article decline", {
            id: "error-toast",
            duration: 2000,
            style: {
              padding: "14px",
              color: "#524FF5",
            },
            iconTheme: {
              primary: "#A1F65E",
              secondary: "#FFFFFF",
            },
          });
        };
        displaySuccessToast();
      }
    });

    setIsDetailsVisible(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const detailsButtonRef = useRef(null);

  const itemsPerPage = 5;
  const allNews = Array.from({ length: newses.length }, (_, i) => i + 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = allNews.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailsClick = (newsId) => {
    setSelectedNews(newsId);
    setIsDetailsVisible(true);
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
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Publisher
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                IsPremium
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

                  <td className="px-6 py-4">{news.title}</td>
                  <td className="px-6 py-4">{news.publisherName}</td>
                  <td className="px py-4">
                    {moment(news.date).format("D-M-YY")}
                  </td>
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
                          <span className="">No</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <button
                      onClick={() => handleDetailsClick(news._id)}
                      type="button"
                      title="Open details"
                      className="rounded-full text-black font-extrabold hover:bg-slate-400 dark:text-gray-600 p-2 hover:dark:bg-gray-700 focus:dark:bg-gray-700"
                      ref={detailsButtonRef}
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-5 fill-current">
                        <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
                      </svg>
                    </button>
                    {selectedNews === news._id && isDetailsVisible && (
                      <div className="grid gap-2">
                        <button
                          type="button"
                          className="px-2 py-1 bg-green-500 text-white rounded-md"
                          onClick={() => handleApprove(news._id)}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 bg-green-500 text-white rounded-md"
                          onClick={() => handlePremium(news._id)}
                        >
                          Premium
                        </button>

                        <div>
                          <button
                            onClick={openModal}
                            className="px-3 py-1 bg-red-500 text-white rounded-md"
                            type="button"
                          >
                            Feedback
                          </button>

                          {isModalOpen && (
                            <div
                              id="default-modal"
                              tabIndex="-1"
                              aria-hidden="true"
                              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
                            >
                              <div className="relative p-4 w-full max-w-2xl max-h-full bg-slate-300">
                                {/* Modal content */}
                                <div className="relative rounded-lg shadow dark:bg-gray-700 bg-slate-300">
                                  {/* Modal header */}
                                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                      Write the reason for decline
                                    </h3>
                                    <button
                                      type="button"
                                      onClick={closeModal}
                                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

                                  <div className="p-4  md:p-5 space-y-4 ">
                                    <textarea
                                      name="declineText"
                                      cols="78"
                                      rows="10"
                                      required
                                      ref={declineTextValue}
                                    ></textarea>
                                  </div>
                                  <button
                                    onClick={() => handelUpdate(news._id)}
                                    className="bg-red-500 py-3 px-4 text-white rounded"
                                  >
                                    Submit
                                  </button>
                                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"></div>

                                  {/* Modal footer */}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          className="px-2 py-1 bg-gray-500 text-white rounded-md"
                          onClick={() => handleDelete(news._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* pagination */}
        <nav
          className="flex px-6 items-center flex-column flex-wrap md:flex-row justify-between pt-4"
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
            <Link>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(newses.length / itemsPerPage)
                }
              >
                Next
              </button>
            </Link>
          </ul>
        </nav>
      </div>
      <Toaster position="top-center" reverseOrder={true}></Toaster>
    </div>
  );
};

export default Newses;
