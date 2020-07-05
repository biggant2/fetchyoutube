const Videos = require('./client.js');
const fetch = require('node-fetch');
const { webhook, mentionEveryone } = require('./config.json')

const client = new Videos.Client();

client.on('video', (video) => {
    let url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    let content = (mentionEveryone) ? `${url} @everyone` : url;
    let data = {
        content: content,
        username: video.snippet.channelTitle,
    }

    fetch(webhook, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
})