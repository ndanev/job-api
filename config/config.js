require('dotenv').config({ path: `.env${process.env.NODE_ENV}` })
const _ = require('lodash');

global.gConfig = {
    "environment": process.env.NODE_ENV,
    "app_name": "job-api",
    "app_desc": process.env.APP_DESC || "restful api server",
    "node_port": process.env.PORT || 5001,
    "json_indentation": 4,
    "mongoURI": process.env.MONGO_URI,
    "secret": process.env.SECRET || "yoursecret"
}

// log global.gConfig
console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);