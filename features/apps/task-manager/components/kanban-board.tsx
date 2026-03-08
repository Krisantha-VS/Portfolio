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

// Fix K5: minimal toast type
interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

let _toastId = 0;

export function KanbanBoard({ token, boardId }: Props) {
  const { tasks, loading, error, createTask, updateTask, moveTask, deleteTask } = useTasks(token, boardId);
  const [draggingTask, setDraggingTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask]   = useState<Task | null>(null);

  // Fix K5: toast state
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = ++_toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggingTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Fix K1: clear dragging state when drag ends (ghost state fix)
  const handleDragEnd = () => {
    setDraggingTask(null);
  };

  const handleDrop = async (status: TaskStatus) => {
    if (!draggingTask || draggingTask.status === status) return;
    const moving = draggingTask;
    setDraggingTask(null);
    try {
      await moveTask(moving.id, status);
      // no success toast for move — it's visually self-evident
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Failed to move task', 'error');
    }
  };

  // Fix K5: wrapped createTask with feedback
  const handleAddTask = async (title: string, priority: Task['priority'], description: string) => {
    try {
      await createTask(title, priority, description);
      addToast('Task created', 'success');
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Failed to create task', 'error');
    }
  };

  // Fix K5: wrapped deleteTask with feedback
  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      addToast('Task deleted', 'success');
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Failed to delete task', 'error');
    }
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
            onDragEnd={handleDragEnd} // Fix K1
            draggingId={draggingTask?.id ?? null}
            onDelete={handleDelete} // Fix K5
            onStatusChange={moveTask}
            onAddTask={handleAddTask} // Fix K5
            onEdit={task => setEditingTask(task)}
          />
        ))}
      </div>

      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onSave={async (id, data) => { await updateTask(id, data); }}
          onClose={() => setEditingTask(null)}
        />
      )}

      {/* Fix K5: Toast stack */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`glass rounded-lg px-4 py-2 text-sm border pointer-events-auto transition-all ${
              toast.type === 'success'
                ? 'border-green-500/50 text-green-400'
                : 'border-red-500/50 text-red-400'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
}
