const { response } = require('express')
const express = require('express')
const { json } = require('express/lib/response')
const fs = require('fs')

const router = express.Router()

router.use(express.json())


async function getMentors() {
    const content = await fs.promises.readFile('./koders.json')
    const json = JSON.parse(content)
    return json
}

router.get('/mentors', async (request, response) => {
    console.log('query params: ', request.query)
    const count = request.query.count
    const json = await getMentors()
    let mentorsData = json.mentors   // .koders maybe?

    if (count) {
        mentorsData = mentorsData.slice(0, parseInt(count))
    }

    if(name){
        mentors.Data = mentorsData.filter((mentor) => koder.name.toLowerCase === name)
    }

    response.json({
        mentors: mentorsData
    })

})


router.get('/mentors/:id', async (request, response) => {
    const idMentor = request.params.id
    const json = await getMentors()

    const mentorFound = json.mentors.find((mentor) => mentor.id === parseInt(idMentor))
    console.log(mentorFound)

    if (!mentorFound) {
        response.status(404)
        response.json({
            succcess: false,
            message: 'mentor not found'
        })
        return
    }
    response.json({
        mentor: mentorFound
    })
})

router.delete('/mentors/:id', async (request, response) => {
    const idMentor = request.params.id
    const json = await getMentors()
    const mentorsFiltered = json.mentors.filter((mentor) => mentor.id !== parseInt(idMentor))

    json.mentors = mentorsFiltered
    await fs.promises.writeFile('./koders.json', JSON.stringify(json, null, 2), 'utf8')

    response.json({
        success: true,
        message: 'mentor deleted successfully'
    })
})

router.post('/mentors', async (request, response) =>{
    const newMentor = request.body
    console.log(newMentor)
    const json = await getMentors()
    json.mentors.push(newMentor)

    console.log(json)

    await fs.promises.writeFile('./koders.json', JSON.stringify(json, null, 2), 'utf8')

    response.json({
        success: true, 
        message: 'se creo el mentor'
    })
})

router.patch('/mentors/:id', async (request, response) => {
    console.log('id: ', request.params.id)
    const idMentor = request.params.id
    const name = request.body.name
    const json = await getMentors()
        console.log('json: ', json)

const newMentors = json.mentors.map((mentor, index) => {
    if (mentor.id === parseInt(idMentor)){
        mentor.name = name 
    }
    return mentor
})
console.log('newMentors')
console.log(newMentors)

json.mentors = newMentors
await fs.promises.writeFile('./koders.json', JSON.stringify(json, null, 2), 'utf8')
response.json({
    success: true,
    message: 'funciono'
})
})

module.exports = router