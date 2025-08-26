// src/pages/SubmitRequest.jsx
import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  Wrench,
  MessageSquareText,
} from "lucide-react";
import { post_data } from '../../services/postMethod';
import { get_data } from '../../services/getMethod';

export default function SubmitRequest() {
  const user = JSON.parse(localStorage.getItem('user'));
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

    console.log('hello')

    const finalForm = { customerId: user?._id, ...formData };

    try{
      const response = await post_data('/new-request', finalForm);

      if(response) {
        console.log('hello')
        setFormData({ 
          serviceType: "",
          description: ""
        })
      }
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    const getServices = async () => {
      const services = await get_data('/services');

      console.log(services);
      if(services){
        setServices(services);
      }
    }

    getServices();
  },[])


  if (!services) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading services...</p>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 bg-orange-500  bg-cover bg-center bg-blend-overlay bg-[url('/img/electronics_Bg.png')] bg-opacity-30">
      <h1 className="text-4xl font-semibold tracking-tight text-gray-50 mb-6 text-center drop-shadow-md">
        <Wrench className="inline w-7 h-7 mr-2 mb-1" />
        Submit a Service Request
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg space-y-5"
      >
        {/* Service Dropdown */}
        <div className="relative">
          <Wrench className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <select
            name="serviceType"
            onChange={handleChange}
            value={formData.serviceType}
            required
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="" disabled selected>Select a Service</option>
            {services && services.map((service) => (
              <>
                {service.isActive && <option value={service?._id}>{service?.name}</option>}
              </>
            ))}
            <option value="N/A">Not in the option</option>
          </select>
        </div>

        {/* Message Field */}
        <div className="relative">
          <MessageSquareText className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
          <textarea
            name="description"
            value={formData.description}
            placeholder="Describe the issue..."
            onChange={handleChange}
            required={formData.serviceType === 'N/A'}
            rows="8"  
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
