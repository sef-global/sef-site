let nextPageToken = null;
let fetchedItemCount = 0;

function loadYoutubeVideos() {
    let url = "https://dataholder.sefglobal.org/youtube/onelive?maxResults=12";
    if (nextPageToken != null){
        url = url + "&nextPageToken=" + nextPageToken;
    }
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'json',
        success: function (data) {
            fetchedItemCount += data.items.length;
            if(fetchedItemCount === data.pageInfo.totalResults){
                $("#btnLoadMore").hide();
            }
            nextPageToken = data.nextPageToken;
            // Mustache render
            let renderedHtmlContent = Mustache.render(
                $('#template-youtube-videos').html(), {items: data.items});
          $(renderedHtmlContent).appendTo('#youtube-videos').hide().fadeIn(1500);
        }
    });
}

function loadYoutubeVideoPlayer(videoId) {
    $("#youtubeVideoPlayer").show();
    let iframeTag = '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + videoId + '"></iframe>';
    $('#iframe').html(iframeTag);
}

function loadVideoIfParamExists() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('videoId')) {
        loadYoutubeVideoPlayer(urlParams.get('videoId'));
    }
}
