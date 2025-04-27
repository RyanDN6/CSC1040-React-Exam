import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllDegrees from "./components/allDegrees";
import Degree from "./components/degree";
import AllCohorts from "./components/allCohorts";
import Cohort from "./components/cohort";
import AllModules from "./components/allModules";
import Module from "./components/module";
import CohortModules from "./components/cohortModules";
import Student from "./components/student";
import StudentsInModule from "./components/studentsInModule";
import NavBar from "./components/navBar";
import Home from "./components/home";
import CreateDegree from "./components/createDegree";
import CreateCohort from "./components/createCohort";
import CreateModule from "./components/createModule";
import CreateStudent from "./components/createStudent";
import CreateGrade from "./components/createGrade";

function App() {
    return (
        <Router>
          <header>
            <NavBar/>
          </header>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/allDegrees" element={<AllDegrees />} />
                    <Route path="/degree/:shortcode" element={<Degree />} />
                    <Route path="/degree/create" element={<CreateDegree />} />
                    <Route path="/cohort/:id" element={<Cohort />} />
                    <Route path="/cohort/:id/modules" element={<CohortModules />} />
                    <Route path="/allCohorts" element={<AllCohorts />} />
                    <Route path="/cohort/create" element={<CreateCohort />} />
                    <Route path="/allModules" element={<AllModules />} />
                    <Route path="/module/:code" element={<Module />} />
                    <Route path="/module/create" element={<CreateModule />} />
                    <Route path="/student/:id" element={<Student />} />
                    <Route path="/module/:code/students" element={<StudentsInModule />} />
                    <Route path="/student/create" element={<CreateStudent />} />
                    <Route path="/grade/create" element={<CreateGrade />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
