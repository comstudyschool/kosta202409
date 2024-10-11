const DataTypes = require('sequelize').DataTypes;
const sequelize = require('./config/db')

const option = {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
  };
  const User = sequelize.define('User', option, {timestamps: false});
  
  // 모델을 이용한 생성
const newUser = {
    name: "KKK2",
    email: "kkk2@kkk.com",
    password: "kkk1234"
}
const createSuccessFn = (user) => {
    return console.log('new user created');
}
const createErr = (err) => console.log('create error!');
User.create(newUser).then(createSuccessFn).catch(createErr);

// 모델을 이용한 데이터 조회
const findAllFn = (users) => {
    return console.log(users);
}
const findAllErr = (err) => {
    return console.log(err);
}
User.findAll().then(findAllFn).catch(findAllErr);