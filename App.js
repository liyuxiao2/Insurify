import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);

  // Simulate a backend API call
  useEffect(() => {
    // Simulated backend response
    const fetchData = async () => {
      const backendData = {
        coverLetter: {
          title: "Summary",
          description:
            "WildFire Claim",
          details: [
            "John Doe, (555) 123-4567.",
            "ABC-123-456-789",
            "January 10, 2025 – Severe flooding caused by heavy rainfall.",
            "Summary of Damages and Total Claim Amount: The flooding caused significant damage to the basement and ground floor, including: Water damage to flooring and walls. Destruction of furniture (sofa, dining table, chairs). Loss of electronics (television, gaming console). Estimated total damages: $25,000."
          ]
        },
        completedClaimForm: {
          title: "Completed Claim Form",
          description: "Attach the filled-out form provided by the insurance company.",
          details: [
            "Policyholder Information",
            "Incident Details",
            "Damage/Loss Summary",
            "Supporting Documentation",
            "Claimant Declaration and Signature",
            "Request for Action"
          ]
        },
        supportingDocuments: {
          title: "Supporting Documents",
          description: "Organize the documents in the following order:",
          details: [
            "Proof of Loss Form.",
            "Policy Documents (Declarations page and endorsements).",
            "Photos/Videos of Damage.",
            "Receipts or Purchase Records.",
            "Repair Estimates.",
            "Incident or Emergency Reports.",
            "Receipts for ALE."
          ]
        },
        submissionMethod: {
          title: "Submission Method",
          description: "Submit the application through one of the following methods:",
          details: [
            "Online Portal: Upload scanned documents directly.",
            "Email: Send a PDF or ZIP file containing all documents.",
            "Physical Mail: Organize documents in a folder and mail to the insurer’s claims address.",
            "In-Person: Deliver copies to a local insurance office."
          ]
        }
      };
      setTimeout(() => setData(backendData), 1000); // Simulate API delay
    };

    fetchData();
  }, []);

  if (!data) {
    return <div className="loading">Loading data...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Insurance Claim Filing Assistant</h1>
        <p>Let us guide you through the process step by step.</p>
      </header>
      <main>
        <Section title={data.coverLetter.title} description={data.coverLetter.description} details={data.coverLetter.details} isList />
        <CompletedClaimForm />
        <Section title={data.supportingDocuments.title} description={data.supportingDocuments.description} details={data.supportingDocuments.details} isGrid />
        <Section title={data.submissionMethod.title} description={data.submissionMethod.description} details={data.submissionMethod.details} />
      </main>
      <footer>
        <p>&copy; 2025 Insurance Filing Assistant</p>
      </footer>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, description, details, isGrid, isList }) => (
  <section className="section">
    <h2>{title}</h2>
    <p>{description}</p>
    {details.length > 0 && (
      <div className={isGrid ? "details-grid" : ""}>
        {isList ? (
          <ul>
            {details.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          details.map((item, index) => (
            <div key={index} className={isGrid ? "detail-box" : "detail-item"}>{item}</div>
          ))
        )}
      </div>
    )}
  </section>
);

// Completed Claim Form Component
const CompletedClaimForm = () => (
  <section className="section">
    <h2>Completed Claim Form</h2>
    <form className="claim-form">
      <div className="form-group">
        <label>Policyholder Information</label>
        <ul>
          <li><input type="text" placeholder="Full name" /></li>
          <li><input type="text" placeholder="Address" /></li>
          <li><input type="text" placeholder="Contact details (phone number and email)" /></li>
          <li><input type="text" placeholder="Insurance policy number" /></li>
        </ul>
      </div>
      <div className="form-group">
        <label>Incident Details</label>
        <ul>
          <li><input type="text" placeholder="Date and time of the incident" /></li>
          <li><input type="text" placeholder="Nature of the incident" /></li>
          <li><input type="text" placeholder="Location of the incident" /></li>
          <li><textarea placeholder="Brief description of the event"></textarea></li>
        </ul>
      </div>
      <div className="form-group">
        <label>Damage/Loss Summary</label>
        <ul>
          <li><textarea placeholder="Detailed list of damaged or lost items/property"></textarea></li>
          <li><input type="text" placeholder="Estimated costs or replacement value for each item" /></li>
          <li><input type="text" placeholder="Total claim amount being requested" /></li>
        </ul>
      </div>
      <div className="form-group">
        <label>Supporting Documentation</label>
        <ul>
          <li><input type="file" multiple /></li>
        </ul>
      </div>
      <div className="form-group">
        <label>Claimant Declaration and Signature</label>
        <ul>
          <li><textarea placeholder="A signed statement verifying the accuracy of the information provided"></textarea></li>
          <li><input type="text" placeholder="Date and location where the form was signed" /></li>
        </ul>
      </div>
      <div className="form-group">
        <label>Request for Action</label>
        <ul>
          <li><textarea placeholder="A formal request for the claim to be processed in a timely manner"></textarea></li>
          <li><input type="text" placeholder="Contact information for follow-ups or clarification" /></li>
        </ul>
      </div>
      <button type="submit">Submit Claim</button>
    </form>
  </section>
);

export default App;