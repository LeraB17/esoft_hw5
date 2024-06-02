import React, { FC } from "react";
import styles from "./PaginationBlock.module.css";
import { IPaginationBlockProps } from "./IPaginationBlockProps";

const PaginationBlock: FC<IPaginationBlockProps> = ({ items, active, className, setActive }) => {
    return (
        <div className={`d-flex justify-content-center ${className}`}>
            {items?.map((item) => (
                <div
                    className={`${styles.Page} border ${item === active ? styles.PageActive : ""}`}
                    key={item}
                    onClick={() => setActive(item)}
                >
                    {item + 1}
                </div>
            ))}
        </div>
    );
};

export default PaginationBlock;
