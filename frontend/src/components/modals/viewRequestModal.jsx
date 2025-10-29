import React from "react";
import { X } from "lucide-react";

const ViewServiceRequestModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        {/* Exit Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-green-500 mb-4">
          Service Request Details
        </h2>

        {/* Content */}
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-lg text-gray-600">Category:</span>
            <p className="text-gray-800">
              {request.serviceCategory || "N/A"}
            </p>
          </div>

          <div>
            <span className="text-lg text-gray-600">Model:</span>
            <p className="text-gray-800">
              {request.model || "N/A"}
            </p>
          </div>

          <div>
            <span className="text-lg text-gray-600">Device Type:</span>
            <p className="text-gray-800">{request.deviceType}</p>
          </div>

          <div>
            <span className="text-lg text-gray-600">Description:</span>
            <p className="text-gray-800 whitespace-pre-wrap">
              {request.remarks || "No remarks provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewServiceRequestModal;
