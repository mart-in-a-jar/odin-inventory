import { useEffect, useState } from "react";
import LoadingBackdrop from "../components/Loading";
import Multiselect from "../components/Multiselect";
import TextInput from "../components/TextInput";

const ProductForm = (/* { product } */) => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        console.log({
            name: productName,
            description: productDescription,
            price: {
                NOK: productPrice,
            },
            category: productCategories.map((cat) => cat._id),
        });
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
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
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 items-start py-1 self-center"
                // className="grid grid-cols-2"
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
                        required
                        disabled={isLoading}
                    />
                </div>

                <button
                    className="btn btn-outline"
                    type="submit"
                    disabled={isLoading}
                >
                    Create
                </button>
            </form>
        </>
    );
};

export default ProductForm;
