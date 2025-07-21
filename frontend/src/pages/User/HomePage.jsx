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
  ];

  return (
    <div className="min-h-screen block bg-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-white px-8 text-center" id="Home">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center z-10" />
        <div className="absolute top-0 h-full w-full bg-orange-500/80 bg-cover bg-center z-10" />

        <h1 className="text-4xl font-bold mb-4 z-20 tracking-tight opacity-90">Welcome to Cheira Electronics</h1>
        <p className="max-w-xs md:max-w-xl p-2 sm:text-sm md:text-lg mb-6 w-[700px] opacity-70 z-20">
          Your trusted partner in appliance and tech repairs. We fix computers, home gadgets,
          and everyday electronics with speed, skill, and care—making technology work for everyone.
        </p>
        <Link
          to="/request-form"
          className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold opacity-90 hover:bg-orange-100 z-20"
        >
          Request a Service
        </Link>
      </section>

      {/* About Us */}
      <section className=" my-15 lg:my-35 block space-y-4 md:flex justify-evenly items-center p-4" id="About Us">
        <div className="block mr-4">
          <h2 className="text-4xl font-bold mb-6 text-gray-700 tracking-tighter">ABOUT US</h2>
          <p className="text-sm md:text-md lg:text-lg text-left max-w-3xl">
            At Cheira Electronics, we specialize in fast and reliable repairs 
            for home appliances, computers, and everyday tech. Our skilled 
            technicians are committed to quality service, honest pricing, and 
            making sure your devices work when you need them most.
            <br />
            <br />
            We’re not just fixing gadgets — we’re helping people stay connected.  
          </p>
        </div>
        
        <div className="h-[250px] md:h-[400px] w-full md:w-lg bg-gray-200 rounded-xl bg-[url('/img/electronics_Bg.png')] bg-cover bg-center">
          
        </div>
      </section>

      {/* Services */}
      <section className="flex flex-col items-center py-12 px-4 text-center mb-10" id="Services">
        <h2 className="text-4xl font-semibold mb-6 text-gray-700 tracking-tighter">WHAT WE REPAIR</h2>
        <p className="max-w-md md:max-w-xl text-sm md:text-md lg:text-lg tracking-tight text-center">
          At Cheira Electronics, we offer expert repair services for computers, appliances, 
          mobile devices, and other essential electronics. Whether it's a faulty motherboard, 
          a broken screen, or a power issue, our team ensures fast and affordable solutions 
          you can trust.
        </p>
        <div className="grid md:grid-cols-3 gap-6 p-5">

          <div className="bg-white shadow flex flex-col items-center rounded-b-lg">
            <img src="/img/background-3.png" alt="service" className="w-full md:h-[250px] lg:h-[300px]"/>
            <div className="p-4 lg:p-6">
              <h3 className="font-bold text-2xl text-gray-700 tracking-tighter">Air Conditioners</h3>
              <p className="text-sm md:text-md tracking-tight">Expert maintenance and part replacement for A/C units.</p> 
            </div>
          </div>

          <div className="bg-white shadow flex flex-col items-center rounded-b-lg">
            <img src="/img/background-3.png" alt="service" className="w-full md:h-[250px] lg:h-[300px]"/>
            <div className="p-4 lg:p-6">
              <h3 className="font-bold text-2xl text-gray-700 tracking-tighter">Air Conditioners</h3>
              <p className="text-sm md:text-md tracking-tight">Expert maintenance and part replacement for A/C units.</p> 
            </div>
          </div>

          <div className="bg-white shadow flex flex-col items-center rounded-b-lg">
            <img src="/img/background-3.png" alt="service" className="w-full md:h-[250px] lg:h-[300px]"/>
            <div className="p-4 lg:p-6">
              <h3 className="font-bold text-2xl text-gray-700 tracking-tighter">Air Conditioners</h3>
              <p className="text-sm md:text-md tracking-tight">Expert maintenance and part replacement for A/C units.</p> 
            </div>
          </div>  

        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-10 py-12 px-6" id="Contacts">
        <h2 className="text-4xl font-semibold mb-10 text-gray-700 tracking-tighter text-center ">CONTACT US</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-15">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaPhone className="text-2xl text-gray-500 mt-1" />
              <div>
                <h4 className="font-bold">Phone</h4>
                <p>+63 912 345 6789</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-2xl text-gray-500 mt-1" />
              <div>
                <h4 className="font-bold">Email</h4>
                <p>cheiraelectronics@yahoo.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-2xl text-gray-500 mt-1" />
              <div>
                <h4 className="font-bold">Address</h4>
                <p className="max-w-[350px]">216 M. L. Quezon Avenue, New Lower Bicutan, Taguig City, Metro Manila, Philippines</p>
              </div>
            </div>
          </div>

          <div className="w-[300px] md:w-[35%] h-[400px] p-4 bg-gray-100 rounded-lg">
            {/* Embedded Google Map */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1  d4752.997943391294!2d121.0605179758732!3d14.49881317955907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf43c3838829%3A0xab5b6b5483be0fc5!2s216%20M.%20L.%20Quezon%20Ave%2C%20Taguig%20City%2C%201632%20Metro%20Manila!5e1!3m2!1sen!2sph!4v1750651511992!5m2!1sen!2sph" 
              className=" w-full h-full"
              style={{ border: 0 }}
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
            >
            </iframe>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="flex flex-col justify-center items-center px-4 py-10 my-10 md:px-10">
        <h2 className="text-4xl font-semibold mb-6 text-gray-700 tracking-tighter">REVIEWS</h2>
         <p className="text-gray-700 max-w-xl mx-auto mb-6 text-center text-lg tracking-tight">
          Hear from our satisfied clients! We value your feedback and use it to 
          improve our services every day. Whether we fixed your appliance, computer, 
          or mobile device — your opinion matters.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {feedbacks.map((feeds, index) => (
            <div
              key={index}
              className="w-full md:w-[300px] h-[200px] md:h-[300px] flex flex-col gap-y-4 justify-center items-center shadow p-4"
            >
              <Rating name="read-only" value={feeds.rating} readOnly />
              <p className="tracking-tighter text-center">"{feeds.feedback}"</p>
              <h2>-{feeds.customerName}</h2>
            </div>
          ))}
        </div>
        <Link
          to="/your-target-page"
          className="mt-10 px-6 py-2 rounded-full bg-gray-700 text-white hover:bg-green-500 hover:text-white transition-colors duration-300"
        >
          VIEW ALL
        </Link>
      </section>
    </div>
  );
}
