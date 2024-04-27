import React from 'react';
import MainLayout from '#layouts/MainLayout/MainLayout';
import NotFoundPage from '#pages/NotFoundPage/NotFoundPage';
import { routes } from '#router/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />} >
                        {
                            routes.map(({ Component, ...route }) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<Component />}
                                />
                            ))
                        }
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
    );
};

export default AppRouter;