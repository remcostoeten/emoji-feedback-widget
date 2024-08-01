"use client";

import { useState } from "react";

export const useSubmitFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const submitFeedback = async (feedbackData: {
    opinion: string;
    feedback: string;
  }) => {
    setIsLoading(true);
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSent(true);
    } catch (error) {
      console.error("Failed to submit feedback", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitFeedback, isLoading, isSent };
};
