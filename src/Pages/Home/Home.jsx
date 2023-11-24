import Discount from "./Discount";
import DownloadApp from "./DownloadApp";
import Plans from "./Plans";
import Statistic from "./Statistic";
import Subscribe from "./Subscribe";
import TrendingNews from "./TrendingNews";


const Home = () => {
    return (
        <div>
            <TrendingNews></TrendingNews>
            <Discount></Discount>
            <Statistic></Statistic>
            <Plans></Plans>
            <DownloadApp></DownloadApp>
            <Subscribe></Subscribe>
        </div>
    );
};

export default Home;