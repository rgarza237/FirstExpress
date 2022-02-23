const { response, request } = require('express')
const express = require('express')
const fs = require('fs')

const koderRouter = require('./routers/koders')
const mentorRouter = require('./routers/mentors')
// middleware


const server = express()
const port = 8080

// montar el router de koders
server.use('/koders', koderRouter)
server.use('/mentors', mentorRouter)


server.listen(8080, () => {
    console.log('server running on port: 8080')
})




/* 
Ejercicio 1

GET /koders --> aqui estan todos los koders
POST /koders --> aqui puedes crear koders
Put/ koders  --> aqui puedes sustituir a koders

--------------------*/
server.get('/ejercicio', (request, response) => {
    response.write(' aqui estan todos los koders')
    response.end()
})

server.post('/ejercicio', (request, response) => {
    response.write(' aqui puedes crear koders')
    response.end()
})

server.put('/ejercicio', (request, response) => {
    response.write(' aqui puedes sustituir a koders')
    response.end()
})



/*

// endpoint
/*
conjunto de un metodo y de una ruta 


practica: fs + express

GET/koders --> regresar un json con una lista de koders
--> la lista regresara.... 
*/