import { InputHTMLAttributes } from "react";

export interface IInputProps {
    className?: string;
    label?: string;
    value: string;
    size?: "sm" | "lg" | undefined;
    type?: string;
    placeholder?: string;
    onChange: (event: React.FormEvent) => void;
}
