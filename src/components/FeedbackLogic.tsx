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
import { toast } from "sonner";
import CoolButton from "./CoolButton";
import useDebounce from "@/core/hooks/useDebounce";
import EmojiButton from "./EmojiButton";
import { CloseIcon } from "./Icons";
import { useTranslation } from "react-i18next";
import { opinionEmojis, TIME_TO_SHOW_FEEDBACK_FORM } from "@/core/config";
import { submitFeedbackAction } from "@/core/server/actions";

const MemoizedCoolButton = React.memo(CoolButton);

const RATE_LIMIT_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const Feedback: React.FC = () => {
  const { t } = useTranslation();
  const [selectedOpinion, setSelectedOpinion] = useState<string | null>(null);
  const [isSubmitted, setSubmissionState] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedbackHidden, setIsFeedbackHidden] = useState(true); // Initially hidden
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const debouncedFeedbackText = useDebounce(feedbackText, 300);
  const isButtonEnabled = useMemo(
    () => debouncedFeedbackText.trim().length > 0 && !isRateLimited,
    [debouncedFeedbackText, isRateLimited],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFeedbackHidden(false);
    }, TIME_TO_SHOW_FEEDBACK_FORM);

    return () => clearTimeout(timer); // Clean up timer on component unmount
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

  const handleEmojiSelect = useCallback(
    (opinion: string) => {
      setSelectedOpinion(opinion);
      setIsTextareaVisible(true);
      toast(t("emojiReceived"));
    },
    [t],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isRateLimited) {
        toast(t("rateLimitedError"));
        return;
      }

      const formData = new FormData(event.currentTarget);
      const feedback = formData.get("feedback") as string;
      if (!feedback.trim()) {
        toast(t("emptyFeedbackError"));
        return;
      }

      setIsLoading(true);
      try {
        const result = await submitFeedbackAction(formData);
        if (result.success) {
          localStorage.setItem("lastFeedbackSubmission", Date.now().toString());
          setIsRateLimited(true);
          setTimeout(() => setIsRateLimited(false), RATE_LIMIT_INTERVAL);

          setTimeout(() => {
            setSubmissionState(true);
          }, 1000);
          toast.success(t("feedbackSuccess"));
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
            }, 500);
          }, 2200);
        } else {
          toast.error(t("feedbackError"));
        }
      } catch (error) {
        toast.error(t("submitError"));
      } finally {
        setIsLoading(false);
      }
    },
    [isRateLimited, t],
  );

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
    }, 500);
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
    <AnimatePresence>
      {!isFeedbackHidden && (
        <motion.section
          aria-label={t("feedbackSectionLabel")}
          className="fixed bottom-0 left-0 right-0 max-w-full mx-auto flex justify-center mb-10"
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: isAnimatingOut ? 0 : 1,
            y: isAnimatingOut ? 100 : 0,
          }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            layout
            initial={{ borderRadius: "2rem" }}
            animate={{ borderRadius: selectedOpinion ? "0.5rem" : "2rem" }}
            className="relative min-w-[300px] md:min-w-[400px] h-auto w-fit border py-2 bg-section-light hover:bg-[#171716] shadow-sm border-border transition-all bezier-ones duration-500 gap-4"
          >
            {!isTextareaVisible ? (
              <div className="flex flex-wrap items-center justify-between w-full px-7 translate-x-1.5 gap-x-6">
                <h2 id="feedback-label" className="text-sm text-disabled">
                  {t("feedbackLabel")}
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
                  <div className="relative">
                    <button
                      onClick={handleClose}
                      className="unset absolute -top-5 z-50 shadow-white/10 shadow-xl -right-2.5"
                      aria-label={t("closeFeedbackForm")}
                    >
                      <CloseIcon />
                    </button>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mx-auto flex items-center flex-col"
                    >
                      <form
                        ref={formRef}
                        onSubmit={handleSubmit}
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
                          placeholder={t("feedbackPlaceholder")}
                          className="min-h-32 x rounded-md bg-body focus:bg-section focus:border-none focus:outline-none transition-all duration-700 border border-border p-2 mt-2"
                          aria-label={t("additionalFeedback")}
                          onFocus={handleTextareaFocus}
                          onBlur={handleTextareaBlur}
                        />
                        {isTextareaFocused && (
                          <BorderBeam size={250} duration={12} delay={9} />
                        )}

                        <div className="flex items-center justify-end w-full">
                          <MemoizedCoolButton
                            hasCoolMode={true}
                            isNotEmpty={isButtonEnabled}
                            onClick={() => formRef.current?.requestSubmit()}
                            isLoading={isLoading}
                          />
                        </div>
                      </form>
                    </motion.div>
                  </div>
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
                    {t("postSubmitText")}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Feedback);
