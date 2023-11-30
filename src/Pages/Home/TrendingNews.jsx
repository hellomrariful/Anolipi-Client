import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./TrendingNews.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import { FaEye, FaRegClock } from "react-icons/fa";
import moment from "moment";

const TrendingNews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: newses = [] } = useQuery({
    queryKey: ["newses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/newses");
      return res.data;
    },
  });

  const approveNewses = newses?.filter((item) => item.status === "Approve");

  const sortedNews = approveNewses
    .slice()
    .sort((a, b) => b.viewCount - a.viewCount);

  // console.log(sortedNews);

  const shortDescription = (description) => {
    const words = description.split(" ");
    const sliceWord = words.slice(0, 17);
    return sliceWord.join(" ");
  };

  return (
    <div className="mt-6">
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-20"
      >
        <div className="mx-auto justify-center flex text-center items-center ">
          {sortedNews &&
            sortedNews.slice(0, 6).map((news) => (
              <SwiperSlide
                key={news._id}
                className="text-center mx-auto flex justify-center items-center mb-16"
              >
                <div
                  key={news._id}
                  className="relative flex flex-col text-gray-700 bg-white shadow-md lg:w-96 rounded-xl bg-clip-border lg:ml-10 border-2"
                >
                  <div className="relative h-56 mx-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 mt-4">
                    <img
                      className="rounded-lg bg-cover h-full w-full"
                      src={news.newsImage}
                      alt="img-blur-shadow"
                    />
                  </div>

                  <div className="mx-4 mt-4 flex items-center justify-between text-center content-center">
                    <div className="flex items-center">
                      {news.isPremium === "Yes" ? (
                        <div>
                          <IconButton
                            size="sm"
                            color="red"
                            variant="text"
                            className="!absolute top-8 right-12 rounded-full f"
                          >
                            <p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                />
                              </svg>
                            </p>
                            <h1 className=" ml-6 -mt-5">Premium</h1>
                          </IconButton>
                        </div>
                      ) : null}
                      <a
                        href="/"
                        aria-label="Author"
                        title="Author"
                        className="mr-1"
                      >
                        <img
                          src={news.publisherPhoto}
                          alt="avatar"
                          className="object-cover w-7 h-7 rounded-full shadow-sm"
                        />
                      </a>
                      <div>
                        <a
                          aria-label="Author"
                          title="Author"
                          className="font-semibold transition-colors duration-200 hover:text-deep-purple-accent-400 text-slate-400"
                        >
                          {news.publisherName}
                        </a>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-slate-400">
                      <FaRegClock />
                      {moment(news.date).format("MMM-D-YY")}
                    </div>
                    <div className="flex items-center mt-1 gap-1 text-slate-400">
                      <FaEye></FaEye>
                      {news.viewCount || 0} M
                    </div>
                  </div>

                  <div className="">
                    <h5 className="block mx-4 mb-1 mt-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {news.title}
                    </h5>
                    <p className="block mx-4 font-sans text-base antialiased font-light leading-relaxed text-inherit">
                      {shortDescription(news.description)}...
                      {news.isPremium === "Yes" ? (
                        <Link to={`/subscription`} className="text-blue-500">
                          আরো পড়ুন
                        </Link>
                      ) : (
                        <Link
                          to={`/newsDetails/${news._id}`}
                          className="text-blue-500"
                        >
                          আরো পড়ুন
                        </Link>
                      )}
                    </p>
                  </div>
                  <div className="mx-4 mt-3 mb-4">
                    {news.isPremium == "Yes" ? (
                      <>
                        <button
                          disabled
                          className="select-none cursor-pointer w-full rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          data-ripple-light="true"
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to={`/newsDetails/${news._id}`}>
                          <button
                            className="select-none w-full rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-light="true"
                          >
                            Read More
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </div>
  );
};

export default TrendingNews;
