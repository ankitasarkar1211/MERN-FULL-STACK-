import React, {useState} from "react";
import "./LandingPage.css";

function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return(
    <div className="landing-page">
      <div className="job-hunt">
        <p>No. 1 Job Hunt Portal</p>
      </div>
      <div className="main-text">
        <h1>
          Search, Apply & <br/> Get Your
          <span style={{ color: "#6253c5" }}> Dream Job</span>
        </h1>
      </div>
      <p style={{marginTop: "0px", fontSize: "18px"}}>Find your dream jobs here</p>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for jobs, companies, etc." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
export default LandingPage;