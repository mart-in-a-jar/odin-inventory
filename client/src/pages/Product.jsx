import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import LoadingBackdrop from "../components/Loading";
import ErrorPage from "./404";

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await fetch(`/api/products/${id}`);
            const fetchedProduct = await res.json();
            if (res.ok) {
                setProduct(fetchedProduct.data);
            } else {
                setNotFound(true);
            }
            setIsLoading(false);
        })();
    }, [id]);

    const deleteProduct = async () => {
        setIsLoading(true);
        try {
            await fetch(`/api/products/${id}`, { method: "DELETE" });
            navigate("/products");
        } catch {
            // set error message here
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <LoadingBackdrop />}
            {notFound && <ErrorPage />}
            {product && (
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure className="self-start">
                        <img
                            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                            alt="Movie"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Pris: {product.price?.NOK}</p>
                        {product.categories && (
                            <>
                                <h3 className="text-lg mt-8">Categories</h3>
                                <ul>
                                    {product.categories.map((cat) => {
                                        return (
                                            <li key={cat._id}>
                                                <Link
                                                    className="link"
                                                    to={
                                                        "/categories/" + cat._id
                                                    }
                                                >
                                                    {cat.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-primary btn-accent"
                                onClick={() => {
                                    navigate("edit");
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-primary btn-error"
                                onClick={() => {
                                    setShowDeleteModal(true);
                                }}
                            >
                                Delete
                            </button>
                        </div>
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
                </div>
            )}
        </>
    );
};

export default Product;
