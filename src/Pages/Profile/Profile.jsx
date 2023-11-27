
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);

  const updateProfileInfo = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name')
    const email = form.get('email')
    const photoURL = form.get('photoURL')
    const updatedProfileInfo = {name, email}
    console.log(updatedProfileInfo);

    updateUserProfile(name, email, photoURL)
    .then(res =>{
      console.log(res);
    })

  };

  return (
    <div>
      <div className="w-96 bg-white shadow-lg rounded-2xl dark:bg-gray-800 mx-auto mt-10">
        <img
          alt="profile"
          src="https://www.jacadatravel.com/wp-content/uploads/fly-images/366978/Switzerland-cover-1280x560-cc.jpg"
          className="w-full mb-4 rounded-t-lg"
        />

        <div className="flex flex-col items-center justify-center p-4 -mt-20">
          <img
            src={user.photoURL}
            alt=""
            className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
          />

          <p className="mt-2 text-xl font-medium text-gray-800 dark:text-white">
            {user.displayName}
          </p>
          <p className="flex items-center text-xs text-gray-400">
            {user.email}
          </p>
          <p className="text-xs text-gray-400">FullStack dev</p>
          <div className="flex items-center justify-between w-full gap-4 mt-8">
            <Popover placement="bottom">
              <PopoverHandler>
                <Button className="mx-auto">Update Profile</Button>
              </PopoverHandler>
              <PopoverContent className="w-96">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-6 mx-auto text-center"
                >
                  Update Your Profile
                </Typography>

                <form onSubmit={updateProfileInfo}>

                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-bold"
                >
                  Your Name
                </Typography>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    defaultValue={user.displayName}
                    size="lg"
                    name="name"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-bold"
                >
                  Your Mail
                </Typography>

                  <div className="flex gap-2">
                    <Input
                      defaultValue={user.email}
                      type="email"
                      size="lg"
                      name="email"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Input
                      defaultValue={user.photoURL}
                      type="url"
                      size="lg"
                      name="photoURL"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <button className="py-3 px-4 bg-blue-gray-600 text-white rounded">Submit</button>

                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
