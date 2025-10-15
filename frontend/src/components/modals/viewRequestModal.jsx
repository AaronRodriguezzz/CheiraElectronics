import React from "react";
import { X } from "lucide-react";

const ViewServiceRequestModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
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
            <span className="font-medium text-gray-600">Service:</span>
            <p className="text-gray-800">
              {request.serviceType?.name || "N/A"}
            </p>
          </div>

          <div>
            <span className="font-medium text-gray-600">Model:</span>
            <p className="text-gray-800">{request.model}</p>
          </div>

          <div>
            <span className="font-medium text-gray-600">Device Type:</span>
            <p className="text-gray-800">{request.deviceType}</p>
          </div>

          <div>
            <span className="font-medium text-gray-600">Description:</span>
            <p className="text-gray-800 whitespace-pre-wrap">
              {request.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewServiceRequestModal;
