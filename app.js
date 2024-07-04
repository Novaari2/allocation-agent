const express = require('express');
const app = express();
const config = require('./src/config/config');
const router = require('./src/cores/router');
const middleware = require('./src/cores/middleware');
const query = require('./src/config/database');
const port = 3000

const axios = require('axios');

middleware(express, app)
router(app)

app.post('/allocated-agent', async (req, res) => {
    try{
        console.log(req.body.room_id)
        if(req.body.room_id){
            let [checkRoom] = await query(`SELECT * FROM room WHERE room_id = '${req.body.room_id}'`)
            console.log(checkRoom)
            if(checkRoom == 0){
                console.log('insert')
                const q = `INSERT INTO room (room_id, app_id, name, is_new_session, is_resolve, source, json_req) VALUES ('${req.body.room_id}, ${req.body.app_id}, ${req.body.name}, ${req.body.is_new_session}, ${req.body.is_resolved}, ${req.body.source}, ${req.body}')`
                await query(q)

                let listRoom = await query(`SELECT * FROM room WHERE is_assign = '0' ORDER BY id ASC`)

                for(let i = 0; i < listRoom.length; i++){
                    let agent = await getAvailableAgent(listRoom[i].room_id)
                    if(agent){
                        console.log('cek')
                        return res.send({status: true, data: 'Succes'})
                    }
                }
            }else{
                console.log('update')
            }
        }
    }catch(err){
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
