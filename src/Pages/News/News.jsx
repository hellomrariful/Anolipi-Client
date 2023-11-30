import { Link } from "react-router-dom";
import moment from "moment";
import { FaEye, FaRegClock } from "react-icons/fa";
import { IconButton } from "@material-tailwind/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import usePremium from "../../Hooks/usePremium";

const News = () => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");
  const [isPremium] = usePremium();
  const handelSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    console.log(searchText);
    setSearch(searchText);
  };

  const getArticles = async ({ pageParam = 0 }) => {
    if (pageParam === false) {
      return { result: [], total: 0 };
    }
    const res = await fetch(
      `http://localhost:5000/articles?limit=10&offset=${pageParam}&search=${search}&tags=${tags}`
    );
    const data = await res.json();
    return { ...data, prevOffset: pageParam };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["articles", search],
    queryFn: getArticles,

    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset + 10 > lastPage.articleCount) {
        return false;
      }
      return lastPage.prevOffset + 10;
    },
  });

  const articles = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.result];
  }, []);

  const shortDescription = (description) => {
    const words = description.split(" ");
    const sliceWord = words.slice(0, 17);
    return sliceWord.join(" ");
  };

  const approveNewses = articles?.filter((item) => item.status === "Approve");

  const handleOptionChange = (event) => {
    setTags(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-between mx-20 mb-10">
        <div className="">
          <select
            name="tags"
            className="input input-bordered w-full"
            defaultValue="default"
            onChange={handleOptionChange}
          >
            <option value="default" disabled>
              Select Publisher
            </option>
            <option value="NajmulHasan">Najmul Hasan</option>
            <option value="AnolipiDesk">Anolipi Desk</option>
            <option value="ArifulIslam">Ariful Islam</option>
            <option value="RakibulIslam">Rakibul Islam</option>
          </select>
        </div>
        <form className="" onSubmit={handelSearch}>
          <input
            className="bg-blue-gray-100 py-3 px-10"
            type="text"
            name="search"
            id=""
          />
          <input
            className="pl-5 py-3 px-5 rounded bg-black text-white ml-10"
            type="submit"
            value="Search"
          />
        </form>
      </div>
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loading={<div>Loading...</div>}
      >
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-5 lg:overflow-x-hidden justify-center mx-auto">
          {approveNewses && approveNewses ? (
            approveNewses?.map((article, index) => (
              <div
                key={index}
                className="relative flex flex-col text-gray-700 bg-white shadow-md lg:w-96 rounded-xl bg-clip-border lg:ml-10 border-2"
              >
                <div className="relative h-56 mx-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 mt-4">
                  <img
                    className="rounded-lg bg-cover h-full w-full"
                    src={article.newsImage}
                    alt="img-blur-shadow"
                  />
                </div>

                <div className="mx-4 mt-4 flex items-center justify-between text-center content-center">
                  <div className="flex items-center">
                    {article.isPremium === "Yes" ? (
                      <div>
                        <IconButton
                          size="sm"
                          color="red"
                          variant="text"
                          className="!absolute top-8 right-12 rounded-full"
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
                        src={article.publisherPhoto}
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
                        {article.publisherName}
                      </a>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-slate-400">
                    <FaRegClock />
                    {moment(article.date).format("MMM-D-YY")}
                  </div>
                  <div className="flex items-center mt-1 gap-1 text-slate-400">
                    <FaEye></FaEye>
                    {article.viewCount || 0} M
                  </div>
                </div>

                <div className="">
                  <h5 className="block mx-4 mb-1 mt-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {article.title}
                  </h5>
                  <p className="block mx-4 font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    {shortDescription(article.description)}...
                    {isPremium && article.isPremium === "Yes" ? (
                      <Link
                        to={`/newsDetails/${article._id}`}
                        className="text-blue-500"
                      >
                        আরো পড়ুন
                      </Link>
                    ) : (
                      <Link
                        to={`/newsDetails/${article._id}`}
                        className="text-blue-500"
                      >
                        আরো পড়ুন
                      </Link>
                    )}
                  </p>
                </div>
                <div className="mx-4 mt-3 mb-4">
                  {!article.isPremium === "Yes" ? (
                    <button
                      disabled={article.premiumTaken !== "Yes"}
                      className="  select-none cursor-pointer w-full rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      data-ripple-light="true"
                    >
                      <Link to={`/newsDetails/${article._id}`}>Read More</Link>
                    </button>
                  ) : (
                    <Link to={`/newsDetails/${article._id}`}>
                      <button
                        className="select-none cursor-pointer w-full rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                      >
                        Read More
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default News;
