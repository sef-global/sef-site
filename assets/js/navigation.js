$(function () {

    $.ajax({
        type: 'get',
        url: 'assets/content/navbar.html',
        dataType: 'html',
        success: function (addHeader) {
            $("#navbar").html(addHeader)
        }

    });

    $.ajax({
        type: 'get',
        url: 'assets/content/footer.html',
        dataType: 'html',
        success: function (addFooter) {
            $("#footer").html(addFooter)
        }

    });

});