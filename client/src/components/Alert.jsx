// We have to write out all class names that tailwind should generate
// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
const variants = {
    success: "alert-success",
    info: "alert-info",
    warning: "alert-warning",
    error: "alert-error",
};
Object.freeze(variants);

const Alert = ({ type, text }) => {
    let icon;
    switch (type.toLowerCase()) {
        case "success":
            icon = <SuccessIcon />;
            break;
        case "info":
            icon = <InfoIcon />;
            break;
        case "warning":
            icon = <WarningIcon />;
            break;
        case "error":
            icon = <ErrorIcon />;
            break;
        default:
            icon = <InfoIcon />;
            break;
    }
    return (
        <div
            role="alert"
            className={`alert ${
                variants[type.toLowerCase()]
            } w-auto self-center font-medium`}
        >
            {icon}
            <span>{text}</span>
        </div>
    );
};

const SuccessIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
};

const InfoIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
        </svg>
    );
};

const ErrorIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
};

const WarningIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
        </svg>
    );
};

export default Alert;
