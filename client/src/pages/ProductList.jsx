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
            <Link to={"new"} className="btn btn-outline self-end">
                New
            </Link>
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
        </>
    );
};
export default ProductList;
