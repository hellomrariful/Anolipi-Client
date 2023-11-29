import { useState } from 'react';
import BannerImg from '../../assets/Big-Sale.png'
import { Link } from 'react-router-dom';

const Subscription = () => {
    const [subscriptionPeriod, setSubscriptionPeriod] = useState('1_minute');

    const handleSubscription = async () => {
        // Perform subscription logic, update the user's premiumTaken field
        // You can make an API call to update the user's premiumTaken field on the server
      };

    return (
        <div>
            <img className=' rounded' src={BannerImg} alt="" />

            {/* Subscription Dropdown */}
      <div className='mt-10'>
      <select
        value={subscriptionPeriod}
        onChange={(e) => setSubscriptionPeriod(e.target.value)}
      >
        <option value="1_minute">1 Minute</option>
        <option value="5_days">5 Days</option>
        <option value="10_days">10 Days</option>
      </select>
      <br />

      {/* Subscription Button */}
      <Link to={'/payment'}><button onClick={handleSubscription}>Take Subscription</button></Link>
      </div>
        </div>
    );
};

export default Subscription;