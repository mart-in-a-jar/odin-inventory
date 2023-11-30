import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="container flex flex-col items-center justify-center px-5 mb-8 mt-24">
            <div className="max-w-md text-center">
                <h2 className="mb-8 font-extrabold text-9xl">
                    <span className="sr-only">Error</span>404
                </h2>
                <p className="text-2xl font-semibold md:text-3xl mb-8">
                    Sorry, we couldn&apos;t find this page.
                </p>
                <Link
                    to="/"
                    className="px-8 py-3 font-semibold rounded btn btn-primary"
                >
                    Back to homepage
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
