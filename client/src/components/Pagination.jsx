import Chevron from "./Chevron";

// even number
const NUMBER_OF_BUTTONS_EACH_SIDE = 2;

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
    const pagesArr = [];
    for (let i = currentPage - NUMBER_OF_BUTTONS_EACH_SIDE; i <= pages; i++) {
        if (i < 1) {
            continue;
        }
        if (i > pages) {
            break;
        }
        if (pagesArr.length > NUMBER_OF_BUTTONS_EACH_SIDE * 2) {
            break;
        }
        pagesArr.push({ type: "page", num: i });
    }
    // if first or last page is not in array, add range indicator and start/end
    if (
        !pagesArr.some((ele) => {
            return ele.num === 1;
        })
    ) {
        pagesArr.unshift({ type: "indicator", pos: "start" });
        pagesArr.unshift({ type: "page", num: 1 });
    }
    if (
        !pagesArr.some((ele) => {
            return ele.num === pages;
        })
    ) {
        pagesArr.push({ type: "indicator", pos: "end" });
        pagesArr.push({ type: "page", num: pages });
    }

    return (
        <nav className="join mt-6">
            {currentPage > 1 && (
                <button
                    className="join-item btn px-3"
                    onClick={() => {
                        setCurrentPage(currentPage - 1);
                    }}
                >
                    <Chevron />
                </button>
            )}

            {pagesArr.map((page) => {
                if (page.type === "indicator") {
                    return (
                        <button
                            key={page.pos}
                            className="join-item btn btn-disabled"
                        >
                            ...
                        </button>
                    );
                }
                const classes =
                    page.num === currentPage
                        ? "join-item btn btn-active"
                        : "join-item btn";

                return (
                    <button
                        key={page.num}
                        className={classes}
                        onClick={() => {
                            setCurrentPage(page.num);
                        }}
                    >
                        {page.num}
                    </button>
                );
            })}
            {currentPage < pages && (
                <button
                    className="join-item btn px-3"
                    onClick={() => {
                        setCurrentPage(currentPage + 1);
                    }}
                >
                    <Chevron right />
                </button>
            )}
        </nav>
    );
};

export default Pagination;
