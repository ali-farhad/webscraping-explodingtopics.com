const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Sheet = require('./sheet');


(async function () {

    const res = await fetch('https://explodingtopics.com/topics-this-month');
    const text = await res.text();
    const $ = cheerio.load(text);

    const containers = $('.topicInfoContainer').toArray();
    const trends = containers.map(c => {
        const active = $(c);
        const keyword = active.find('.tileKeyword').text();
        const description = active.find('.tileDescription').text();
        let searches = active.find('.scoreTagItem').text().split(" ")[0].slice(0, -1);
        if (searches.length === 0) {
            searches = "0";
        }

        return { keyword, description, searches };
    })

    console.log({ trends });

    const sheet = new Sheet();
    await sheet.load();
    await sheet.addRows(trends)



})();