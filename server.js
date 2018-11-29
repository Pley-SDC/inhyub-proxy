require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;

app.use(compression());

//app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/:id/reservation', 
  proxy({
    target: 'http://localhost:3002',
    changeOrigin: true
  })
);

app.use('/api/:id/hour',
  proxy({
    target: 'http://localhost:3002',
    changeOrigin: true
  })
);

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
