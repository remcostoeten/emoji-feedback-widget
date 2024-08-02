"use client";
"use client";

import useLocalStorage from "@/core/hooks/useLocalStorage";
import { cn } from "@/core/utils/helpers";
import { EmojiButtonProps } from "@/core/utils/types";

export default function EmojiButton({
  item,
  selectedOpinion,
  onSelect,
}: EmojiButtonProps) {
  const [storedEmoji, setStoredEmoji] = useLocalStorage("selectedEmoji", null);

  const handleClick = () => {
    onSelect(item.text);
    setStoredEmoji(item.text);
  };

  // Conditionally render the button only if the emoji is not stored
  if (storedEmoji === item.text) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 emoji",
        selectedOpinion === item.text
          ? "bg-section-light stroke-body-500 dark:bg-body-4900 dark:stroke-body-500 !animate-pulse"
          : "stroke-body-500 dark:stroke-red-400 hover:bg-card-light hover:stroke-body-500 hover:dark:bg-body-900 hover:dark:stroke-body-500",
      )}
      aria-label={`Select ${item.text} feedback`}
    >
      {item.text}
    </button>
  );
}
