const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/api', (req, res) => {
  res.send('Hello from the backend');
});

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(port, () => {
  console.log(`Twexter listening on port ${port}`);
});
