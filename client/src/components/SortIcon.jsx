export const SortIcon = ({ sort }) => {
    if (sort === "asc") {
        return <SortUpIcon />;
    }
    if (sort === "dec") {
        return <SortDownIcon />;
    }
    return <Sort />;
};

const SortUpIcon = (props) => (
    <svg
        width="0.63em"
        height="1em"
        viewBox="0 0 320 512"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41"></path>
    </svg>
);

const SortDownIcon = (props) => (
    <svg
        width="0.63em"
        height="1em"
        viewBox="0 0 320 512"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41"></path>
    </svg>
);

const Sort = (props) => (
    <svg
        width="0.73em"
        height="1em"
        viewBox="0 0 1024 1408"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M1024 896q0 26-19 45l-448 448q-19 19-45 19t-45-19L19 941Q0 922 0 896t19-45t45-19h896q26 0 45 19t19 45m0-384q0 26-19 45t-45 19H64q-26 0-45-19T0 512t19-45L467 19q19-19 45-19t45 19l448 448q19 19 19 45"></path>
    </svg>
);
