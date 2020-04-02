const rp = require('request-promise');
const inputText = process.argv[2];

let options = {
    method: 'POST',
    uri: 'http://localhost:3000/text-analyzer',
    body: {
        text: inputText
    },
    json: true
};

rp(options)
    .then((body) => {
        console.log('Text after processing: ', body.text);
    })
    .catch(err => console.error('Request error', err));