const express = require('express');
const app = express();
const port = 8080;

app.get('/test', (req, res) => {
  res.send('Hello from the backend');
});

app.listen(port, () => {
  console.log(`Twexter listening on port ${port}`);
});
