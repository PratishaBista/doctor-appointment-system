import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const LabReports = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabReports = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/lab-reports`, {
          headers: { token }
        });

        if (data.success) {
          setReports(data.reports);
        } else {
          toast.error(data.message || "Failed to fetch lab reports");
        }
      } catch (error) {
        console.error("Error fetching lab reports:", error);
        toast.error("Failed to load lab reports");
      } finally {
        setLoading(false);
      }
    };

    fetchLabReports();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Lab Reports</h1>

      {reports.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No lab reports available
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{report.reportName}</h2>
                  <p className="text-gray-600">{report.testType}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Uploaded: {new Date(report.uploadDate).toLocaleDateString()}
                  </p>
                  {report.notes && (
                    <p className="text-gray-700 mt-2">{report.notes}</p>
                  )}
                </div>
                <a
                  href={report.reportFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View Report
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabReports;