import React, { useState } from "react";
import { Box, Typography, Rating, TextField, Button } from "@mui/material";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const maxLength = 200;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim().length === 0) {
      alert("Please enter feedback description.");
      return;
    }

    const data = {
      rating,
      feedback,
    };

    console.log("Submitted Feedback:", data);
    // TODO: Send `data` to backend or API
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md w-full mx-auto"
    >
      <Typography variant="h6" gutterBottom>
        Rate Your Experience
      </Typography>

      <Rating
        name="user-rating"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        size="large"
      />

      <TextField
        label="Write your feedback"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={feedback}
        onChange={(e) =>
          e.target.value.length <= maxLength && setFeedback(e.target.value)
        }
        helperText={`${feedback.length}/${maxLength} characters`}
        margin="normal"
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={feedback.trim().length === 0}
      >
        Submit Feedback
      </Button>
    </Box>
  );
};

export default FeedbackForm;
