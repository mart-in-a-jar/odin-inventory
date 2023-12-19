import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import LoadingBackdrop from "../components/Loading";
import Multiselect from "../components/Multiselect";
import TextInput from "../components/TextInput";

const ProductForm = ({ editMode }) => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // if page edit (not new), set product values from DB
        if (editMode) {
            (async () => {
                const res = await fetch("/api/products/" + id);
                const fetchedProduct = await res.json();
                if (res.ok) {
                    const product = fetchedProduct.data;
                    setProductName(product.name);
                    setProductDescription(product.description);
                    setProductPrice(product.price.NOK);
                    setProductCategories(product.categories);
                    return;
                }
                navigate("/not_found");
            })();
        }
    }, []);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/categories");
            const fetchedCategories = await res.json();
            if (res.ok) {
                setCategories(fetchedCategories.data);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);
        const payload = {
            name: productName,
            description: productDescription,
            price: {
                NOK: +productPrice,
            },
            categories: productCategories.map((cat) => cat._id),
        };
        try {
            const url = editMode ? `/api/products/${id}` : "/api/products";
            const method = editMode ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                // Successfully created new product
                const newProduct = await res.json();
                navigate(`/products/${newProduct._id}`);
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

    const handleInput = (e) => {
        switch (e.target.id) {
            case "productName":
                setProductName(e.target.value);
                break;
            case "productDescription":
                setProductDescription(e.target.value);
                break;
            case "productPrice":
                setProductPrice(e.target.value);
                break;

            default:
                break;
        }
    };

    return (
        <>
            {isLoading && <LoadingBackdrop />}
            {errorMessage && <Alert type="error" text={errorMessage} />}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 items-start py-1 self-center"
            >
                <TextInput
                    id="productName"
                    name="Name *"
                    value={productName}
                    onChange={handleInput}
                    disabled={isLoading}
                    maxLength={100}
                    required
                />
                <Multiselect
                    options={categories}
                    value={productCategories}
                    onChange={setProductCategories}
                    label="Category"
                    placeholder="Choose categories"
                    disabled={isLoading}
                    searchBar
                />
                <div className="form-control w-80">
                    <label htmlFor="productDescription" className="label">
                        Description
                    </label>
                    <textarea
                        className="textarea textarea-bordered"
                        id="productDescription"
                        disabled={isLoading}
                        value={productDescription}
                        onChange={handleInput}
                        maxLength={200}
                    ></textarea>
                </div>
                <div className="form-control w-24">
                    <label htmlFor="productPrice" className="label">
                        Price *
                    </label>
                    <input
                        type="tel"
                        id="productPrice"
                        className="input input-bordered"
                        pattern="\d+"
                        title="Please enter a valid number"
                        value={productPrice}
                        onChange={handleInput}
                        autoComplete="off"
                        required
                        disabled={isLoading}
                    />
                </div>

                <button
                    className="btn btn-outline"
                    type="submit"
                    disabled={isLoading}
                >
                    {editMode ? "Update" : "Create"}
                </button>
            </form>
        </>
    );
};

export default ProductForm;
