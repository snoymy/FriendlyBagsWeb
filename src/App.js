import {RoutePath} from "./RoutePath";
import { BrowserRouter as Router} from "react-router-dom";

const App = () => {
    return (
        <>
            <Router>
                <RoutePath/>
            </Router>
        </>
    )
}

export default App;
