const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({dev});
const routeHandler = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => {
      return routeHandler(req, res);
    });

    server.use(routeHandler).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Yo, yo... we like all ready like, on http://localhost:${port}`)
    });
  })
  .catch((err) => {
    console.log('Error preparing app ', err);
  });
