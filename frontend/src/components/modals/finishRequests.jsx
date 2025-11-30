import React, { useState } from "react";
import { update_data } from "../../services/putMethod";
import { useAuth } from "../../contexts/UserContext";
import { X } from "lucide-react";

const FinishRequestModal = ({ onCancel, requestData, updatedData }) => {
  const { user } = useAuth();
  const [remarks, setRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const payload = {
        id: requestData?._id,
        email: requestData?.email,
        serviceType: requestData?.serviceType,
        status: "For Pick-Up",
        remarks,
        updatedBy: user?._id,
      };

      const response = await update_data(
        requestData.type === "Online-Requests"
          ? "/update-request"
          : "/update-walkin",
        payload
      );

      if (response) {
        updatedData((prev) => prev.filter((r) => r._id !== requestData._id));
        setIsLoading(false);
        onCancel(false);
      }
    } catch (err) {
      console.error("Failed to finish request:", err);
    } finally {
      setIsLoading(false);
      onCancel(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      {/* Main modal */}
      <form
        onSubmit={handleFinish}
        className="w-full max-w-3xl bg-white rounded-lg shadow-lg relative p-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => onCancel(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Finish Service Request
        </h2>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT COLUMN — CUSTOMER INFO */}
          <div className="space-y-3 text-sm">
            <p className="font-medium text-gray-700">Customer Information</p>

            <div>
              <span className="text-gray-500">Customer Name:</span>
              <p className="text-gray-800">{requestData?.customer || "N/A"}</p>
            </div>

            <div>
              <span className="text-gray-500">Address:</span>
              <p className="text-gray-800">{requestData?.address || "N/A"}</p>
            </div>

            <div>
              <span className="text-gray-500">Contact Number:</span>
              <p className="text-gray-800">
                {requestData?.contactNumber || "N/A"}
              </p>
            </div>

            <div>
              <span className="text-gray-500">Email:</span>
              <p className="text-gray-800">{requestData?.email || "N/A"}</p>
            </div>
          </div>

          {/* RIGHT COLUMN — REQUEST INFO */}
          <div className="space-y-3 text-sm">
            <p className="font-medium text-gray-700">Request Information</p>

            <div>
              <span className="text-gray-500">Category:</span>
              <p className="text-gray-800">
                {requestData?.serviceCategory || "N/A"}
              </p>
            </div>

            <div>
              <span className="text-gray-500">Brand & Model:</span>
              <p className="text-gray-800">
                {requestData?.deviceType || "N/A"} |{" "}
                {requestData?.model || "N/A"}
              </p>
            </div>

            <div>
              <span className="text-gray-500">Description / Remarks:</span>
              <p className="text-gray-800 whitespace-pre-wrap">
                {requestData?.remarks ||
                  requestData?.description ||
                  "No notes provided."}
              </p>
            </div>

            <div>
              <span className="text-gray-500">Date Requested:</span>
              <p className="text-gray-800">
                {requestData?.submittedAt?.split("T")[0] || "N/A"}
              </p>
            </div>

            <div className="flex gap-4">
              <div>
                <span className="text-gray-500">Down Payment:</span>
                <p className="text-gray-800">
                  {requestData?.downPayment
                    ? `₱${requestData.downPayment}`
                    : "N/A"}
                </p>
              </div>

              <div>
                <span className="text-gray-500">Service Price:</span>
                <p className="text-gray-800">
                  {requestData?.servicePrice
                    ? `₱${requestData.servicePrice}`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* REMARKS FIELD */}
        <div className="mt-6">
          <label className="block text-md mb-1 font-medium">Add Remarks</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={3}
            placeholder="Optional remarks about the completed service"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => onCancel(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            {isLoading ? "Submitting..." : "Finish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinishRequestModal;
