import React, { useState, useEffect, useRef } from "react";
import { FiEdit2, FiSave, FiPrinter, FiBold, FiItalic, FiList } from "react-icons/fi";
import { toast } from "react-toastify";

const Prescription = ({ appointment, updatePrescription }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (appointment) {
      setContent(appointment.prescription || "");
    }
  }, [appointment]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const prescription = editorRef.current.innerHTML;
      await updatePrescription(appointment._id, prescription);
      setIsEditing(false);
      // toast.success("Prescription saved successfully");
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

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
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
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FiSave className="mr-2" />
                {isLoading ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center bg-[#0288d1ff] rounded-lg  hover:bg-[#0289d1df] transition text-white px-4 py-2"
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
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-2 border-b border-gray-300 flex space-x-2">
              <button
                onClick={() => formatText('bold')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Bold"
              >
                <FiBold />
              </button>
              <button
                onClick={() => formatText('italic')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Italic"
              >
                <FiItalic />
              </button>
              <button
                onClick={() => formatText('insertUnorderedList')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Bullet List"
              >
                <FiList />
              </button>
            </div>
            <div
              ref={editorRef}
              className="w-full p-4 min-h-[300px] focus:outline-none"
              contentEditable
              dangerouslySetInnerHTML={{ __html: content }}
              onInput={(e) => setContent(e.target.innerHTML)}
              placeholder="Enter prescription details..."
            />
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg">
            {content ? (
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
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
            
            <div className="border-t border-b border-gray-300 py-4 my-4">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            
            <div className="mt-12">
              <div className="text-right">
                <div className="mb-4 border-t-2 border-gray-400 w-32 ml-auto pt-2">
                  <p className="font-semibold">Dr. {appointment?.doctorData?.name}</p>
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