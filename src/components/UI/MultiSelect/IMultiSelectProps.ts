import { Dispatch, SetStateAction } from "react";

export type OptionType = {
    value: string;
    label: string;
};

export type SelectedOption = string;

export interface IMultiSelectProps {
    title: string;
    options: OptionType[];
    selectedValues: SelectedOption[];
    setSelectedValues: Dispatch<SetStateAction<SelectedOption[]>>;
}
