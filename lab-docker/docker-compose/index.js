const express = require('express')
const redis = require('redis')

const app = express()
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
})

client.set('visits',0);

app.get('/', (req, res)=>{
    client.get('visits', (err, visits)=>{
        visits = parseInt(visits) + 1
        res.send('Number of visits is:' + visits)
        client.set('visits', parseInt(visits))
    })
})

app.listen(8081, ()=>{
    console.log('Serviço na porta 8081')
})