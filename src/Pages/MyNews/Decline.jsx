import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import NewsTest from './NewsTest';

const Decline = () => {
  const axiosSecure = useAxiosSecure();
  const { data: newses = [] } = useQuery({
    queryKey: ["newses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newses");
      return res.data;
    },
  });

  return (
    <div>
      {
      newses.map(news => <NewsTest key={news._id} news={news}></NewsTest>)
      }
    </div>
  );
};
export default Decline;
