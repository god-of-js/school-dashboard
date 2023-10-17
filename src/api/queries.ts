import { useMutation, useQuery } from '@tanstack/react-query';
import api from '.';
import AuthDetails from '../types/AuthDetails';
import Task from '../types/Task';
import TaskGroup from '../types/TaskGroup';
import User from '../types/User';

export function useRegisterQuery() {
  return mutationWrapper<AuthDetails>(api.createUserWithEmailAndPassword);
}

export function useRecordUserQuery() {
  return mutationWrapper<User>(api.recordAccountDetails.bind(api));
}

export function useLoginUserQuery() {
  return mutationWrapper<AuthDetails>(api.signInWithEmailAndPassword);
}

export function useCreateTaskGroupQuery() {
  return mutationWrapper<TaskGroup>(api.createTaskGroup.bind(api));
}
export function useCreateTaskQuery() {
  return mutationWrapper<Task>(api.createTask.bind(api));
}

export function useGetTaskGroupOfUserQuery(userId: string) {
  return useQuery(['taskGroups', userId], () =>
    api.getTaskGroupsOfUser(userId),
  );
}
export function useGetTasksOfUserQuery(userId: string) {
  return useQuery(['tasks', userId], () => api.getTasksOfUser(userId));
}

export function useGetUserProfile(userId: string) {
  return useQuery(['userDetails', userId], () => api.getUser(userId));
}

function mutationWrapper<
  T = Record<string, string>,
  R = Record<string, string>,
>(requestFn: (param: T) => Promise<unknown>) {
  const mutation = useMutation((data: T) => requestFn(data));

  const requestRun = (data: T) => {
    try {
      return mutation.mutateAsync(data) as Promise<R>;
    } catch (e) {
      console.error('Mutation failed:', e);
      throw new Error('Mutation failed');
    }
  };

  return {
    request: requestRun,
    isLoading: mutation.isLoading,
    isError: !!mutation.error,
    status: mutation.status,
    error: mutation.error,
  };
}
