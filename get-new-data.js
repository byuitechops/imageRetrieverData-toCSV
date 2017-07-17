/*get CSV text with AJAX request*/
function getRecords(callback) {

    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(null, processRecords(this.responseText))
        } else {
            callback(new Error("Bad connection. Try again."), null)
        }
    }
    xhttp.open("GET", "Image-Retriever-Records.csv", true);
    xhttp.send();
    /*process CSV to array of objects with d3-dsv*/
    function processRecords(text) {
        var pictures = d3.csvParse(text, function (record) {
            return {
                title: record.title,
                number: record.number,
                url: record.url
            };
        });
        console.log("Records have been processed!");
        //concat obj to the format andrew had with one object per RECORD

        var sortedRecords = pictures.reduce(function (records, picture) {
            var foundRecord = false;
            for (var i = 1; i < records.length; i++) {
                if (records[i].number === picture.number) {
                    records[i].urls.push(picture.url);
                    foundRecord = true;
                    i = records.length;
                }
            }
            if (!foundRecord) {
                records.push({
                    title: picture.title,
                    number: picture.number,
                    urls: [picture.url]
                })
            }
            return records;
        }, [])
        return sortedRecords;
    }

}
getRecords(function (err, records) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(records)
});
