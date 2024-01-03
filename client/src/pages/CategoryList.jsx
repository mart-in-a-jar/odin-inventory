import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SortIcon } from "../components/SortIcon";

const CategoryList = () => {
    const [categories, setCategories] = useState(null);
    const navigate = useNavigate();
    const [sortDirection, setSortDirection] = useState(null);

    useEffect(() => {
        (async () => {
            let url = "/api/categories";
            if (sortDirection) {
                url += `?sort=name-${sortDirection}`;
            }
            const res = await fetch(url);
            const fetchedCategories = await res.json();
            setCategories(fetchedCategories.data);
        })();
    }, [sortDirection]);

    const changeSorting = () => {
        if (sortDirection === null) {
            setSortDirection("asc");
            return;
        }
        if (sortDirection === "asc") {
            setSortDirection("dec");
            return;
        }
        setSortDirection(null);
    };

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
                        <th
                            className="flex gap-x-1 items-center fill-gray-600 cursor-pointer"
                            onClick={changeSorting}
                        >
                            <SortIcon sort={sortDirection} />
                            <span className="select-none">Name</span>
                        </th>
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
