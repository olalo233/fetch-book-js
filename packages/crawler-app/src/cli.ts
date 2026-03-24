#!/usr/bin/env bun

import { Command } from "commander";
import type { TaskStatus } from "./domain";
import { GraphileWorkerTaskQueue } from "./infrastructure";

const program = new Command();

const taskQueue = new GraphileWorkerTaskQueue();

program
	.name("fetch-book-crawler")
	.description("CLI to manage fetch-book crawler tasks")
	.version("1.0.0");

// Command to add a crawl novel task
program
	.command("add-novel <url>")
	.description("Add a novel crawl task")
	.action(async (url: string) => {
		const task = await taskQueue.addTask("crawl-novel", { url });
		console.log("Added novel crawl task:", task);
	});

// Command to add a crawl chapter task
program
	.command("add-chapter <url>")
	.description("Add a chapter crawl task")
	.action(async (url: string) => {
		const task = await taskQueue.addTask("crawl-chapter", { url });
		console.log("Added chapter crawl task:", task);
	});

// Command to list tasks
program
	.command("list-tasks")
	.option("-s, --status <status>", "Filter by status")
	.description("List all tasks")
	.action(async (options: { status?: string }) => {
		const status = options.status as TaskStatus | undefined;
		const tasks = await taskQueue.listTasks(status ? { status } : undefined);
		console.log("Tasks:", tasks);
	});

// Command to get a task
program
	.command("get-task <id>")
	.description("Get a task by ID")
	.action(async (id: string) => {
		const task = await taskQueue.getTask(id);
		if (task) {
			console.log("Task:", task);
		} else {
			console.log("Task not found");
		}
	});

program.parse();
