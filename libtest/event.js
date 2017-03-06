const web = require('./test1')
const EventEmitter = require('events');
const E = new EventEmitter()
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Iread() {
  rl.question('What do you think of Node.js? ', (answer) => {
    // TODO: Log the answer in a database
    console.log(`Thank you for your valuable feedback: ${answer}`);
    if (answer == "exit") {
      rl.close()
      process.exit()
    } 
    E.emit('new', answer);
  });
}

web.run(E)
E.on('data', (data) => {
  console.log(data)
  Iread()
})
E.emit('new', 123)

