import { useContext, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";
import { useParams } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateNews = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const axiosPublic = useAxiosPublic();

  //updated
  const { data: newses = [] } = useQuery({
    queryKey: ["newses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/newses");
      return res.data;
    },
  });

  const { id } = useParams();
  const newsData = newses?.filter((item) => item.authorEmail === user.email);

  const news = newsData?.find((item) => item._id === id);

  // tags
  const animatedComponents = makeAnimated();
  const colorOptions = [
    { value: "news", label: "News" },
    // { value: 'blue', label: 'Blue', isDisabled: true },
    { value: "sports", label: "Sports" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
    { value: "job", label: "Job" },
    { value: "feature", label: "Feature" },
  ];

  const tags = selectedOption?.map((tag) => tag?.value).join(", ");

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  // publisher
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePublisherSelect = (publisher) => {
    setSelectedPublisher(publisher);
    setIsOpen(false);
  };

  const handelPostNews = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title");
    const description = form.get("description");
    const photo = form.get("photo");
    // console.log(photo);

    if (!selectedPublisher) {
      const displayErrorToast = () => {
        toast.dismiss("error-toast");
        toast.error("Please select your Publisher", {
          id: "error-toast",
          duration: 2000,
          style: {
            padding: "14px",
            color: "#000000",
          },
          iconTheme: {
            primary: "#ff0033",
            secondary: "#FFFFFF",
          },
        });
      };
      displayErrorToast();
    }

    // image upload to imgBB and then get an url
    if (photo instanceof File) {
      try {
        const formData = new FormData();
        formData.append("image", photo);

        // image upload to imgBB and then get an url
        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log("ImgBB Response:", res.data);
        const imageUrl = res.data.data.url;

        const newsImage = imageUrl;
        const publisherName = selectedPublisher.name;
        const publisherPhoto = selectedPublisher.photo;
        const date = new Date();
        const authorName = user.displayName;
        const authorEmail = user.email;
        const authorPhoto = user.photoURL;

        const newsInfo = {
          title,
          description,
          tags,
          newsImage,
          date,
          publisherName,
          publisherPhoto,
          authorName,
          authorEmail,
          authorPhoto,
        };

        console.log(newsInfo);

        axiosPublic.put(`/newses/${id}`, newsInfo).then((res) => {
          //   console.log(res.data);
          e.target.reset();
          console.log(res);
          if (res.data.modifyCount < 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `is an Admin Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });

        // console.log("News Info:", newsInfo);
      } catch (error) {
        console.error("Error uploading image to ImgBB:", error);
      }
    }
  };

  return (
    <form className="grid grid-cols-4 gap-5 mt-14" onSubmit={handelPostNews}>
      {/* title, description, image */}
      <div className="col-span-3 mr-5">
        <div>
          <label className="flex justify-center font-semibold">
            Update Your Post
          </label>
          <input
            type="text"
            id="helper-text"
            name="title"
            required
            defaultValue={news?.title}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded mt-5"
            placeholder="Add a title"
          />
          <div className="w-full mt-4 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
              <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 12 20"
                    >
                      <path
                        stroke="currentColor"
                        d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                      />
                    </svg>
                    <span className="sr-only">Attach file</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    <span className="sr-only">Embed map</span>
                  </button>

                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                      <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                    </svg>
                    <span className="sr-only">Format code</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                    </svg>
                    <span className="sr-only">Add emoji</span>
                  </button>
                </div>
                <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 21 18"
                    >
                      <path
                        stroke="currentColor"
                        d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
                      />
                    </svg>
                    <span className="sr-only">Add list</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                    </svg>
                    <span className="sr-only">Settings</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                      <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                    </svg>
                    <span className="sr-only">Timeline</span>
                  </button>

                  {/* upload image */}
                  <div>
                    <input
                      type="file"
                      required
                      name="photo"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                data-tooltip-target="tooltip-fullscreen"
                className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 19 19"
                >
                  <path
                    stroke="currentColor"
                    d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                  />
                </svg>
                <span className="sr-only">Full screen</span>
              </button>
              <div
                id="tooltip-fullscreen"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Show full screen
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
              <label className="sr-only cursor-pointer">Publish post</label>
              <textarea
                id="editor"
                name="description"
                rows="15"
                defaultValue={news?.description}
                className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Write an article..."
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* submit, tags, publisher */}
      <div className="col-span-1">
        <div>
          <h1 className="mb-5 flex justify-center">
            Add Tags/Categories/Publisher
          </h1>
          <Select
            closeMenuOnSelect={false}
            onChange={handleSelectChange}
            required
            components={animatedComponents}
            defaultValue={news?.tags}
            // defaultValue={[colorOptions[4], colorOptions[5]]}
            isMulti
            options={colorOptions}
          />

          {/* publisher */}
          <div className="relative inline-block text-left w-full">
            {/* Dropdown button */}
            <button
              onClick={toggleDropdown}
              id="dropdownHoverButton"
              className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
              type="button"
            >
              {selectedPublisher ? (
                <>
                  <div className="flex justify-center mx-auto items-center gap-2">
                    <span className="relative block">
                      <img
                        alt="profile"
                        src={selectedPublisher.photo}
                        defaultValue={news?.publisherPhoto}
                        className="mx-auto object-cover rounded-full h-10 w-10 "
                      />
                    </span>
                    <h1> {selectedPublisher.name}</h1>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="flex justify-center mx-auto">
                    Select Publisher
                  </h1>
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </>
              )}
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div
                id="dropdownHover"
                className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownHoverButton"
                >
                  {publishers.map((publisher) => (
                    <li
                      key={publisher._id}
                      onClick={() => handlePublisherSelect(publisher)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    >
                      <div className="flex justify-center items-center gap-2">
                        <span className="relative block">
                          <img
                            alt="profile"
                            src={publisher.photo}
                            // defaultValue={publisherPhoto}
                            className="mx-auto object-cover rounded-full h-10 w-10 "
                          />
                        </span>
                        <h1>{publisher.name}</h1>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* input */}
          <div>
            <input
              className="flex justify-center mx-auto mt-10 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 w-full cursor-pointer"
              type="submit"
              value="Update Post"
            />
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={true}></Toaster>
      </div>
    </form>
  );
};

export default UpdateNews;
