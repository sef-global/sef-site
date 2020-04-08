// Function to load youtube videos
function loadYoutubeVideos() {
    $.ajax({
        type: 'get',
        url: 'https://sef-dataholder.herokuapp.com/youtube/onelive',
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
