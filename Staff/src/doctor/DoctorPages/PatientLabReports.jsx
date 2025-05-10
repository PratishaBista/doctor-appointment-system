import React, { useState, useEffect } from "react";
import { FiFileText, FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";

const PatientLabReports = ({ patientId, getPatientLabReports }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const reports = await getPatientLabReports(patientId);
        setReports(reports);
      } catch (error) {
        toast.error("Failed to load lab reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [patientId, getPatientLabReports]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Patient Lab Reports</h2>
        
        {reports.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No lab reports available for this patient
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{report.reportName}</h3>
                    <p className="text-sm text-gray-600">{report.testType}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Uploaded: {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                    {report.notes && (
                      <p className="text-sm text-gray-700 mt-1">{report.notes}</p>
                    )}
                  </div>
                  <a
                    href={report.reportFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[#0288d1ff] hover:text-blue-800"
                  >
                    <FiDownload className="mr-1" /> View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
    </div>
  );
};

export default PatientLabReports;