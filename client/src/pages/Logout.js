// Import packages and hooks
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const logout = async (navigate) => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL+'/auth/logout'}`)
    navigate('/')
}

const Logout = () => {
    const navigate = useNavigate()              // eslint-disable-next-line
    useEffect(function(){logout(navigate)},[])
    return (
        <div>
            Logging out...
        </div>
    )
}

export default Logout