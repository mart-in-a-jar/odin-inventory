import { useEffect, useState } from "react";
import { formatNumber } from "../utils/numberFormatter";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { updateSearchParams } from "../utils/updateSearchParams";
import { CancelIcon } from "../components/CancelIcon";

const ProductList = ({ maxItems }) => {
    const [products, setProducts] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(
        +searchParams.get("page") || 1
    );
    const [pages, setPages] = useState(null);
    const [searchActive, setSearchActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);

    // load items
    useEffect(() => {
        (async () => {
            let url = "/api/products";
            let query = `paginate=${maxItems}&page=${currentPage}`;
            if (searchTerm) {
                url += "/search";
                query += `&name=${searchTerm}`;
            }
            const res = await fetch(`${url}?${query}`);
            const fetchedProducts = await res.json();
            if (res.ok) {
                setProducts(fetchedProducts.data);
                setPages(fetchedProducts.pages);
                return;
            }
        })();
    }, [maxItems, currentPage, searchTerm]);

    // update search params
    useEffect(() => {
        updateSearchParams(setSearchParams, "page", currentPage);
    }, [currentPage, setSearchParams]);

    const handleSearch = async (e) => {
        if (e.key === "Enter") {
            setCurrentPage(1);
            setSearchTerm(e.target.value);
        }
        /*         if (e.key === "Escape") {
            setSearchTerm(null);
            setSearchActive(false);
        } */
    };

    return (
        <>
            <div className="grid grid-cols-3 justify-items-center pt-1 gap-y-2">
                <div className="row-start-2 col-span-3 sm:row-start-1 sm:col-span-1 col-start-1 justify-self-start relative w-full sm:max-w-xs">
                    {searchActive ? (
                        <>
                            <input
                                type="text"
                                onKeyDown={handleSearch}
                                placeholder="Search"
                                autoFocus
                                className="input input-bordered w-full"
                                aria-label="Search"
                            />
                            <button
                                aria-label="Close search"
                                className="fill-gray-400 opacity-30 absolute right-2 inset-y-0"
                            >
                                <CancelIcon
                                    onClick={() => {
                                        setCurrentPage(1);
                                        setSearchTerm(null);
                                        setSearchActive(false);
                                    }}
                                />
                            </button>
                        </>
                    ) : (
                        <button
                            className="btn"
                            onClick={() => {
                                setSearchActive(true);
                            }}
                        >
                            Search
                        </button>
                    )}
                </div>
                <h1 className="text-3xl col-start-2">Products</h1>
                <Link
                    to={"new"}
                    className="btn btn-outline col-start-3 justify-self-end"
                >
                    New
                </Link>
            </div>
            <div className="pb-6">
                <table className="table table-zebra">
                    <thead>
                        <tr className="text-sm">
                            <th>Name</th>
                            <th>Price (kr)</th>
                            <th>Categories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 ? (
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
                            })
                        ) : (
                            <tr>
                                <td>No results</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {pages && (
                    <Pagination
                        pages={pages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
        </>
    );
};
export default ProductList;
