import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { useRef } from 'react';


// Validation schema
const doctorSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  speciality: z.string().min(3, 'Speciality must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  email: z.string().email('Invalid email format'),
  degree: z.string().min(2, 'Degree must be at least 2 characters'),
  address1: z.string().min(5, 'Address Line 1 must be at least 5 characters'),
  address2: z.string().optional(),
  experience: z.string().nonempty('Experience is required'),
  fees: z.coerce.number().positive('Fees must be a positive number'),
  about: z.string().min(10, 'About section must be at least 10 characters'),
});

const AddDoctor = () => {
  const { backendUrl, admin_token } = useContext(AdminContext);
  const [docImg, setDocImg] = useState(false);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(doctorSchema),
  });


  const handleFileChange = (e) => {
    setDocImg(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    if (!docImg) {
      return toast.error('Please upload a profile picture.');
    }

    try {
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', data.name);
      formData.append('speciality', data.speciality);
      formData.append('password', data.password);
      formData.append('email', data.email);
      formData.append('degree', data.degree);
      formData.append(
        'address',
        JSON.stringify({ line1: data.address1, line2: data.address2 || '' })
      );
      formData.append('experience', data.experience);
      formData.append('fees', data.fees);
      formData.append('about', data.about);

      //console log form data
      formData.forEach((value, key) => {
        console.log(`${key}`, `${value}`);
      });

      const response = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { admin_token }
      });

      if (response.data.success) {
        toast.success('Doctor added successfully!');
        reset({
          speciality: getValues('speciality'),
          experience: getValues('experience'),
        });
        setDocImg(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        toast.error(response.data.message || 'Failed to add doctor');
      }


    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while adding the doctor.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-[80vh] w-[70vw] p-8 bg-white shadow-lg rounded-lg overflow-y-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-[#146A5D]">Add New Doctor</h2>

      {/* Upload Picture */}
      <div className="flex items-center mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden" 
          ref={fileInputRef}
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="border-2 border-[#146A5D] p-2 rounded-lg ml-4 text-[#146A5D] cursor-pointer"
        >{docImg ? 'Replace Image' : 'Select Image'}

        </label>
      </div>

      {/* Image Display */}
      {docImg && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(docImg)} 
            alt="Doctor's profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-[#146A5D] mx-auto"
          />
        </div>
      )}


      {/* Name */}
      <div className="flex space-x-4 mb-4">
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Fullname</label>
          <input
            {...register('name')}
            placeholder="Enter Doctor's Fullname"
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Speciality</label>
          <input
            {...register('speciality')}
            placeholder="Enter Doctor's Speciality"
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          />
          {errors.speciality && <p className="text-red-500 text-sm">{errors.speciality.message}</p>}
        </div>
      </div>

      {/* Password and Email */}
      <div className="flex space-x-4 mb-4">
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Email</label>
          <input
            {...register('email')}
            placeholder="Enter Email"
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Set Password</label>
          <input
            {...register('password')}
            type="password"
            placeholder="Enter Password"
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

      </div>

      {/* Degree and Experience */}
      <div className="flex space-x-4 mb-4">
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Degree</label>
          <input
            {...register('degree')}
            placeholder="Enter Degree"
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          />
          {errors.degree && <p className="text-red-500 text-sm">{errors.degree.message}</p>}
        </div>

        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Experience</label>
          <input
            {...register('experience')}
            placeholder="Enter Experience"
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          />
          {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="flex space-x-4 mb-4">
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Address Line 1</label>
          <input
            {...register('address1')}
            placeholder="Enter Address Line 1"
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          />
          {errors.address1 && <p className="text-red-500 text-sm">{errors.address1.message}</p>}
        </div>

        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Address Line 2 (Optional)</label>
          <input
            {...register('address2')}
            placeholder="Enter Address Line 2"
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          />
        </div>
      </div>

      {/* Fees and About */}
      <div className="flex space-x-4 mb-4">
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Fees</label>
          <input
            {...register('fees')}
            type="number"
            placeholder="Enter Fees"
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          />
          {errors.fees && <p className="text-red-500 text-sm">{errors.fees.message}</p>}
        </div>

        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">About</label>
          <textarea
            {...register('about')}
            placeholder="Describe the doctor"
            className="border-2 border-[#146A5D] p-2 rounded-lg h-24 resize-none"
          />
          {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#146A5D] text-white py-2 px-6 rounded-lg hover:bg-[#0f4e44] transition duration-300"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctor;
