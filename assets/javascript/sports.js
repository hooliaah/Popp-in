// function to search for sports news in selected city

// Global variables to get current date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '-' + dd + '-' + yyyy;
var lastWeekDay = dd - 7;
var lastWeek = mm + '-' + lastWeekDay + '-' + yyyy;

function searchNews(city, state) {
    var url = 'https://newsapi.org/v2/everything?' +
        'domains=espn.com,si.com&' +
        'from=' + lastWeek + '&to=' + today +
        'sortBy=popularity&' +
        'q=' + 'teams ' + city + '&' +
        'apiKey=df46d3a9e0064e7e85beaf63eb6a0d82';

    $.ajax({
        url: url,
        type: "GET",
    }).done(function (data) {
        setTimeout(function () {
            pushToDiv(data.articles)
        }, 500);
    });
}

// function to display data in HTML
function pushToDiv(data) {
    console.log(data);
    $('#sports-div').empty();
    var dataLength = 5;
    if (data.length < 5) {
        dataLength = data.length;
    }
    var tableElement = $('<table>');
    var colgroupElement = $('<colgroup>');
    var colElement = $('<col>');
    var tbodyElement = $('<tbody id="sports-rows">');

    for (i = 1; i < 4; i++) {
        let colElement = $("<col id='sports-news-col" + i + "'>");
        colgroupElement.append(colElement);
    }

    tableElement.append(colgroupElement);
    tableElement.append(tbodyElement);

    $('#sports-div').append(tableElement);

    for (i = 0; i < dataLength; i++) {
        var tableImageSource = data[i].urlToImage;
        var tableURL = data[i].url;
        var tableHeadline = data[i].title;
        var tableSource = data[i].source.name;
        var tableRow = $('<tr class="sports-news-row">');

        var tableDataImage = $('<td class="sports-news-image">');
        var tableDataHeadline = $('<td class="sports-news-headline">');
        var tableDataSource = $('<td class="sports-news-source">');
        var tableImage = $('<img>');
        var tableLink = $('<a>');

        tableImage.attr('src', tableImageSource);
        tableDataImage.append(tableImage);

        tableLink.attr('href', tableURL);
        tableLink.attr('target', '_new');
        tableLink.text(tableHeadline);
        tableDataHeadline.append(tableLink);

        tableDataSource.text(tableSource);

        tableRow.append(tableDataImage, tableDataHeadline, tableDataSource);

        $('#sports-rows').append(tableRow.clone(true, true));
    }
}