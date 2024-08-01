export type FeedbackData = {
    opinion: string;
    feedback: string;
};

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
};