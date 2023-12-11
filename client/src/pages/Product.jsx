import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingBackdrop from "../components/Loading";

const Product = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/products/${id}`);
            const fetchedProduct = await res.json();
            if (res.ok) {
                setProduct(fetchedProduct.data);
                return;
            }
            navigate("/not_found");
        })();
    }, [id, navigate]);

    const deleteProduct = async () => {
        setIsLoading(true);
        try {
            await fetch(`/api/products/${id}`, { method: "DELETE" });
            navigate("/products");
        } catch {
            // set error message
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // hide modal on escape
        // move to extracted component
        const hideModal = (e) => {
            if (e.key === "Escape" && showDeleteModal) {
                setShowDeleteModal(false);
            }
        };
        document.addEventListener("keydown", hideModal);
        return () => {
            document.removeEventListener("keydown", hideModal);
        };
    }, [showDeleteModal]);

    return (
        <>
            {isLoading && <LoadingBackdrop />}
            <div className="card card-side bg-base-100 shadow-xl">
                {product && (
                    <>
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
                                                            "/categories/" +
                                                            cat._id
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
                            <>
                                {/* extract this
                            add spinner when trying to delete */}
                                <dialog
                                    id="my_modal_5"
                                    className="modal modal-bottom sm:modal-middle modal-open"
                                >
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">
                                            Delete
                                        </h3>
                                        <p className="py-4">
                                            Are you sure you want to delete this
                                            product?
                                        </p>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button
                                                    className="btn btn-error"
                                                    onClick={deleteProduct}
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <form
                                        method="dialog"
                                        className="modal-backdrop"
                                    >
                                        <button
                                            className="cursor-default"
                                            onClick={() => {
                                                setShowDeleteModal(false);
                                            }}
                                        >
                                            close
                                        </button>
                                    </form>
                                </dialog>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Product;
