import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Zod Schema for form validation
const doctorSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  speciality: z.string().min(3, 'Speciality must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  email: z.string().email('Invalid email format'),
  degree: z.string().min(2, 'Degree must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  experience: z.string().nonempty('Experience is required'),
  fees: z.coerce.number().positive('Fees must be a positive number'),
  address1: z.string().min(5, 'Address Line 1 must be at least 5 characters'),
  address2: z.string().optional(),
  about: z.string().min(10, 'About section must be at least 10 characters'),
});

const AddDoctor = () => {
  const [file, setFile] = useState(null);
  
  // useForm hook with Zod validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(doctorSchema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('speciality', data.speciality);
    formData.append('password', data.password);
    formData.append('email', data.email);
    formData.append('degree', data.degree);
    formData.append('address', data.address);
    formData.append('experience', data.experience);
    formData.append('fees', data.fees);
    formData.append('about', data.about);
    if (file) formData.append('file', file);  // Append file if uploaded
    
    // Just logging the data for now
    console.log('Form Data:', data);
  };

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-[80vh] w-[70vw] p-8 bg-white shadow-lg rounded-lg overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-[#146A5D]">Add New </h2>

      {/* Upload Picture */}
      <div className="flex items-center mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border-2 border-[#146A5D] p-2 rounded-lg"
        />
        <p className="ml-4 text-[#146A5D]">Upload </p>
      </div>

      {/* Name */}
      <div className="flex flex-col mb-4">
        <label className="font-medium text-gray-700">Name</label>
        <input
          {...register('name')}
          placeholder="Enter Doctor's Name"
          className="border-2 border-[#146A5D] p-2 rounded-lg"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Speciality */}
      <div className="flex flex-col mb-4">
        <label className="font-medium text-gray-700">Speciality</label>
        <input
          {...register('speciality')}
          placeholder="Enter Doctor's Speciality"
          className="border-2 border-[#146A5D] p-2 rounded-lg"
        />
        {errors.speciality && <p className="text-red-500 text-sm">{errors.speciality.message}</p>}
      </div>

      {/* Password and Email */}
      <div className="flex space-x-4 mb-4">
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
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Set Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="Enter Email"
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
      </div>

      {/* Degree */}
      <div className="flex flex-col mb-4">
        <label className="font-medium text-gray-700">Degree</label>
        <input
          {...register('degree')}
          placeholder="Enter Degree"
          className="border-2 border-[#146A5D] p-2 rounded-lg"
        />
        {errors.degree && <p className="text-red-500 text-sm">{errors.degree.message}</p>}
      </div>

      {/* Experience and Fees */}
      <div className="flex space-x-4 mb-4">
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Experience</label>
          <select
            {...register('experience')}
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          >
            {[...Array(10).keys()].map(i => (
              <option key={i} value={i + 1}>
                {i + 1} Year{(i + 1) > 1 ? 's' : ''}
              </option>
            ))}
          </select>
          {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
        </div>
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-gray-700">Fees</label>
          <input
            {...register('fees')}
            type="number"
            placeholder="Enter Doctor's Fees"
            className="border-2 border-[#146A5D] p-2 rounded-lg"
          />
          {errors.fees && <p className="text-red-500 text-sm">{errors.fees.message}</p>}
        </div>
      </div>

      {/* About Doctor */}
      <div className="flex flex-col mb-4">
        <label className="font-medium text-gray-700">About Doctor</label>
        <textarea
          {...register('about')}
          rows="4"
          placeholder="Write about the Doctor"
          className="border-2 border-[#146A5D] p-2 rounded-lg"
        />
        {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button type="submit" className="bg-[#146A5D] text-white px-6 py-2 rounded-full hover:bg-[#0F5247] transition">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
