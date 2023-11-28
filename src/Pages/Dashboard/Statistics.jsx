// import { Chart } from "react-google-charts";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const Statistics = () => {
//   const axiosSecure = useAxiosSecure();
//   const { data: newses = [] } = useQuery({
//     queryKey: ["newses"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/newses");
//       return res.data;
//     },
//   });

//   const publisherNameCounts = newses.reduce((counts, news) => {
//     const publisherName = news.publisherName;
//     counts[publisherName] = (counts[publisherName] || 0) + 1;
//     return counts;
//   }, {});

//   const chartData = Object.entries(publisherNameCounts).map(
//     ([publisherName, count]) => [publisherName, count]
//   );

//   return (
//     <div>
//       <Chart
//         chartType="PieChart"
//         data={[["Publisher Name", "Count"], ...chartData]}
//         width={"100%"}
//         height={"400px"}
//       />
//     </div>
//   );
// };

// export default Statistics;

// import { Chart } from "react-google-charts";
// export const data = [
//   [
//     "Day",
//     "Guardians of the Galaxy",
//     "The Avengers",
//     "Transformers: Age of Extinction",
//   ],
//   [1, 37.8, 80.8, 41.8],
//   [2, 30.9, 69.5, 32.4],
//   [3, 25.4, 57, 25.7],
//   [4, 11.7, 18.8, 10.5],
//   [5, 11.9, 17.6, 10.4],
//   [6, 8.8, 13.6, 7.7],
//   [7, 7.6, 12.3, 9.6],
//   [8, 12.3, 29.2, 10.6],
//   [9, 16.9, 42.9, 14.8],
//   [10, 12.8, 30.9, 11.6],
//   [11, 5.3, 7.9, 4.7],
//   [12, 6.6, 8.4, 5.2],
//   [13, 4.8, 6.3, 3.6],
//   [14, 4.2, 6.2, 3.4],
// ];

// export const options = {
//   chart: {
//     title: "Box Office Earnings in First Two Weeks of Opening",
//     subtitle: "in millions of dollars (USD)",
//   },
// };
// const newsChart = () => {
//     return (
//         <Chart
//       chartType="Line"
//       width="100%"
//       height="400px"
//       data={data}
//       options={options}
//     />
//     );
// };

// export default newsChart;

import { Chart } from "react-google-charts";
const data = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];

const userChart = () => {
  return (
    <div>
      <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
    </div>
  );
};

export default userChart;
