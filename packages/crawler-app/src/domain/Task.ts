export enum TaskStatus {
	PENDING = "pending",
	IN_PROGRESS = "in_progress",
	COMPLETED = "completed",
	FAILED = "failed",
}

export interface Task {
	id: string;
	type: "crawl-novel" | "crawl-chapter";
	payload: unknown;
	status: TaskStatus;
	createdAt: Date;
	updatedAt: Date;
}
