// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import { motion } from "framer-motion";
import { feedbacks, services } from "../../data/HomePageTxt";
import AnimatedSection from "../../components/user/AnimationContainer";

export default function Home() {
  return (
    <div className="min-h-screen block text-orange-500 z-50 relative">
      
      {/* ================= HERO SECTION ================= */}
      {/* Introduction banner with call-to-action */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-screen flex flex-col justify-center items-center text-white px-4 text-center relative"
        id="Home"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 z-10 tracking-tight">
          Welcome to Cheira Electronics
        </h1>
        <p className="max-w-2xl text-lg md:text-xl mb-6 opacity-90 z-10">
          Your trusted partner in appliance and tech repairs. We fix computers,
          home gadgets, and electronics with speed, skill, and care.
        </p>
        <Link
          to="/request-form"
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-orange-600 transition z-10"
        >
          Request a Service
        </Link>
      </motion.section>

      {/* ================= ABOUT US SECTION ================= */}
      {/* Company background and mission statement */}
      <AnimatedSection>
        <div
          className="block space-y-8 p-16 md:flex justify-evenly items-center z-50 bg-black/70 backdrop-blur-sm rounded-xl mx-6 mb-8"
          id="About Us"
        >
          {/* About Us Text */}
          <div className="block md:w-1/2 text-gray-200">
            <h2 className="text-4xl font-bold mb-6 tracking-tight text-orange-500">
              ABOUT US
            </h2>
            <p className="text-lg leading-relaxed w-xl">
              At Cheira Electronics, we specialize in fast and reliable repairs
              for home appliances, computers, and everyday tech. Our skilled
              technicians are committed to quality service, honest pricing, and
              making sure your devices work when you need them most.
              <br />
              <br />
              We’re not just fixing gadgets — we’re helping people stay
              connected.
            </p>
          </div>

          {/* About Us Image */}
          <div className="h-[300px] md:h-[400px] w-full md:w-1/2 rounded-xl bg-[url('/img/electronics_Bg.png')] bg-cover bg-center shadow-lg" />
        </div>
      </AnimatedSection>

      {/* ================= SERVICES SECTION ================= */}
      {/* List of repair services offered */}
      <AnimatedSection>
        <div
          className="flex flex-col items-center py-16 px-6 text-center bg-black/70 backdrop-blur-sm rounded-xl mx-6 mb-8"
          id="Services"
        >
          <h2 className="text-4xl font-semibold mb-6 text-orange-500">
            WHAT WE REPAIR
          </h2>
          <p className="max-w-2xl text-lg mb-12 text-gray-200">
            From appliances to electronics, our expert team ensures fast and
            affordable solutions you can trust.
          </p>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-black/60 backdrop-blur-md shadow-md hover:shadow-orange-500/50 
                           rounded-lg p-6 flex flex-col items-center text-center transition"
              >
                {/* Service Icon */}
                {service.icon}
                <h3 className="font-bold text-2xl mt-4 mb-2 text-orange-400">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-300">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= CONTACT SECTION ================= */}
      {/* Contact details and embedded Google map */}
      <AnimatedSection>
        <div
          className="mb-10 py-16 px-6 bg-black/70 backdrop-blur-sm rounded-xl mx-6"
          id="Contacts"
        >
          <h2 className="text-4xl font-semibold mb-10 text-orange-500 text-center">
            CONTACT US
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-gray-200">
            
            {/* Contact Information */}
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <FaPhone className="text-3xl text-orange-500 mt-1" />
                <div>
                  <h4 className="font-bold">Phone</h4>
                  <p>+63 912 345 6789</p>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-3xl text-orange-500 mt-1" />
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p>cheiraelectronics@yahoo.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-3xl text-orange-500 mt-1" />
                <div>
                  <h4 className="font-bold">Address</h4>
                  <p className="max-w-[350px]">
                    216 M. L. Quezon Avenue, New Lower Bicutan, Taguig City,
                    Metro Manila, Philippines
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="w-[300px] md:w-[40%] h-[400px] bg-black/50 rounded-lg shadow-md overflow-hidden border border-orange-500/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18..."
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= REVIEWS SECTION ================= */}
      {/* Customer testimonials and ratings */}
      <AnimatedSection>
        <div className="flex flex-col justify-center items-center px-6 py-16 bg-black/70 backdrop-blur-sm rounded-xl mx-6 mb-8">
          <h2 className="text-4xl font-semibold mb-6 text-orange-500">
            REVIEWS
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto mb-10 text-center text-lg">
            Hear from our satisfied clients! We value your feedback and use it
            to improve our services every day.
          </p>

          {/* Reviews Grid */}
          <div className="flex flex-wrap gap-6 justify-center">
            {feedbacks.map((feeds, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="w-full md:w-[280px] flex flex-col gap-y-4 justify-center items-center 
                           bg-black/60 backdrop-blur-md shadow-md hover:shadow-orange-500/50 
                           rounded-lg p-6 transition"
              >
                <Rating name="read-only" value={feeds.rating} readOnly />
                <p className="tracking-tight text-center text-gray-300">
                  "{feeds.feedback}"
                </p>
                <h2 className="font-semibold text-orange-400">
                  - {feeds.customerName}
                </h2>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <Link
            to="/your-target-page"
            className="mt-10 px-6 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            VIEW ALL
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
