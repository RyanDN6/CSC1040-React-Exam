import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">University System</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/allDegrees">All Degrees</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/allCohorts">All Cohorts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/allModules">All Modules</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/degree/create">Add Degree</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cohort/create">Add Cohort</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/module/create">Add Module</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/student/create">Add Student</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/grade/create">Set Grade</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;