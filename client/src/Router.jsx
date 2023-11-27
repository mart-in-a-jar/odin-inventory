import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar";

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar
                homeButton={{ text: "Odin Inventory", path: "/" }}
                centerItems={[
                    { text: "Products", path: "/products" },
                    { text: "Categories", path: "/categories" },
                ]}
            />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/annet" element={<h1>Annet</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
