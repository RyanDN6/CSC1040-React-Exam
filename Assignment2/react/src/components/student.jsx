import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Student()
{
    const { id } = useParams(); // Extract from the URL
    const [student, setStudent] = useState([]);
    const [cohort, setCohort] = useState("");
    const [modules, setModules] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() =>
    {
        fetch("http://127.0.0.1:8000/api/student/" + id)
            .then((response) => response.json())
            .then((data) =>
            {
                setStudent(data); // Extract student information
                if (data.cohort) 
                {
                    // Extract the cohort (e.g., COMBUS1) from the URL
                    const cohortCode = data.cohort.split("/").filter(Boolean).pop();
                    setCohort(cohortCode); // Update the cohort state
                }
            })
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => 
    {
        // Fetch modules data only when cohort is set
        if (cohort) 
        {
            fetch("http://127.0.0.1:8000/api/module/?delivered_to=" + cohort)
                .then((response) => response.json())
                .then((data) => 
                {
                    setModules(data); // Extract module information
                })
                .catch((err) => console.log(err));
        }
    }, [cohort]);

    useEffect(() =>
    {
        if (student)
        {
            fetch("http://127.0.0.1:8000/api/grade/?student=" + id)
                .then((response) => response.json())
                .then((data) => 
                {
                    setGrades(data); // Extract grades
                })
                .catch((err) => console.log(err));   
        }

    }, [student, id]);

    if (!student || !grades)
        return <p>Loading student data...</p>;

    return (
        <>
            <div>
                <h2>Student Details</h2>
                <p>
                    Name: {student.first_name} {student.last_name}
                    <br />
                    ID: {student.student_id}
                    <br />
                    Email: {student.email}
                    <br />
                    Cohort: {cohort}
                </p>
            </div>
            <div>
                <h2>Student Modules & Grades</h2>
                <ul>
                    {modules.map((module) =>
                    {
                        const moduleCode = module.code; // Extract module code
                        const studentGrade = grades.find((grade) => grade.module.includes(moduleCode)); // Find matching grade

                        return (
                            <li>
                                <strong>{moduleCode} ({module.full_name})</strong>
                                <br />
                                <Link to={"/module/" + moduleCode}>View Module</Link>
                                {studentGrade ?
                                (
                                    <p>
                                        CA Mark: {studentGrade.ca_mark}%
                                        <br />
                                        Exam Mark: {studentGrade.exam_mark}%
                                        <br />
                                        Total Grade: {studentGrade.total_grade}%
                                    </p>
                                )
                                :
                                (
                                    <p>No grades for this module yet.</p>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
    }

export default Student;