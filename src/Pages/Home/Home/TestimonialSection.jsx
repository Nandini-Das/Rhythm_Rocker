import React from "react";
import { Collapse } from "daisyui";

const TestimonialSection = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow rounded p-6">
            <div className="flex items-center mb-4">
              <div className="mr-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src="customer1.jpg"
                  alt="Customer 1"
                />
              </div>
              <h3 className="text-lg font-semibold">John Doe</h3>
            </div>
            <div className="flex items-center mb-2">
              <div className="mr-2">
                <svg
                  className="w-4 h-4 text-yellow-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 1L12.24 6.68L18.45 7.53L13.77 11.72L15.09 17L10 13.78L4.91 17L6.23 11.72L1.55 7.53L7.76 6.68L10 1Z" />
                </svg>
              </div>
              <p>4.5/5</p>
            </div>
            <Collapse>
              <div className="text-sm">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam vel diam eget dui ullamcorper malesuada. Mauris rhoncus
                  sem at metus commodo bibendum.
                </p>
              </div>
            </Collapse>
          </div>
          <div className="bg-white shadow rounded p-6">
            <div className="flex items-center mb-4">
              <div className="mr-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src="customer2.jpg"
                  alt="Customer 2"
                />
              </div>
              <h3 className="text-lg font-semibold">Jane Smith</h3>
            </div>
            <div className="flex items-center mb-2">
              <div className="mr-2">
                <svg
                  className="w-4 h-4 text-yellow-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 1L12.24 6.68L18.45 7.53L13.77 11.72L15.09 17L10 13.78L4.91 17L6.23 11.72L1.55 7.53L7.76 6.68L10 1Z" />
                </svg>
              </div>
              <p>4.0/5</p>
            </div>
            <Collapse>
              <div className="text-sm">
                <p>
                  Nulla facilisi. Donec mattis, felis nec dignissim pulvinar,
                  mauris lectus feugiat libero, ut accumsan nisi augue at dolor.
                </p>
              </div>
            </Collapse>
          </div>
          <div className="bg-white shadow rounded p-6">
            <div className="flex items-center mb-4">
              <div className="mr-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src="customer3.jpg"
                  alt="Customer 3"
                />
              </div>
              <h3 className="text-lg font-semibold">Sarah Johnson</h3>
            </div>
            <div className="flex items-center mb-2">
              <div className="mr-2">
                <svg
                  className="w-4 h-4 text-yellow-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 1L12.24 6.68L18.45 7.53L13.77 11.72L15.09 17L10 13.78L4.91 17L6.23 11.72L1.55 7.53L7.76 6.68L10 1Z" />
                </svg>
              </div>
              <p>4.8/5</p>
            </div>
            <Collapse>
              <div className="text-sm">
                <p>
                  Vivamus tempus massa eu augue rutrum, in aliquet tellus
                  pulvinar. Vestibulum ante ipsum primis in faucibus orci
                  luctus et ultrices posuere cubilia curae.
                </p>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
