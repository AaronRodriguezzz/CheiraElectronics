import React, { useEffect, useState } from "react";
import {
  Wrench,
  MessageSquareText,
  Layers,
  Laptop,
  Truck,
  ClipboardList,
  Cpu,
  Settings,
} from "lucide-react";
import { post_data } from "../../services/PostMethod";
import { motion } from "framer-motion";
import { serviceCategories } from "../../data/ServiceCategory";
import { deviceBrands } from "../../data/DeviceBrands";
import { usePageProtection, useUser } from "../../hooks/protectHooks";
import { useLocation } from "react-router-dom";

export default function SubmitRequest() {
  usePageProtection();

  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || "";
  const user = useUser();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceCategory: selectedCategory,
    deviceType: "",
    description: "",
    serviceType: "",
    model: "",
  });

  // ✅ Auto-update the form when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      setFormData((prev) => ({ ...prev, serviceCategory: selectedCategory }));
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalForm = { customerId: user?._id, ...formData };

    try {
      setLoading(true)
      const response = await post_data("/new-request", finalForm);
      if (response) {
        setFormData({
          serviceCategory: "",
          description: "",
          deviceType: "",
          serviceType: "",
          model: "",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen pt-30 px-4 sm:px-8 bg-black relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <h1 className="text-2xl md:text-4xl font-extrabold mb-8 text-center drop-shadow-lg text-orange-500">
          Submit a Service Request
        </h1>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="rounded-2xl shadow-xl p-8 space-y-6 bg-gradient-to-r from-black/80 to-black/90 text-white shadow-orange-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Service Category */}
          <div className="relative">
            <Settings className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                  value={category.name}
                  className="bg-black text-white hover:bg-gray-900"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Device Type */}
          <div className="relative">
            <Cpu className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              name="deviceType"
              onChange={handleChange}
              value={formData.deviceType}
              disabled={!formData.serviceCategory}
              required
              className="w-full pl-10 pr-4 py-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                        transition disabled:opacity-60 appearance-none"
            >
              <option value="" className="bg-black text-white" disabled>
                Select a Device Brand
              </option>
              {formData.serviceCategory &&
                deviceBrands[formData.serviceCategory]?.map((brand, index) => (
                  <option key={index} value={brand} className="bg-black text-white">
                    {brand}
                  </option>
                ))}
            </select>
          </div>

          {/* Service Type */}
          <div className="relative">
            <Truck className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              name="serviceType"
              onChange={handleChange}
              value={formData.serviceType}
              required
              className="w-full pl-10 pr-4 py-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                        transition"
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

          {/* Device Model */}
          <div className="relative">
            <Laptop className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              name="model"
              type="text"
              placeholder="Device Model (N/A if unknown)"
              required
              value={formData.model}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                        transition"
            />
          </div>

          {/* Description */}
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
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-black text-white"
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:bg-orange-500/70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ClipboardList size={18} />
            Submit Request
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
