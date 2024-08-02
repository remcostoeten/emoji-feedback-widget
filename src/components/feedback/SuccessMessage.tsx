import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const SuccessMessage: React.FC = () => {
  const { t } = useTranslation();

  return (
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
  );
};
