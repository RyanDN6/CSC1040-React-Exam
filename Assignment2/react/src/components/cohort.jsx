import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Cohort()
{
    const { id } = useParams(); // Extract from the URL
    const [cohort, setCohort] = useState([]);

    useEffect(() =>
    {
            fetch("http://127.0.0.1:8000/api/student/?cohort=" + id)
                .then((response) => response.json())
                .then((data) =>
                {
                    setCohort(data); // Extract cohort information
                })
                .catch((err) => console.log(err));
    }, [id]);

    if (!cohort)
        return <p>Loading data...</p>;

    return (
        <>
            <h2>Cohort: {id}</h2>
            <Link style={{ display: 'block', textAlign: 'center', margin: '10px 0' }} to={"/cohort/" + id + "/modules"}>View Modules for this Cohort</Link>
            <ul>
                {cohort.map((student) =>
                (
                    <li>
                        Student ID: {student.student_id}
                        <br/>
                        Student Name: {student.first_name} {student.last_name}
                        <br/>
                        <Link to={"/student/" + student.student_id}>View Student</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Cohort;