import React, { useState } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import PopularInstructor from '../PopularInstructor';
import PoplarClasses from '../PoplarClasses';
import "./buttonClassName.css"
import TestimonialSection from './TestimonialSection';
import 'react-accessible-accordion/dist/fancy-example.css';

const Home = () => {
  const [theme, setTheme] = useState("light");
  const buttonClassName = theme === "light" ? "button-light" : "button-dark";
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    
 <div className='relative'>
  <div className=' '>
  <button className={buttonClassName}  onClick={toggleTheme}>
  {theme === "light" ? "Dark Mode" : "Light Mode"}
  </button>
      <div data-theme={theme}>
      <div className="carousel w-full mb-5">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://images.unsplash.com/photo-1512053459797-38c3a066cabd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src="https://images.unsplash.com/photo-1461784121038-f088ca1e7714?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
 
</div>
<PopularInstructor></PopularInstructor>
<PoplarClasses></PoplarClasses>
<TestimonialSection></TestimonialSection>
{/* todo-extra section */}


 </div>
      </div>
    </div>
      
  );
};

export default Home;