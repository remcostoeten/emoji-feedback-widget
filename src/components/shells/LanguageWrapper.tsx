"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "./SkeletonShell";
import { FeedbackSkeleton } from "../Loaders";
import LanguageDropdown from "../misc/LanguageDropdown";

interface LanguageWrapperProps {
  children: React.ReactNode;
}

const LanguageWrapper: React.FC<LanguageWrapperProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isFeedbackHidden, setIsFeedbackHidden] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }

    const feedbackHidden = localStorage.getItem("feedbackHidden");
    setIsFeedbackHidden(feedbackHidden === "true");

    setIsHydrated(true);
  }, [i18n]);

  if (!isHydrated) {
    return (
      <>
        {!isFeedbackHidden && <FeedbackSkeleton />}
        <nav className="flex fixed top-12 gap-4 left-4 items-center">
          <a href="/">Home </a>
          <a href="/test">Test page</a>
        </nav>
      </>
    );
  }

  return <>{children}</>;
};

export default LanguageWrapper;
