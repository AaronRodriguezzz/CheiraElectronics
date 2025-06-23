// src/pages/SubmitRequest.jsx
import React, { useState } from "react";

export default function SubmitRequest() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Request submitted!");
  };

  return (
    <div className="min-h-screen pt-24 px-8 bg-orange-500 bg-[url('/electronics_Bg.png')] bg-cover bg-center">
      <h1 className="text-4xl font-semibold tracking-tighter text-gray-50 mb-6 text-center ">Submit a Service Request</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-100 p-6 rounded-lg shadow space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number or Email"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="service"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a Service</option>
          <option value="Washer Repair">Washer Repair</option>
          <option value="Fridge Repair">Fridge Repair</option>
          <option value="AC Maintenance">AC Maintenance</option>
        </select>
        <textarea
          name="message"
          placeholder="Describe the issue..."
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>

        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
