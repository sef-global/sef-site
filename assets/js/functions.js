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
//function to load mentee profiles
function loadMentees(sheetURL) {
    $.ajax({
        type: 'get',
        url: sheetURL,
        dataType: 'json',
        success: function (data) {
            document.getElementById('btnMentees').style.visibility = "visible";
            //slice array to two parts
            if (data.length >= 6) {
                let initialProfileCount =6;
                let profileCount = data.length;
                let initialPart = data.slice(0, initialProfileCount);

                //mustache render - initial part
                let initialProfileSet = Mustache.render(
                    $('#templateMentees').html(), { 'data': initialPart }
                );

                //display first 6 mentees
                $('#teamMentees').html(initialProfileSet);
                $('#mentee-show-less').hide();

                //display 6 more mentees with a click
                $('#mentee-show-more').click(function () {
                    initialProfileCount+=6;
                    let nextPart =data.slice(initialProfileCount-6,initialProfileCount);

                    //mustache render - next part
                    let nextProfileSet = Mustache.render(
                        $('#templateMentees').html(), { 'data': nextPart });
                    $(nextProfileSet).appendTo('#teamMentees').hide().fadeIn(1000);
                    $("#mentee-show-less").show();

                    if(initialProfileCount>=profileCount){
                        $('#mentee-show-more').hide();
                    }
                });

                $("#mentee-show-less").click(function () {
                    $("#teamMentees").html(initialProfileSet);
                    $("#mentee-show-more").show();
                    $("#mentee-show-less").hide();
                });
            } else {
                //mustache render
                let content = Mustache.render(
                    $('#templateMentees').html(), { 'data': data });

                //display first 6 mentees
                $('#teamMentees').html(content);

                //hide button
                $('#mentee-show-more').hide();
                $('#mentee-show-less').hide();
            }
        }
    });
}
