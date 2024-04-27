import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Provider } from 'react-redux';
import store from '#store/store';
import AppRouter from './AppRouter';

function App() {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}

export default App
