const Question = require('../models/Question')

const setQuestions = async (req,res) => {
    try{
        const check = await Question.findOne({
            domain: req.body.domain, 
            subdomain: req.body.subdomain,
            yearOfStudy: req.body.yearOfStudy
        })
        if(check){
            res.status(200).send('Questions for given domain, subdomain and year of study already exist')
            return
        }
        const questions = new Question(req.body)
        await questions.save()
        res.status(200).send('Questions received')
    }
    catch(err){
        console.err(err)
        res.status(200).send('Questions received, but err')
    }
}

// Need to give random 10 questions
const getQuestions = async (req,res) => {
    try{
        const { domain, subdomain, yearOfStudy } = req.body
        const result = await Question.findOne({domain, subdomain, yearOfStudy})
        
        const questions = result ? result.questions : false

        // Questions not found in database for requested domain/subdomain/yearOfStudy
        if(!questions){
            res.status(400).send('No questions were found for the requested domain')
            return
        }

        // Not supposed to send answers
        const body = { domain, subdomain, yearOfStudy,
            questions: questions.map((question) => {
                return {
                    Sno: question.Sno,
                    question: question.Question,
                    options: {
                        a: question.OptionA,
                        b: question.OptionB,
                        c: question.OptionC,
                        d: question.OptionD,
                    }
                }
            })
        }
        res.status(200).send(body)
    }
    catch(err){
        console.err(err)
        res.status(400).send('Error while fetching questions from database')
    }
}

module.exports = { setQuestions, getQuestions }