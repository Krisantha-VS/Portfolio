import type { Metadata } from "next";
import { TaskManagerApp } from "@/features/apps/task-manager/components/task-manager-app";

export const metadata: Metadata = {
  title: "TaskFlow — Kanban Task Manager",
  description: "A real-world kanban task manager built with Next.js and PHP.",
};

export default function TaskManagerPage() {
  return <TaskManagerApp />;
}
