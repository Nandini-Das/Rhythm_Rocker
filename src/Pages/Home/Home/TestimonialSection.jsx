import React from 'react';
import { Accordion, AccordionItem } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      instrument: 'Guitar',
      content:
        "Learning guitar has been an amazing experience with your platform. The lessons are well-structured, and the instructors are knowledgeable. I've made great progress and can now play my favorite songs!",
      image: 'https://example.com/john-doe.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      instrument: 'Piano',
      content:
        'I always dreamt of playing the piano, and thanks to your website, it has become a reality. The lessons are engaging, and the instructors make complex techniques easy to understand. Highly recommended!',
      image: 'https://example.com/jane-smith.jpg',
    },
    {
      id: 3,
      name: 'Mark Johnson',
      instrument: 'Drums',
      content:
        'Learning drums with your platform has been a blast! The interactive lessons and practice exercises have helped me improve my skills. The instructors are passionate and provide valuable feedback. I feel like a rockstar!',
      image: 'https://example.com/mark-johnson.jpg',
    },
    // Additional testimonials
    {
      id: 4,
      name: 'Emily Davis',
      instrument: 'Violin',
      content:
        'Your platform has made learning the violin a joyful journey. The step-by-step lessons and helpful tips have boosted my confidence. I can now play beautiful melodies!',
      image: 'https://example.com/emily-davis.jpg',
    },
    {
      id: 5,
      name: 'Michael Lee',
      instrument: 'Saxophone',
      content:
        "I'm grateful for your platform and its comprehensive saxophone lessons. The video tutorials and exercises have been invaluable in my learning process. Thank you for helping me become a better musician!",
      image: 'https://example.com/michael-lee.jpg',
    },
    {
      id: 6,
      name: 'Sarah Thompson',
      instrument: 'Flute',
      content:
        "I've thoroughly enjoyed learning the flute through your website. The interactive lessons and clear explanations have made it easy for me to progress. I'm excited to continue my musical journey!",
      image: 'https://example.com/sarah-thompson.jpg',
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <Accordion>
          {testimonials.map((testimonial) => (
            <AccordionItem key={testimonial.id} title={testimonial.name}>
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{testimonial.name}</h3>
                    <p className="text-gray-500">{testimonial.instrument}</p>
                  </div>
                </div>
                <p className="text-lg">{testimonial.content}</p>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default TestimonialSection;
