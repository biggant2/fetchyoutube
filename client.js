const fetch = require('node-fetch');
const { key, channelid, intervalTime } = require('./config.json');
const { EventEmitter } = require('events')

class Client extends EventEmitter {
    constructor() {
        super();

        let latestVideo;
        let timer = setInterval(async () => {
            let data = await fetch(`https://www.googleapis.com/youtube/v3/search?&part=snippet&order=date&channelId=${channelid}&key=${key}`);
            data = await data.json();

            let video = data.items[0];
            if(JSON.stringify(video) !== JSON.stringify(latestVideo)) {
                latestVideo = video;
                this.emit('video', video);
            }
        }, intervalTime)
    }
}

module.exports.Client = Client;