const axios = require('axios');
const config = require('../config/config');
const query = require('../config/database');


const getAvailableAgent = async (roomId) => {
    try{
        let url = `${config.serviceQiscus.baseUrl}/api/v2/admin/service/available_agents?room_id=${roomId}`
        const header = {
                'Qiscus-App-Id': config.serviceQiscus.appId,
                'Qiscus-Secret-Key': config.serviceQiscus.appSecret,
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        const res = await axios.get(url, {
            headers: header
        })
        return res.data.data
    }catch(err){
        console.log(err)
    }
}

module.exports = getAvailableAgent