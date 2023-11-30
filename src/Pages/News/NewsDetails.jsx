import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FaEye, FaRegClock } from "react-icons/fa";
import { useEffect } from "react";

const NewsDetails = () => {
  const axiosPublic = useAxiosPublic();

  const { data: newses = [] } = useQuery({
    queryKey: ["newses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/newses");
      return res.data;
    },
  });

  const approveNewses = newses?.filter((item) => item.status === "Approve");

  const { id } = useParams();

  const approveNews = approveNewses.filter((item) => item._id === id);
  console.log(approveNews);


  const count = 1;
  const viewCount = {count}
  console.log(viewCount);

  useEffect(() =>{
    axiosPublic.patch(`/newses/viewCount/${id}`, viewCount)
  },[axiosPublic, id])



  return (
    <div>
      {approveNews.map((news) => (
        <div key={news._id}>
          <img
            className="w-full object-cover mx-3"
            src={news.newsImage}
            alt=""
          />
          <div className="mx-auto pl-10">
            <h1 className="font-semibold text-4xl mt-5">{news.title}</h1>
            <div className=" mt-2 flex items-center justify-between text-center content-center mb-5">
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
                {news.viewCount | 0} M 
              </div>
            </div>
            <h3>{news.description}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsDetails;
