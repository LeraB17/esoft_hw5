export interface IPaginationBlockProps {
    items: number[];
    active: number;
    className?: string;
    setActive: (active: number) => void;
}
