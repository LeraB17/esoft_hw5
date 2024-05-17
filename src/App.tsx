import { FC } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "#store/store";
import AppRouter from "./AppRouter";

const App: FC = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
};

export default App;
