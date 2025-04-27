import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateModule()
{
    const [code, setCode] = useState("");
    const [fullName, setFullName] = useState("");
    const [cohorts, setCohorts] = useState([]);
    const [ca, setCa] = useState(0);
    const [message, setMessage] = useState("");
    const [allCohorts, setAllCohorts] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>
    {
        fetch("http://127.0.0.1:8000/api/cohort")
            .then((response) => response.json())
            .then((data) => setAllCohorts(data))
            .catch(() => setMessage("Error: Could not load cohorts."));
    }, []);

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        // Construct the full URLs for the selected cohorts
        const cohortUrls = cohorts.map((cohortId) => "http://127.0.0.1:8000/api/cohort/" + cohortId + "/");

        // Create the new module object
        const newModule =
        { 
            code: code,
            full_name: fullName,
            delivered_to: cohortUrls,
            ca_split: ca
        };

        console.log("New Module Data:", newModule); // Debugging

        fetch("http://127.0.0.1:8000/api/module/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newModule),
        })
            .then((response) => response.json())
            .then((data) =>
            {
                console.log("API Response:", data); // Debugging
                setMessage(`Module "${fullName}" created successfully!`);
                setCode("");
                setFullName("");
                setCohorts([]);
                setCa(0);

                // Wait before redirecting, user can read success message
                setTimeout(() => navigate("/allModules"), 1000);
            })
            .catch(() => setMessage("Error: Could not create module."));
    };

    const handleCohortChange = (e) =>
    {
        const { value, checked } = e.target;

        // If the checkbox is checked, add the cohort ID to the selected cohorts array
        if (checked)
            setCohorts((prevCohorts) => [...prevCohorts, value]);
        else
            // Otherwise, remove it from the selected cohorts array
            setCohorts((prevCohorts) => prevCohorts.filter((id) => id !== value));
    };

    return (
        <div className="mt-5">
            <h2>Create a New Module</h2>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="mb-3">
                    <label htmlFor="id">Module Code</label>
                    <input
                        type="text"
                        id="id"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name">Module Name</label>
                    <input
                        type="text"
                        id="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="year">CA Split</label>
                    <input
                        type="number"
                        id="year"
                        value={ca}
                        onChange={(e) => setCa(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cohorts">Select Cohort(s)</label>
                    <div className="cohort-options">
                        {allCohorts.map((cohort) =>
                        (
                            <div className="cohort-item" key={cohort.id}>
                                <input
                                    type="checkbox"
                                    id={cohort.id}
                                    value={cohort.id}
                                    onChange={handleCohortChange}
                                    checked={cohorts.includes(cohort.id)}
                                />
                                <label htmlFor={cohort.id}>
                                    {cohort.id}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Module
                </button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default CreateModule;