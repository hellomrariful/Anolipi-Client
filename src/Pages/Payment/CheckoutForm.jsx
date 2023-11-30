import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  // const axiosPublic = useAxiosPublic()
  //   const { data: users = [] } = useQuery({
  //       queryKey: ["users"],
  //       queryFn: async () => {
  //         const res = await axiosPublic.get("/users");
  //         console.log(res.data);
  //         return res.data;
  //       },
  //     });

  const { user } = useContext(AuthContext);

  const price = 44000;
const buyTimeInMinutes = 5;
const currentTime = new Date();
const buyTime = buyTimeInMinutes * 60 * 1000;

// Corrected: Add buyTime to currentTime
const expireTime = new Date(currentTime.getTime() + buyTime);

// Extract hours, minutes, and seconds
const hours = expireTime.getHours();
const minutes = expireTime.getMinutes();
const seconds = expireTime.getSeconds();

// Convert hours, minutes, and seconds to milliseconds
const expireTimeInMilliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;

console.log(expireTimeInMilliseconds);

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          email: user.email,
          price: price,
          transactionId: paymentIntent.id,
          buyTime: buyTime,
          expireTimeInMilliseconds,
        };
        console.log(payment);

        const res = await axiosSecure.post("/payments", payment);
        console.log(res);
        if (res.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for the taka paisa",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className=" mt-10 bg-blue-gray-300 py-4 px-4 cursor-pointer btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )}
      <h1>Price: {price}</h1>
    </form>
  );
};

export default CheckoutForm;
