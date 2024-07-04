const axios = require('axios');
const config = require('../config/config');


const postAssignAgent = async (data) => {
    try{
        let url = `${config.serviceQiscus.baseUrl}/api/v1/admin/service/assign_agent`
        const header = {
            'Qiscus-App-Id': config.serviceQiscus.appId,
            'Qiscus-Secret-Key': config.serviceQiscus.appSecret,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const res = await axios.post(url, data, {
            headers: header
        })
        return res.data
    }catch(err){
        console.log(err)
    }
}

module.exports = postAssignAgent