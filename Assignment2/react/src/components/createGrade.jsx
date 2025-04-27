import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SetStudentGrade()
{
    const [cohorts, setCohorts] = useState([]);
    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);

    const [selectedModule, setSelectedModule] = useState("");
    const [selectedCohort, setSelectedCohort] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [caMark, setCaMark] = useState("");
    const [examMark, setExamMark] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() =>
    {
        fetch("http://127.0.0.1:8000/api/cohort/")
            .then((response) => response.json())
            .then((data) => setCohorts(data))
            .catch(() => console.error("Error fetching cohorts"));

        fetch("http://127.0.0.1:8000/api/student/")
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch(() => console.error("Error fetching students"));

        fetch("http://127.0.0.1:8000/api/module/")
            .then((response) => response.json())
            .then((data) => setModules(data))
            .catch(() => console.error("Error fetching modules"));
    }, []);

    const handleSubmit = (e) =>
    {
        e.preventDefault();
    
        const studentUrl = "http://127.0.0.1:8000/api/student/" + selectedStudent + "/";
        const moduleUrl = "http://127.0.0.1:8000/api/module/" + selectedModule + "/";
        const cohortUrl = "http://127.0.0.1:8000/api/cohort/" + selectedCohort + "/";
    
        // Fetch existing grades for the selected student
        fetch("http://127.0.0.1:8000/api/grade/?student=" + selectedStudent)
            .then((response) => response.json())
            .then((grades) =>
            {
                // Check if a grade already exists for the selected module
                const existingGrade = grades.find((grade) => grade.module.replace(/\/$/, "") === moduleUrl.replace(/\/$/, ""));

                const newGrade =
                {
                    module: moduleUrl,
                    cohort: cohortUrl,
                    student: studentUrl,
                    ca_mark: Number(caMark),
                    exam_mark: Number(examMark),
                };
    
                if (existingGrade)
                {
                
                    return fetch("http://127.0.0.1:8000/api/grade/" + existingGrade.id + "/",
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newGrade),
                    });
                }
                else
                {
                    // If no grade exists, create a new one using POST
                    return fetch("http://127.0.0.1:8000/api/grade/",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newGrade),
                    });
                }
            })
            .then((response) =>
            {
                if (!response.ok) throw new Error("Failed to save grade");
                return response.json();
            })
            .then(() =>
            {
                let tempid = selectedStudent
                setMessage("Grade successfully added/updated!");
                setSelectedModule("");
                setSelectedCohort("");
                setSelectedStudent("");
                setCaMark("");
                setExamMark("");
    
                setTimeout(() => navigate("/student/" + tempid), 1000);
            })
            .catch(() => setMessage("Error: Could not save grade."));
    };
    
    

    return (
        <div className="mt-5">
            <h2>Set Student Grade</h2>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="mb-3">
                    <label htmlFor="module">Module</label>
                    <select
                        id="module"
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                        required
                    >
                        <option value="">Select Module</option>
                        {modules.map((module) =>
                        (
                            <option key={module.code} value={module.code}>
                                {module.code} ({module.full_name})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="cohort">Cohort</label>
                    <select
                        id="cohort"
                        value={selectedCohort}
                        onChange={(e) => setSelectedCohort(e.target.value)}
                        required
                    >
                        <option value="">Select Cohort</option>
                        {cohorts.map((cohort) =>
                        (
                            <option key={cohort.id} value={cohort.id}>
                                {cohort.id}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="student">Student</label>
                    <select
                        id="student"
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        required
                    >
                        <option value="">Select Student</option>
                        {students.map((student) =>
                        (
                            <option key={student.student_id} value={student.student_id}>
                                ({student.student_id}) {student.first_name} {student.last_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="caMark">CA Mark</label>
                    <input
                        type="number"
                        id="caMark"
                        value={caMark}
                        onChange={(e) => setCaMark(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="examMark">Exam Mark</label>
                    <input
                        type="number"
                        id="examMark"
                        value={examMark}
                        onChange={(e) => setExamMark(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit Grade
                </button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default SetStudentGrade;
