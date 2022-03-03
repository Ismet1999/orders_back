const sequelize = require("../db");
const { DataTypes } = require("sequelize");
// npx sequelize-cli model:generate --name Orders --attributes type:string,kw:string,task:string,clientName:string,phone:string,inputDate:date,outputDate:date,photo:string,price:number,prepayment:number
const Orders = sequelize.define("orders", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING(255), allowNull: false },
  kw: { type: DataTypes.STRING(255), allowNull: false },
  task: { type: DataTypes.STRING(255), allowNull: false },
  clientName: { type: DataTypes.STRING(255), allowNull: false },
  phone: { type: DataTypes.STRING(13) },
  inputDate: { type: DataTypes.DATE, allowNull: false },
  outputDate: { type: DataTypes.DATE, allowNull: false },
  photo: { type: DataTypes.STRING(255) },
  price: { type: DataTypes.INTEGER, allowNull: false },
  prepayment: { type: DataTypes.INTEGER, allowNull: false },
});
// npx sequelize-cli model:generate --name statuses --attributes title:string,color:string
const Statuses = sequelize.define("statuses", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), unique: true },
  color: { type: DataTypes.STRING(255), allowNull: false },
});

// npx sequelize-cli model:generate --name users --attributes name:string,password:string,role:string
const Users = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.STRING(255), allowNull: false },
});

Statuses.hasMany(Orders, { foreignKey: "statusId", sourceKey: "id" });
Orders.belongsTo(Statuses);

module.exports = {
  Orders,
  Statuses,
  Users,
};
