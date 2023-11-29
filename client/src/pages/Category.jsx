import { useParams } from "react-router-dom";

const Category = () => {
    const { id } = useParams();
    return <div>Hei {id}</div>;
};

export default Category;
