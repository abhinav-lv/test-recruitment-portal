// Import hooks and packages
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/global.css'

// Function to capitalize the first letter of a string
function capitalize(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}

// Instructions Page
const Instructions = () => {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {                       
        if(!location.state) navigate('/') // eslint-disable-next-line
    },[])

    const domain = location.state?.domain
    console.log(domain)

    return (
        <div style={{height: '100vh'}} className="instrCon">
            <div className="instrMain">
                <div className="instrLeft">
                    {`${capitalize(domain)} Quiz`}
                </div>
                <div className="instrRight">
                    <div className='heading2'>
                        Instructions
                    </div>
                    <div className='sub-heading'>
                        Please read the instructions carefully before attempting the quiz
                    </div>
      
                    <ul style={{ textAlign: "left" }}>
                        <li>
                            The participant can attempt the quiz only ONCE.
                        </li>
                        {domain === "Technical2" ? (null) : (
                        <li>
                            {
                            domain === "Technical"
                            ? "The quiz will have 10 multiple choice questions."
                            : domain === "Management"
                                ? "The quiz will have 5 Long Answer type questions."
                                : "The quiz will have 10 multiple choice questions."
                            }
                         </li>
                        )} 
                        {domain === "Technical2" ? (null) : (
                         <li>
                            {
                            domain === "Technical"
                            ? "10 minutes will be provided to complete the quiz."
                            : domain === "Management"
                                ? "There is no time limit for completing the quiz."
                                : "10 minutes will be provided to complete the quiz."}
                        </li>
                        )}
                        {domain === "Technical2" ? (
                        <li>
                            In case the participant tries to close the web portal or go back from the
                            quiz, the quiz will be auto submitted.
                         </li>
                        ) : (
                        <li>
                            In case the participant tries to close the web portal or go back from the
                            quiz, it shall be considered a case of malpractice and the quiz will be auto
                            submitted.
                        </li>
                        )}
                    </ul>
                    <Link  to={'/'} className='instrbtn1'>
                        Start Test
                    </Link>
     
                </div>
            </div>
        </div>
    )
}

export default Instructions