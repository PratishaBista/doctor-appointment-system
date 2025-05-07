import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);


  const services = [
    {
      title: "Travel Health Consultant",
      description: "Planning a trip? Get vaccinations and travel health advice",
      image: "/images/travel-health-specialist.webp",
      link: "/department",
    },
    {
      title: "Couples Therapist",
      description: "Strengthen your relationship with expert guidance and support",
      image: "/images/CoupleTherapist.jpg",
      link: "/department",
    },
    {
      title: "Sports Psychologist",
      description: "Boost your mental game with expert sports psychology",
      image: "/images/sports-psychologist.jpg",
      link: "/department",
    },
    {
      title: "Laughter Therapist",
      description: "De-stress with sessions focused on the healing power of laughter",
      image: "/images/Laughter-therapist.webp",
      link: "/department",
    },
    {
      title: "Mindfulness Coach",
      description: "Learn techniques to stay present, calm, and focused",
      image: "/images/mindfulness-coach.webp",
      link: "/department",
    },
    {
      title: "Career Counselor",
      description: "Feeling stuck? Get expert advice to navigate your career path",
      image: "/images/career-counselor.webp",
      link: "/department",
    },
    {
      title: "Sleep Specialist",
      description: "Trouble sleeping? Discover treatments for better rest and recovery",
      image: "/images/sleep-specialist.avif",
      link: "/department",
    },
    {
      title: "Gynecologist/Obstetrician",
      description: "Explore for women's health, pregnancy and infertility treatments",
      image: "/images/gynecologist.webp",
      link: "/department",
    },
    {
      title: "Dietitian/Nutrition",
      description: "Get guidance on eating right, weight management and sports nutrition",
      image: "/images/nutritionist.webp",
      link: "/department",
    },
    {
      title: "Physiotherapist",
      description: "Pulled a muscle? Get it treated by a trained physiotherapist",
      image: "/images/physiotherapist.webp",
      link: "/department",
    },
    {
      title: "General Surgeon",
      description: "Need to get operated? Find the right surgeon",
      image: "/images/general-surgeon.webp",
      link: "/department",
    },
    {
      title: "Cardiologist",
      description: "Heart issues? Consult a specialist for cardiac care",
      image: "/images/cardiologist.webp",
      link: "/department",
    },
    {
      title: "Dermatologist",
      description: "Skin concerns? Get expert advice and treatment",
      image: "/images/dermatologist.webp",
      link: "/department",
    },
    {
      title: "Orthopedic",
      description: "Bone and joint care from trusted specialists",
      image: "/images/orthopedic.webp",
      link: "/department",
    },
  ];


  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      setAutoScrollEnabled(false);
      const cardWidth = scrollRef.current.clientWidth / 4;
      const scrollAmount = cardWidth;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      setTimeout(() => setAutoScrollEnabled(true), 10000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoScrollEnabled && scrollRef.current && showRightArrow) {
        const cardWidth = scrollRef.current.clientWidth / 4;
        scrollRef.current.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [autoScrollEnabled, showRightArrow]);

  useEffect(() => {
    const currentRef = scrollRef.current;
    currentRef?.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);
    checkScrollPosition();

    return () => {
      currentRef?.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  return (
    <div className="relative py-16 px-4 md:px-8 lg:px-16 w-full max-w-[1800px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
          Book an appointment for an in-clinic consultation
        </h2>
        <p className="text-gray-600 text-lg">
          Find experienced doctors across all specialties
        </p>
      </div>

      <div className="relative px-10">
        {showLeftArrow && (
          <motion.button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all border border-gray-200"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            aria-label="Scroll Left"
          >
            <ArrowLeft size={28} className="text-[#0288D1]" />
          </motion.button>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide pb-8 gap-6 snap-x snap-mandatory"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="w-[calc(25%-18px)] min-w-[calc(25%-18px)] flex-shrink-0 snap-start"
            >
              <motion.div
                className=" rounded-xl overflow-hidden transition-all duration-300 cursor-pointer h-full flex flex-col"
                onClick={() => navigate(service.link)}
              >

                <div
                  className="relative h-52 w-full overflow-hidden"
                  onMouseEnter={() => setHoveredCardIndex(index)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                >
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  <h3
                    className={`font-bold text-xl mb-2 transition-colors duration-300 ${hoveredCardIndex === index ? 'text-[#0288D1]' : 'text-gray-800'
                      }`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {
          showRightArrow && (
            <motion.button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all border border-gray-200"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              aria-label="Scroll Right"
            >
              <ArrowRight size={28} className="text-[#0288D1]" />
            </motion.button>
          )
        }
      </div >
    </div >
  );
};

export default Services;