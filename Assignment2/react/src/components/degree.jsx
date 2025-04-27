import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Degree()
{
    const { shortcode } = useParams(); // Extract from the URL
    const [degree, setDegree] = useState([]);

    useEffect(() =>
    {
            fetch("http://127.0.0.1:8000/api/cohort/?degree=" + shortcode)
                .then((response) => response.json())
                .then((data) =>
                {
                    setDegree(data); // Extract degree information
                })
                .catch((err) => console.log(err));
    }, [shortcode]);

    if (!degree)
        return <p>Loading data...</p>;

    return (
        <>
            <h2>Degree: {shortcode}</h2>
            <ul>
                {degree.map((cohort) =>
                (
                    <li>
                        {cohort.id} ({cohort.name})
                        <br />
                        <Link to={"/cohort/" + cohort.id}>View Cohort</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Degree;