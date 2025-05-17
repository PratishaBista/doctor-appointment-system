import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Aarav Shrestha',
    role: 'Patient',
    content: 'The doctors here saved my life with their accurate diagnosis and caring approach. Highly recommended!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Kiran Chen',
    role: 'Patient',
    content: 'Never had such a seamless healthcare experience. The online booking system is fantastic!',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Dr. Vivaan Gurung',
    role: 'Physician',
    content: 'Our patient satisfaction scores have improved dramatically since implementing this platform.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: 4,
    name: 'Sofia Magar',
    role: 'Patient',
    content: 'The telemedicine feature is a game-changer for busy professionals like me.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/75.jpg'
  }
];

const UserAccountCreate = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FiStar 
        key={i} 
        className={`${i < rating ? 'text-[#FFC107] fill-[#FFC107]' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="w-full bg-[#F5F6FA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#0288D1] sm:text-4xl">
            What People Are Saying
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Hear from our patients and healthcare providers
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left card (static) */}
            <div className="bg-white p-8 rounded-2xl shadow-xl transform transition-all hover:scale-[1.02]">
              <div className="flex items-center mb-4">
                <img 
                  className="w-16 h-16 rounded-full object-cover mr-4" 
                  src={testimonials[0].image} 
                  alt={testimonials[0].name}
                />
                <div>
                  <h4 className="text-lg font-bold text-[#0288D1]">{testimonials[0].name}</h4>
                  <p className="text-[#4CAF50]">{testimonials[0].role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"{testimonials[0].content}"</p>
              <div className="flex">
                {renderStars(testimonials[0].rating)}
              </div>
            </div>

            {/* Center card (dynamic) */}
            <div className="bg-white p-8 rounded-2xl shadow-xl transform transition-all hover:scale-[1.02] border-2 border-[#0288D1] relative">
              <div className="absolute -top-4 -left-4 bg-[#4CAF50] text-white px-3 py-1 rounded-full text-sm font-bold">
                Featured
              </div>
              <div className="flex items-center mb-4">
                <img 
                  className="w-16 h-16 rounded-full object-cover mr-4" 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                />
                <div>
                  <h4 className="text-lg font-bold text-[#0288D1]">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-[#4CAF50]">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"{testimonials[currentTestimonial].content}"</p>
              <div className="flex">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
            </div>

            {/* Right card (static) */}
            <div className="bg-white p-8 rounded-2xl shadow-xl transform transition-all hover:scale-[1.02]">
              <div className="flex items-center mb-4">
                <img 
                  className="w-16 h-16 rounded-full object-cover mr-4" 
                  src={testimonials[2].image} 
                  alt={testimonials[2].name}
                />
                <div>
                  <h4 className="text-lg font-bold text-[#0288D1]">{testimonials[2].name}</h4>
                  <p className="text-[#4CAF50]">{testimonials[2].role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"{testimonials[2].content}"</p>
              <div className="flex">
                {renderStars(testimonials[2].rating)}
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md text-[#0288D1] hover:bg-[#0288D1] hover:text-white transition-colors"
          >
            <FiChevronLeft size={24} />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md text-[#0288D1] hover:bg-[#0288D1] hover:text-white transition-colors"
          >
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-[#0288D1] mb-4">Ready to experience better healthcare?</h3>
          <button 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-[#0288D1] to-[#4CAF50] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccountCreate;