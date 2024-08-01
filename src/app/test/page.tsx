import CoolButton from "@/components/CoolButton";
import { BorderBeam } from "@/components/misc/BorderEffects";
import ShinyButton from "@/components/misc/ShinyBtn";
import { AnimatedSubscribeButton } from "@/components/SubmitBtn";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div
      className="mx-auto container p-10 grid place-ite
    ms-center"
    >
      <AnimatedSubscribeButton
        buttonColor="#000000"
        buttonTextColor="#ffffff"
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
      <CoolButton
        hasCoolMode={true}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        isLoading={false}
        isNotEmpty={false}
      />
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <span
          className="pointer-events-none whitespace-pre-wrap bg-gradient-to
      -b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"
        >
          Border Beam
        </span>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </div>
  );
}
