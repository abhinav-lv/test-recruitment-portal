import { useState } from "react"
import * as XLSX from 'xlsx';
import axios from "axios";

const Admin = () => {

    const [valid, setValid] = useState({status: true, message: ''})
    const [questions, setQuestions] = useState({})
    const [domain, setDomain] = useState('technical')
    const [subdomain, setSubDomain] = useState('ios')   
    const [yearOfStudy, setYearOfStudy] = useState(1)

    const onChange = (e) => {
        const file = e.target.files ? e.target.files[0] : false
        if(file){
            const fileFormat = file.name.split('.').at(-1)
            if(fileFormat !== 'xls' && fileFormat !== 'xlsx'){
                setValid({status: false, message: 'Wrong file format! Please upload a .xls or .xlsx file'})
                return
            }
            else{
                const reader = new FileReader()
                reader.onload = (event) => {
                    const data = event.target.result
                    const workbook = XLSX.read(data, { type: 'binary' })
                    workbook.SheetNames.forEach((sheetName) => {
                        const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        const json_object = JSON.stringify(XL_row_object)
                        setQuestions(JSON.parse(json_object))
                    })
                }
                reader.readAsBinaryString(file)
                setValid({status: true, message: ''})
            }
        }
    }

    // TODO: 1. New inputs for domain of question, subdomain, and yearOfStudy
    //       2. Set up authorization both on server and client side for verifying admin status
    //       3. Create question model and routes on server

    const onSubmit = async () => {
        if(!Object.keys(questions).length && valid.status){
            setValid({status: false, message: 'No file selected'})
        }
        else if(valid.status){
            const body = {domain, subdomain , yearOfStudy, questions}
            console.log(body)
            const res = await axios.post('/questions/set', body)
            console.log(res)
            setValid({status: true, message: ''})
        }
    }

    const handleDomainChange = (e) => {
        const domain = e.target.value
        let subdomain = ''

        domain === 'technical' ? subdomain = 'ios'
        : domain === 'management' ? subdomain = 'marketing'
        : domain === 'project' ? subdomain = 'rnd'
        : subdomain = 'poster'

        // console.log(domain, subdomain)
        setDomain(domain)
        setSubDomain(subdomain)
    }

    return (
        <div>
            <input
                style={{padding: '0', borderRadius: '0', background: 'none', margin: '20px 0 0 20px'}}
                type="file" 
                name="fileInput" 
                accept=".xls, .xlsx"
                onChange={onChange}
            ></input>

            {/* Select year of study */}
            <p style={{margin: '20px 0 0 20px'}}>
                Year of Study:
                <select
                     name="yearOfStudy"
                     value={yearOfStudy}
                     onChange={(e) => setYearOfStudy(Number(e.target.value))}
                     style={{marginLeft: '20px'}}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </p>

            {/* Select domain */}
            <p style={{margin: '20px 0 0 20px'}}>
                Domain: 
                <select
                     name="domain"
                     value={domain}
                     onChange={handleDomainChange}
                     style={{marginLeft: '20px'}}
                >
                    <option value="technical">Technical</option>
                    <option value="management">Management</option>
                    <option value="project">Project</option>
                    <option value="design">Design</option>
                </select>
            </p>

            {/* Select subdomain */}
            <p style={{margin: '20px 0 0 20px'}}>
                Subdomain: 
                <select
                     name="subdomain"
                     value={subdomain}
                     onChange={(e) => setSubDomain(e.target.value)}
                     style={{marginLeft: '20px'}}
                >
                    {domain === 'technical' ?
                    <>
                        <option value="ios">iOS</option>
                        <option value="web">Web</option>
                        <option value="android">Android</option>
                        <option value="ml">Machine Learning</option>
                    </>
                    
                    : domain === 'management' ? 
                    <>
                        <option value="marketing">Marketing</option>
                        <option value="editorial">Editorial</option>
                        <option value="sponsorship">Sponsorship</option>
                        <option value="operations">Operations</option>
                        <option value="logistics">Logistics</option>
                    </>
                    
                    : domain === 'project' ? 
                    <>
                        <option value="rnd">Research</option>
                        <option value="projMgmt">Project Management</option>
                    </>
                    
                    :   // Design
                    <>
                        <option value='poster'>Poster</option>
                        <option value='uiux'>UI and UX</option>
                        <option value='video'>Video Editing</option>
                        <option value='threed'>3D Design</option>
                    </>
                    }
                </select>
            </p>
            <button style={{margin: '20px 0 0 20px'}} onClick={onSubmit}>Submit</button>

            {valid.status ? <p></p> : 
            <div style={{margin: '50px 0 0 20px'}} className="error">
                {valid.message}
            </div>
            }
        </div>
    )
}

export default Admin