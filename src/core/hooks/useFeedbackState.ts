import { useState, useEffect, useMemo } from "react";
import useDebounce from "@/core/hooks/useDebounce";
import { RATE_LIMIT_INTERVAL, TIME_TO_SHOW_FEEDBACK_FORM } from "@/core/config";

export default function useFeedbackState() {
  const [selectedOpinion, setSelectedOpinion] = useState<string | null>(null);
  const [isSubmitted, setSubmissionState] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedbackHidden, setIsFeedbackHidden] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const debouncedFeedbackText = useDebounce(feedbackText, 300);
  const isButtonEnabled = useMemo(
    () => debouncedFeedbackText.trim().length > 0 && !isRateLimited,
    [debouncedFeedbackText, isRateLimited],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFeedbackHidden(false);
    }, TIME_TO_SHOW_FEEDBACK_FORM);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const feedbackHidden = localStorage.getItem("feedbackHidden");
    if (feedbackHidden === "true") {
      setIsFeedbackHidden(true);
    }

    const lastSubmissionTime = localStorage.getItem("lastFeedbackSubmission");
    if (lastSubmissionTime) {
      const timeSinceLastSubmission =
        Date.now() - parseInt(lastSubmissionTime, 10);
      if (timeSinceLastSubmission < RATE_LIMIT_INTERVAL) {
        setIsRateLimited(true);
        const remainingTime = RATE_LIMIT_INTERVAL - timeSinceLastSubmission;
        setTimeout(() => setIsRateLimited(false), remainingTime);
      }
    }
  }, []);

  return {
    selectedOpinion,
    setSelectedOpinion,
    isSubmitted,
    setSubmissionState,
    feedbackText,
    setFeedbackText,
    isLoading,
    setIsLoading,
    isFeedbackHidden,
    setIsFeedbackHidden,
    isAnimatingOut,
    setIsAnimatingOut,
    isRateLimited,
    setIsRateLimited,
    isButtonEnabled,
  };
}
