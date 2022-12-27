function loadFaqComponent() {
    // Listener for FAQ
    $('.panel').click(
        function () {
            if($(this).hasClass("collapsed")){
                const collapseSign = $('.collapse-sign-icon');
                collapseSign.removeClass("fa-minus");
                collapseSign.addClass("fa-plus");
                $(this).children("div").children("i").removeClass("fa-plus");
                $(this).children("div").children("i").addClass("fa-minus");
                $('.card-toggle').removeClass("card shadow");
                $(this).parent("div").parent("div").addClass("card shadow");
            }else{
                $(this).parent("div").parent("div").removeClass("card shadow");
                $(this).children("div").children("i").removeClass("fa-minus");
                $(this).children("div").children("i").addClass("fa-plus");
            }
        }
    );
}
//function to load blog posts/featured stories
function loadPosts(url){
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'json',
        success: function (data) {
            document.getElementById('btnPosts').style.visibility = "visible";
            //slice array to two parts
            if (data.length >= 6) {
                let partOne = data.slice(0, 6);
                let partTwo = data.slice(6);

                //mustache render - part one
                let contentPartOne = Mustache.render(
                    $('#template-posts').html(), { 'data': partOne });

                //display first 8 blog posts/featured stories
                $('#posts').html(contentPartOne);

                //hide button
                $('#posts-show-more').click(function () {
                    let contentPartTwo = Mustache.render(
                        $('#template-posts').html(), { 'data': partTwo });
                    $(contentPartTwo).appendTo('#posts').hide().fadeIn(1000);
                    $('#posts-show-more').hide();
                });
            } else {
                //mustache render
                let content = Mustache.render(
                    $('#template-posts').html(), { 'data': data });

                //display first 8 blog posts/featured stories
                $('#posts').html(content);

                //hide button
                $('#posts-show-more').hide();
            }
        }
    });
}
