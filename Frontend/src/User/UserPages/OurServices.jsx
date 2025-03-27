import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import UserAllDoctors from './UserAllDoctors';

  const OurServices = () => {
   const doctorSpecialties = [
    {
      name: "Cardiology",
      description: "Specializes in the diagnosis and treatment of heart conditions, including heart attacks, arrhythmias, and other cardiovascular diseases.",
      img: "https://www.shutterstock.com/image-vector/heart-icon-flat-style-vector-600nw-2471170029.jpg"
    },
    {
      name: "Neurology",
      description: "Focuses on the nervous system, including the brain, spinal cord, and peripheral nerves, treating disorders like epilepsy, Alzheimer's, and Parkinson's disease.",
      img: "https://c8.alamy.com/comp/2NKPG2Y/neurology-icon-monochrome-simple-sign-from-medical-speialist-collection-neurology-icon-for-logo-templates-web-design-and-infographics-2NKPG2Y.jpg"
    },
    {
      name: "Orthopedics",
      description: "Deals with the treatment of bones, joints, ligaments, tendons, and muscles, including fractures, arthritis, and sports injuries.",
      img: "https://cdn-icons-png.flaticon.com/512/9340/9340043.png"
    },
    {
      name: "Pediatrics",
      description: "Specializes in the care of children from infancy through adolescence, focusing on growth, development, and childhood diseases.",
      img: "https://t4.ftcdn.net/jpg/08/08/52/17/360_F_808521704_lMITsER2wtxrYFnPHkBMEgQLgTrUDJ3d.jpg"
    },
    {
      name: "Dermatology",
      description: "Focuses on the diagnosis and treatment of skin, hair, and nail conditions, such as acne, eczema, and skin cancer.",
      img: "https://media.istockphoto.com/id/1359969290/vector/dermatology-examination-of-woman-skin-line-icon-checkup-of-girl-skin-face-with-magnifier.jpg?s=612x612&w=0&k=20&c=mcRQQB-1-_K_SLRfrj5mTtyoTiwU609hHTHMZp7XEmc="
    },
    {
      name: "Oncology",
      description: "Specializes in the diagnosis and treatment of cancer, using surgery, chemotherapy, radiation, and other therapies to treat different types of cancer.",
      img: "https://cdn-icons-png.flaticon.com/512/2885/2885196.png"
    },
    {
      name: "Psychiatry",
      description: "Focuses on the diagnosis, treatment, and prevention of mental health disorders such as depression, anxiety, schizophrenia, and bipolar disorder.",
      img:"https://cdn-icons-png.flaticon.com/512/12024/12024688.png"
    },
    {
      name: "Gastroenterology",
      description: "Specializes in the digestive system, treating conditions like irritable bowel syndrome (IBS), ulcers, liver disease, and colorectal cancer.",
      img:"https://cdn-icons-png.flaticon.com/512/12106/12106213.png"
    },
    {
      name: "Obstetrics and Gynecology",
      description: "Focuses on women's health, including pregnancy, childbirth, reproductive health, and the diagnosis and treatment of gynecological conditions.",
      img: "https://static.thenounproject.com/png/3982009-200.png"
    },
    {
      name: "Endocrinology",
      description: "Specializes in hormone-related diseases and disorders, including diabetes, thyroid diseases, and hormonal imbalances.",
      img: "https://cdn-icons-png.flaticon.com/512/6669/6669512.png"
    },
    {
      name: "Ophthalmology",
      description: "Focuses on the diagnosis and treatment of eye conditions, including vision problems, cataracts, glaucoma, and retinal diseases.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUNRlFJ1MJHJsA0VmqjO0AHu9SDyPcJTq3A&s"
    },
    {
      name: "Pulmonology",
      description: "Specializes in the diagnosis and treatment of lung diseases, including asthma, pneumonia, chronic obstructive pulmonary disease (COPD), and sleep apnea.",
      img: "https://cdn-icons-png.flaticon.com/512/4006/4006267.png"
    }
  ];
const {selectedSpecialty,setSelectedSpecialty}=useContext(AppContext)
console.log(selectedSpecialty)
const navigate =useNavigate()
  return (
    <div className="p-6 mt-8">
      <h1 className="text-3xl font-bold underline mb-6 text-center">Our Services</h1>

      <div className="flex flex-wrap gap-6 justify-center ">
        {doctorSpecialties.map((specialty, index) => (
          <div
          onClick={()=>{setSelectedSpecialty(specialty)
              navigate("/selectedSpeciality")
              scrollTo(0,0)
          }}
            key={index}
            className="transform hover:scale-105 transition duration-500 ease-in-out bg-white shadow-lg rounded-lg p-4 w-1/3 sm:w-1/4 md:w-1/6 hover:shadow-2xl"
          >
            <div className="flex justify-center mb-4 m-2">
              <img
                className="rounded-lg w-32 h-32 object-cover"
                src={specialty.img}
                alt={specialty.name}
              />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">{specialty.name}</h2>
            <p className="text-gray-600 text-sm text-center">{specialty.description}</p>
          </div>
        ))}
      </div>
      <UserAllDoctors/>
    </div>
  );
}

export default OurServices;
