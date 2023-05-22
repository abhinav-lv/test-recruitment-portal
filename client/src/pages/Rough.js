import { useState, useEffect, useCallback } from "react"
import { useBeforeUnload, useNavigate } from 'react-router-dom'
import axios from "axios"

const beforeUnload = (e) => {
    e.preventDefault()
    const res = axios.get('/auth/authorize')
    console.log(res)
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }  

const Rough = () => {

    const navigate = useNavigate()

    const [isVisible, setIsVisible] = useState(!document.hidden)
    const handleVisibility = useCallback(() => setIsVisible(!document.hidden), [])

    // Handle tab / browser close
    useBeforeUnload(beforeUnload)

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibility)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibility)
        }
    }, [handleVisibility])

    useEffect(() => {                   
        if(!isVisible) navigate('/')        // eslint-disable-next-line
    }, [isVisible])

    return (
        <>
            <div>User is taking a test</div>
            <button onClick={() => toggleFullScreen()}>Your mom</button>
        </>
    )
}

export default Rough

/*

import { useState, useEffect, useCallback } from 'react'

function useIsTabVisible() {
    const [isVisible, setIsVisible] = useState(!document.hidden)

    const handleVisibility = useCallback(() => {
        setIsVisible(!document.hidden)
    }, [])

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibility)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibility)
        }
    }, [handleVisibility])

    return isVisible // returns boolean
}

export default useIsTabVisible

*/