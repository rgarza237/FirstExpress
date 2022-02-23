const express = require('express')
const fs = require('fs')

const router = express.Router()  // creando el router

router.use(express.json()) // nos permite recibir json en nuestros request

//query params
// ?country=mexico
async function getKoders() {
    const content = await fs.promises.readFile('./koders.json')
    const json = JSON.parse(content)
    return json
}

/*server.get('/hola', (request, response) => {
    response.write('GET /hola')
    response.end()
})*/

router.post('/hola', (request, response) => {
    response.write('POST /hola')
    response.end()
})


// 1-  leer mi archivo
// 2- 
router.get('/koders', async (request, response) => {
    // fs.readFile() // callbacks   ----- opcion
    //  fs.promises.readFile() // promesas ----- opcion    
    // const content = fs.readFileSync('./koders.json', 'utf8') //  usando la funcion sincrona

    console.log('query params: ', request.query)
    const count = request.query.count
    const json = await getKoders()
    let kodersData = json.koders

    if (count) {
        kodersData = kodersData.slice(0, parseInt(count))
    }

    response.json({
        koders: kodersData
    })

})


router.get('/koders/:id', async (request, response) => {
    const idKoder = request.params.id

    const content = await fs.promises.readFile('./koders.json')
    const json = JSON.parse(content)

    // const koderFound = json.koders.filter((koder, index) => koder.id === parseInt(idKoder))
    const koderFound = json.koders.find((koder) => koder.id === parseInt(idKoder))
    console.log(koderFound)

    if (!koderFound) {
        response.status(404)
        response.json({
            success: false,
            message: 'koder not found'
        })
        return
    }

    response.json({
        koder: koderFound
    })

})

router.delete('/koders/:id', async (request, response) => {
    const idKoder = request.params.id

    const kodersFiltered = json.koders.filter((koder) => koder.id !== parseInt(idKoder))

    json.koders = kodersFiltered

    await fs.promises.writeFile('./koders.json', JSON.stringify(json, null, 2), 'utf8')

    response.json({
        succcess: true,
        message: 'Koder deleted successfully'
    })
})

router.post('/koders', async (request, response) => {
    const newKoder = request.body
    console.log(newKoder)
    const content = await fs.promises.readFile('./koders.json')
    const json = JSON.parse(content)
    json.koders.push(newKoder)

    console.log(json)

    await fs.promises.writeFile('./koders.json', JSON.stringify(json, null, 2), 'utf8')

    response.json({
        succcess: true,
        message: 'se creo el koder'
    })
})

//-------------------
//UPDATE
// path parameters // PATCH /koders/1
// PATCH /koders/10

router.patch('/koders/:id', async (request, response) => {
    console.log('id: ', request.params.id)
    const idKoder = request.params.id
    const name = request.body.name
    const content = await fs.promises.readFile('./koders.json')
    const json = JSON.parse(content)
    console.log('json: ', json)
    //forEach
    //map
    // filter
    // reduce
    const newKoders = json.koders.map((koder, index) => {
        if (koder.id === parseInt(idKoder)) {
            koder.name = name
        }
        return koder
    })
    console.log('newKoders')
    console.log(newKoders)

    json.koders = newKoders

    await fs.promises.writeFile('./koders.json', JSON.stringify(json, null, 2), 'utf8')
    response.json({
        succcess: true,
    })
})



//exportar
module.exports = router