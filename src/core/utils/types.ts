export type OpinionEmoji = {
  text: string;
  emoji: string;
};

export type CoolButtonProps = {
  hasCoolMode?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  feedbackText?: string;
  isNotEmpty?: boolean;
  disabled?: boolean;
};

export type EmojiButtonProps = {
  item: {
    text: string;
    emoji: string;
  };
  selectedOpinion: string | null;
  onSelect: (opinion: string) => void;
};

export interface Feedback {
  id: number;
  opinion: string | null;
  feedback: string | null;
  timestamp: string;
}

export interface EmojiCount {
  [emoji: string]: number;
}

export interface FeedbackData {
  feedbacks: Feedback[];
  emojiCounts: EmojiCount;
}
