// Function to load youtube videos
function loadYoutubeVideos() {
    $.ajax({
        type: 'get',
        url: 'https://dataholder.sefglobal.org/youtube/onelive?maxResults=3',
        dataType: 'json',
        success: function (data) {
            // Slice if the description if it is very long
            data.items.forEach((item) => {
                const snippet = item.snippet;
                if (snippet.description.length > 100) {
                    snippet.description = snippet.description.slice(0, 80) + "...";
                }
            });
            // Mustache render
            let renderedData = Mustache.render(
                $('#template-youtube-videos').html(), {items: data.items});
            $('#youtube-videos').html(renderedData);
        }
    });
}

// Function to load profile data
function loadProfiles() {
    $.ajax({
        type: 'get',
        url: 'https://script.google.com/macros/s/AKfycbxXl45ziXa7fvBaJzygdBR07eoiT5CsXjlOTonv46_96s-ND-eUMIBEnjcaHRl3GED0/exec',
        dataType: 'json',
        success: function (data) {
            // Slice array to two parts
            if (data.length >= 8) {
                let partOne = data.slice(0, 8);
                let partTwo = data.slice(8);

                // Mustache render - part one
                let contentPartOne = Mustache.render($("#templateTeam").html(), {"data": partOne});
                // Display first 8 profiles
                $("#teamContent").html(contentPartOne);
                // Hide button after displaying content part two
                $("#btnShowLess").hide();
                $("#btnShowMore").click(function () {
                    let contentPartTwo = Mustache.render($("#templateTeam").html(), {"data": partTwo});
                    $(contentPartTwo).appendTo("#teamContent").hide().fadeIn(1000);
                    $("#btnShowMore").hide();
                    $("#btnShowLess").show();
                });
                $("#btnShowLess").click(function () {
                    $("#teamContent").html(contentPartOne);
                    $("#btnShowMore").show();
                    $("#btnShowLess").hide();
                });
            } else {
                // Mustache render
                let content = Mustache.render($("#templateTeam").html(), {"data": data});
                // Display first 8 profiles
                $("#teamContent").html(content);
                // Hide button because there are only 8 profiles to show
                $("#btnShowMore").hide();
                $("#btnShowLess").hide();
            }
            document.getElementById('btnSpeakers').style.visibility = "visible";
        }
    });
}
