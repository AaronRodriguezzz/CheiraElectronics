
import {
  FaTools,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLaptop,
  FaMobileAlt,
  FaTv,
  FaBlender,
  FaSnowflake
} from "react-icons/fa";

export const feedbacks = [
    {
      customerName: "James Cruz",
      feedback: "The technician was skilled and friendly. Fixed my laptop quickly!",
      rating: 5,
    },
    {
      customerName: "Miguel Santos",
      feedback: "Great service and chill atmosphere, but the wait time was a bit long.",
      rating: 3,
    },
    {
      customerName: "Elijah Reyes",
      feedback: "Affordable and stylish service. Definitely coming back.",
      rating: 4,
    },
  ];

  export const services = [
    {
      title: "Air Conditioners",
      desc: "Expert maintenance and part replacement for A/C units.",
      icon: <FaSnowflake className="text-5xl text-orange-500" />,
    },
    {
      title: "Laptop & PC Repair",
      desc: "Hardware and software fixes to keep your computer running.",
      icon: <FaLaptop className="text-5xl text-orange-500" />,
    },
    {
      title: "Mobile Devices",
      desc: "Screen replacement, battery change, and quick diagnostics.",
      icon: <FaMobileAlt className="text-5xl text-orange-500" />,
    },
    {
      title: "Televisions",
      desc: "From display issues to sound repairs — we’ve got you covered.",
      icon: <FaTv className="text-5xl text-orange-500" />,
    },
    {
      title: "Home Appliances",
      desc: "We repair blenders, washing machines, and more household essentials.",
      icon: <FaBlender className="text-5xl text-orange-500" />,
    },
    {
      title: "General Electronics",
      desc: "Fast solutions for gadgets, consoles, and everyday devices.",
      icon: <FaTools className="text-5xl text-orange-500" />,
    },
  ];