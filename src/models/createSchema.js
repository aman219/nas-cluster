const {getConnection} = require('../db/connect');

const {modelUsers} = require('./user');
const { modelFiles } = require('./files');
const { modelVideos } = require('./videos');
const { modelAudio } = require('./audio');
const { modelOthers } = require('./others');
const { modelRelations } = require('./relations');

const createSchema = async() => {
    try {
        const conn = getConnection();
        const res = await conn.query("SHOW TABLES");
        if (res.length < 6) {
            modelUsers(conn);
            modelFiles(conn);
            modelVideos(conn);
            modelAudio(conn);
            modelOthers(conn);
            modelRelations(conn);
        } else {
            console.log('Database schema already exists');
        }
        
    } catch (error) {
        console.log(`Database connection schema : ${error}`);
    }
}

module.exports = { createSchema };