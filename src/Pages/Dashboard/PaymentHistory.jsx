import React from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';


    
const PaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure();

    const [enrolledClasses, setEnrolledClasses] = useState([]);
    useEffect(()=>{
        axiosSecure.get("/payment").then((res) => {
            setEnrolledClasses(res.data);
          }); 
    }, [])
    return (
        <div>
        <h1 className="text-2xl font-bold mb-4">My Enrolled Classes</h1>
        {enrolledClasses.length === 0 ? (
          <p>No enrolled classes.</p>
        ) : (
          <div className='"overflow-x-auto w-full mt-6 pt-6'>
            <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Transation ID</th>
                <th>Transaction Date</th>
                <th>Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              {enrolledClasses.map((enrolledClass, index) => (
                <tr key={enrolledClass._id}>
                    <td>{index+1}</td>
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