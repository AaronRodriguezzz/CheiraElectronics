// src/pages/SubmitRequest.jsx
import React, { useEffect, useState } from "react";
import { Wrench, MessageSquareText } from "lucide-react";
import { post_data } from "../../services/postMethod";
import { get_data } from "../../services/getMethod";
import { motion } from "framer-motion";

export default function SubmitRequest() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [services, setServices] = useState(null);
  const [formData, setFormData] = useState({
    serviceType: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalForm = { customerId: user?._id, ...formData };

    try {
      const response = await post_data("/new-request", finalForm);
      if (response) {
        setFormData({
          serviceType: "",
          description: "",
        });
        alert("✅ Request submitted successfully!");
      }
    } catch (err) {
      console.log(err);
      alert("❌ Something went wrong, please try again.");
    }
  };

  useEffect(() => {
    const getServices = async () => {
      const services = await get_data("/services");
      if (services) {
        setServices(services);
      }
    };
    getServices();
  }, []);

  if (!services) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-950">
        <p className="text-lg font-semibold text-gray-200 animate-pulse">
          Loading services...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 bg-black relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg text-orange-500">
          <Wrench className="inline w-8 h-8 mr-2 mb-1 text-orange-500" />
          Submit a Service Request
        </h1>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="rounded-2xl shadow-xl p-8 space-y-6 bg-gradient-to-r from-black/80 to-black/90 text-white shadow-orange-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Service Dropdown */}
          <div className="relative">
            <Wrench className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              name="serviceType"
              onChange={handleChange}
              value={formData.serviceType}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            >
              <option value="" disabled>
                Select a Service
              </option>
              {services.map(
                (service) =>
                  service.isActive && (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  )
              )}
              <option value="N/A">Not in the option</option>
            </select>
          </div>

          <input type="text"  
                 placeholder="Model/Brand"
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
          <input type="text"  
                 placeholder="Device Type"
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />


          {/* Message Field */}
          <div className="relative">
            <MessageSquareText className="absolute top-4 left-3 text-gray-400 w-5 h-5" />
            <textarea
              name="description"
              value={formData.description}
              placeholder="Describe the issue..."
              onChange={handleChange}
              required
              rows="6"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Submit Request
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
