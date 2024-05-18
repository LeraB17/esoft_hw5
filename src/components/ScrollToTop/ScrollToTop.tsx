import React, { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "#hooks/redux";

const ScrollToTop: FC = () => {
    const location = useLocation();
    const { page } = useAppSelector((state) => state.filters);

    useEffect(() => {
        const timer = setTimeout(function () {
            window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timer);
    }, [location, page]);

    return null;
};

export default ScrollToTop;
