import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const PaymentHistory = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axiosSecure.get(`/payment/${user.email}`);
        setPayment(response.data);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    fetchPaymentHistory();
  }, [axiosSecure, user.email]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      {payment.length === 0 ? (
        <p>No Payment History.</p>
      ) : (
        <div className="overflow-x-auto w-full mt-6 pt-6">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Transaction Date</th>
                <th>Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              {payment.map((enrolledClass, index) => (
                <tr key={enrolledClass._id}>
                  <td>{index + 1}</td>
                  <td>{enrolledClass.transactionId}</td>
                  <td>{enrolledClass.date}</td>
                  <td>${enrolledClass.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
