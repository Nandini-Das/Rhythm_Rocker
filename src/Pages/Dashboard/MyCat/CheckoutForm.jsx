import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";



const CheckoutForm = ({ name, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const [axiosSecure] = useAxiosSecure()
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price])
     

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        if (!stripe || !elements) {
          return;
        }
      
        const card = elements.getElement(CardElement);
        if (card === null) {
          return;
        }
      
        const { error } = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
      
        if (error) {
          console.log('error', error);
          setCardError(error.message);
        } else {
          setCardError('');
        }
      
        setProcessing(true);
      
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || 'unknown',
              name: user?.displayName || 'anonymous',
            },
          },
        });
      
        if (confirmError) {
          console.log(confirmError);
          setProcessing(false);
          return;
        }
      
        if (paymentIntent.status === 'succeeded') {
          setTransactionId(paymentIntent.id);
      
          // Save payment information to the server
          const payment = {
            email: user?.email,
            transactionId: paymentIntent.id,
            price,
            date: new Date(),
            class_name: name,
            status: 'service pending',
          };
      
          axiosSecure.post('/payment', payment)
            .then(() => {
              // Update the available seats for the class
              axiosSecure.patch(`/classes/${selectedClass._id}`, { availableSeats: selectedClass.availableSeats - 1 })
                .then(() => {
                  // Remove the item from the cart
                  axiosSecure.delete(`/carts/${selectedClass._id}`)
                    .then(() => {
                      // Update the enrolled classes in the PaymentHistory component
                      updateEnrolledClasses(selectedClass);
                      setSelectedClass(null);
                      refetch();
                    })
                    .catch((error) => {
                      console.log('Error removing item from cart:', error);
                    });
                })
                .catch((error) => {
                  console.log('Error updating available seats:', error);
                });
            })
            .catch((error) => {
              console.log('Error saving payment information:', error);
            });
        }
      
        setProcessing(false);
      };
      

    return (
        <>
            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
            {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;