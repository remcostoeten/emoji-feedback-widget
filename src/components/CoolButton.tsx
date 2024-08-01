import { AnimatedSubscribeButton } from "@/components/SubmitBtn";
import React from "react";
import { CoolMode } from "@/components/CoolMode";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { TriangleLoader } from "./Loader";

type CoolProps = {
  hasCoolMode?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  feedbackText?: string;
  isNotEmpty?: boolean;
};

export default function CoolButton({
  onClick,
  isLoading = false,
  hasCoolMode = false,
  feedbackText = "",
  isNotEmpty,
}: CoolProps) {
  return (
    <>
      {hasCoolMode ? (
        <>
          <AnimatedSubscribeButton
            buttonColor="#000000"
            buttonTextColor="#ffffff"
            subscribeStatus={false}
            initialText={
              <CoolMode>
                <span
                  onClick={onClick}
                  className="group inline-flex items-center"
                >
                  Submit feedback{" "}
                  <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </CoolMode>
            }
            changeText={
              <button
                disabled
                onClick={onClick}
                className="group inline-flex text-sm items-center gap-4"
              >
                <p className="-ml-16">
                  {isLoading ? (
                    <TriangleLoader />
                  ) : feedbackText.trim() ? (
                    "Merci amigo!"
                  ) : (
                    ""
                  )}
                </p>
                <Image
                  className="absolute right-4"
                  width="33"
                  height="33"
                  alt="rocket emoji animation"
                  src="/rocket.gif"
                />{" "}
              </button>
            }
          />
        </>
      ) : (
        <span>
          <span>
            <AnimatedSubscribeButton
              buttonColor="#0a0a0a"
              buttonTextColor="#ffffff"
              subscribeStatus={false}
              initialText={
                <button
                  disabled={true}
                  className="group inline-flex items-center"
                >
                  Submit opinion!{" "}
                  <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              }
              changeText={
                <span className="group inline-flex text-2xl items-center gap-4">
                  <p className="-ml-16">Sent!</p>
                  <Image
                    className="absolute right-4"
                    width="60"
                    height="60"
                    alt="rocket emoji animation"
                    src="/rocket.gif"
                  />{" "}
                </span>
              }
            />
          </span>
        </span>
      )}
    </>
  );
}
