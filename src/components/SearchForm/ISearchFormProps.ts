import { Dispatch, SetStateAction } from "react";

export interface ISearchFormProps {
    startSearch: boolean;
    setStartSearch: Dispatch<SetStateAction<boolean>>;
}
