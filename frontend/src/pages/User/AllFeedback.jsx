// src/pages/AllFeedbacks.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { get_data } from "../../services/getMethod";
import Rating from "@mui/material/Rating";
import AnimatedSection from "../../components/user/AnimationContainer";

export default function AllFeedbacks() {
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const res = await get_data(`/all-feedback`);
        if (res) setFeedbacks(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen text-white pt-28 pb-16 px-4 md:px-12 relative z-50">
      
      <h1 className="text-3xl md:text-5xl font-bold text-orange-500 tracking-tighter mb-10 text-center">
        Customer Reviews
      </h1>

      <AnimatedSection>
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-lg shadow-lg w-full mx-auto">
          
          <p className="text-gray-200 max-w-2xl mx-auto mb-10 text-center text-sm sm:text-lg">
            Thank you for trusting Cheira Electronics. Here's what our customers have to say!
          </p>

          {loading ? (
            <p className="text-center text-gray-400">Loading feedbacks...</p>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center w-full">
              {feedbacks.map((feeds, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="w-full sm:w-[300px] flex flex-col gap-y-4 justify-center items-center bg-black/70 backdrop-blur-md shadow-md hover:shadow-orange-500/40 rounded-lg p-6 transition"
                >
                  <Rating name="read-only" value={feeds.feedbackRating} readOnly />
                  <p className="tracking-tight text-center text-gray-300 text-sm sm:text-base">
                    "{feeds.feedbackMessage}"
                  </p>
                  <h2 className="font-semibold text-orange-400">
                    - {feeds.customer.full_name} -
                  </h2>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <Link
              to="/"
              className="mt-10 px-6 py-3 rounded-full bg-orange-500 text-black text-white hover:bg-orange-600 transition text-sm sm:text-base"
            >
                Back to Home
            </Link>
          </div>

        </div>
      </AnimatedSection>
    </div>
  );
}
