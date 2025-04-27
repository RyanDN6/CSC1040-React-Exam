import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function CohortModules()
{   
    const { id } = useParams();
    const [modules, setModules] = useState([]);

    useEffect(() =>
    {
            fetch("http://127.0.0.1:8000/api/module/?delivered_to=" + id)
                .then((response) => response.json())
                .then((data) =>
                {
                    setModules(data); // Extract module information
                })
                .catch((err) => console.log(err));
    }, [id]); // Empty array = runs once on mount

    if (!modules)
        return <p>Loading data...</p>;

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

export default CohortModules;