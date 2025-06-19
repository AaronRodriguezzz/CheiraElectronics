// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTools, FaSnowflake, FaTshirt, FaHandsHelping, FaShieldAlt, FaSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="h-screen bg-[url('/electronics_Bg.png')] bg-cover bg-center flex flex-col justify-center items-center bg-orange-500 text-white px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Cheira Electronics</h1>
        <p className="text-lg mb-6">Your trusted home appliance repair center</p>
        <Link
          to="/submit-request"
          className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-orange-100"
        >
          Request a Service
        </Link>
      </section>

      {/* About Us Section */}
      <section className="py-12 px-8 bg-gray-50 text-center">
        <h2 className="text-4xl font-semibold mb-6 text-orange-500 tracking-tighter ">ABOUT US</h2>
        <p className="max-w-2xl mx-auto">
          Cheira Electronics is a local service company dedicated to helping families and businesses maintain the performance of their essential appliances. With years of industry experience and a team of highly-skilled technicians, our mission is to deliver quick, reliable, and honest service with a customer-first attitude.
        </p>
      </section>

      {/* Services Overview */}
      <section className="py-12 px-8 text-center bg-gray-50">
        <h2 className="text-4xl font-semibold mb-6 text-orange-500 tracking-tighter">WHAT WE REPAIR</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
            <FaTshirt className="text-4xl text-orange-500 mb-4" />
            <h3 className="font-bold text-xl mb-2">Washing Machines</h3>
            <p>Efficient diagnosis and repair of washers and dryers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
            <FaSnowflake className="text-4xl text-orange-500 mb-4" />
            <h3 className="font-bold text-xl mb-2">Refrigerators</h3>
            <p>Quick solutions for common and advanced cooling issues.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
            <FaTools className="text-4xl text-orange-500 mb-4" />
            <h3 className="font-bold text-xl mb-2">Air Conditioners</h3>
            <p>Expert maintenance and part replacement for A/C units.</p>
          </div>
        </div>
      </section>

      {/* Why Cheira Electronics */}
      <section className="py-12 px-8 text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
        <p className="max-w-2xl mx-auto">
          At Cheira Electronics, we prioritize quality, affordability, and customer satisfaction. Our certified technicians are trained to handle repairs efficiently and professionally. Trusted by hundreds of happy customers.
        </p>
      </section>


      {/* Our Commitments Section (Distinct Layouts) */}
      <section className="py-16 px-8 bg-orange-50">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Commitments</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <FaHandsHelping className="text-5xl text-orange-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Reliable Support</h4>
            <p>Our customer support is here to help you every step of the way.</p>
          </div>
          <div className="bg-orange-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <FaShieldAlt className="text-5xl text-orange-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Service Guarantee</h4>
            <p>We stand behind our repairs with a satisfaction guarantee.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <FaSmile className="text-5xl text-orange-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Happy Customers</h4>
            <p>We are trusted by hundreds of satisfied clients in the community.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
