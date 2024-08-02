import { Feedback } from "@/components/FeedbackLogic";
import React from "react";

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl p-10 flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2>Todo:</h2>
        <div>
          <ul>
            <li>Add coolmode btn</li>
            <li>Submit text</li>
            <li>Mobile</li>
            <li>Submit geodata</li>
            <li>Light mode?</li>
            <li>Display JSON</li>
            <li>Readme</li>
            <li>SEO: sitemap, robots, GitHub repo</li>
          </ul>
        </div>
        <Feedback />
      </div>
    </div>
  );
}
