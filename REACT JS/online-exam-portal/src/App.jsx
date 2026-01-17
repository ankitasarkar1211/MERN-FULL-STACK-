import React, {useState} from 'react';
import './index.css';

function ExamPortal() {
  const [student, setStudent] = useState({
    name: "",
    isLoggedIn: false,
    hasPaidFees: false,
    examStatus: "not_started", // possible values: not_started, in_progress, completed
    score: ""
  });
  const [error, setError] = useState("");

  return(
    <div className='main'>
      <h1 style={{color: "white"}}>Online Exam Portal</h1>
      <div className='exam-card'>
        <input
          type="text"
          placeholder= "Enter your name"
          value= {student.name}
          onChange= {(e) => setStudent({...student, name: e.target.value})}
        />
        <div className='login'>
          <p>Logged In: </p>
          <input
            type= "checkbox"
            checked= {student.isLoggedIn}
            onChange= {(e) => setStudent({...student, isLoggedIn: e.target.checked})}
          />
        </div>
        <div className='paid-fees'>
          <p>Fees Paid: </p>
          <input
            type= "checkbox"
            checked= {student.hasPaidFees}
            onChange= {(e) => setStudent({...student, hasPaidFees: e.target.checked})}
          />
        </div>
        <div className='exam-status'>
          <p>Exam Status: </p>
          <select value={student.examStatus} 
            onChange={(e) => setStudent({...student, examStatus: e.target.value})}
          >
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className='score-input'>
          <p>Score(if exam is completed): </p>
          <input
            type= "number"
            placeholder="Enter your score"
            value={student.score}
            onChange={(e) => setStudent({...student, score: Number(e.target.value)})}
          />
        </div>

        <div className= 'error-message'>
          {!student.isLoggedIn && (
            <p>Please log in to access the exam portal.</p>
          )}
        </div>
        <div className= 'error-message'>
          {!student.hasPaidFees && (
            <p>Please pay fees to access the exam portal.</p>
          )}
        </div>

        <div className='exam-info'>
          {student.isLoggedIn && student.hasPaidFees && (
            <>
            {student.examStatus === "not_started" && (
              <p>Hello {student.name}, your exam has not started yet. Please wait for the scheduled time.</p>
            )}
            {student.examStatus === "in_progress" && (
              <p>Hello {student.name}, your exam is currently in progress. Best of luck!</p>
            )}

            {student.examStatus === "completed" && (
              <>
              <p>Hello {student.name}, you have completed the exam.</p>
              {student.score >= 40 ? (
                <p>Congratulations! You have passed the exam with a score of {student.score}.</p>
              ) : (
                <p>Unfortunately, you have not passed the exam. Your score is {student.score}. Better luck next time!</p>
              )}
              </> 
            )}
            </>
          )}
        </div>
        
      </div>
    </div>   
  );
}

export default ExamPortal;