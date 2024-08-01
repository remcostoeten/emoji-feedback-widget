"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/core/utils/helpers";
import { BorderBeam } from "./misc/BorderEffects";
import { opinionEmojis } from "@/core/config";
import { toast } from "sonner";
import CoolButton from "./CoolButton";
import { submitFeedbackAction } from "@/core/server/actions";

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
  const [feedbackText, setFeedbackText] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleEmojiSelect = (opinion: string) => {
    setSelectedOpinion(opinion);
    setIsTextareaVisible(true);
    toast.success("Emoji feedback received. Add more details if you wish.", {
      duration: 3000,
    });
  };

  const handleSubmit = async (formData: FormData) => {
    const feedback = formData.get("feedback") as string;
    if (!feedback.trim()) {
      toast.error("Please provide additional feedback before submitting.", {
        duration: 3000,
      });
      return;
    }

    const result = await submitFeedbackAction(formData);
    if (result.success) {
      setSubmissionState(true);
      toast.success(result.message);
      setTimeout(() => {
        setSelectedOpinion(null);
        setSubmissionState(false);
        setIsTextareaVisible(false);
        setFeedbackText("");
        setIsButtonEnabled(false);
        if (formRef.current) {
          formRef.current.reset();
        }
      }, 2200);
    } else {
      toast.error(result.message);
    }
  };

  const handleClose = () => {
    setSelectedOpinion(null);
    setIsTextareaVisible(false);
    setFeedbackText("");
    setIsButtonEnabled(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setFeedbackText(text);
    setIsButtonEnabled(text.trim().length > 0);
  };

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
        className="relative min-w-[400px] h-auto w-fit border py-2 bg-section-light hover:bg-[#171716] shadow-sm border-border transition-all bezier-one
        
       duration-500"
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
                  className="unset absolute -right-4 -top-4 z-50  hover:stroke-white hover:scale-105 transition-all shadow-lg shadow-slate-200/[5%]"
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
                  className="overflow-hidden mx-auto flex items-center flex-col"
                >
                  <form ref={formRef} action={handleSubmit}>
                    <input
                      type="hidden"
                      name="opinion"
                      value={selectedOpinion}
                    />
                    <textarea
                      name="feedback"
                      value={feedbackText}
                      onChange={handleTextareaChange}
                      placeholder="Any additional thoughts?"
                      className="min-h-32 w-[80%] rounded-md bg-body focus:bg-section focus:border-none focus:outline-none transition-all duration-700 border border-border p-2 mt-2"
                      aria-label="Additional feedback"
                      onFocus={handleTextareaFocus}
                      onBlur={handleTextareaBlur}
                    />
                    {isTextareaFocused && (
                      <BorderBeam size={250} duration={12} delay={9} />
                    )}
                    <CoolButton
                      hasCoolMode={true}
                      isNotEmpty={isButtonEnabled}
                      onClick={() => formRef.current?.requestSubmit()}
                    />
                  </form>
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

export default Feedback;
