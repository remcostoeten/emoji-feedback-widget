import CoolButton from "@/components/CoolButton";
import { BorderBeam } from "@/components/misc/BorderEffects";
import React from "react";

export default function page() {
  return (
    <div
      className="mx-auto container p-10 grid place-ite
    ms-center"
    >
      <CoolButton />
      <CoolButton hasCoolMode={true} />
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
