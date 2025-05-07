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
  password: z.string().min(8, 'Password must be at least 6 characters'),
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (e.target.files[0]) {
      setDocImg(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const onSubmit = async (data) => {
    if (!docImg) {
      return toast.error('Please upload a profile picture.');
    }

    setIsSubmitting(true);

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
      toast.error(error.response?.data?.message || 'Something went wrong while adding the doctor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#0288D1] px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Add New Doctor</h2>
            <p className="text-blue-100">Fill in the details below to register a new doctor</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6">
              <div
                onClick={triggerFileInput}
                className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-4 border-white shadow-md hover:border-[#0288D1] transition-all duration-300"
              >
                {docImg ? (
                  <img
                    src={URL.createObjectURL(docImg)}
                    alt="Doctor's profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span className="text-xs text-gray-500 mt-2 block">Click to upload</span>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                  id="file-input"
                  accept="image/*"
                />
              </div>
              <button
                type="button"
                onClick={triggerFileInput}
                className="mt-4 text-sm text-[#0288D1] hover:text-[#0277BD] font-medium"
              >
                {docImg ? 'Change Photo' : 'Upload Photo'}
              </button>
              {!docImg && (
                <p className="mt-1 text-xs text-red-500">Profile picture is required</p>
              )}
            </div>

            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    {...register('name')}
                    id="name"
                    placeholder="Dr. Pratisha Bista"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.name ? 'border-red-300' : 'border'}`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">
                    Speciality *
                  </label>
                  <input
                    {...register('speciality')}
                    id="speciality"
                    placeholder="Cardiology, Neurology, etc."
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.speciality ? 'border-red-300' : 'border'}`}
                  />
                  {errors.speciality && <p className="mt-1 text-sm text-red-600">{errors.speciality.message}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="doctor@example.com"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.email ? 'border-red-300' : 'border'}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <input
                    {...register('password')}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.password ? 'border-red-300' : 'border'}`}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                    Degree *
                  </label>
                  <input
                    {...register('degree')}
                    id="degree"
                    placeholder="MD, MBBS, PhD, etc."
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.degree ? 'border-red-300' : 'border'}`}
                  />
                  {errors.degree && <p className="mt-1 text-sm text-red-600">{errors.degree.message}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Experience *
                  </label>
                  <input
                    {...register('experience')}
                    id="experience"
                    placeholder="5 years, 10+ years, etc."
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.experience ? 'border-red-300' : 'border'}`}
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="fees" className="block text-sm font-medium text-gray-700">
                    Consultation Fees (₹) *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      {...register('fees')}
                      id="fees"
                      type="number"
                      placeholder="500"
                      className={`block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.fees ? 'border-red-300' : 'border'}`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">.00</span>
                    </div>
                  </div>
                  {errors.fees && <p className="mt-1 text-sm text-red-600">{errors.fees.message}</p>}
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
              <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="address1" className="block text-sm font-medium text-gray-700">
                    Address Line 1 *
                  </label>
                  <input
                    {...register('address1')}
                    id="address1"
                    placeholder="Street address, P.O. box, company name"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.address1 ? 'border-red-300' : 'border'}`}
                  />
                  {errors.address1 && <p className="mt-1 text-sm text-red-600">{errors.address1.message}</p>}
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="address2" className="block text-sm font-medium text-gray-700">
                    Address Line 2
                  </label>
                  <input
                    {...register('address2')}
                    id="address2"
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm border"
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">About the Doctor</h3>
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Professional Bio *
                </label>
                <textarea
                  {...register('about')}
                  id="about"
                  rows={4}
                  placeholder="Brief description of the doctor's qualifications, expertise, and approach..."
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.about ? 'border-red-300' : 'border'}`}
                />
                {errors.about && <p className="mt-1 text-sm text-red-600">{errors.about.message}</p>}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end pt-6">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setDocImg(false);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="mr-4 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0288D1]"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0288D1] hover:bg-[#0277BD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0288D1] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : 'Add Doctor'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;