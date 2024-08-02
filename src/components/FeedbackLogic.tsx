"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BorderBeam } from "./misc/BorderEffects";
import { toast } from "sonner";
import CoolButton from "./CoolButton";
import { submitFeedbackAction } from "@/core/server/actions";
import useDebounce from "@/core/hooks/useDebounce";
import EmojiButton from "./EmojiButton";
import { CloseIcon } from "./Icons";
import { useTranslation } from "react-i18next";
import {
  RATE_LIMIT_INTERVAL,
  TIME_TO_SHOW_FEEDBACK_FORM,
  opinionEmojis,
} from "@/core/config";
import {
  showFeedbackMotionConfig,
  afterEmojiClick,
  formAnimation,
} from "@/core/config/motion-config";
import useLocalStorage from "@/core/hooks/useLocalStorage";

export function Feedback() {
  const { t } = useTranslation();
  const [feedbackHidden, setFeedbackHidden] = useLocalStorage(
    "feedbackHidden",
    false,
  );
  const [storedEmoji, setStoredEmoji] = useLocalStorage("selectedEmoji", null);
  const [selectedOpinion, setSelectedOpinion] = useState<string | null>(null);
  const [isSubmitted, setSubmissionState] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const debouncedFeedbackText = useDebounce(feedbackText, 300);

  const isButtonEnabled =
    debouncedFeedbackText.trim().length > 0 && !isRateLimited;

  useEffect(() => {
    if (!feedbackHidden && !storedEmoji) {
      const timer = setTimeout(() => {
        setFeedbackHidden(false);
      }, TIME_TO_SHOW_FEEDBACK_FORM);

      return () => clearTimeout(timer);
    }
  }, [feedbackHidden, storedEmoji, setFeedbackHidden]);

  useEffect(() => {
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
      setStoredEmoji(opinion);
      setFeedbackHidden(true);
      toast(t("emojiReceived"));
    },
    [t, setStoredEmoji, setFeedbackHidden],
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
              setStoredEmoji(null);
              if (formRef.current) {
                formRef.current.reset();
              }
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
    [isRateLimited, t, setStoredEmoji],
  );

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setSelectedOpinion(null);
      setIsTextareaVisible(false);
      setFeedbackText("");
      setStoredEmoji(null);
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 500);
  }, [setStoredEmoji]);

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

  if (feedbackHidden && !storedEmoji) {
    return null;
  }

  return (
    <AnimatePresence>
      {(!feedbackHidden || storedEmoji) && (
        <motion.section
          aria-label={t("feedbackSectionLabel")}
          className="fixed bottom-0 left-0 right-0 max-w-full mx-auto flex justify-center mb-10"
          initial={showFeedbackMotionConfig.initial}
          animate={showFeedbackMotionConfig.animate(isAnimatingOut)}
          exit={showFeedbackMotionConfig.exit}
          transition={showFeedbackMotionConfig.transition}
        >
          <motion.div
            layout
            initial={{ borderRadius: "2rem" }}
            animate={{
              borderRadius: selectedOpinion || storedEmoji ? "0.5rem" : "2rem",
            }}
            className="min-w-[300px] md:min-w-[400px] h-auto w-fit border py-2 bg-section-light hover:bg-[#171716] shadow-sm border-border transition-all bezier-ones duration-500 gap-4"
          >
            {!isTextareaVisible && !storedEmoji ? (
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
                {(selectedOpinion || storedEmoji) && !isSubmitted && (
                  <div className="">
                    <button
                      onClick={handleClose}
                      className="unset absolute -top-5 z-50 shadow-white/10 shadow-xl -right-2.5"
                      aria-label={t("closeFeedbackForm")}
                    >
                      <CloseIcon />
                    </button>
                    <motion.div
                      initial={afterEmojiClick.initial}
                      animate={afterEmojiClick.animate}
                      exit={afterEmojiClick.exit}
                      transition={afterEmojiClick.transition}
                      className="mx-auto flex items-center flex-col relative"
                    >
                      <motion.form
                        initial={formAnimation.initial}
                        animate={formAnimation.animate}
                        transition={formAnimation.transition}
                        exit={formAnimation.exit}
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="flex flex-col mx-auto w-full px-4 gap-4 falling-effect"
                      >
                        <input
                          type="hidden"
                          name="opinion"
                          value={selectedOpinion || storedEmoji || ""}
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
                          <CoolButton
                            hasCoolMode={true}
                            isNotEmpty={isButtonEnabled}
                            onClick={() => formRef.current?.requestSubmit()}
                            isLoading={isLoading}
                          />
                        </div>
                      </motion.form>
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
}

export default Feedback;
