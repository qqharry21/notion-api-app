/** @format */

const { config } = require('dotenv');

const app = require('fastify')({
  logger: true,
});

require('dotenv'), config();

app.register(require('./src/routes/routes'));

app.listen(process.env.PORT, (err, addr) => {
  if (err) {
    app.log.error('err', err);
    process.exit(1);
  }
  app.log.info(`server listening on ${process.env.PORT}`);
});
