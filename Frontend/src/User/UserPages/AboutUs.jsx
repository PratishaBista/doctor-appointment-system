import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AnimatedCounter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);

  if (target === "24/7") {
    return <span>24/7</span>;
  }

  useEffect(() => {
    const numericValue = parseFloat(target.replace(/[^0-9.]/g, '')) || 0;
    const increment = numericValue / (duration * 60); // 60fps

    let currentCount = 0;
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= numericValue) {
        currentCount = numericValue;
        clearInterval(timer);
      }
      setCount(currentCount);
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [target, duration]);

  const formatNumber = (num) => {
    const suffix = target.match(/[^0-9.]/g)?.join('') || '';
    return Math.floor(num).toLocaleString() + suffix;
  };

  return <motion.span>{formatNumber(count)}</motion.span>;
};

const UserAbout = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  const stats = [
    { value: "10,000+", label: "Patients Treated" },
    { value: "500+", label: "Medical Staff" },
    { value: "98%", label: "Patient Satisfaction" },
    { value: "24/7", label: "Emergency Services" }
  ];

  //this does not need to be changed, this is just a dummy data for now and can remain static since it is an about us page
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Cardiologist",
      quote: "HealthSolution's appointment system has revolutionized how we manage patient flow, allowing us to focus more on care than administration.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Neurology",
      quote: "The efficiency of this system means we can see more patients with less waiting time - a win for everyone involved.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Pediatrics Director",
      quote: "Parents appreciate how easy it is to book appointments online, and we appreciate the reduced no-show rates.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* header/ slogan */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl tracking-[-0.03em] md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#2E2E2E] to-[#2E2E2E] bg-clip-text text-transparent leading-[1.2] pb-2">
          Caring Today for a Healthier Tomorrow
        </h2>
      </motion.div>

    {/* banner */}
      <div className="relative w-full h-[50vh] overflow-hidden shadow-lg mb-20">
        <img
          src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Trusted healthcare professionals working in a hospital"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#d3d3d3]/20 to-[#d3d3d3]/10 flex flex-col justify-center items-start px-4 sm:px-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Health is a habit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white max-w-2xl drop-shadow-md"
          >
            At Health Solution, we are committed to providing you with the best healthcare experience possible.
          </motion.p>
        </div>
      </div>
      {/* animated stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-[#0288D1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
          >
            <p className="text-3xl font-bold text-[#0288D1]">
              <AnimatedCounter target={stat.value} duration={2} />
            </p>
            <p className="mt-2 text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Our Commitment section side note: can be edited later this is just a dummy data for now */}
      <div className="mb-24 bg-[#F5F6FA] w-full">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-[#2E2E2E] text-center mb-8">Our Commitment</h2>
          <div className="space-y-5 text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
            <p>
              Founded in 2020, HealthSolution Hospital has established itself as a leader in patient-centered care.
              Our state-of-the-art facility combines medical expertise with cutting-edge technology.
            </p>
            <p>
              We've developed our online booking system to provide patients with convenient access to our specialists,
              reducing wait times and improving the overall healthcare experience.
            </p>
            <p>
              Our team of 500+ medical professionals is dedicated to delivering the highest standard of care across all specialties.
            </p>
          </div>
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-[#0288D1] text-white hover:brightness-115 font-medium rounded-md transition-colors text-lg" whileTap={{ scale: 0.98 }}>
              Our Medical Departments →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <motion.div
        className="mb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold text-[#0288D1] text-center mb-12">What Our Doctors Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold text-[#0288D1]">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section where users are asked to book an appointment */}
      <motion.div
        className="bg-[#0288D1] rounded-xl p-12 text-center text-white mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Experience Exceptional Care?</h2>
          <p className="text-xl">
            Book your appointment with our specialists today through our seamless online system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <button className="px-8 py-3.5 bg-white text-[#0288D1] font-semibold rounded-md hover:bg-gray-100 transition-colors text-lg" onClick={() => navigateTo("/book-appointment")}>
              Book Appointment
            </button>
            <button onClick={() => navigateTo("/userContact")} className="px-8 py-3.5 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#0288D1] transition-colors text-lg">
              Contact Us
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserAbout;