import React, { useState, useEffect, useContext } from 'react';
import { PathologistContext } from '../context/PathologistContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FiUpload, FiChevronDown, FiChevronUp, FiUser, FiCalendar, FiClock, FiPhone, FiMail } from 'react-icons/fi';
import { FaUserMd, FaFlask } from 'react-icons/fa';

const PendingLabRequests = () => {
  const [loading, setLoading] = useState(true);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const { pendingRequests, getPendingRequests } = useContext(PathologistContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

useEffect(() => {
    const fetchData = async () => {
        try {
            await getPendingRequests(); 
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
}, []);

  const toggleExpandRequest = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const filteredRequests = pendingRequests.filter(request => {
    const matchesSearch = request.userData?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.doctorData?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.labTests?.some(test => test.testType.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'pending' && request.labTests?.some(test => test.status === 'requested')) ||
                         (statusFilter === 'collected' && request.labTests?.some(test => test.status === 'sample_collected'));
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusMap = {
      requested: { color: 'bg-blue-100 text-blue-800', text: 'Pending' },
      sample_collected: { color: 'bg-yellow-100 text-yellow-800', text: 'Collected' },
      in_progress: { color: 'bg-purple-100 text-purple-800', text: 'In Progress' },
      completed: { color: 'bg-green-100 text-green-800', text: 'Completed' }
    };
    return statusMap[status] || { color: 'bg-gray-100 text-gray-800', text: 'Unknown' };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Lab Test Requests</h1>
            <p className="text-gray-600">Manage and process laboratory test requests</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {pendingRequests.reduce((acc, request) => acc + (request.labTests?.length || 0), 0)} tests pending
            </span>
          </div>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search patients, doctors or tests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="collected">Sample Collected</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={getPendingRequests}
              className="w-full bg-[#0288D1] hover:bg-[#0288D1]/90 text-white px-4 py-2 rounded-lg transition flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Requests Table */}
        {filteredRequests.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No lab requests found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tests</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <React.Fragment key={request._id}>
                    <tr 
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => toggleExpandRequest(request._id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <FiUser className="h-5 w-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {request.userData?.name || 'Patient'}
                              {request.userData?.age && (
                                <span className="ml-2 text-xs text-gray-500">({request.userData.age} yrs)</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <span className="capitalize">{request.userData?.gender}</span>
                              {request.userData?.phone && (
                                <span className="ml-2 flex items-center">
                                  <FiPhone className="mr-1" size={12} /> {request.userData.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {request.labTests?.length || 0} tests
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {request.labTests?.slice(0, 2).map((test, idx) => (
                              <span key={idx} className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700">
                                {test.testType}
                              </span>
                            ))}
                            {request.labTests?.length > 2 && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
                                +{request.labTests.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <FaUserMd className="h-4 w-4" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {request.doctorData?.name || 'Doctor'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {request.doctorData?.speciality || 'General'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <FiClock className="mr-1" size={12} />
                          {new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/pathologist/upload-report?appointmentId=${request._id}&patientId=${request.userData?._id}`}
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiUpload className="mr-1" /> Upload
                          </Link>
                          <button
                            className="text-gray-500 hover:text-gray-700 flex items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpandRequest(request._id);
                            }}
                          >
                            {expandedRequest === request._id ? (
                              <>
                                <FiChevronUp className="mr-1" /> Hide
                              </>
                            ) : (
                              <>
                                <FiChevronDown className="mr-1" /> Details
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded view for test details */}
                    {expandedRequest === request._id && (
                      <tr className="bg-gray-50">
                        <td colSpan="5" className="px-6 py-4">
                          <div className="pl-14 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Patient Information Card */}
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                <FiUser className="mr-2 text-blue-500" /> Patient Information
                              </h3>
                              <div className="space-y-2">
                                <div className="flex">
                                  <span className="w-32 text-sm font-medium text-gray-500">Full Name</span>
                                  <span className="text-sm text-gray-900">{request.userData?.name || 'N/A'}</span>
                                </div>
                                <div className="flex">
                                  <span className="w-32 text-sm font-medium text-gray-500">Age/Gender</span>
                                  <span className="text-sm text-gray-900">
                                    {request.userData?.age || 'N/A'} yrs, {request.userData?.gender || 'N/A'}
                                  </span>
                                </div>
                                <div className="flex">
                                  <span className="w-32 text-sm font-medium text-gray-500">Contact</span>
                                  <span className="text-sm text-gray-900 flex items-center">
                                    {request.userData?.phone ? (
                                      <>
                                        <FiPhone className="mr-1" size={14} /> {request.userData.phone}
                                      </>
                                    ) : (
                                      <>
                                        <FiMail className="mr-1" size={14} /> {request.userData?.email || 'N/A'}
                                      </>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Request Information Card */}
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                <FaUserMd className="mr-2 text-purple-500" /> Request Information
                              </h3>
                              <div className="space-y-2">
                                <div className="flex">
                                  <span className="w-32 text-sm font-medium text-gray-500">Requested By</span>
                                  <span className="text-sm text-gray-900">
                                    {request.doctorData?.name || 'N/A'} ({request.doctorData?.speciality || 'N/A'})
                                  </span>
                                </div>
                                <div className="flex">
                                  <span className="w-32 text-sm font-medium text-gray-500">Request Date</span>
                                  <span className="text-sm text-gray-900 flex items-center">
                                    <FiCalendar className="mr-1" size={14} />
                                    {new Date(request.createdAt).toLocaleDateString()}
                                    <FiClock className="ml-2 mr-1" size={14} />
                                    {new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Tests Information Card */}
                            <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                <FaFlask className="mr-2 text-green-500" /> Requested Tests
                              </h3>
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {request.labTests?.map((test, index) => {
                                      const status = getStatusBadge(test.status);
                                      return (
                                        <tr key={index}>
                                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {test.testType}
                                          </td>
                                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {test.testCode || '-'}
                                          </td>
                                          <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                                              {status.text}
                                            </span>
                                          </td>
                                          <td className="px-4 py-3 text-sm text-gray-500">
                                            {test.doctorNotes ? (
                                              <button
                                                onClick={() => toast.info(test.doctorNotes, { autoClose: false })}
                                                className="text-blue-600 hover:text-blue-800 flex items-center"
                                              >
                                                <FiInfo className="mr-1" size={14} /> View
                                              </button>
                                            ) : '-'}
                                          </td>
                                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                              to={`/pathologist/upload-report?appointmentId=${request._id}&testId=${test._id}`}
                                              className="text-blue-600 hover:text-blue-800 flex items-center justify-end"
                                            >
                                              <FiUpload className="mr-1" size={14} /> Upload
                                            </Link>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingLabRequests;