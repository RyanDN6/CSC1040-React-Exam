import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting
import { useEffect } from "react";

function CreateCohort()
{
    const [id, setId] = useState("");
    const [year, setYear] = useState(0);
    const [degree, setDegree] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = (e) =>
    {
        e.preventDefault();
    
        // Construct the full URL
        const degreeUrl = "http://127.0.0.1:8000/api/degree/" + degree + "/";
    
        // Create the new cohort object with the correct field names
        const newCohort =
        {
            id: id,
            year: year,
            degree: degreeUrl,
            name: name
        };
    
        console.log("New Cohort Data:", newCohort); // Debugging
    
        fetch("http://127.0.0.1:8000/api/cohort/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCohort),
        })
            .then((response) => response.json())
            .then((data) =>
            {
                console.log("API Response:", data); // Debugging
                setMessage(`Cohort "${name}" created successfully!`);
                setId("");
                setName("");
                setDegree("");
                setYear(0);
    
                // Wait before redirecting, user can read success message
                setTimeout(() => navigate("/allCohorts"), 1000);
            })
            .catch(() => setMessage("Error: Could not create cohort."));
    };

    const [degrees, setDegrees] = useState([]);

    useEffect(() =>
    {
        fetch("http://127.0.0.1:8000/api/degree/")
            .then((response) => response.json())
            .then((data) => setDegrees(data))
            .catch(() => setMessage("Error: Could not load degrees."));
    }, [message]);

    return (
        <div className="mt-5">
            <h2>Create a New Cohort</h2>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="mb-3">
                    <label htmlFor="id">Cohort Code</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name">Cohort Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="year">Year</label>
                    <input
                        type="number"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="degree">Degree</label>
                    <select
                        id="degree"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        required
                    >
                        <option value="">Select a degree</option>
                        {degrees.map((degree) =>
                        (
                            <option key={degree.shortcode} value={degree.shortcode}>
                                {degree.full_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Cohort
                </button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default CreateCohort;
