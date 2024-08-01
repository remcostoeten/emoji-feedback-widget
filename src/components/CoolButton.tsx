import { CoolButtonProps } from "@/core/utils/types";
import { ChevronRightIcon } from "lucide-react";
import { CoolMode } from "./CoolMode";
import { AnimatedSubscribeButton } from "./SubmitBtn";

export default function CoolButton({
  onClick,
  isLoading = false,
  hasCoolMode = false,
  feedbackText = "",
  isNotEmpty = false,
}: CoolButtonProps) {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (isNotEmpty && onClick) {
      onClick();
    }
  }

  const buttonContent = (
    <span
      className={`group inline-flex items-center ${
        !isNotEmpty ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Submit feedback{" "}
      <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );

  return (
    <>
      {hasCoolMode ? (
        <AnimatedSubscribeButton
          buttonColor="#000000"
          buttonTextColor="#ffffff"
          subscribeStatus={false}
          initialText={
            <CoolMode>
              <button onClick={handleClick} disabled={!isNotEmpty}>
                {buttonContent}
              </button>
            </CoolMode>
          }
          changeText={
            isNotEmpty ? (
              <button
                onClick={handleClick}
                className="group inline-flex items-center"
              >
                Submit feedback{" "}
                <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            ) : null
          }
        />
      ) : (
        <AnimatedSubscribeButton
          buttonColor="#0a0a0a"
          buttonTextColor="#ffffff"
          subscribeStatus={false}
          initialText={
            <button
              onClick={handleClick}
              disabled={!isNotEmpty}
              className="group inline-flex items-center"
            >
              {buttonContent}
            </button>
          }
          changeText={
            isNotEmpty ? (
              <span className="group inline-flex text-2xl items-center gap-4">
                <p className="-ml-16">Sent!</p>
                <Image
                  className="absolute right-4"
                  width={60}
                  height={60}
                  alt="rocket emoji animation"
                  src="/rocket.gif"
                />
              </span>
            ) : null
          }
        />
      )}
    </>
  );
}
