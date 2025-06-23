// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTools, FaSnowflake, FaTshirt, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Rating from "@mui/material/Rating";

export default function Home() {
  const feedbacks = [
    {
      customerName: "James Cruz",
      feedback: "The barber was skilled and friendly. Loved the clean fade I got!",
      rating: 5,
    },
    {
      customerName: "Miguel Santos",
      feedback: "Great service and chill atmosphere, but the wait time was a bit long.",
      rating: 3,
    },
    {
      customerName: "Elijah Reyes",
      feedback: "Affordable and stylish cuts. Definitely coming back.",
      rating: 4,
    },
    {
      customerName: "James Cruz",
      feedback: "The barber was skilled and friendly. Loved the clean fade I got!",
      rating: 5,
    },
    {
      customerName: "Miguel Santos",
      feedback: "Great service and chill atmosphere, but the wait time was a bit long.",
      rating: 3,
    },
    {
      customerName: "Elijah Reyes",
      feedback: "Affordable and stylish cuts. Definitely coming back.",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="h-screen bg-[url('/electronics_Bg.png')] bg-cover bg-center flex flex-col justify-center items-center bg-orange-500 text-white px-8 text-center" id="Home">
        <h1 className="text-4xl font-bold mb-4">Welcome to Cheira Electronics</h1>
        <p className="text-lg mb-6">Your trusted home appliance repair center</p>
        <Link
          to="/submit-request"
          className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-orange-100"
        >
          Request a Service
        </Link>
      </section>

      {/* About Us */}
      <section className="py-12 px-8 bg-gray-50 text-center" id="About Us">
        <h2 className="text-4xl font-semibold mb-6 text-orange-500 tracking-tighter">ABOUT US</h2>
        <p className="max-w-2xl mx-auto">
          Cheira Electronics is a local service company dedicated to helping families and businesses maintain the performance of their essential appliances. With years of industry experience and a team of highly-skilled technicians, our mission is to deliver quick, reliable, and honest service with a customer-first attitude.
        </p>
      </section>

      {/* Services */}
      <section className="py-12 px-8 text-center bg-gray-50">
        <h2 className="text-4xl font-semibold mb-6 text-orange-500 tracking-tighter">WHAT WE REPAIR</h2>
        <div className="grid md:grid-cols-3 gap-6 p-10">

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

      {/* Contact Section */}
      <section className="bg-gray-100 py-12 px-6" id="Contacts">
        <h2 className="text-4xl font-semibold mb-6 text-orange-500 tracking-tighter text-center">CONTACT US</h2>
        <div className="flex flex-row md:flex-row items-center justify-center gap-10 ">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaPhone className="text-2xl text-orange-500 mt-1" />
              <div>
                <h4 className="font-bold">Phone</h4>
                <p>+63 912 345 6789</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-2xl text-orange-500 mt-1" />
              <div>
                <h4 className="font-bold">Email</h4>
                <p>cheiraelectronics@yahoo.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-2xl text-orange-500 mt-1" />
              <div>
                <h4 className="font-bold">Address</h4>
                <p className="max-w-[350px]">216 M. L. Quezon Avenue, New Lower Bicutan, Taguig City, Metro Manila, Philippines</p>
              </div>
            </div>
          </div>
          <div>
            {/* Embedded Google Map */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1  d4752.997943391294!2d121.0605179758732!3d14.49881317955907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf43c3838829%3A0xab5b6b5483be0fc5!2s216%20M.%20L.%20Quezon%20Ave%2C%20Taguig%20City%2C%201632%20Metro%20Manila!5e1!3m2!1sen!2sph!4v1750651511992!5m2!1sen!2sph" 
              width="450"
              height="300" 
              style={{ border: 0 }}
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="flex flex-col justify-center items-center px-4 py-10 md:px-10">
        <h2 className="text-4xl font-semibold mb-6 text-orange-500 tracking-tighter">REVIEWS</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {feedbacks.map((feeds, index) => (
            <div
              key={index}
              className="w-full md:w-[200px] h-[300px] flex flex-col gap-y-4 justify-center items-center shadow p-4"
            >
              <Rating name="read-only" value={feeds.rating} readOnly />
              <p className="tracking-tighter text-center">"{feeds.feedback}"</p>
              <h2>-{feeds.customerName}</h2>
            </div>
          ))}
        </div>
        <Link
          to="/your-target-page"
          className="mt-10 px-6 py-2 rounded-full text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300"
        >
          VIEW ALL
        </Link>
      </section>

    </div>
  );
}
