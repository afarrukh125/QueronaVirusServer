const https = require('https');
var parse = require('node-html-parser');

function start(r) {
    const url = 'https://www.nhs.uk/conditions/coronavirus-covid-19/coronavirus-vaccination/book-coronavirus-vaccination/'
    https.get(url, (response) => {
        let todo = '';
        response.on('data', (chunk) => {
            todo += chunk;
        });

        response.on('end', () => {
            const root = parse.parse(todo)
            raw_text = root.rawText
            idx = raw_text.search("aged")
            age = raw_text.substring(idx+5, idx+8).trim()
            result = {
                age: age,
                eligible: age < 30
            }
            r.writeHead(200, {"Content-Type": "text/json"});
            r.write(JSON.stringify(result));
            r.end();
        });
    }).on("error", (error) => {
        console.log("Error: " + error.message);
    });
}

exports.start = start;
