const ProductForm = ({ product }) => {
    return (
        <form action="">
            <input type="text" value={product.name} />
        </form>
    );
};

export default ProductForm;
