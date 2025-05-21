import React, { useState, useEffect } from "react";
import { FiEdit2, FiSave, FiPrinter } from "react-icons/fi";
import { toast } from "react-toastify";

const Prescription = ({ appointment, updatePrescription }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (appointment) {
      setContent(appointment.prescription || "");
    }
  }, [appointment]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updatePrescription(appointment._id, content);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving prescription:", error);
      toast.error("Failed to save prescription");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-prescription");
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Prescription</h2>
          <div className="flex space-x-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center bg-[#0288D1] text-white px-4 py-2 rounded-lg hover:bg-[#0289d1df] transition"
              >
                <FiSave className="mr-2" />
                {isLoading ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center bg-[#0288d1ff] rounded-lg hover:bg-[#0289d1df] transition text-white px-4 py-2"
              >
                <FiEdit2 className="mr-2" />
                Edit
              </button>
            )}
            <button
              onClick={handlePrint}
              className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <FiPrinter className="mr-2" />
              Print
            </button>
          </div>
        </div>

        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg min-h-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter prescription details..."
          />
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg">
            {content ? (
              <div className="whitespace-pre-wrap">{content}</div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                No prescription available
              </div>
            )}
          </div>
        )}

        {/* Print view (hidden on screen) */}
        <div id="print-prescription" className="hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Medical Prescription</h1>
              <div className="border-b-2 border-gray-400 w-24 mx-auto my-4"></div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold">Patient:</p>
                  <p>{appointment?.userData?.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Date:</p>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-b border-gray-300 py-4 my-4 whitespace-pre-wrap">
              {content}
            </div>
            
            <div className="mt-12">
              <div className="text-right">
                <div className="mb-4 border-t-2 border-gray-400 w-32 ml-auto pt-2">
                  <p className="font-semibold">{appointment?.doctorData?.name}</p>
                  <p className="text-sm">License No: XXXXXXXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;