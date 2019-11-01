//function to load navbar and footer


function loadNavAndFooter(pathToContentDirectory) {
    $.ajax({
        type: 'get',
        url: pathToContentDirectory+'/navbar.html',
        dataType: 'html',
        success: function (addHeader) {
            $("#navbar").html(addHeader)
        }

    });

    $.ajax({
        type: 'get',
        url: pathToContentDirectory+'/footer.html',
        dataType: 'html',
        success: function (addFooter) {
            $("#footer").html(addFooter)
        }

    });
}