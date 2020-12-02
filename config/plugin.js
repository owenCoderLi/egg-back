'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};

module.exports.jwt = {
  enable: true,
  package: "egg-jwt"
};

module.exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
};