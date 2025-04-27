import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllCohorts()
{
    const [cohorts, setCohorts] = useState([]);

    useEffect(() =>
    {
            fetch("http://127.0.0.1:8000/api/cohort")
                .then((response) => response.json())
                .then((data) =>
                {
                    setCohorts(data); // Extract cohort information
                })
                .catch((err) => console.log(err));
    }, []); // Empty array = runs once on mount

    if (!cohorts)
        return <p>Loading data...</p>;

    return (
        <ul>
            {cohorts.map((cohort) =>
            (
                <li>
                    {cohort.id} ({cohort.name})
                    <br/>
                    <Link to={"/cohort/" + cohort.id}>View cohort</Link>
                </li>
            ))}
        </ul>
    );
}

export default AllCohorts;