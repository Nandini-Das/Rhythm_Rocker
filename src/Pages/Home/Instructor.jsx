import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch('https://assignment-12-server-side-nandini-das.vercel.app/instructors')
      .then(res => res.json())
      .then(data => setInstructors(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container mx-auto">
        <div>
            <h1 className='text-center py-2 decoration-rose-900 font-bold text-xl'>OUR INSTRUCTORS</h1>
        </div>
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {instructors.map((instructor, index) => (
          <li key={index} className="flex flex-col  justify-center p-4 border rounded-lg">
            <img src={instructor.image} alt={instructor.name} className="w-48 h-48 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-bold mb-2">{instructor.name}</h2>
            <p className="text-gray-500">Email: {instructor.email}</p>
            <p className="text-gray-500">Number of Classes Taken: {instructor.numClassesTaken}</p>
            <p className="text-gray-500">Classes Taken:</p>
            <ol className="text-gray-500">
              {instructor.classesTaken.map((className, i) => (
                <li key={i}>{i + 1}. {className}</li>
              ))}
            </ol>
            <Link to="/" className="btn btn-active btn-ghost mt-2 mx-auto">See Classes</Link>
          </li>
        ))}
      
      </ul>
      
    </div>
  );
};

export default Instructor;
