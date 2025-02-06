import { Link } from "react-router";

export default function NotFound() {
    return <div>
        Sorry, you reached here by mistake. the page was not found <Link to="/">Go back to home</Link>
    </div>
}