import { useState } from "react";
import TextInput from "../components/TextInput";
import LoadingBackdrop from "../components/Loading";

const ProductForm = (/* { product } */) => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log({
            productName,
            productDescription,
        });
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
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 items-start py-1"
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
                    />
                </div>
                <div className="form-control w-80">
                    <label htmlFor="productCategories" className="label">Category</label>
                    <select id="productCategories" className="select select-bordered">
                        <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option>
                    </select>
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
