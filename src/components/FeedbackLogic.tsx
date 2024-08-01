"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/core/utils/helpers";
import { TriangleLoader } from "./Loader";
import { BorderBeam } from "./misc/BorderEffects";
import { opinionEmojis } from "@/core/config";
import { FeedbackData } from "@/core/utils/types";
import { toast } from "sonner";
import CoolButton from "./CoolButton";

const EmojiButton = React.memo(({ item, selectedOpinion, onSelect }) => (
  <button
    onClick={() => onSelect(item.text)}
    className={cn(
      "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 emoji",
      selectedOpinion === item.text
        ? "bg-section-light stroke-body-500 dark:bg-body-4900 dark:stroke-body-500 !animate-pulse"
        : "stroke-body-500 dark:stroke-red-400 hover:bg-card-light hover:stroke-body-500 hover:dark:bg-body-900 hover:dark:stroke-body-500",
    )}
    aria-label={`Select ${item.text} feedback`}
    aria-pressed={selectedOpinion === item.text}
  >
    {item.emoji}
  </button>
));

EmojiButton.displayName = "EmojiButton";

export const Feedback: React.FC = () => {
  const [selectedOpinion, setSelectedOpinion] = useState<string | null>(null);
  const [isSubmitted, setSubmissionState] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const { submitFeedback, isLoading, isSent } = useSubmitFeedback();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isSent) {
      setSubmissionState(true);
      const timeout = setTimeout(() => {
        setSelectedOpinion(null);
        setSubmissionState(false);
        setIsTextareaVisible(false);
        if (textareaRef.current) {
          textareaRef.current.value = "";
        }
      }, 2200);
      return () => clearTimeout(timeout);
    }
  }, [isSent]);

  const handleEmojiSelect = useCallback((opinion: string) => {
    setSelectedOpinion(opinion);
    setIsTextareaVisible(true);
    toast.success("Emoji feedback received. Add more details if you wish.", {
      duration: 3000,
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedOpinion && textareaRef.current?.value.trim()) {
      submitFeedback({
        opinion: selectedOpinion,
        feedback: textareaRef.current?.value || "",
      });
    } else {
      toast.error("Please provide additional feedback before submitting.", {
        duration: 3000,
      });
    }
  }, [selectedOpinion, submitFeedback]);

  const handleClose = useCallback(() => {
    setSelectedOpinion(null);
    setIsTextareaVisible(false);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  }, []);

  const handleTextareaFocus = () => {
    setIsTextareaFocused(true);
  };

  const handleTextareaBlur = () => {
    setIsTextareaFocused(false);
  };

  return (
    <section aria-label="Feedback">
      <motion.div
        layout
        initial={{ borderRadius: "2rem" }}
        animate={{ borderRadius: selectedOpinion ? "0.5rem" : "2rem" }}
        className="relative min-w-[400px] h-auto w-fit border py-2 bg-section-light hover:bg-[#171716] shadow-sm border-border transition-all bezier-ones duration-500"
      >
        {!isTextareaVisible ? (
          <div className="flex items-center justify-center gap-3 pl-4 pr-2 w-[400px]">
            <h2 id="feedback-label" className="text-sm text-disabled">
              Thoughts about the app?
            </h2>
            <div
              className="flex items-center text-text emojis"
              role="group"
              aria-labelledby="feedback-label"
            >
              {opinionEmojis.map((item) => (
                <EmojiButton
                  key={item.text}
                  item={item}
                  selectedOpinion={selectedOpinion}
                  onSelect={handleEmojiSelect}
                />
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {selectedOpinion && !isSubmitted && (
              <>
                <button
                  onClick={handleClose}
                  className="unset absolute -right-4 -top-4 z-50 shadow-white/10 shadow-xl"
                >
                  <svg
                    className="withIcon_icon__MHUeb"
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="#333333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="var(-GeistFill)"
                    ></circle>
                    <path d="M15 9l-6 6" stroke="var(-GeistStroke)"></path>
                    <path d="M9 9l6 6" stroke="var(-GeistStroke)"></path>
                  </svg>
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className=" overflow-hidden mx-auto flex items-center flex-col"
                >
                  <textarea
                    ref={textareaRef}
                    placeholder="Any additional thoughts?"
                    className="min-h-32 w-[80%] rounded-md bg-body focus:bg-section focus:border-none focus:outline-none transition-all duration-700 border border-border p-2 mt-2"
                    aria-label="Additional feedback"
                    onFocus={handleTextareaFocus}
                    onBlur={handleTextareaBlur}
                  />
                  {isTextareaFocused && (
                    <BorderBeam size={250} duration={12} delay={9} />
                  )}
                  <CoolButton onClick={handleSubmit} hasCoolMode={true} />
                </motion.div>
              </>
            )}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-start gap-2 pt-4 text-sm font-normal"
                role="status"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 dark:bg-sky-500">
                  <span aria-hidden="true">✓</span>
                </div>
                <p>Your feedback has been received!</p>
                <p>Thank you for your help.</p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
};

const useSubmitFeedback = () => {
  const [isLoading, setLoadingState] = useState(false);
  const [isSent, setRequestState] = useState(false);

  const submitFeedback = useCallback(async (data: FeedbackData) => {
    setLoadingState(true);
    setRequestState(false);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Submitted feedback:", data); // Log the feedback data
      setRequestState(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.", {
        duration: 5000,
      });
    } finally {
      setLoadingState(false);
    }
  }, []);

  return { submitFeedback, isLoading, isSent };
};

export default Feedback;
