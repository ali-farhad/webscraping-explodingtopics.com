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
        const searches = active.find('.scoreTag').text();

        return { keyword, description, searches };
    })

    console.log({ trends });

    const sheet = new Sheet();
    await sheet.load();
    await sheet.addRows(trends)



})();