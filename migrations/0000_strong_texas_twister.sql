CREATE TABLE `emoji_counts` (
	`emoji` text PRIMARY KEY NOT NULL,
	`count` integer
);
--> statement-breakpoint
CREATE TABLE `feedbacks` (
	`id` integer PRIMARY KEY NOT NULL,
	`opinion` text,
	`feedback` text,
	`timestamp` text
);
