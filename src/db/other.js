const {getConnection} = require("./connect");

const otherCreate = async(other = {}) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            INSERT INTO files (url, title, size, file_type)VALUES("${other.url}", "${other.title}", ${other.size}, "other");
        `);
        const rel = await conn.query(`
            INSERT INTO user_others (user_id, file_id, extenstion) VALUES (${other.user}, ${res.insertId}, "${other.extension}");
        `);
        const sizeUsed = await conn.query(`
            UPDATE users SET sizeUsed = (SELECT sizeUsed from users where id = ${other.user}) + ${other.size};
        `);
    } catch (error) {
        console.log(`Error while saving other : ${error}`);
    }
}

module.exports = {
    otherCreate
}