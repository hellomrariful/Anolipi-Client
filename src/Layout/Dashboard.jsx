import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FaBook } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen grid grid-cols-3 mt-10">
      {/* sidebar left */}
      <div className="w-60 dark:bg-gray-900 dark:text-gray-100 col-span-1">
        <div className="flex items-center p-2 space-x-4">
          <img
            src={user?.photoURL}
            className="w-12 h-12 rounded-full dark:bg-gray-500"
          />
          <div>
            <h2 className="text-lg font-semibold">{user?.displayName}</h2>
            <span className="flex items-center space-x-1">
              <Link className=" hover:underline text-sm" to="/profile">
                View profile
              </Link>
            </span>
          </div>
        </div>

        <div className="divide-y dark:divide-gray-700 mt-3">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="dark:bg-gray-800 dark:text-gray-50">
              <NavLink className="flex items-center p-1 gap-1 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-gray-400"
                >
                  <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                </svg>
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="allUsers"
                className="flex items-center p-1 gap-1 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-gray-400"
                >
                  <path d="M480 456c0 30.9-25.1 56-56 56H88c-30.9 0-56-25.1-56-56V296c0-26.5 21.5-48 48-48s48 21.5 48 48v160c0 8.8 7.2 16 16 16s16-7.2 16-16V296c0-26.5 21.5-48 48-48s48 21.5 48 48v160c0 8.8 7.2 16 16 16s16-7.2 16-16V296c0-26.5 21.5-48 48-48s48 21.5 48 48v160c0 8.8 7.2 16 16 16s16-7.2 16-16V296c0-26.5 21.5-48 48-48s48 21.5 48 48v160zM376 168c-50.6 0-92 41.4-92 92s41.4 92 92 92 92-41.4 92-92-41.4-92-92-92zM376 328c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"></path>
                </svg>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="newses"
                className="flex items-center p-1 gap-1 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-gray-400"
                >
                  <path d="M480 456c0 30.9-25.1 56-56 56H88c-30.9 0-56-25.1-56-56V296c0-26.5 21.5-48 48-48s48 21.5 48 48v160c0 8.8 7.2 16 16 16s16-7.2 16-16V296c0-26.5 21.5-48 48-48s48 21.5 48 48v160c0 8.8 7.2 16 16 16s16-7.2 16-16V296c0-26.5 21.5-48 48-48s48 21.5 48 48v160c0 8.8 7.2 16 16 16s16-7.2 16-16V296c0-26.5 21.5-48 48-48s48 21.5 48 48v160zM376 168c-50.6 0-92 41.4-92 92s41.4 92 92 92 92-41.4 92-92-41.4-92-92-92zM376 328c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"></path>
                </svg>
                Newses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="publisher"
                className="flex items-center p-1 gap-1 rounded-md"
              >
                <FaBook></FaBook>
                Publisher
              </NavLink>
            </li>
          </ul>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li>
              <NavLink
                to="/"
                className="flex items-center p-1 gap-1 rounded-md"
              >
                <FaBook></FaBook>
                Home
              </NavLink>
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-gray-400"
                >
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* sidebar right */}
      <div className="col-span-2 border">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
