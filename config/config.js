require('dotenv').config()

global.gConfig = {
    "app_name": "job-api",
    "app_desc": process.env.APP_DESC || "rest api server",
    "node_port": process.env.PORT || 5001,
    "json_indentation": 4,
    "mongoURI": process.env.MONGO_URI,
    "secret": process.env.SECRET || "yoursecret",
    "mongoPoolSize": process.env.MONGO_POOL_SIZE || 10
}

// log global.gConfig
console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);