import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBackdrop from "../components/Loading";
import ErrorPage from "./404";
import ConfirmationModal from "../components/ConfirmationModal";

const Category = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await fetch(`/api/categories/${id}`);
            const fetchedCategory = await res.json();
            if (res.ok) {
                setCategory(fetchedCategory.data);
            } else {
                setNotFound(true);
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

export default Category;
