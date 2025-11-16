import React from "react";
import { X } from "lucide-react";

const ViewServiceRequestModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

  console.log(request)

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
        <div className="space-y-3 text-sm mb-2">

          <div>
            <span className="text-lg text-gray-600">Customer Name:</span>
            <p className="text-gray-800">
              {request.customer || "N/A"}
            </p>
          </div>

          <div>
            <span className="text-lg text-gray-600">Address:</span>
            <p className="text-gray-800">
              {request.address || "N/A"}
            </p>
          </div>

          <div>
            <span className="text-lg text-gray-600">Contact Number:</span>
            <p className="text-gray-800">
              {request.contactNumber || "N/A"}
            </p>
          </div>
        </div>

        <div className="w-full border-1 border-black/10 px-4 my-4" />
        
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-lg text-gray-600">Category:</span>
            <p className="text-gray-800">
              {request.serviceCategory || "N/A"}
            </p>
          </div>

          <div>
            <span className="text-lg text-gray-600">Brand & Model</span>
            <p className="text-gray-800">{request.deviceType || "N/A"}  |  {request.model || "N/A"}</p>
          </div>

          <div>
            <span className="text-lg text-gray-600">Completion Date</span>
            <p className="text-gray-800">{new Date(request.updatedAt).toISOString().split("T")[0]}</p>
          </div>

          <div>
            <span className="text-lg text-gray-600">{ request.remarks ? 'Remarks:' : 'Description' }</span>
            <p className="text-gray-800 whitespace-pre-wrap">
              {request.remarks || request.description || "No notes provided."}
            </p>
          </div>
        </div>

        <div className="w-full border-1 border-black/10 px-4 my-4" />

        <div className="w-full flex gap-2">
          <div className="w-1/2">
            <p>Down Payment: </p>
            <span>{request?.downPayment ? `₱${request?.downPayment}` : 'N/A'}</span>
          </div>

          <div className="w-1/2">
            <p>Price: </p>
            <span>{request?.servicePrice ? `₱${request?.servicePrice}` : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewServiceRequestModal;
