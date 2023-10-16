import { useMutation } from "@tanstack/react-query";
import api from ".";
import User from "../types/User";

export function useRegisterQuery() {
    return mutationWrapper<{email: string, password: string}>(api.createUserWithEmailAndPassword)
}

export function useRecordUser() {
    return mutationWrapper<User>(api.recordAccountDetails.bind(api)) // why does this not work here
}

function mutationWrapper<T = Record<string, string>>(requestFn: (param: T) => Promise<unknown>) {
    const mutation = useMutation((data: T) => requestFn(data));

    const requestRun = (data: T) => {
        try {
            return mutation.mutateAsync(data);
        } catch (e) {
            console.error("Mutation failed:", e);
            throw new Error("Mutation failed");
        }
    }

    return {
        request: requestRun,
        isLoading: mutation.isLoading,
        isError: !!mutation.error,
        status: mutation.status,
        error: mutation.error
    };
}