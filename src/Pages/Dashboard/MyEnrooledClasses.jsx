import React from 'react';



import useAuth from '../../hooks/useAuth';
import useMyenrollcart from '../../hooks/useMyerollcart';


const MyEnrooledClasses = () => {
  const { user } = useAuth();
  const [pay, refetch] = useMyenrollcart(user.email);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Enrolled Classes</h1>
      {pay.length === 0 ? (
        <p>No enrolled classes.</p>
      ) : (
        <div className='"overflow-x-auto w-full mt-6 pt-6'>
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Class Name</th>
                <th>Price</th>
                <th>Enroll Date</th>
              </tr>
            </thead>
            <tbody>
              {pay.map((enrolledClass, index) => (
                <tr key={enrolledClass._id}>
                  <td>{index + 1}</td>
                  <td className="ms-1.5">{enrolledClass.class_name}</td>
                  <td>{enrolledClass.price}</td>
                  <td>{enrolledClass.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyEnrooledClasses;
