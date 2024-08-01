import { OpinionEmoji } from "./utils/types";

export const config = {
  feedbackLabel: "Thoughts about the app?",
  postSubmitText: `
  Your feedback has been received!<br>
  Thank you for your help.
`,
};
};

export const opinionEmojis: OpinionEmoji[] = [
  { text: "love it", emoji: "😍" },
  { text: "DOPE!", emoji: "🔥" },
  { text: "it's shit", emoji: "💩" },
  { text: "sickening", emoji: "🤮" },
];

// If disabled results won't be logged to .json locally.
export const ENABLE_LOCAL_STORAGE = true;
