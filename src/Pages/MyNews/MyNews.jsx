import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

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
                    <div className=" rounded-full me-2">
                      {news.status === "Approve" ? (
                        <span className="text-green-500">Approve</span>
                      ) : (
                        <div>
                          <Popover
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                          >
                            <PopoverHandler>
                              <Button>See </Button>
                            </PopoverHandler>
                            <PopoverContent>{news.declineText}No Feedback Provide</PopoverContent>
                          </Popover>
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
