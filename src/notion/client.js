/** @format */

const { Client } = require('@notionhq/client');

require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getDatabases = async (req, res, next) => {
  const databases = await notion.databases.list();

  console.log('database', databases);
};
// getDatabases();
module.exports = { notion };
