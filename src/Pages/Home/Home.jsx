import Discount from "./Discount";
import DownloadApp from "./DownloadApp";
import Plans from "./Plans";
import Publisher from "./Publisher";
import Statistic from "./Statistic";
import Subscribe from "./Subscribe";
import TrendingNews from "./TrendingNews";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Modal from "./Modal";
import MessengerCustomerChat from "react-messenger-customer-chat";
import ReactGA from "react-ga4";

const Home = () => {
  const { user } = useContext(AuthContext);

  ReactGA.event({
    category: "your category",
    action: "test action",
    label: "test label", // optional
    value: 99, // optional, must be a number
  });

  return (
    <div className="relative overflow-y-hidden overflow-x-hidden mx-auto">
      <TrendingNews />
      <Publisher />
      {user ? null : <Discount />}
      <Statistic />
      <Plans />
      <DownloadApp />
      <Subscribe />
      <Modal></Modal>
      <div className="App">
        <MessengerCustomerChat
          pageId="109810151659600"
          appId="727980532201110"
        />
      </div>
    </div>
  );
};

export default Home;
