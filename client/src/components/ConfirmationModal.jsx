import { useEffect } from "react";

const ConfirmationModal = ({
    title,
    text,
    buttonText,
    onClick,
    setShowModal,
}) => {
    useEffect(() => {
        // hide modal on escape key press
        const hideModal = (e) => {
            if (e.key === "Escape") {
                setShowModal(false);
            }
        };
        document.addEventListener("keydown", hideModal);
        return () => {
            document.removeEventListener("keydown", hideModal);
        };
    }, [setShowModal]);

    return (
        <dialog className="modal modal-bottom sm:modal-middle modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{text}</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-error" onClick={onClick}>
                            {buttonText}
                        </button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button
                    className="cursor-default"
                    onClick={() => {
                        setShowModal(false);
                    }}
                >
                    close
                </button>
            </form>
        </dialog>
    );
};

export default ConfirmationModal;
