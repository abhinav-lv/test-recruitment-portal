// Import hooks and packages
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Import assets
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Engineering from "@mui/icons-material/Engineering"

/* ---------------------------------------------------------------- */

// Authorize user with server
const authorizeUser = async (navigate) => {
    try{
        await axios.get(`${process.env.REACT_APP_SERVER_URL+'/auth/authorize'}`)
    }
    catch(err){
        console.log(err.response.data)
        navigate('/')
    }
}

/* ---------------------------------------------------------------- */

// Selection Page
const Selection = () => {

    const navigate = useNavigate()                      // eslint-disable-next-line
    useEffect(function(){authorizeUser(navigate)},[])

    const [domain, setDomain] = useState(false)

    const domainValue = (e) => {
        setDomain(e.target.value)
    }
    return (
        <div style={{height: '100vh'}} className="domainPage">
            <div className="mainForm">
                <h1 className="heading">Choose a Domain</h1>
                <p className="para">Then proceed to view respective subdomains</p>
                <div className="domains">
                    {/* <div onChange={domainValue}> */}
                    <div onChange={domainValue}>

                        {/* Technical */}
                        {/* <div className={tech ? 'domainRowDead' : 'domainRow'}> */}
                        <div className={'domainRow'}>
                            <PrecisionManufacturingIcon style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Technical</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            {/* <input type='radio' value='Technical' name='selection' id='technical' disabled={tech}></input> */}
                            <input type='radio' value='Technical' name='selection' id='technical' disabled={false}></input>
                        </div>
                            
                        {/* Management */}
                        {/* <div className={man ? 'domainRowDead' : 'domainRow'}> */}
                        <div className={'domainRow'}>
                            <AssessmentIcon style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Management</h1>
                                <p className="para">5 Questions . No Time . Subjective Type</p>
                            </div>
                            <input
                                type='radio'
                                value='Management'
                                name='selection'
                                id='management'
                                // disabled={man}
                                disabled={false}
                                className="input">
                            </input>
                        </div>

                        {/* Project */}
                        <div className={'domainRow'}>
                            <Engineering style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Project</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input
                                type='radio'
                                value='project'
                                name='selection'
                                id='project'
                                // disabled={des}
                                disabled={false}
                                className="input">
                            </input>
                        </div> 


                        {/* Design */}
                        {/* <div className={des ? 'domainRowDead' : 'domainRow'}> */}
                        <div className={'domainRow'}>
                            <ColorLensIcon style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Design</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input
                                type='radio'
                                value='Design'
                                name='selection'
                                id='design'
                                // disabled={des}
                                disabled={false}
                                className="input">
                            </input>
                        </div> 
                    </div>
                </div>
                <Link
                    to={`${domain ? '/'+domain.toLowerCase() : '/selection'}`}
                    state={{domain: domain}}
                    style={{marginTop: '25px', marginBottom: '-10px'}}
                    className={`btn1`}
                >
                    Proceed
                </Link>
            </div>
        </div>
    )
}

export default Selection