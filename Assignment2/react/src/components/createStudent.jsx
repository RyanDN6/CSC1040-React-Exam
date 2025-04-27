import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateStudent()
{
    const [id, setId] = useState("");
    const [cohort, setCohort] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [message, setMessage] = useState("");
    const [allCohorts, setAllCohorts] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>
    {
        fetch("http://127.0.0.1:8000/api/cohort/")
            .then((response) => response.json())
            .then((data) => setAllCohorts(data))
            .catch(() => setMessage("Error: Could not load cohorts."));
    }, []);

    const handleSubmit = (e) => 
    {
        e.preventDefault();

        // Construct the full URL for the cohort
        const cohortUrl = "http://127.0.0.1:8000/api/cohort/" + cohort + "/";

        // Create the new Student
        const newStudent =
        {
            student_id: id,
            first_name: firstName,
            last_name: lastName,
            cohort: cohortUrl,
        };

        fetch("http://127.0.0.1:8000/api/student/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStudent),
        })
            .then((response) =>
            {
                if (!response.ok)
                    throw new Error("Failed to create student");

                return response.json();
            })
            .then(() =>
            {
                let tempid = id
                setMessage(`Student "${firstName} ${lastName}" created successfully!`);
                setId("");
                setFirstName("");
                setLastName("");
                setCohort("");
                
                // Wait before redirecting, user can read success message
                setTimeout(() => navigate("/student/" + tempid), 1000);
            })
            .catch((error) =>
            {
                console.error(error);
                setMessage("Error: Could not create Student.");
            });
    };

    return (
        <div className="mt-5">
            <h2>Create a New Student</h2>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="mb-3">
                    <label htmlFor="id">Student ID</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName">Student First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName">Student Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cohort">Cohort</label>
                    <select
                        id="cohort"
                        value={cohort}
                        onChange={(e) => setCohort(e.target.value)}
                        required
                    >
                        <option value="">Select a cohort</option>
                        {allCohorts.map((cohort) => (
                            <option key={cohort.id} value={cohort.id}>
                                {cohort.id}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Student
                </button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default CreateStudent;