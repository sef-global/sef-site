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


//function to load blog posts
function loadBlogPosts() {
    $.ajax({
        type: 'get',
        url: 'https://script.google.com/macros/s/AKfycbyUdfhk9WWFLoMWxQvNIEUNl793RbXGnyo-ZIYRn9K1T6QFN1_9G8Ln9NpTCCJba2dzOg/exec',
        dataType: 'json',
        success: function (data) {
            document.getElementById('btnBlogPosts').style.visibility = "visible";
            //slice array to two parts
            if (data.length >= 6) {
                let partOne = data.slice(0, 6);
                let partTwo = data.slice(6);

                //mustache render - part one
                let contentPartOne = Mustache.render(
                    $('#template-blog-posts').html(), { 'data': partOne });

                //display first 8 profiles
                $('#blog-posts').html(contentPartOne);

                //hide button
                $('#btn-blog-posts-show-more').click(function () {
                    let contentPartTwo = Mustache.render(
                        $('#template-blog-posts').html(), { 'data': partTwo });
                    $(contentPartTwo).appendTo('#blog-posts').hide().fadeIn(1000);
                    $('#btn-blog-posts-show-more').hide();
                });
            } else {
                //mustache render
                let content = Mustache.render(
                    $('#template-blog-posts').html(), { 'data': data });

                //display first 8 profiles
                $('#blog-posts').html(content);

                //hide button
                $('#btn-blog-posts-show-more').hide();
            }
        }
    });
}
