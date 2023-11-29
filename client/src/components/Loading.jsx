const LoadingBackdrop = () => {
    return (
        <div className="backdrop-blur-sm w-screen h-screen absolute inset-0 flex items-center justify-center z-50">
            <span className="loading loading-spinner w-24"></span>
        </div>
    );
};

export default LoadingBackdrop;
