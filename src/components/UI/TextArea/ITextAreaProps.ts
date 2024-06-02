import { HTMLAttributes } from "react";

export interface ITextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    label?: string;
    value: string;
    onChange: (event: React.FormEvent) => void;
    rows?: number;
}
