import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";

const Statistic = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: { users = [], premiumUserCount = 0, normalUserCount = 0 } = {},
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/users");

        const premiumUsers = res.data.filter(
          (user) => user.premiumTaken === "Yes"
        );
        console.log(premiumUsers.length);

        const normalUsers = res.data.filter(
          (user) => user.premiumTaken === null
        );
        console.log(normalUsers.length);

        return {
          users: res.data,
          premiumUserCount: premiumUsers.length,
          normalUserCount: normalUsers.length,
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid row-gap-8 sm:grid-cols-3 justify-center mx-auto">
        <div className="text-center">
          <h6 className="text-5xl font-bold text-deep-purple-accent-400">
            <CountUp start={0} end={users.length} duration={10}>
              {({ countUpRef }) => (
                <div className="flex ml-24">
                  <span ref={countUpRef} />
                  <h1>M</h1>
                </div>
              )}
            </CountUp>
          </h6>
          <p className="font-bold">All Member</p>
        </div>
        <div className="text-center">
          <h6 className="text-5xl font-bold text-deep-purple-accent-400">
            <CountUp start={0} end={normalUserCount} duration={11}>
              {({ countUpRef }) => (
                <div className="flex ml-24">
                  <span ref={countUpRef} />
                  <h1>M</h1>
                </div>
              )}
            </CountUp>
          </h6>
          <p className="font-bold">Normal Member</p>
        </div>
        <div className="text-center">
          <h6 className="text-5xl font-bold text-deep-purple-accent-400">
            <CountUp start={0} end={premiumUserCount} duration={12}>
              {({ countUpRef }) => (
                <div className="flex ml-24">
                  <span ref={countUpRef} />
                  <h1>M</h1>
                </div>
              )}
            </CountUp>
          </h6>
          <p className="font-bold">Premium Member</p>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
