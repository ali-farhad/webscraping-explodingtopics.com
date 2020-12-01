const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Sheet = require('./sheet');


(async function () {
    let x = 1;
    const sheet = new Sheet();
    await sheet.load();

    while (x <= 3) {
        const res = await fetch(`https://explodingtopics.com/topics-this-month?page=${x}`);
        const text = await res.text();
        const $ = cheerio.load(text);

        const containers = $('.topicInfoContainer').toArray();
        const trends = containers.map(c => {
            const active = $(c);
            const keyword = active.find('.tileKeyword').text();
            const description = active.find('.tileDescription').text();
            let searches = active.find('.scoreTagItem').text().split(" ")[0].slice(0, -1);


            return { keyword, description, searches };
        })
        x++;
        console.log(x);
        await sheet.addRows(trends);

    }

})();