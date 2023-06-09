import React, { useEffect, useState } from 'react';

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/instructors')
        .then(res => res.json())
        .then(data => {
        
          const sortedInstructors = data.sort((a, b) => b.numClassesTaken - a.numClassesTaken);
          // Select the top 6 instructors
          const topInstructors = sortedInstructors.slice(0, 6);
          setInstructors(topInstructors);
        })
        .catch(error => console.log(error));
    }, []);
    return (
        <div>
            <h1 className='text-center py-2 decoration-rose-900 font-bold text-xl mt-3'>OUR POPULAR INSTRUCTORS</h1>
             <div className="container mx-auto">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {instructors.map((instructor, index) => (
          <div key={index} className="card max-w-md p-4 mx-auto bg-white shadow-lg rounded-lg">
            <img src={instructor.image} alt={instructor.name} className="w-48 h-48 object-cover rounded-full mx-auto mb-4" />
            <div className="">
              <h2 className="text-xl font-bold mb-2">{instructor.name}</h2>
              <p className="text-gray-500">Email: {instructor.email}</p>
              <p className="text-gray-500">Classes Taken:</p>
            <ol className="text-gray-500">
              {instructor.classesTaken.map((className, i) => (
                <li key={i}>{i + 1}. {className}</li>
              ))}
            </ol>
            </div>
          </div>
        ))}
      </div>
    </div> 
        </div>
    );
};

export default PopularInstructor;