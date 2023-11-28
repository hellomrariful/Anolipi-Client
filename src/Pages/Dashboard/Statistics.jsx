import { Chart } from "react-google-charts";

const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];


const Statistics = () => {
    
    return (
        <div>
            <Chart
      chartType="PieChart"
      data={data}
      width={"100%"}
      height={"400px"}
    />
        </div>
    );
};

export default Statistics;