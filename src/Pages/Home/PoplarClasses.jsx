import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

const PoplarClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('https://assignment-12-server-side-nandini-das.vercel.app/classes')
            .then(res => res.json())
            .then(data => {
        
                const sortedClasses = data.sort((a, b) => b.students - a.students);
                // Select the top 6 instructors
                const topClasses = sortedClasses.slice(0, 6);
                setClasses(topClasses);
              })
              .catch(error => console.log(error));
          }, []);
    return (
        <div>
        <Fade>
        <h1 className="text-center py-2 decoration-rose-900 font-bold text-xl mt-3">OUR POPULAR CLASSES</h1>
        </Fade>
         <div className="container mx-auto">
  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
    {classes.map((theClass, index) => (
      <div key={index} className="card max-w-md p-4 mx-auto bg-white shadow-lg rounded-lg">
        <img src={theClass.class_image} alt={theClass.name} className="w-48 h-48 object-cover rounded-full mx-auto mb-4" />
        <div className="">
          <h2 className="text-xl font-bold mb-2">{theClass.course_name}</h2>
        
   

          <p className="text-gray-500">Instructor: {theClass.instructor_name}</p>
          <p className="text-gray-500">Enrolled Students: {theClass.enrolled_students}</p>
          <p className="text-gray-500">Available Seats: {theClass.available_seats}</p>
        </div>
      </div>
    ))}
  </div>
</div> 
    </div>
    );
};

export default PoplarClasses;