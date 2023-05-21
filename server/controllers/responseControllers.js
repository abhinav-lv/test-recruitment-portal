const User = require('../models/User')

// Receive user responses for a test
const getResponses = async (req,res) => {
    if(!req.session.user){
        res.status(403).send('Unauthorized')
        return
    }
    else{
        try{
            const user = await User.findOne({regNo: req.session.user.regNo})
            const { subdomain } = req.body
            const response = JSON.stringify(req.body)
            
            const responses = user.responses
            const attempted = JSON.parse(user.attempted)
            const newResponses = [...responses, response]
            attempted[`${subdomain}`] = true

            await User.updateOne({regNo: user.regNo}, {$set: {responses: newResponses, attempted: JSON.stringify(attempted)}})

            req.session.user.attemptedDomains = attempted
            res.status(200).send('Responses received')
        }
        catch(err){
            console.error(err)
            res.status(400).send('An error occurred when storing responses')
        }
    }
}

module.exports = { getResponses }