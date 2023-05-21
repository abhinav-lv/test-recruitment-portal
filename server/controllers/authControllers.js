const User = require('../models/User')

const authenticateUser = async (req,res) => {
    try{
        const userExists = await User.findOne({'regNo': `${req.body.regNo}`})
        if(!userExists) res.status(403).send('User not found in database, not part of ADG')
        else{
            if(userExists.password !== req.body.password){
                res.status(403).send('Invalid password')
                return
            }
            req.session.regenerate((err) => {
                if(err) console.error(err)
    
                req.session.user = {
                    regNo: userExists.regNo, 
                    yearOfStudy: userExists.yearOfStudy,
                    attemptedDomains: JSON.parse(userExists.attempted)
                }
                res.status(200).send(req.session.user)
            })
        }
    }
    catch(error) {
        console.error(error.message)
        res.status(401).send('An error occurred when trying to authenticate user.')
    }
}

const authorizeUser = async (req,res) => {
    if(!req.session.user) res.status(403).send('No user session')
    else{
        const { regNo } = req.session.user
        const userExists = await User.findOne({'regNo': `${regNo}`})
        if(!userExists) res.status(403).send('No such user in database')
        else{
            res.status(200).send(req.session.user)
        }
    }
}

const logUserOut = async (req,res) => {
    req?.session.destroy((err) => {
        if(err) next(err)
        res.clearCookie('connect.sid')
        res.status(200).send('User logged out.')
    })
}

module.exports = { authenticateUser, authorizeUser, logUserOut }