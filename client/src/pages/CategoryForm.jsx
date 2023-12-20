import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBackdrop from "../components/Loading";
import Alert from "../components/Alert";
import TextInput from "../components/TextInput";
import ErrorPage from "./404";

const CategoryForm = ({ editMode }) => {
    const [categoryName, setCategoryName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (editMode) {
            (async () => {
                setIsLoading(true);
                const res = await fetch("/api/categories/" + id);
                const fetchedCategory = await res.json();
                if (res.ok) {
                    setCategoryName(fetchedCategory.data.name);
                } else {
                    setNotFound(true);
                }
                setIsLoading(false);
            })();
        }
    }, [editMode, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);
        const payLoad = {
            name: categoryName,
        };
        try {
            const url = editMode ? `/api/categories/${id}` : `/api/categories`;
            const method = editMode ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payLoad),
            });
            if (res.ok) {
                // Successfully created/updated category
                const newCategory = await res.json();
                navigate(`/categories/${newCategory._id}`);
            } else {
                const data = await res.json();
                setErrorMessage(
                    data.error.message ||
                        res.statusText ||
                        "Something went wrong"
                );
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <LoadingBackdrop />}
            {errorMessage && <Alert type="error" text={errorMessage} />}
            {notFound ? (
                <ErrorPage />
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 items-start py-1 self-center"
                >
                    <h1 className="text-3xl">{`${
                        editMode ? "Edit" : "New"
                    } category`}</h1>
                    <TextInput
                        id="categoryName"
                        name="Name *"
                        value={categoryName}
                        onChange={(e) => {
                            setCategoryName(e.target.value);
                        }}
                        disabled={isLoading}
                        maxLength={60}
                        autoFocus={!editMode}
                        required
                    />
                    <button
                        className="btn btn-outline"
                        type="submit"
                        disabled={isLoading}
                    >
                        {editMode ? "Update" : "Create"}
                    </button>
                </form>
            )}
        </>
    );
};

export default CategoryForm;
