// Write custom js functions for the scholarx 2020 page here


$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory

    loadFeaturedStories(); // load featured stories

    // Listner for FAQ
    $('.panel').click(
        function () {
            if ($(this).hasClass("collapsed")) {
                const collapseSign = $('.plusMinusSign');
                collapseSign.removeClass("fa-minus");
                collapseSign.addClass("fa-plus");
                $(this).children("div").children("i").removeClass("fa-plus");
                $(this).children("div").children("i").addClass("fa-minus");
                $('.card-toggle').removeClass("card shadow");
                $(this).parent("div").parent("div").addClass("card shadow");
            } else {
                $(this).parent("div").parent("div").removeClass("card shadow");
                $(this).children("div").children("i").removeClass("fa-minus");
                $(this).children("div").children("i").addClass("fa-plus");
            }
        }
    );
});

//function to load profile data
function loadFeaturedStories() {
    $.ajax({
        type: 'get',
        url: 'https://script.google.com/macros/s/AKfycbxoEfCuQK2x57cHG0HG0YlljD6FoKbIwygdEz0wkt6ex4YAxEviuLdwJbiXKNZwA-k64g/exec',
        dataType: 'json',
        success: function (data) {
            document.getElementById('btnFeaturedStories').style.visibility = "visible";
            //slice array to two parts
            if (data.length >= 6) {
                let partOne = data.slice(0, 6);
                let partTwo = data.slice(6);

                //mustache render - part one
                let contentPartOne = Mustache.render(
                    $('#template-featured-stories').html(), { 'data': partOne });

                //display first 8 profiles
                $('#featured-stories').html(contentPartOne);

                //hide button
                $('#btn-featured-stories-show-more').click(function () {
                    let contentPartTwo = Mustache.render(
                        $('#template-featured-stories').html(), { 'data': partTwo });
                    $(contentPartTwo).appendTo('#featured-stories').hide().fadeIn(1000);
                    $('#btn-featured-stories-show-more').hide();
                });
            } else {
                //mustache render
                let content = Mustache.render(
                    $('#template-featured-stories').html(), { 'data': data });

                //display first 8 profiles
                $('#featured-stories').html(content);

                //hide button
                $('#btn-featured-stories-show-more').hide();
            }
        }
    });
}

