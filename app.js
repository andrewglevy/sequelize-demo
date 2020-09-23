// % node app.js
// docs.sequelizejs.com

const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const Article = connection.define('article', {
  // identifier: {
  //   type: Sequelize.STRING,
  //   primaryKey: true,
  // example of custom primary key, otherwise auto incrementing id
  // },
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: {
        args: [4, 150],
        message: 'Title must be between 4 and 150 characters.',
      },
    },
  },
  body: {
    type: Sequelize.TEXT,
    defaultValue: 'lorem ibsem.',
    validate: {
      // defining a custom validation rule with a function
      startsWithUpper: (bodyVal) => {
        const first = bodyVal.charAt(0);
        const startsWithUpper = first === first.toUpperCase();
        if (!startsWithUpper) {
          throw new Error('First letter must be an uppercase letter');
        }
      },
    },
  },
}, {
  hooks:
  {
    // beforeValidate() {
    //
    // },
    afterCreate(res) {
      console.log(`Created article with title ${res.dataValues.title}`);
    },
    // more hooks listed in Sequelize documentation
  },
});
connection.sync({
  force: true,
  // this will potentially drop the table if it exists; not for prod use
  logging: console.log,
}).then(function () {
  return Article.create({
    title: 'The Title',
    body: 'Quem appellat hic imitarentur ad tamen vidisse quo cohaerescant, se hic instituendarum, fugiat ut pariatur iis summis, anim mandaremus arbitrantur id legam e voluptate ab culpa ab fabulas tempor culpa possumus quae a ipsum si ea legam commodo. Ex offendit te fabulas ut cupidatat sint est laborum praetermissum. Constias o aute constias, vidisse sunt elit deserunt eram, laboris fugiat labore ubi export qui id nulla philosophari, cupidatat adipisicing ab occaecat, labore export illum.',

  });
}).catch((err) => console.log(err.message));
