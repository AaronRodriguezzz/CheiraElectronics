// src/pages/SubmitRequest.jsx
import React, { useEffect, useState } from "react";
import { Wrench, MessageSquareText } from "lucide-react";
import { post_data } from "../../services/PostMethod";
import { get_data } from "../../services/getMethod";
import { motion } from "framer-motion";
import { serviceCategories } from "../../data/ServiceCategory";
import { deviceBrands } from '../../data/DeviceBrands';
import { usePageProtection } from "../../hooks/protectHooks";
import { useUser } from "../../hooks/protectHooks";

export default function SubmitRequest() {

  usePageProtection();
  
  const user = useUser();
  const [formData, setFormData] = useState({
    serviceCategory: "",
    deviceType: "",
    description: "",
    serviceType: "",
    model: "",
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
          serviceCategory: "",
          description: "",
          deviceType: "",
          serviceType: ""
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <h1 className="text-2xl md:text-4xl font-extrabold mb-8 text-center drop-shadow-lg text-orange-500">
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
              name="serviceCategory"
              onChange={handleChange}
              value={formData.serviceCategory}
              required
              className="w-full pl-10 pr-4 py-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                        transition appearance-none"
            >
              <option value="" disabled className="bg-black text-white">
                Select Service Category
              </option>
              {serviceCategories.map((category, index) => (
                <option
                  key={index}
                  value={category}
                  className="bg-black text-white hover:bg-gray-900"
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <Wrench className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              name="deviceType"
              onChange={handleChange}
              value={formData.deviceType}
              disabled={formData.serviceCategory === ''}
              className="w-full pl-10 pr-4 py-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                        transition disabled:opacity-60 appearance-none"
              required
            >
              <option value="" className="bg-black text-white" disabled>
                Select a Device Type
              </option>
              {formData.serviceCategory &&
                deviceBrands[formData.serviceCategory].map((brand, index) => (
                  <option key={index} value={brand} className="bg-black text-white">
                    {brand}
                  </option>
                ))}
            </select>
          </div>

          <div className="relative">
            <Wrench className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              name="serviceType"
              onChange={handleChange}
              value={formData.serviceType}
              className="w-full pl-10 pr-4 py-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                        transition"
              required
            >
              <option value="" className="bg-black text-white" disabled>
                Select Service Type
              </option>
              <option value="HOME SERVICE" className="bg-black text-white">
                HOME SERVICE
              </option>
              <option value="DEVICE DROPOFF" className="bg-black text-white">
                DEVICE DROPOFF
              </option>
            </select>
          </div>
          
          <input 
            name="model"
            type="text"  
            placeholder="Device Model (N/A if unknown)"
            value={formData.model}
            handleChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                        transition" 
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
            disabled={formData.category === '' || !formData.deviceType === '' || !formData.description === ''}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:bg-orange-500/70 disabled:cursor-not-allowed"
          >
            Submit Request
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
