const User = require('../models/User')

const technical = async (req,res) => {
    if(!req.session.user) res.status(403).send('No user session')
    else{
        const { regNo } = req.session.user
        const userExists = await User.findOne({'regNo': `${regNo}`})
        if(!userExists) res.status(403).send('No such user in database')
        else{
            const user = {
                regNo: userExists.regNo,
                yearOfStudy: userExists.yearOfStudy,
                attemptedDomains: {
                    ios: userExists.attemptedIOS,
                    web: userExists.attemptedWeb,
                    android: userExists.attemptedAndroid,
                    ml: userExists.attemptedML
                }
            }
            res.status(200).send(user)
        }
    }
}

const management = async (req,res) => {
    if(!req.session.user) res.status(403).send('No user session')
    else{
        const { regNo } = req.session.user
        const userExists = await User.findOne({'regNo': `${regNo}`})
        if(!userExists) res.status(403).send('No such user in database')
        else{
            const user = {
                regNo: userExists.regNo,
                yearOfStudy: userExists.yearOfStudy,
                attemptedDomains: {
                    marketing: userExists.attemptedMarketing,
                    editorial: userExists.attemptedEditorial,
                    sponsorship: userExists.attemptedSponsorship,
                    operations: userExists.attemptedOperations,
                    logistics: userExists.attemptedLogistics
                }
            }
            res.status(200).send(user)
        }
    }
}

const project = async (req,res) => {
    if(!req.session.user) res.status(403).send('No user session')
    else{
        const { regNo } = req.session.user
        const userExists = await User.findOne({'regNo': `${regNo}`})
        if(!userExists) res.status(403).send('No such user in database')
        else{
            const user = {
                regNo: userExists.regNo,
                yearOfStudy: userExists.yearOfStudy,
                attemptedDomains: {
                    rnd: userExists.attemptedRnD,
                    projectMgmt: userExists.attemptedProjectMgmt,
                }
            }
            res.status(200).send(user)
        }
    }
}

const design = async (req,res) => {
    if(!req.session.user) res.status(403).send('No user session')
    else{
        const { regNo } = req.session.user
        const userExists = await User.findOne({'regNo': `${regNo}`})
        if(!userExists) res.status(403).send('No such user in database')
        else{
            const user = {
                regNo: userExists.regNo,
                yearOfStudy: userExists.yearOfStudy,
                attemptedDomains: {
                    poster: userExists.attemptedPoster,
                    uiux: userExists.attemptedUIUX,
                    video: userExists.attemptedVideoEditing,
                    threeD: userExists.attempted3D,
                }
            }
            res.status(200).send(user)
        }
    }
}

module.exports = { technical, management, project, design }