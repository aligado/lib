const readline = require('readline'),
      events = require('events'),
      emitter = new events.EventEmitter(),
      Scrapy = require('../scrapy'),
      DB = require('../sql'),
      db = new DB()
db.connect('mongodb://192.168.99.100:27017/myproject', 'newTest')

scrapy = new Scrapy(db, emitter);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

scrapy.run()

function Iread() {
  rl.question('Write a url:', function (answer) {
    // TODO: Log the answer in a database
    console.log(`Receive new url: ${answer}`);
    if (answer === 'exit') {
      rl.close()
      db.close()
      process.exit()
    }
    emitter.emit('newUrl', answer)
    Iread()
  });
}
Iread()
