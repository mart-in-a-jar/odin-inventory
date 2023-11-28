import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ homeButton, centerItems, righItem }) => {
    const handleDropdownOpenClose = () => {
        const element = document.activeElement;
        console.log(element);
        if (element) {
            element.blur();
        }
    };

    return (
        <div className="navbar bg-base-100 border-b mb-2">
            <div className="navbar-start">
                {centerItems && (
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {centerItems.map((item, n) => {
                                return (
                                    <li key={n}>
                                        {item.subMenu ? (
                                            <>
                                                <span className="hover:cursor-default hover:bg-inherit">
                                                    {item.text}
                                                </span>
                                                <ul>
                                                    {item.subMenu.map(
                                                        (subItem, n) => {
                                                            return (
                                                                <li key={n}>
                                                                    <Link
                                                                        to={
                                                                            subItem.path
                                                                        }
                                                                        onClick={
                                                                            handleDropdownOpenClose
                                                                        }
                                                                    >
                                                                        {
                                                                            subItem.text
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                onClick={
                                                    handleDropdownOpenClose
                                                }
                                            >
                                                {item.text}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                {homeButton && (
                    <Link
                        to={homeButton.path}
                        className="text-xl btn btn-ghost"
                    >
                        {homeButton.text}
                    </Link>
                )}
            </div>
            <div className="navbar-center hidden lg:flex">
                {centerItems &&
                    centerItems.map((item, n) => {
                        return (
                            <ul key={n} className="menu menu-horizontal px-1">
                                <li>
                                    {item.subMenu ? (
                                        <details>
                                            <summary>{item.text}</summary>
                                            <ul className="p-2">
                                                {item.subMenu.map(
                                                    (subItem, n) => {
                                                        return (
                                                            <li key={n}>
                                                                <Link
                                                                    to={
                                                                        subItem.path
                                                                    }
                                                                >
                                                                    {
                                                                        subItem.text
                                                                    }
                                                                </Link>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </details>
                                    ) : (
                                        <Link to={item.path}>{item.text}</Link>
                                    )}
                                </li>
                            </ul>
                        );
                    })}
            </div>
            <div className="navbar-end">
                {righItem && (
                    <Link to={righItem.path} className="btn">
                        {righItem.text}
                    </Link>
                )}
            </div>
        </div>
    );
};

const menuItemType = PropTypes.shape({
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
});

Navbar.propTypes = {
    homeButton: menuItemType.isRequired,
    centerItems: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            path: PropTypes.string,
            subMenu: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    path: PropTypes.string,
                })
            ),
        })
    ).isRequired,
    righItem: menuItemType,
};

export default Navbar;
