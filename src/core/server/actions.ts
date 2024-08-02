"use server";

import fs from "fs/promises";
import path from "path";
import { ENABLE_LOCAL_STORAGE } from "../config";
import { Feedback, FeedbackData } from "../utils/types";

export async function submitFeedbackAction(formData: FormData) {
  if (!ENABLE_LOCAL_STORAGE) {
    console.log("Local storage is disabled. Feedback not saved.");
    return { success: true, message: "Feedback received (not saved)" };
  }

  const opinion = formData.get("opinion");
  const feedback = formData.get("feedback");

  const newFeedback: Feedback = {
    id: Date.now(),
    opinion: opinion as string | null,
    feedback: feedback as string | null,
    timestamp: new Date().toISOString(),
  };

  try {
    const filePath = path.join(process.cwd(), "feedback_data.json");
    let feedbackData: FeedbackData = { feedbacks: [], emojiCounts: {} };

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      feedbackData = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is empty, start with an empty object
    }

    feedbackData.feedbacks.push(newFeedback);

    if (typeof opinion === "string" && opinion.trim() !== "") {
      feedbackData.emojiCounts[opinion] =
        (feedbackData.emojiCounts[opinion] || 0) + 1;
    }

    await fs.writeFile(filePath, JSON.stringify(feedbackData, null, 2));

    console.log("Feedback saved:", newFeedback);
    console.log("Updated feedback data:", feedbackData);
    return { success: true, message: "Feedback saved successfully" };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false, message: "Error saving feedback" };
  }
}

export async function getFeedbackData(): Promise<FeedbackData> {
  const filePath = path.join(process.cwd(), "feedback_data.json");
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading feedback data:", error);
    return { feedbacks: [], emojiCounts: {} };
  }
}
