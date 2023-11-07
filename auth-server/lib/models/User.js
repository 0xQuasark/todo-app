'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.TOKEN_SECRET || 'supersecretsquirrel';

const userModel = (sequelize, DataTypes) => {
  const userTable = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'user', 'writer'),
      defaultValue: 'user',
      allowNull: false,
    },
    // virtual property (It doesn't exist on the table, derived from table data, and created at runtime)
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        // this funciton runs whenever I refer to this property on the record
        return jwt.sign({ username: this.username, capabilities: this.capabilities }, SECRET); // function for creating our claim.
      }
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const list = {
          user: ['read'],
          admin: ['read', 'create', 'update', 'delete'],
          writer: ['read', 'create'],
        }

        return list[this.role];
      }
    },
  });

  // hook: something that occurs automagically -> when an event.
  userTable.beforeCreate(async (user) => {
    // console.log('We\'re here! user & pass: ', user, user.password);
    // encrypt the password
    user.password = await bcrypt.hash(user.password, 10);
  });
  
  userTable.authenticateBasic = async function (username, password) {
    console.log('u&p are: ', username, password);
    try {
      let userRecord = await this.findOne({ where: { username }}); // valuse are pulled from DB
      // console.log('userRecord: ', userRecord);
      let valid = await bcrypt.compare(password, userRecord.password);
      if (valid) {
        return userRecord;
      }
    } catch (e) {
      console.error('Error occurred: ', e);
      throw new Error('Invalid credentials');
    }
  }

  userTable.authenticateToken = async function (token) {
    console.log('HOW AM I BEING CALLED? token is: ', token);
    let parsedToken = jwt.verify(token, SECRET); // returns the payload data
    const validUser = this.findOne({ where: { username: parsedToken.username }});
    if (validUser) {
      return validUser;
    } else {
      throw new Error('Invalid token');
    }
  }

  return userTable;
};


module.exports = userModel;
