import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/annet" element={<h1>Annet</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
