import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import BannerImg from "../../assets/Big-Sale.png";

const Modal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpen(true);
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, []);

  const cancelButtonRef = useRef(null);
  return (
    <div>
      {open && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-semibold text-xl mb-3 justify-center  font-semibold leading-6 text-gray-900 text-center grid gap-2"
                          >
                            Expand Knowledge!
                            <br />
                            Pay Less.
                            <br />
                            <h1 className=" font-normal text-[18px]">
                              Exclusive{" "}
                              <span className="text-black font-extrabold">
                                Black
                              </span>{" "}
                              <span className=" text-[#334074] font-extrabold">
                                Friday
                              </span>{" "}
                              Article Deals!
                            </h1>
                          </Dialog.Title>
                          <div>
                            <img
                              className="rounded-lg "
                              src={BannerImg}
                              alt=""
                            />
                          </div>
                          <div className="mt-2 -mb-3">
                            <p className=" text-gray-500 text-center">
                              This Black Friday, elevate your reading experience
                              with our exclusive premium articles. Uncover a
                              world of knowledge that's worth every penny.
                              Subscribe now and enjoy a special Black Friday of
                              the Year!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 justify-center py-5 sm:flex sm:flex-row-reverse sm:px-6 text-center">
                      <Link to={"/subscription"}>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-[#334074] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                          onClick={() => setOpen(false)}
                        >
                          Buy Now
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
};

export default Modal;
