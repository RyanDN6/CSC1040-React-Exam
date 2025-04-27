import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Module()
{
    const { code } = useParams(); // Extract from the URL
    const [module, setModule] = useState("");

    useEffect(() =>
    {
            fetch("http://127.0.0.1:8000/api/module/" + code)
                .then((response) => response.json())
                .then((data) =>
                {
                    setModule(data); // Extract Module information
                })
                .catch((err) => console.log(err));
    }, [code]);

    if (!module)
        return <p>Loading data...</p>;

    return (
        <>
            <h2>Module: {code}</h2>
            
            <p>
                Name: {module.full_name}
                <br />
                CA Split: {module.ca_split}
                <br />
                <Link to={"/module/" + code + "/students"}>View Students in Module</Link>
            </p>
        </>
    );
}

export default Module;