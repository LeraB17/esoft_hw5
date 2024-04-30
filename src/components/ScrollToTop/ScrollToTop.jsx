import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        const timer = setTimeout(function () {
            window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timer);
    }, [location])

    return null;
};

export default ScrollToTop;