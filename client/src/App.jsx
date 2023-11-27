import "./App.scss";

function App() {
    return (
        <div className="main">
            <div className="min-h-screen flex flex-col items-center justify-center">
                <button className="btn">Button</button>
                <details className="dropdown">
                    <summary className="m-1 btn">open or close</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52">
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </details>
            </div>
        </div>
    );
}

export default App;
