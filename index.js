const app = require('./server/server');
const PORT = require('./config').PORT;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});