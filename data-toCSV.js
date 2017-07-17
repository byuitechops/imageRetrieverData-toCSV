/*eslint env node*/
var records = require('./scripts.js');
var dsv = require('d3-dsv');
var fs = require('fs');

function pullData(records) {
    return records.reduce(function (newData, record) {
        var newRecords = record.urls.map(function (url) {
            return {
                title: record.title,
                number: record.number,
                url: url
            }
        });
        return newData.concat(newRecords);
    }, [])
}

var newCSV = dsv.csvFormat(pullData(records), ["title", "number", "url"]);
fs.writeFileSync("Image-Retriever-Records.csv", newCSV, 'utf8');
