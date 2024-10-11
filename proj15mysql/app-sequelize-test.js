const sequelize = require('./config/db');

const successFn = ()=>{
    return console.log("Sequelize ORM connected!");
};
const errorFn = (err)=>{
    return console.log("Sequelize ORM ERROR:", err);
}

sequelize.authenticate().then(successFn).catch(errorFn);