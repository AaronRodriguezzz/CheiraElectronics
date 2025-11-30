// src/pages/Home.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { feedbacks, services } from "../../data/HomePageTxt";
import { serviceCategories } from "../../data/ServiceCategory";
import AnimatedSection from "../../components/user/AnimationContainer";
import Rating from "@mui/material/Rating";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen block text-orange-500 z-50 relative">

      {/* ================= HERO SECTION ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-[90vh] flex flex-col justify-center items-center text-white px-4 sm:px-8 md:px-16 text-center relative"
        id="Home"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 z-10 tracking-tight leading-tight">
          Welcome to Cheira Electronics
        </h1>
        <p className="max-w-2xl text-base sm:text-lg md:text-xl mb-6 opacity-90 z-10">
          Your trusted partner in appliance and tech repairs. We fix computers,
          home gadgets, and electronics with speed, skill, and care.
        </p>
        <Link
          to="/request-form"
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-orange-600 transition z-10 text-sm sm:text-base"
        >
          Request a Service
        </Link>
      </motion.section>

      {/* ================= ABOUT US SECTION ================= */}
      <AnimatedSection>
        <div
          className="relative block space-y-8 p-6 md:p-14 lg:p-16 md:flex justify-evenly items-center z-50 bg-black/70 backdrop-blur-sm rounded-xl mx-3 md:mx-6 mb-8"
          id="About Us"
        >
          <div className="block w-full md:w-1/2 text-gray-200 relative z-50">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-orange-500">
              ABOUT US
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Cheira Electronics Service Center is a trusted provider of electronics repair and maintenance services. 
              Founded in 2012, the company has built a strong reputation for delivering reliable and efficient technical solutions to customers within its service area. 
              <br />
              <br />
              Cheira Electronics Service Center is a TCL-accredited service partner, ensuring that its repair standards, technical capabilities, and customer support 
              align with the quality expectations of the TCL brand
            </p>
          </div>

          {/* Image container */}
          <div className="relative w-full md:w-1/3">
            {/* Overlay (behind the image) */}
            <div className="absolute inset-0 rounded-xl bg-black/20 shadow-lg z-30" />

            {/* Actual image */}
            <div className="h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-xl bg-[url('/img/shop_photo.jfif')] bg-cover bg-center shadow-lg relative z-20" />
          </div>
        </div>
      </AnimatedSection>

      {/* ================= SERVICES SECTION ================= */}
      <AnimatedSection>
        <div
          className="flex flex-col items-center py-12 sm:py-16 px-4 sm:px-6 text-center bg-black/70 backdrop-blur-sm rounded-xl mx-3 md:mx-6 mb-8"
          id="Services"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-orange-500">
            WHAT WE REPAIR
          </h2>
          <p className="max-w-2xl text-sm sm:text-lg mb-10 text-gray-200">
            From appliances to electronics, our expert team ensures fast and affordable solutions you can trust.
          </p>

          <div className="relative group w-full overflow-hidden">
            <button
              onClick={() =>
                document
                  .getElementById("serviceScroll")
                  .scrollBy({ left: -300, behavior: "smooth" })
              }
              className="hidden sm:group-hover:flex absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition z-50"
            >
              ‹
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("serviceScroll")
                  .scrollBy({ left: 300, behavior: "smooth" })
              }
              className="hidden sm:group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition z-50"
            >
              ›
            </button>

            <div
              id="serviceScroll"
              className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar py-4"
            >
              {serviceCategories.map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative min-w-[250px] sm:min-w-[300px] md:min-w-[350px] h-[250px] sm:h-[300px] bg-cover bg-center rounded-lg shadow-md cursor-pointer"
                  style={{ backgroundImage: `url(/img/${category.img})` }}
                >
                  <div
                    className="absolute inset-0 bg-black/40 hover:bg-black/70 transition-all"
                    onClick={() =>
                      navigate("/service-catalog", {
                        state: { category: category.name },
                      })
                    }
                  ></div>

                  <h3 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white font-bold text-lg sm:text-xl text-center drop-shadow-lg">
                    {category.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-full my-4 text-sm sm:text-base"
            onClick={() => navigate("/service-catalog")}
          >
            VIEW ALL
          </button>
        </div>
      </AnimatedSection>

      {/* ================= CONTACT SECTION ================= */}
      <AnimatedSection>
        <div
          className="mb-10 py-12 sm:py-16 px-4 sm:px-6 bg-black/70 backdrop-blur-sm rounded-xl mx-3 md:mx-6"
          id="Contacts"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-8 sm:mb-10 text-orange-500 text-center">
            CONTACT US
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-gray-200">

            <div className="space-y-6 text-sm sm:text-base">
              <div className="flex items-start gap-4">
                <FaPhone className="text-2xl sm:text-3xl text-orange-500 mt-1" />
                <div>
                  <h4 className="font-bold">Phone</h4>
                  <p>+63 912 345 6789</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaEnvelope className="text-2xl sm:text-3xl text-orange-500 mt-1" />
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p>cheiraelectronics@yahoo.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-2xl sm:text-3xl text-orange-500 mt-1" />
                <div>
                  <h4 className="font-bold">Address</h4>
                  <p className="max-w-[350px]">
                    216 M. L. Quezon Avenue, New Lower Bicutan, Taguig City,
                    Metro Manila, Philippines
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[45%] h-[300px] sm:h-[400px] bg-black/50 rounded-lg shadow-md overflow-hidden border border-orange-500/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.753884152862!2d121.06051797407824!3d14.498813179562632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf43c3838829%3A0xab5b6b5483be0fc5!2sPurok%203%2C%20216%20M.%20L.%20Quezon%20Ave%2C%20New%20Lower%20Bicutan%2C%20Taguig%2C%201632%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1762008845592!5m2!1sen!2sph"
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
      <AnimatedSection>
        <div className="flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-16 bg-black/70 backdrop-blur-sm rounded-xl mx-3 md:mx-6 mb-8">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-orange-500">
            REVIEWS
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto mb-8 sm:mb-10 text-center text-sm sm:text-lg">
            Hear from our satisfied clients! We value your feedback and use it
            to improve our services every day.
          </p>

          <div className="flex flex-wrap gap-6 justify-center w-full">
            {feedbacks.map((feeds, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="w-full sm:w-[300px] flex flex-col gap-y-4 justify-center items-center bg-black/60 backdrop-blur-md shadow-md hover:shadow-orange-500/50 rounded-lg p-6 transition"
              >
                <Rating name="read-only" value={feeds.rating} readOnly />
                <p className="tracking-tight text-center text-gray-300 text-sm sm:text-base">
                  "{feeds.feedback}"
                </p>
                <h2 className="font-semibold text-orange-400">
                  - {feeds.customerName}
                </h2>
              </motion.div>
            ))}
          </div>

          <Link
            to="/feedbacks"
            className="mt-10 px-6 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition text-sm sm:text-base"
          >
            VIEW ALL
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
