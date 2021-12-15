/** @format */
const { notion } = require('../notion/client');

const getAllOrders = async (req, res) => {
  const data = await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID });

  const pages = data.results.map(page => {
    console.log('time', page);
    return {
      id: page.id,
      created: page.created_time,
      updated: page.last_edited_time,
      name: page.properties.Name.title[0].plain_text,
      date: page.properties.Date.date.start,
      time: page.properties.Time.rich_text[0].plain_text,
      dateTime: page.properties.DateTime.date.start,
      subject: page.properties.Subject.select.name,
      service: page.properties.Service.rich_text[0].plain_text,
    };
  });

  console.log('pages', pages);
  return pages;
};

const getOrderById = async (req, res) => {
  const page = await notion.pages.retrieve({
    page_id: req.params.id,
  });

  return {
    id: page.id,
    created: page.created_time,
    updated: page.last_edited_time,
    name: page.properties.Name.title[0].plain_text,
    date: page.properties.Date.date.start,
    time: page.properties.Time.rich_text[0].plain_text,
    dateTime: page.properties.DateTime.date.start,
    subject: page.properties.Subject.select.name,
    service: page.properties.Service.rich_text[0].plain_text,
  };
};

const searchOrdersByName = async (req, res) => {
  const data = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: 'Name',
      text: {
        contains: req.query.name || '',
      },
    },
  });

  const pages = data.results.map(page => {
    return {
      id: page.id,
      created: page.created_time,
      updated: page.last_edited_time,
      name: page.properties.Name.title[0].plain_text,
      date: page.properties.Date.date.start,
      time: page.properties.Time.rich_text[0].plain_text,
      dateTime: page.properties.DateTime.date.start,
      subject: page.properties.Subject.select.name,
      service: page.properties.Service.rich_text[0].plain_text,
    };
  });

  return pages;
};

const addOrder = async (req, res) => {
  const newPage = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: req.body.name,
            },
          },
        ],
      },
      Date: {
        date: { start: req.body.date },
      },
      Time: {
        rich_text: [
          {
            text: {
              content: req.body.time,
            },
          },
        ],
      },
      DateTime: {
        date: { start: req.body.dateTime },
      },
      Service: {
        rich_text: [
          {
            text: {
              content: req.body.service,
            },
          },
        ],
      },
      Subject: {
        select: {
          name: req.body.subject,
        },
      },
    },
  });
  return newPage;
};

const updateOrder = async (req, res) => {
  const updatedPage = await notion.pages.update({
    page_id: req.params.id,
    properties: {
      Name: {
        title: [
          {
            text: {
              content: req.body.name,
            },
          },
        ],
      },
      Date: {
        date: { start: req.body.date },
      },
      Time: {
        rich_text: [
          {
            text: {
              content: req.body.time,
            },
          },
        ],
      },
      DateTime: {
        date: { start: req.body.dateTime },
      },
      Service: {
        rich_text: [
          {
            text: {
              content: req.body.service,
            },
          },
        ],
      },
      Subject: {
        select: {
          name: req.body.subject,
        },
      },
    },
  });

  return updatedPage;
};

// getAllOrders();
module.exports = { getAllOrders, getOrderById, searchOrdersByName, addOrder, updateOrder };
