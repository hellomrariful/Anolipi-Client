import Discount from "./Discount";
import DownloadApp from "./DownloadApp";
import Plans from "./Plans";
import Publisher from "./Publisher";
import Statistic from "./Statistic";
import Subscribe from "./Subscribe";
import TrendingNews from "./TrendingNews";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative overflow-y-hidden overflow-x-hidden mx-auto">
      <TrendingNews />
      <Publisher />
      {user ? null : <Discount />}
      <Statistic />
      <Plans />
      <DownloadApp />
      <Subscribe />
      {/* <Modal></Modal> */}
    </div>
  );
};

export default Home;
