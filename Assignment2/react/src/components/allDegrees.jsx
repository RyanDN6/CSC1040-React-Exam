import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllDegrees()
{
    const [degrees, setDegrees] = useState([]);

    useEffect(() =>
    {
            fetch("http://127.0.0.1:8000/api/degree")
                .then((response) => response.json())
                .then((data) =>
                {
                    setDegrees(data); // Extract degree information
                })
                .catch((err) => console.log(err));
    }, []); // Empty array = runs once on mount

    if (!degrees)
        return <p>Loading data...</p>;

    return (
        <ul>
            {degrees.map((degree) =>
            (
                <li>
                    {degree.shortcode} ({degree.full_name})
                    <br/>
                    <Link to={"/degree/" + degree.shortcode}>View Degree</Link>
                </li>
            ))}
        </ul>
    );
}

export default AllDegrees;