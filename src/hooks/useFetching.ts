import { useState } from "react";

export const useFetching = (): [
    (callback: (controller: AbortController) => Promise<void>) => Promise<() => void>,
    boolean,
    string,
] => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetching = async (callback: (controller: AbortController) => Promise<void>) => {
        const controller = new AbortController();

        try {
            setIsLoading(true);
            await callback(controller);
        } catch (e: any) {
            if (e.name !== "AbortError") {
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }

        // Возвращаем функцию для отмены запроса
        return () => controller.abort();
    };

    return [fetching, isLoading, error];
};
