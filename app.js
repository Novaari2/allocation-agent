const express = require('express');
const app = express();
const config = require('./src/config/config');
const router = require('./src/cores/router');
const middleware = require('./src/cores/middleware');
const query = require('./src/config/database');
const postAssignAgent = require('./src/services/postAssignAgent');
const getAvailableAgent = require('./src/services/getAvailableAgent');
const port = 3000

const axios = require('axios');

middleware(express, app)
router(app)

app.post('/allocated-agent', async (req, res) => {
    try {
        if (req.body.room_id) {
            let [checkRoom] = await query(`SELECT * FROM room WHERE room_id = '${req.body.room_id}'`);

            if (checkRoom.length === 0) {
                const q = `INSERT INTO room (room_id, app_id, name, is_new_session, is_resolve, source, json_req) VALUES ('${req.body.room_id}', '${req.body.app_id}', '${req.body.name}', ${req.body.is_new_session}, ${req.body.is_resolved}, '${req.body.source}', '${JSON.stringify(req.body)}')`;
                await query(q);
            } else {
                if (req.body.room_id === checkRoom[0].room_id) {
                    await query(`UPDATE room SET is_assign = true, is_resolve = true WHERE room_id = '${req.body.room_id}'`);
                }
            }

            
            const [roomNotAssigned] = await query(`SELECT * FROM room WHERE queue = false ORDER BY id ASC`);
            for (const room of roomNotAssigned) {
                await query(`UPDATE room SET queue = true WHERE room_id = '${room.room_id}'`);
            }
        }
        res.status(200).send('Agent allocated successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error allocating agent");
    }
});

async function allocateTasks() {
    try {
        const [listRoom] = await query(`SELECT * FROM room WHERE is_assign = 'false' ORDER BY id ASC`);

        for (const data of listRoom) {
            const agent = await getAvailableAgent(data.room_id);
            for (const agentAvail of agent.agents) {
                if (agentAvail.is_available && agentAvail.current_customer_count < 2) {
                    const postAgent = {
                        room_id: data.room_id,
                        agent_id: agentAvail.id
                    };
                    await postAssignAgent(postAgent);
                    await query(`UPDATE room SET is_assign = true WHERE room_id = '${data.room_id}'`);
                    break;  
                }
            }
            if(data.room_id !== listRoom[listRoom.length - 1].room_id) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    } catch (err) {
        console.log(err);
    }
}

setInterval(allocateTasks, 10000);

// app.post('/assign-agent', async (req, res) => {
//     try{
//         await postAssignAgent(req.body).then((data) => {
//             let body = {
//                 room_id: req.body.room_id,
//                 agent_id: req.body.agent_id
//             }

//             res.send(body)
//         })
//     }catch(err){
//         console.log(err)
//     }
// })

// app.get('/available-agent', async (req, res) => {
//     try{
//         await getAvailableAgent(239746383).then((data) => {
//             console.log(data.data.data.agents)
//             let cleanData = filterMaxAgent(data.data.data.agents)
//             // console.log(cleanData)
//             res.send(cleanData)
//         })
//     }catch{
//         console.log('error')
//     }
// })

// const filterMaxAgent = async (data) => {
//     // console.log(data)
//     try{
//         let newArr = []

//         // for(let i = 0; i < data.length; i++){
//         //     if(data[i].is_available == true && data[i].current_customer_count < 2){
//         //         newArr.push(data[i])
//         //     }
//         // }

//         data.data.data.agents.forEach((agent) => {
//             if(agent.is_available == true && agent.current_customer_count < 2){
//                 newArr.push(agent)
//             }
//         })

//         return newArr

//     }catch{
//         console.log('error')
//     }
// }

// const sortAgent = async (data) => {
//     try{

//     }catch{

//     }
// }

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
