const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config()


module.exports = class Sheet {

    constructor() {

        this.doc = new GoogleSpreadsheet('1IFm6KIGi6Pt96uMB3L7lrRjq-cRzzxg-q8RRGMIg8aI');

    }

    async load() {
        await this.doc.useServiceAccountAuth(require('./cred.json'));
        await this.doc.loadInfo();
    }

    async addRows(rows) {
        const sheet = this.doc.sheetsByIndex[0];
        await sheet.addRows(rows);
    }

}

    // (async function () {

    //     const sheet = new Sheet();
    //     await sheet.load();

    //     await sheet.addRows([{ name: 'Hello there', email: 'alifarhad57@gmail.com' }]);

    // })()


