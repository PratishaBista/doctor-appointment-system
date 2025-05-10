import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';

const pathologistSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  labName: z.string().min(3, 'Lab name must be at least 3 characters'),
  address1: z.string().min(5, 'Address Line 1 must be at least 5 characters'),
  address2: z.string().optional(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

const AddPathologist = () => {
  const { backendUrl, admin_token } = useContext(AdminContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(pathologistSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${backendUrl}/api/admin/add-pathologist`, {
        name: data.name,
        email: data.email,
        labName: data.labName,
        address: {
          line1: data.address1,
          line2: data.address2 || '',
        },
        phone: data.phone,
      }, {
        headers: { admin_token }
      });

      if (response.data.success) {
        toast.success('Pathologist added successfully!');
        reset();
      } else {
        toast.error(response.data.message || 'Failed to add pathologist');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong while adding the pathologist.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#0288D1] px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Add New Pathologist</h2>
            <p className="text-blue-100">Fill in the details below to register a new pathology lab specialist</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="pathologist@lab.com"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.email ? 'border-red-300' : 'border'}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    {...register('phone')}
                    id="phone"
                    type="tel"
                    placeholder="+977 98XXXXXXXX"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.phone ? 'border-red-300' : 'border'}`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Lab Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Laboratory Information</h3>
              <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="labName" className="block text-sm font-medium text-gray-700">
                    Laboratory Name *
                  </label>
                  <input
                    {...register('labName')}
                    id="labName"
                    placeholder="Advanced Pathology Labs"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0288D1] focus:ring-[#0288D1] sm:text-sm ${errors.labName ? 'border-red-300' : 'border'}`}
                  />
                  {errors.labName && <p className="mt-1 text-sm text-red-600">{errors.labName.message}</p>}
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

            {/* Information Note */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Note</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>A temporary password will be automatically generated and emailed to the pathologist.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end pt-6">
              <button
                type="button"
                onClick={() => reset()}
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
                ) : 'Add Pathologist'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPathologist;