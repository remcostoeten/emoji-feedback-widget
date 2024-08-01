"use server";

import fs from "fs/promises";
import path from "path";
import { ENABLE_LOCAL_STORAGE } from "../config";

export async function submitFeedbackAction(formData: FormData) {
  if (!ENABLE_LOCAL_STORAGE) {
    console.log("Local storage is disabled. Feedback not saved.");
    return { success: true, message: "Feedback received (not saved)" };
  }

  const opinion = formData.get("opinion");
  const feedback = formData.get("feedback");

  const newFeedback = {
    id: Date.now(),
    opinion,
    feedback,
    timestamp: new Date().toISOString(),
  };

  try {
    const filePath = path.join(process.cwd(), "feedback.json");
    let feedbackData = [];

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      feedbackData = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is empty, start with an empty array
    }

    feedbackData.push(newFeedback);

    await fs.writeFile(filePath, JSON.stringify(feedbackData, null, 2));

    console.log("Feedback saved:", newFeedback);
    return { success: true, message: "Feedback saved successfully" };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false, message: "Error saving feedback" };
  }
}
