"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BorderBeam } from "./misc/BorderEffects";
import { config, opinionEmojis } from "@/core/config";
import { toast } from "sonner";
import CoolButton from "./CoolButton";
import { submitFeedbackAction } from "@/core/server/actions";
import useDebounce from "@/core/hooks/useDebounce";
import EmojiButton from "./EmojiButton";
import { CloseIcon } from "./Icons";

const MemoizedCoolButton = React.memo(CoolButton);

export const Feedback: React.FC = () => {
  const [selectedOpinion, setSelectedOpinion] = useState<string | null>(null);
  const [isSubmitted, setSubmissionState] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedbackHidden, setIsFeedbackHidden] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const debouncedFeedbackText = useDebounce(feedbackText, 300);
  const isButtonEnabled = useMemo(
    () => debouncedFeedbackText.trim().length > 0,
    [debouncedFeedbackText],
  );

  useEffect(() => {
    const feedbackHidden = localStorage.getItem("feedbackHidden");
    if (feedbackHidden === "true") {
      setIsFeedbackHidden(true);
    }
  }, []);

  const handleEmojiSelect = useCallback((opinion: string) => {
    setSelectedOpinion(opinion);
    setIsTextareaVisible(true);
    toast.success("Emoji feedback received. Add more details if you wish.", {
      duration: 3000,
    });
  }, []);

  const handleSubmit = useCallback(async (formData: FormData) => {
    const feedback = formData.get("feedback") as string;
    if (!feedback.trim()) {
      toast.error("Please provide additional feedback before submitting.", {
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await submitFeedbackAction(formData);
      if (result.success) {
        setTimeout(() => {
          setSubmissionState(true);
        }, 1000);
        toast.success(result.message);
        setTimeout(() => {
          setIsAnimatingOut(true);
          setTimeout(() => {
            setSelectedOpinion(null);
            setSubmissionState(false);
            setIsTextareaVisible(false);
            setFeedbackText("");
            if (formRef.current) {
              formRef.current.reset();
            }
            setIsFeedbackHidden(true);
            localStorage.setItem("feedbackHidden", "true");
          }, 500); // Match this with the animation duration
        }, 2200);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(
        "An error occurred while submitting feedback. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setSelectedOpinion(null);
      setIsTextareaVisible(false);
      setFeedbackText("");
      if (formRef.current) {
        formRef.current.reset();
      }
      setIsFeedbackHidden(true);
      localStorage.setItem("feedbackHidden", "true");
    }, 500); // Match this with the animation duration
  }, []);

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFeedbackText(e.target.value);
    },
    [],
  );

  const handleTextareaFocus = useCallback(() => {
    setIsTextareaFocused(true);
  }, []);

  const handleTextareaBlur = useCallback(() => {
    setIsTextareaFocused(false);
  }, []);

  if (isFeedbackHidden) {
    return null;
  }

  return (
    <section aria-label="Feedback" className="max-w-full">
      <motion.div
        layout
        initial={{ borderRadius: "2rem" }}
        animate={{ borderRadius: selectedOpinion ? "0.5rem" : "2rem" }}
        className="relative min-w-[300px] md:min-w-[400px] h-auto w-fit border py-2 bg-section-light hover:bg-[#171716] shadow-sm border-border transition-all bezier-ones duration-500 gap-4"
      >
        {!isTextareaVisible ? (
          <div className="flex flex-wrap items-center justify-center gap-3  w-full">
            <h2 id="feedback-label" className="text-sm text-disabled">
              {config.feedbackLabel}
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
                  aria-label="Close feedback form"
                >
                  <CloseIcon />
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className=" mx-auto flex items-center flex-col  relative"
                >
                  <form
                    ref={formRef}
                    action={handleSubmit}
                    className="flex flex-col mx-auto w-full px-4 gap-4"
                  >
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
                      className="min-h-32 x rounded-md bg-body focus:bg-section focus:border-none focus:outline-none transition-all  duration-700 border border-border p-2 mt-2"
                      aria-label="Additional feedback"
                      onFocus={handleTextareaFocus}
                      onBlur={handleTextareaBlur}
                    />
                    {isTextareaFocused && (
                      <BorderBeam size={250} duration={12} delay={9} />
                    )}

                    <div className="flex items-center justify-end w-full ">
                      <MemoizedCoolButton
                        hasCoolMode={true}
                        isNotEmpty={isButtonEnabled}
                        onClick={() => formRef.current?.requestSubmit()}
                        isLoading={isLoading}
                      />
                    </div>
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
                <p>{config.postSubmitText}</p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
};

export default React.memo(Feedback);
