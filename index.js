const Videos = require('./client.js');
const client = new Videos.Client();

client.on('video', (video) => {
    console.log(JSON.stringify(video));
})