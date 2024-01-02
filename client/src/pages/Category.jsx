import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import LoadingBackdrop from "../components/Loading";
import ErrorPage from "./404";

const Category = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const [catRes, prodRes] = await Promise.all([
                fetch(`/api/categories/${id}`),
                fetch(`/api/categories/${id}/products`),
            ]);
            const fetchedCategory = await catRes.json();
            if (catRes.ok) {
                setCategory(fetchedCategory.data);
            } else {
                setNotFound(true);
            }
            const fetchedProducts = await prodRes.json();
            if (fetchedProducts.data.length > 0) {
                setProducts(fetchedProducts.data);
            }
            setIsLoading(false);
        })();
    }, [id]);

    const deleteProduct = async () => {
        setIsLoading(true);
        try {
            await fetch(`/api/categories/${id}`, { method: "DELETE" });
            navigate("/categories");
        } catch {
            // set error message here
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <LoadingBackdrop />}
            {notFound && <ErrorPage />}
            {category && (
                <div className="card-body">
                    <h2 className="card-title">{category.name}</h2>
                    <div className="card-actions justify-end">
                        <button
                            className="btn btn-outline"
                            onClick={() => {
                                navigate("edit");
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={() => {
                                setShowDeleteModal(true);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                    {showDeleteModal && (
                        <ConfirmationModal
                            title="Delete"
                            text="Are you sure you want to delete this product?"
                            buttonText="Delete"
                            onClick={deleteProduct}
                            setShowModal={setShowDeleteModal}
                        />
                    )}
                    {products && (
                        <div className="products overflow-x-scroll">
                            <h2 className="text-xl">Products in category</h2>
                            <table className="table table-zebra w-fit min-w-[250px]">
                                <tbody>
                                    {products.map((product) => {
                                        return (
                                            <tr
                                                key={product._id}
                                                className="hover"
                                            >
                                                <td
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        navigate(
                                                            `/products/${product._id}`
                                                        );
                                                    }}
                                                >
                                                    {product.name}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Category;
