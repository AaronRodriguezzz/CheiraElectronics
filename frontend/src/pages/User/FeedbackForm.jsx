import React, { useState } from "react";
import { motion } from "framer-motion";
import { Rating, TextField } from "@mui/material";
import { Send } from "lucide-react";
import { update_data } from "../../services/putMethod";
import { useNavigate, useParams } from "react-router-dom";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const maxChars = 250;

  const navigate = useNavigate();
  const { requestId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const payload = {
      requestId,
      rating,
      feedback,
    };

    try {
      setLoading(true);
      const res = await update_data("/feedback", payload);

      if (res) {
        setFeedback("");
        setRating(0);
        navigate("/");
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackChange = (e) => {
    const text = e.target.value.slice(0, maxChars);
    setFeedback(text);
    setCharCount(text.length);
  };

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full bg-gradient-to-r from-black/80 to-black/90 text-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-orange-500">
          Leave Your Feedback
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="text-center">
            <p className="text-sm mb-2 text-gray-300">Rate your experience</p>
            <Rating
                name="feedback-rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                precision={1}
                size="large"
                sx={{
                    "& .MuiRating-iconEmpty": { color: "#6b7280" },
                    "& .MuiRating-iconFilled": { color: "#FFD700" },
                    "& .MuiRating-iconHover": { color: "#FFEA00" },
                                }}
            />
          </div>

          {/* Feedback message */}
          <div>
            <TextField
              label="Your feedback"
              multiline
              rows={5}
              variant="outlined"
              fullWidth
              value={feedback}
              onChange={handleFeedbackChange}
              inputProps={{ maxLength: maxChars }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "0.5rem",
                  "& fieldset": { borderColor: "#4b5563" },
                  "&:hover fieldset": { borderColor: "#f97316" },
                  "&.Mui-focused fieldset": { borderColor: "#f97316" },
                },
                "& .MuiInputLabel-root": { color: "#9ca3af" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#f97316" },
              }}
            />
            <div className="text-right text-gray-400 text-xs mt-1">
              {charCount}/{maxChars} characters
            </div>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading || !rating || feedback.trim().length < 10}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:bg-orange-500/60 flex items-center justify-center gap-2"
          >
            <Send size={18} />
            {loading ? "Submitting..." : "Submit Feedback"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
