import { useMutation } from "@tanstack/react-query";
import api from ".";

export function useRegisterQuery(email: string, password: string) {
    console.log(email, password);
    return mutationWrapper(api.createUserWithEmailAndPassword(email, password))
}

function mutationWrapper(requestFn: Promise<unknown>) {
    const mutation = useMutation(() => requestFn);

    const requestRun = async () => {
        try {
            await mutation.mutateAsync();
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