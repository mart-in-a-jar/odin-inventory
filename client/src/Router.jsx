import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import Category from "./components/Category";
import Product from "./components/Product";
import ProductForm from "./components/ProductForm";

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
            <div className="overflow-x-auto max-w-7xl m-auto flex flex-col px-1">
                <Routes>
                    <Route path="/" element={<Navigate to="/products" />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/new" element={<ProductForm />} />
                    <Route path="/products/:id" element={<Product />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/categories/:id" element={<Category />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Router;
