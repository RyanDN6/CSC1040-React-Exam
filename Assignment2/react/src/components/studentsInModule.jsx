import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function StudentsInModule() 
{
    const { code } = useParams(); // Extract from the URL
    const [cohortIds, setCohortIds] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true); // May be checking multiple cohorts, only display once all are fetched

    // Step 1: Fetch the module and extract cohort IDs
    useEffect(() => 
    {
        fetch("http://127.0.0.1:8000/api/module/" + code)
            .then((response) => response.json())
            .then((data) => 
            {
                if (data.delivered_to && data.delivered_to.length > 0) 
                {
                    const ids = data.delivered_to.map(url => url.split("/").filter(Boolean).pop()); // Extract cohort IDs
                    setCohortIds(ids);
                }
            })
            .catch(err => console.log(err));
    }, [code]);

    // Step 2: Fetch all students for each cohort
    useEffect(() => 
    {
        if (cohortIds.length > 0) 
        {
            Promise.all
            (
                cohortIds.map(cohortId => 
                    fetch("http://127.0.0.1:8000/api/student/?cohort=" + cohortId)
                        .then((response) => response.json())
                        .catch(err => {console.log(err)})
                )
            )
            .then((data) => 
            {
                const allStudents = data.flat();
                setStudents(allStudents);
                setLoading(false);
            });
        }
    }, [cohortIds]);

    if (loading) 
        return <p>Loading students...</p>;

    return (
        <>
            <h2>Module: {code}</h2>
            <h3>Students Enrolled</h3>
            <ul>
                {students.map(student =>
                (
                    <li>
                        <strong>{student.first_name} {student.last_name}</strong> (ID: {student.student_id})
                        <br />
                        <Link to={"/student/" + student.student_id}>View Student</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default StudentsInModule;