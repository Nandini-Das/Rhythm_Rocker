import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./MyCat/CheckoutForm";
import useCart from "../../hooks/useCart";

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const [cart] = useCart();
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
console.log(id)
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await fetch(`https://assignment-12-server-side-nandini-das.vercel.app/classes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setClassData(data);
        } else {
          console.error("Error fetching class data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassData();
  }, [id]);
 console.log(classData)
  const selectedItem = cart.find((item) => item._id === id);
  const price = selectedItem ? parseFloat(selectedItem.price) : 0;
  const name = selectedItem ? (selectedItem.name) : null;
     console.log(price)
  return (
    <div>
      <h2 className="text-3xl">Payment</h2>
      {isLoading ? (
        <p>Loading class data...</p>
      ) : classData ? (
          
        <Elements stripe={stripePromise}>
          <CheckoutForm  price={price} name= {name}  />
        </Elements>
      ) : (
        <p>Failed to fetch class data.</p>
      )}
    </div>
  );
};

export default Payment;

