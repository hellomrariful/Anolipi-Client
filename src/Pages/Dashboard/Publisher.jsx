import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast, { Toaster } from "react-hot-toast";

const Publisher = () => {
  const axiosPublic = useAxiosPublic();
  const handelAddPublisher = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("publisher");
    const photo = form.get("photo");
    const publisherInfo = { name, photo };


    axiosPublic.post("/publishers", publisherInfo).then((res) => {
      // console.log(name);
      e.target.reset();
      if (res.data.insertedId) {
        const displayErrorToast = () => {
          toast.dismiss("toast");
          toast.success(`${name} is now publisher`, {
            id: "toast",
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
        displayErrorToast();
      }
    });
  };
  return (
    <div>
      <h1 className="mt-20 flex mx-auto justify-center">Add a Publisher</h1>

      <form onSubmit={handelAddPublisher} className="mx-20">
        <div className="w-full mt-10 mb-5">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#334074] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              name="publisher"
              required
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#334074] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#334074] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#334074] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Publisher Name
            </label>
          </div>
        </div>
        <div className="w-full mb-5">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#334074] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              name="photo"
              required
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#334074] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#334074] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#334074] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Photo URL
            </label>
          </div>
        </div>
        <input
          className="middle none center w-full rounded-lg bg-[#334074] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#334074]/20 transition-all hover:shadow-lg hover:shadow-[#334074]/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
          type="submit"
          value="Add Publisher"
        />
        <Toaster position="top-center" reverseOrder={true}></Toaster>
      </form>
    </div>
  );
};

export default Publisher;
