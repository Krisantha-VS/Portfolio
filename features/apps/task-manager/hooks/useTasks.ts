'use client';

import { useState, useEffect, useCallback } from 'react';
import { taskApi } from '../api';
import type { Board, Task, TaskStatus, TaskPriority } from '../types';

export function useTasks(token: string | null, boardId: number | null) {
  const [tasks, setTasks]     = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token || !boardId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await taskApi.getTasks(token, boardId);
      setTasks(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [token, boardId]);

  useEffect(() => { load(); }, [load]);

  const createTask = async (title: string, priority: TaskPriority = 'medium', description = '') => {
    if (!token || !boardId) return;
    const task = await taskApi.createTask(token, { board_id: boardId, title, priority, description });
    setTasks(prev => [...prev, task]);
    return task;
  };

  const updateTask = async (id: number, data: Partial<Task>) => {
    if (!token) return;
    const updated = await taskApi.updateTask(token, id, data);
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
    return updated;
  };

  const moveTask = async (id: number, status: TaskStatus) => {
    if (!token) return;
    const updated = await taskApi.updateTask(token, id, { status });
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
  };

  const deleteTask = async (id: number) => {
    if (!token) return;
    await taskApi.deleteTask(token, id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { tasks, loading, error, createTask, updateTask, moveTask, deleteTask, reload: load };
}

export function useBoards(token: string | null) {
  const [boards, setBoards]   = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      setBoards(await taskApi.getBoards(token));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const createBoard = async (name: string) => {
    if (!token) return;
    const board = await taskApi.createBoard(token, name);
    setBoards(prev => [board, ...prev]);
    return board;
  };

  const deleteBoard = async (id: number) => {
    if (!token) return;
    await taskApi.deleteBoard(token, id);
    setBoards(prev => prev.filter(b => b.id !== id));
  };

  return { boards, loading, createBoard, deleteBoard };
}
