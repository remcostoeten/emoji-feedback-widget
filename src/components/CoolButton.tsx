import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { AnimatedSubscribeButton } from "./SubmitBtn";
import { CoolButtonProps } from "@/core/utils/types";

export default function CoolButton({
  onClick,
  isLoading,
  hasCoolMode,
  isNotEmpty,
}: CoolButtonProps) {
  const buttonContent = (
    <span
      className={`group inline-flex my-2 gap-4 items-center ${!isNotEmpty || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    ></span>
  );

  return (
    <>
      <AnimatedSubscribeButton
        buttonColor="#000000"
        buttonTextColor="#ffffff"
        disabled={!isNotEmpty || isLoading}
        subscribeStatus={false}
        initialText={
          <span className="group inline-flex items-center">
            Subscribe{" "}
            <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        }
        changeText={
          <span className="group inline-flex items-center">
            <CheckIcon className="mr-2 h-4 w-4" />
            Subscribed{" "}
          </span>
        }
      />
      <button
        onClick={onClick}
        disabled={!isNotEmpty || isLoading}
        className={`cool-button ${hasCoolMode ? "cool-mode" : ""}`}
      >
        {buttonContent}
      </button>
    </>
  );
}
