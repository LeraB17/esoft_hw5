import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import NotFoundPage from '#pages/NotFoundPage/NotFoundPage'
import { routes } from '#router/routes';
import MainLayout from '#layouts/MainLayout/MainLayout';

function App() {
    return (
        <>
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
        </>
    )
}

export default App
