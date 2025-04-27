import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllModules()
{
    const [modules, setModules] = useState([]);

    useEffect(() =>
    {
            fetch("http://127.0.0.1:8000/api/module")
                .then((response) => response.json())
                .then((data) =>
                {
                    setModules(data); // Extract module information
                })
                .catch((err) => console.log(err));
    }, []); // Empty array = runs once on mount

    return (
        <ul>
            {modules.map((module) =>
            (
                <li>
                    {module.code} ({module.full_name})
                    <br/>
                    <Link to={"/module/" + module.code}>View Module</Link>
                </li>
            ))}
        </ul>
    );
}

export default AllModules;