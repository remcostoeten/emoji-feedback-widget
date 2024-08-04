CREATE TABLE `emoji_counts` (
	`emoji` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `feedbacks` (
	`id` integer PRIMARY KEY NOT NULL,
	`opinion` text,
	`feedback` text,
	`timestamp` text,
	`country` text,
	`region` text,
	`city` text
);
