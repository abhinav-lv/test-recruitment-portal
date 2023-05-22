/* Import hooks and packages */
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation, useBeforeUnload } from 'react-router-dom'
import axios from "axios";

/* import Components */
import Modal from "../../components/Modal";
import Timer from "../../components/Timer";

/* ---------------------------------------------------------------- */

/* Get questions from server */
const getQuestions = async (state, setState, location) => {
    try{
        const { domain, subdomain, yearOfStudy } = location.state
        console.log(location.state)
        const res = await axios.post('/questions/get', {
            domain,
            subdomain,
            yearOfStudy,
        })
        console.log(res.data.questions)
        setState({
            ...state,
            questions: res.data.questions
        })
    }
    catch(err){
        console.log(err.response)
    }
}

/* ---------------------------------------------------------------- */

/* Quiz component */
const TechQuiz = () => {

    // Define hooks
    const navigate = useNavigate()
    const location = useLocation()

    // Initialize states
    const [isVisible, setIsVisible] = useState(!document.hidden)
    const [state, setState] = useState({
        currentQuestion: 0,
        questions: false,
        responses: {},
        blueButton: 'blueButton',
        blackButton: 'blackButton',
        showModal: false,
        problem: {status: false, message: ''}
    })

    const onUnload = (e) => {
        e.preventDefault()
        onSubmit()
    }  

    // Double check with user on page reload while giving test
    useBeforeUnload(onUnload)

    // Finish the test session if user changes tabs
    const handleVisibility = useCallback(() => setIsVisible(!document.hidden), [])
    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibility)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibility)
        }
    }, [handleVisibility])

    useEffect(function(){
        if(!location.state) navigate('/selection')
        else{
            getQuestions(state, setState, location) 
        }   // eslint-disable-next-line
    },[])

    useEffect(() => {                   
        if(!isVisible) onConfirm()       // eslint-disable-next-line
    }, [isVisible])

    // Handler functions
    const optionsArray = ['a', 'b', 'c', 'd']

    // Update selected option
    const updateOption = (e) => {
        e.persist()
        const option = e.target.value
        if(option) {
            const temp = {...state.responses}
            temp[`${state.currentQuestion}`] = option
            setState({
                ...state,
                responses: {...temp},
                problem: {status: false, message: ''}
            })
        }
    }

    // Go to previous question
    const gotoPreviousQuestion = () => {
        if(state.currentQuestion > 0){
            setState({
                ...state,
                currentQuestion: state.currentQuestion-1,
                problem: {status: false, message: ''}
            })
        }
    }

    // Go to next question
    const gotoNextQuestion = () => {
        if(!state.responses[state.currentQuestion]){
            setState({
                ...state,
                problem: {status: true, message: 'Please select an option'}
            })
        }
        if(state.currentQuestion < state.questions.length-1 && 
           state.responses[state.currentQuestion]){
            setState({
                ...state,
                currentQuestion: state.currentQuestion+1,
                problem: {status: false, message: ''}
            })
        }
    }

    // Show confirmation modal on clicking Submit
    const showModal1 = () => {
        setState({
            ...state,
            showModal: true
        })
    }

    // Hide modal 
    const hideModal = () => {
        setState({
            ...state,
            showModal: false
        })
    }

    // Handle submit
    const onSubmit = () => {
        if(!state.responses[state.currentQuestion]){
            setState({
                ...state,
                problem: {status: true, message: 'Please select an option'}
            })
        }
        else{
            showModal1()
        }
    }

    // On confirming submit
    const onConfirm = async () => {
        hideModal()
        // console.log(state.responses)
        const responses = Object.keys(state.responses).map((index) => {
            return {
                question: state.questions[index],
                response: state.responses[index]
            }
        })
        const { domain, subdomain } = location.state
        const body = { domain, subdomain, responses }
        try{
            const res = await axios.post('/responses/send', body)
            console.log(res)
            navigate('/selection')
        }
        catch(err){
            console.error(err)
        }
    }

    // JSX
    if(!state.questions){
        return <p>Error</p>
    }

    else return (
        <div className="quizMain">
            <div className="heading">Technical Quiz</div>
                <div className="question-section">

                    {/* QUESTION COUNT  eg: (1/10) */}
                    <div className="question-count">
                        <span>
                            Question{" "}
                            {state.currentQuestion + 1}
                        </span>
                        /{state.questions?.length}
                    </div>

                    {/* QUESTION DESCRIPTION */}
                    <div className="tech-quiz">
                    {
                        state.questions ? state.questions[state.currentQuestion].question : <p></p>
                    }
                    </div>

            {/* Answer section */}
            <div className="answer-section">
                {state.questions ? 
                Object.keys(
                    state.questions[
                        state.currentQuestion
                    ].options
                ).map((key,index) => {
                    if (
                        state.responses[
                            `${state.currentQuestion}`
                        ] === undefined
                    ) {
                        return (
                            <div
                                key={index}
                                onClick={updateOption}
                            >
                                <button
                                    className={
                                        state.responses[state.currentQuestion] === key ?
                                        'blueButton' : 'blackButton' 
                                    }
                                    value={key}
                                >
                                    {
                                        optionsArray[index]
                                    }
                                    .{" "}
                                    {
                                        state.questions[state.currentQuestion].options[key]
                                    }
                                </button>
                            </div>
                        );
                    } else {
                        if (
                            state.responses[`${state.currentQuestion}`].response === optionsArray[index]
                        ) {
                            return (
                                <div
                                    key={index}
                                    onClick={updateOption}
                                >
                                    <button
                                        className={
                                            state.responses[state.currentQuestion] === key ?
                                            'blueButton' : 'blackButton' 
                                        }
                                        value={optionsArray[index]}
                                    >
                                        {optionsArray[index]}
                                        .{" "}
                                        {state.questions[state.currentQuestion].options[key]}
                                    </button>
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={index}
                                    onClick={updateOption}
                                >
                                    <button
                                        className={
                                            state.responses[state.currentQuestion] === key ?
                                            'blueButton' : 'blackButton' 
                                        }
                                        value={optionsArray[index]}
                                    >
                                        {optionsArray[index]}
                                        .{" "}
                                        {state.questions[state.currentQuestion].options[key]}
                                    </button>
                                </div>
                            );
                        }
                    }
                }) : <p></p>}
            </div>

            {/* If any problem, display it */}
            {state.problem.status ? 
                <div className='error'>{state.problem.message}</div>
            : <p></p>    
            }

            {/* Mavigation and Submit Buttons */}
            <div className="btn-bottom">
                {state.currentQuestion === 0 ? (
                    <button
                        disabled={true}
                        id="disabled-btn"
                    >
                        Previous
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            gotoPreviousQuestion();
                        }}
                    >
                        Previous
                    </button>
                )}
                {state.currentQuestion === state.questions.length-1 ? (
                    <button
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            gotoNextQuestion();
                        }}
                    >
                        Next
                    </button>
                )}
                <Modal
                    show={state.showModal}
                    onHide={hideModal}
                    submitQuiz={onConfirm}
                />
            </div>
            <div className="timer">
                <Timer initialMinute={10} initialSeconds={0} onEnd={onConfirm}/>
            </div>
        </div>
    </div>
    )
}

export default TechQuiz