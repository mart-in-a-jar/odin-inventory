import { useEffect, useState } from "react";
import { formatNumber } from "../utils/numberFormatter";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/products");
            const fetchedProducts = await res.json();
            setProducts(fetchedProducts.data);
        })();
    }, []);

    return (
        <>
            <div className="grid grid-cols-3 justify-items-center">
                <h1 className="text-3xl col-start-2">Products</h1>
                <Link
                    to={"new"}
                    className="btn btn-outline col-start-3 justify-self-end"
                >
                    New
                </Link>
            </div>
            <div className="overflow-x-scroll">
                <table className="table table-zebra">
                    <thead>
                        <tr className="text-sm">
                            <th>Name</th>
                            <th>Price (kr)</th>
                            <th>Categories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products &&
                            products.map((product) => {
                                return (
                                    <tr key={product._id} className="hover">
                                        <td
                                            className="cursor-pointer"
                                            onClick={() => {
                                                navigate(product._id);
                                            }}
                                        >
                                            {product.name}{" "}
                                        </td>
                                        <td
                                            className="cursor-pointer"
                                            onClick={() => {
                                                navigate(product._id);
                                            }}
                                        >
                                            {formatNumber(product.price.NOK)}{" "}
                                        </td>
                                        <td className="truncate max-w-xs">
                                            {product.categories.map((cat) => {
                                                return (
                                                    <Link
                                                        key={cat._id}
                                                        to={`/categories/${cat._id}`}
                                                    >
                                                        {" "}
                                                        {cat.name}
                                                    </Link>
                                                );
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default ProductList;
