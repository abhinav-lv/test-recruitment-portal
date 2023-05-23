import axios from 'axios'

const onClick1 = async () => {
    try{
        const res = await axios.get('/test/start')
        console.log(res.data)
    }
    catch(err){
        console.log(err)
    }
}

const onClick2 = async () => {
    try{
        const res = await axios.get('/test/end')
        console.log(res.data)
    }
    catch(err){
        console.log(err)
    }
}

const Rough = () => {

    return (
        <>
            <div>User is taking a test</div>
            <button onClick={onClick1}>Start Test</button>
            <button onClick={onClick2}>End Test</button>
        </>
    )
}

export default Rough