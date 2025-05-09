import React, { useState, useEffect, useContext } from 'react';
import { PathologistContext } from '../context/PathologistContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const PendingLabRequests = () => {
  const [loading, setLoading] = useState(true);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const { pendingRequests, getPendingRequests } = useContext(PathologistContext);

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
  }, [getPendingRequests]);

  const toggleExpandRequest = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0288D1]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Pending Lab Requests</h2>
        <div className="text-sm text-gray-500">
          {pendingRequests.reduce((acc, request) => acc + (request.labTests?.length || 0), 0)} tests pending
        </div>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No pending lab requests found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tests Requested</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingRequests.map((request) => (
                  <React.Fragment key={request._id}>
                    <tr 
                      className="hover:bg-gray-50 cursor-pointer" 
                      onClick={() => toggleExpandRequest(request._id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#0288D1]/10 flex items-center justify-center text-[#0288D1] font-medium">
                            {request.userData?.name?.charAt(0) || 'P'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {request.userData?.name || 'Patient'}
                              {request.userData?.age && (
                                <span className="ml-2 text-gray-500 text-xs">({request.userData.age} yrs)</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {request.userData?.gender || ''} {request.userData?.gender && request.userData?.age ? '•' : ''} {request.userData?.email || ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {request.labTests?.length || 0} tests
                        </div>
                        <div className="text-xs text-gray-500">
                          {request.labTests?.[0]?.testType || 'No test specified'}
                          {request.labTests?.length > 1 ? ` +${request.labTests.length - 1} more` : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                        <div className="text-xs text-gray-400">
                          {new Date(request.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-4">
                          <Link
                            to={`/pathologist/upload-report?appointmentId=${request._id}&patientId=${request.userData?._id}`}
                            className="text-[#0288D1] hover:text-[#0277BD]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Upload All
                          </Link>
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpandRequest(request._id);
                            }}
                          >
                            {expandedRequest === request._id ? 'Hide' : 'Details'}
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded view for test details */}
                    {expandedRequest === request._id && (
                      <tr className="bg-gray-50">
                        <td colSpan="4" className="px-6 py-4">
                          <div className="pl-14">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Test Details</h4>
                            <div className="grid gap-4">
                              {request.labTests?.length > 0 ? (
                                request.labTests.map((test, index) => (
                                  <div key={index} className="bg-white p-3 rounded-md shadow-xs border border-gray-200">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="text-sm font-medium text-gray-800">
                                          {test.testType || 'General Test'}
                                          {test.testCode && (
                                            <span className="ml-2 text-xs text-gray-500">({test.testCode})</span>
                                          )}
                                        </p>
                                        {test.doctorNotes && (
                                          <p className="text-xs text-gray-600 mt-1">
                                            <span className="font-medium">Doctor's note:</span> {test.doctorNotes}
                                          </p>
                                        )}
                                      </div>
                                      <Link
                                        to={`/pathologist/upload-report?appointmentId=${request._id}&testId=${test._id}`}
                                        className="text-sm text-[#0288D1] hover:text-[#0277BD] whitespace-nowrap"
                                      >
                                        Upload This Test
                                      </Link>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500">No test details available</p>
                              )}
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
        </div>
      )}
    </div>
  );
};

export default PendingLabRequests;