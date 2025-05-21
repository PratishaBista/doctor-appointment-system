import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';


//* This component displays a list of doctor specialties with their descriptions and images.
//* When a specialty is clicked, it sets the selected specialty in the context and navigates to the selectedSpeciality page.
//* The specialties are hardcoded in an array and displayed in a responsive grid layout. later this page might have to be removed or replaced
const Department = () => {
  const doctorSpecialties = [
    {
      name: "Cardiology",
      description: "Specializes in the diagnosis and treatment of heart conditions, including heart attacks, arrhythmias, and other cardiovascular diseases.",
      img: "https://www.shutterstock.com/image-vector/heart-icon-flat-style-vector-600nw-2471170029.jpg"
    },
    {
      name: "Sleep Specialist",
      description: "Focuses on sleep disorders and offers treatment for conditions like insomnia, sleep apnea, and restless leg syndrome.",
      img: "https://c8.alamy.com/comp/2NKPG2Y/neurology-icon-monochrome-simple-sign-from-medical-speialist-collection-neurology-icon-for-logo-templates-web-design-and-infographics-2NKPG2Y.jpg"
    },
    {
      name: "Dietitian",
      description: "Helps individuals achieve a healthy lifestyle through proper diet, nutrition planning, and dietary counseling.",
      img: "https://cdn-icons-png.flaticon.com/512/9340/9340043.png"
    },
    {
      name: "Cardiologist",
      description: "Expert in diagnosing and treating heart conditions such as heart attacks, arrhythmias, and heart failure.",
      img: "https://t4.ftcdn.net/jpg/08/08/52/17/360_F_808521704_lMITsER2wtxrYFnPHkBMEgQLgTrUDJ3d.jpg"
    },
    {
      name: "Sports Psychologist",
      description: "Helps athletes manage stress, enhance performance, and overcome mental challenges related to sports.",
      img: "https://media.istockphoto.com/id/1359969290/vector/dermatology-examination-of-woman-skin-line-icon-checkup-of-girl-skin-face-with-magnifier.jpg?s=612x612&w=0&k=20&c=mcRQQB-1-_K_SLRfrj5mTtyoTiwU609hHTHMZp7XEmc="
    },
    {
      name: "General Surgeon",
      description: "Specializes in performing surgeries to treat a wide range of conditions, including laparoscopic surgery and trauma management.",
      img: "https://cdn-icons-png.flaticon.com/512/2885/2885196.png"
    },
    {
      name: "Travel Health Consultant",
      description: "Provides essential travel health advice, including vaccination recommendations and tips for staying healthy while traveling.",
      img: "https://cdn-icons-png.flaticon.com/512/12024/12024688.png"
    },
    {
      name: "Mindfulness Coach",
      description: "Teaches mindfulness techniques to reduce stress, improve mental health, and promote overall well-being.",
      img: "https://cdn-icons-png.flaticon.com/512/12106/12106213.png"
    },
    {
      name: "Physiotherapist",
      description: "Specializes in rehabilitation, injury prevention, and musculoskeletal conditions through physical therapy techniques.",
      img: "https://static.thenounproject.com/png/3982009-200.png"
    },
    {
      name: "Orthopedic",
      description: "Treats musculoskeletal disorders including fractures, joint replacements, and sports injuries.",
      img: "https://cdn-icons-png.flaticon.com/512/6669/6669512.png"
    },
    {
      name: "Dermatologist",
      description: "Diagnoses and treats skin conditions such as acne, eczema, and skin cancer.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUNRlFJ1MJHJsA0VmqjO0AHu9SDyPcJTq3A&s"
    },
    {
      name: "Couples Therapist",
      description: "Specializes in therapy for couples to help them resolve conflicts, improve communication, and enhance their relationship.",
      img: "https://cdn-icons-png.flaticon.com/512/4479/4479246.png"
    }
  ];

  const { selectedSpecialty, setSelectedSpecialty } = useContext(AppContext)
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#F5F6FA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Medical Specialties</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of medical specialties and find the right care for your needs
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctorSpecialties.map((specialty, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedSpecialty(specialty);
                navigate("/FindDoctors");
                window.scrollTo(0, 0);
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Specialty Image */}
              <div className="bg-[#0288d1] p-6 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-white p-4 flex items-center justify-center">
                  <img
                    className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                    src={specialty.img}
                    alt={specialty.name}
                  />
                </div>
              </div>

              {/* Specialty Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#0288d1] transition-colors">
                  {specialty.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {specialty.description}
                </p>
                <div className="flex items-center text-[#4CAF50] font-medium text-sm">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is here to help you find the right specialist for your needs.
          </p>
          <button
            onClick={() => navigate('/userContact')}
            className="bg-[#0288d1] hover:bg-[#0277bd] text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Department;
