import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting

function CreateDegree()
{
    const [shortcode, setShortcode] = useState("");
    const [fullName, setFullName] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        // Create the new degree object with the correct field names
        const newDegree =
        {
            full_name: fullName,
            shortcode: shortcode
        };

        fetch("http://127.0.0.1:8000/api/degree/", 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newDegree),
        })
            .then((response) => response.json())
            .then(() =>
            {
                setMessage(`Degree "${newDegree.full_name}" created successfully!`);
                setShortcode("");
                setFullName("");

                // Wait before redirecting, user can read success message
                setTimeout(() => navigate("/allDegrees"), 1000);
            })
            .catch(() => setMessage("Error: Could not create degree."));
    };

    return (
        <div className="mt-5">
            <h2>Create a New Degree</h2>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="mb-3">
                    <label htmlFor="shortcode">Degree Shortcode</label>
                    <input
                        type="text"
                        id="shortcode"
                        value={shortcode}
                        onChange={(e) => setShortcode(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fullName">Degree Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Degree
                </button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default CreateDegree;
