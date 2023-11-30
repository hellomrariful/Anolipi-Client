import useAxiosPublic from "../../Hooks/useAxiosPublic";
import BannerImg from "../../assets/Big-Sale.png";
import { Select, Option } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";

const Subscription = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectChange = async (value) => {
    const email = user.email;

    const parts = value.split(" ");
    const price = parseFloat(parts[parts.length - 1].replace("$", ""));
    const subscribeTime = parts.slice(0, parts.length - 2).join(" ");

    console.log("Price:", price);
    console.log("Subscribe Time:", subscribeTime);

    setSelectedValue({ price, subscribeTime });

    axiosPublic.patch(`/users/subscribe/${email}`, {
      price,
      subscribeTime,
    });
  };

  return (
    <div>
      <img className="rounded" src={BannerImg} alt="" />

      <div className="w-72 mt-20 text-center">
        <Select onChange={handleSelectChange} placeholder="Select Version">
          <Option value="1 Minuit $20">1 minute $20</Option>
          <Option value="1 Day $100">1 Day $100</Option>
          <Option value="10 Days $200">10 Days $200</Option>
        </Select>
      </div>
      {selectedValue ? (
        <Link to="/payment">
          <button className="py-3 px-2 mt-6 bg-blue-gray-700">Pay</button>
        </Link>
      ) : (
        <button
          disabled
          className="py-3 px-2 mt-6 bg-gray-300 cursor-not-allowed"
        >
          Pay
        </button>
      )}

    
    </div>
  );
};

export default Subscription;
