import React, { useEffect, useState } from 'react';
import Courses from './Courses';


const ClassLoader = () => {
    
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(error => console.log(error));
    }, []);
   
    return (
        <div>
            <div>
                <h1 className="text-center py-2 decoration-rose-900 font-bold text-xl">OUR CLASSES</h1>
            </div>
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">  
         {
            courses.map(courseItem => (
                <Courses key={courseItem._id} courseItem= {courseItem}></Courses>
            ))
         }    
        </ul>
        </div>
    );
    
};

export default ClassLoader;
