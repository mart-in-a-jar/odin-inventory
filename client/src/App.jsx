import "./App.scss";

function App() {
    return (
        // <div className="main bg-base-500 min-h-screen flex flex-col items-center justify-center">
        // <div className="bg-base-700 p-10 rounded-2xl">
        <div className="min-h-screen flex flex-col items-center justify-center">
            {/* <h1 className="px-5 py-3 rounded-xl bg-base-100 text-3xl font-bold underline">
                Hello world!
            </h1> */}
            <button className="btn">Button</button>
            <details className="dropdown">
                <summary className="m-1 btn">open or close</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li>
                        <a>Item 1</a>
                    </li>
                    <li>
                        <a>Item 2</a>
                    </li>
                </ul>
            </details>
        </div>
        // </div>
        // </div>
    );
}

export default App;
