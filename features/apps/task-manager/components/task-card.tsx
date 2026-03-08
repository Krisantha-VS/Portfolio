'use client';

import { useState } from 'react';
import { Trash2, GripVertical, ChevronDown, Pencil, Calendar } from 'lucide-react';
import { type Task, PRIORITY_CONFIG } from '../types';
import { cn } from '@/lib/utils';

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Task['status']) => void;
  isDragging?: boolean;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onEdit?: (task: Task) => void;
}

function dueDateMeta(due: string): { label: string; classes: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(due);
  d.setHours(0, 0, 0, 0);
  if (d < today) return { label: d.toLocaleDateString(), classes: 'text-red-400' };
  if (d.getTime() === today.getTime()) return { label: 'Today', classes: 'text-amber-400' };
  return { label: d.toLocaleDateString(), classes: 'text-muted-foreground/60' };
}

export function TaskCard({ task, onDelete, onStatusChange, isDragging, onDragStart, onEdit }: Props) {
  const [expanded, setExpanded] = useState(false);
  const priority = PRIORITY_CONFIG[task.priority];
  const due = task.due_date ? dueDateMeta(task.due_date) : null;

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, task)}
      onClick={() => onEdit?.(task)}
      className={cn(
        'glass rounded-xl p-4 cursor-grab active:cursor-grabbing border border-border transition-all group',
        isDragging && 'opacity-40 scale-95'
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-2">
        <GripVertical className="w-4 h-4 text-muted-foreground/40 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-snug break-words">{task.title}</p>
        </div>
        {/* Edit button */}
        <button
          onClick={e => { e.stopPropagation(); onEdit?.(task); }}
          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all shrink-0"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        {/* Delete button */}
        <button
          onClick={e => { e.stopPropagation(); onDelete(task.id); }}
          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Description */}
      {task.description && (
        <div className="mt-2 ml-6">
          <button
            onClick={e => { e.stopPropagation(); setExpanded(!expanded); }}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronDown className={cn('w-3 h-3 transition-transform', expanded && 'rotate-180')} />
            {expanded ? 'Hide' : 'Details'}
          </button>
          {expanded && (
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{task.description}</p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 ml-6">
        <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', priority.classes)}>
          {priority.label}
        </span>
        <div className="flex items-center gap-2">
          {due ? (
            <span className={cn('flex items-center gap-1 text-xs', due.classes)}>
              <Calendar className="w-3 h-3" />
              {due.label}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground/50">
              {new Date(task.created_at).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
