import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryList = () => {
    const [categories, setCategories] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/categories");
            const fetchedCategories = await res.json();
            setCategories(fetchedCategories.data);
        })();
    }, []);
    return (
        <>
            <div className="grid grid-cols-3 justify-items-center">
                <h1 className="text-3xl col-start-2">Categories</h1>
                <Link
                    to={"new"}
                    className="btn btn-outline col-start-3 justify-self-end"
                >
                    New
                </Link>
            </div>
            <table className="table table-zebra">
                <thead>
                    <tr className="text-sm">
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories &&
                        categories.map((category) => {
                            return (
                                <tr key={category._id} className="hover">
                                    <td
                                        className="cursor-pointer"
                                        onClick={() => {
                                            navigate(category._id);
                                        }}
                                    >
                                        {category.name}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    );
};
export default CategoryList;
