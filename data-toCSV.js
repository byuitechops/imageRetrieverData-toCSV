/*eslint env node*/
var records = require('./scripts.js');
var dsv = require('d3-dsv');

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

console.log(pullData(records));
