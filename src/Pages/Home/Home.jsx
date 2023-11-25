import Discount from "./Discount";
import DownloadApp from "./DownloadApp";
import Plans from "./Plans";
import Publisher from "./Publisher";
import Statistic from "./Statistic";
import Subscribe from "./Subscribe";
import TrendingNews from "./TrendingNews";


const Home = () => {
    return (
        <div className="overflow-y-hidden overflow-x-hidden	mx-auto">
            <TrendingNews></TrendingNews>
            <Publisher></Publisher>
            <Discount></Discount>
            <Statistic></Statistic>
            <Plans></Plans>
            <DownloadApp></DownloadApp>
            <Subscribe></Subscribe>
        </div>
    );
};

export default Home;