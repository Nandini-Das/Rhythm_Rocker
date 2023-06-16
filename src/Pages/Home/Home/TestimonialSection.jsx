import React from 'react';
import Marquee from 'react-fast-marquee';
import { Fade } from "react-awesome-reveal";
const TestimonialSection = () => {
  const colors = ['blue', 'green', 'red'];
  const testimonials = [
    
{
  id: 1,
  name: 'John Doe',
  instrument: 'Guitar',
  content:
    "Learning guitar has been an amazing experience with your platform. The lessons are well-structured, and the instructors are knowledgeable. I've made great progress and can now play my favorite songs!",
  image: 'https://plus.unsplash.com/premium_photo-1681396936891-ed738c53cb21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
},
{
  id: 2,
  name: 'Jane Smith',
  instrument: 'Piano',
  content:
    'I always dreamt of playing the piano, and thanks to your website, it has become a reality. The lessons are engaging, and the instructors make complex techniques easy to understand. Highly recommended!',
  image: 'https://plus.unsplash.com/premium_photo-1679922598382-747631f49086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
},
{
  id: 3,
  name: 'Mark Johnson',
  instrument: 'Drums',
  content:
    'Learning drums with your platform has been a blast! The interactive lessons and practice exercises have helped me improve my skills. The instructors are passionate and provide valuable feedback. I feel like a rockstar!',
  image: 'https://plus.unsplash.com/premium_photo-1681682668796-41f3d6f06996?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
},

{
  id: 4,
  name: 'Emily Davis',
  instrument: 'Violin',
  content:
    'Your platform has made learning the violin a joyful journey. The step-by-step lessons and helpful tips have boosted my confidence. I can now play beautiful melodies!',
  image: 'https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=998&q=80',
},
{
  id: 5,
  name: 'Michael Lee',
  instrument: 'Saxophone',
  content:
    "I'm grateful for your platform and its comprehensive saxophone lessons. The video tutorials and exercises have been invaluable in my learning process. Thank you for helping me become a better musician!",
  image: 'https://images.unsplash.com/photo-1471565661762-b9dfae862dbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
},
{
  id: 6,
  name: 'Sarah Thompson',
  instrument: 'Flute',
  content:
    "I've thoroughly enjoyed learning the flute through your website. The interactive lessons and clear explanations have made it easy for me to progress. I'm excited to continue my musical journey!",
  image: 'https://images.unsplash.com/photo-1666705752155-b32e282bc50c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
},

  ];

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Fade>
          <h1 className="text-center py-2 decoration-rose-900 font-bold text-xl mt-3">Testimonials</h1>
        </Fade>
      

        <Marquee gradient={false} speed={30}>
          {testimonials.map((testimonial, index) => (
            
              <div className="card shadow-lg w-72 h-96 mx-4 my-4 p-6 rounded-lg">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-medium mb-2">{testimonial.name}</h3>
                <p className="text-gray-400 mb-4">{testimonial.instrument}</p>
                <p className="text-gray-600">{testimonial.content}</p>
              </div>
          
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TestimonialSection;
