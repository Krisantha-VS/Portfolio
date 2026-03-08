'use client';

import { useState } from 'react';
import { COLUMNS, type Task, type TaskStatus } from '../types';
import { KanbanColumn } from './kanban-column';
import { TaskEditModal } from './task-edit-modal';
import { useTasks } from '../hooks/useTasks';

interface Props {
  token: string;
  boardId: number;
}

export function KanbanBoard({ token, boardId }: Props) {
  const { tasks, loading, error, createTask, updateTask, moveTask, deleteTask } = useTasks(token, boardId);
  const [draggingTask, setDraggingTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask]   = useState<Task | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggingTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = async (status: TaskStatus) => {
    if (!draggingTask || draggingTask.status === status) return;
    await moveTask(draggingTask.id, status);
    setDraggingTask(null);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24 text-muted-foreground">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3" />
      Loading tasks...
    </div>
  );

  if (error) return (
    <div className="text-center py-16 text-red-400">{error}</div>
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map(col => (
          <KanbanColumn
            key={col.key}
            status={col.key}
            label={col.label}
            colorClass={col.color}
            tasks={tasks.filter(t => t.status === col.key)}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            draggingId={draggingTask?.id ?? null}
            onDelete={deleteTask}
            onStatusChange={moveTask}
            onAddTask={(title, priority, description) =>
              createTask(title, priority, description)
            }
            onEdit={task => setEditingTask(task)}
          />
        ))}
      </div>

      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onSave={updateTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </>
  );
}
