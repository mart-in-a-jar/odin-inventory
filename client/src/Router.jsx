import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import CategoryList from "./pages/CategoryList";
import Category from "./pages/Category";
import Product from "./pages/Product";
import ProductForm from "./pages/ProductForm";
import ErrorPage from "./pages/404";
import CategoryForm from "./pages/CategoryForm";
import Footer from "./components/Footer";

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
            <div className="overflow-x-auto max-w-7xl m-auto flex flex-col px-1 pb-10 min-h-[calc(100vh-69px-112px-2rem-0.5rem)]">
                <Routes>
                    <Route path="/" element={<Navigate to="/products" />} />
                    <Route
                        path="/products"
                        element={<ProductList maxItems={10} />}
                    />
                    <Route path="/products/new" element={<ProductForm />} />
                    <Route path="/products/:id" element={<Product />} />
                    <Route
                        path="/products/:id/edit"
                        element={<ProductForm editMode />}
                    />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/categories/new" element={<CategoryForm />} />
                    <Route path="/categories/:id" element={<Category />} />
                    <Route
                        path="/categories/:id/edit"
                        element={<CategoryForm editMode />}
                    />

                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
