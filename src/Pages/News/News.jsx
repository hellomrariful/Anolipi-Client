import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaEye, FaRegClock } from "react-icons/fa";

const News = () => {
  const axiosPublic = useAxiosPublic();

  const { data: newses = [] } = useQuery({
    queryKey: ["newses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/newses");
      return res.data;
    },
  });

  const approveNewses = newses?.filter((item) => item.status === "Approve");

  const shortDescription = (description) => {
    const words = description.split(" ");
    const sliceWord = words.slice(0, 17);
    return sliceWord.join(" ");
  };

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-5 lg:overflow-x-hidden justify-center">
      {approveNewses?.map((news) => (
        <div
          key={news._id}
          className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border ml-10 border-2"
        >
          <div className="relative h-56 mx-4  overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 mt-4">
            <img
              className="rounded-lg bg-cover mt-4 w-full"
              src={news.newsImage}
              alt="img-blur-shadow"
            />
          </div>

          <div className="mx-4 mt-4 flex items-center justify-between text-center content-center">
            <div className="flex items-center">
              <a href="/" aria-label="Author" title="Author" className="mr-1">
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
              1.1M
            </div>
          </div>

          <div className="">
            <h5 className="block mx-4 mb-1 mt-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {news.title}
            </h5>
            <p className="block mx-4 font-sans text-base antialiased font-light leading-relaxed text-inherit">
              {shortDescription(news.description)}...
              <Link to={`/newsDetails/${news._id}`} className="text-blue-500">
                আরো পড়ুন
              </Link>
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
      ))}
    </div>
  );
};

export default News;

// const getNewses = async ({ pageParam = 0 }) => {
//   const res = await fetch(
//     `https://anolipi-server.vercel.app/newses?limit=10&offset=${pageParam}`
//   );
//   const data = await res.json();

//   return data.newses; // Assuming 'newses' is the array in your API response
// };

// import { useInfiniteQuery } from "@tanstack/react-query";
// import InfiniteScroll from "react-infinite-scroll-component";

// const News = () => {
//   const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
//     queryKey: ["newses"],
//     queryFn: getNewses,
//     getNextPageParam: (lastPage) => {
//       if (lastPage.length === 0) {
//         return false;
//       }
//       return lastPage[lastPage.length - 1]._id; // Assuming '_id' is a unique identifier
//     },
//   });

//   const newses = data?.reduce((acc, page) => [...acc, ...page], []);
//   return (
//     <div>
//       <InfiniteScroll
//         dataLength={newses ? newses.length : 0}
//         next={() => fetchNextPage()}
//         hasMore={hasNextPage}
//         loading={<div>Loading...☝️</div>}
//       >
//         <div className="w-11/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10">
//           {newses &&
//             newses.map((news, idx) => (
//               <div className="border-2 p-2 bg-slate-200 rounded" key={idx}>
//                 <p className="text-2xl font-semibold bg-black flex justify-center items-center w-10 h-10 rounded-full text-white">
//                   {idx + 1}
//                 </p>

//                 <h3>{news.description}</h3>
//               </div>
//             ))}
//         </div>
//       </InfiniteScroll>
//     </div>
//   );
// };

// export default News;

// import { useInfiniteQuery } from '@tanstack/react-query';
// import InfiniteScroll from 'react-infinite-scroll-component';

// const getArticles = async ({ pageParam = 0 }) => {
//     const res = await fetch(`https://api.realworld.io/api/articles?limit=10&offset=${ pageParam }`);
//     const data = await res.json();

//     return { ...data, prevOffset: pageParam }

// }

// const Home = () => {
//     const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
//         queryKey: ["articles"],
//         queryFn: getArticles,
//         getNextPageParam: (lastPage) => {
//             if (lastPage.prevOffset + 10 > lastPage.articlesCount) {
//                 return false;
//             }
//             return lastPage.prevOffset + 10;
//         }

//     })

//     const articles = data?.pages.reduce((acc, page) => {
//         return [...acc, ...page.articles]
//     }, [])

//     return (
//         <div>
//             <InfiniteScroll
//                 dataLength={ articles ? articles.length : 0 }
//                 next={ () => fetchNextPage() }
//                 hasMore={ hasNextPage }
//                 loading={ <div>Loading...☝️</div> }
//             >
//                 <div className="w-11/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10">
//                     { articles &&
//                         articles.map((article, idx) => {
//                             return (
//                                 <div className='border-2 p-2 bg-slate-200 rounded' key={ idx }>
//                                     <p className="text-2xl font-semibold bg-black flex justify-center items-center w-10 h-10 rounded-full text-white">{ idx + 1 }</p>
//                                     <h3>{ article.description }</h3>
//                                 </div>
//                             )
//                         })

//                     }

//                 </div>

//             </InfiniteScroll>
//         </div>
//     );
// };

// export default Home;
