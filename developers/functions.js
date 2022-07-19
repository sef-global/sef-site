$(function () {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('user') && searchParams.has('badge')) {
        let user = searchParams.get('user');
        let badge = searchParams.get('badge');
        setProgress(badge);
        $.ajax({
            type: 'get',
            url: 'https://sef.discourse.group/u/' + user + '.json',
            dataType: 'json',
            success: function (data) {
                data.user.avatar_template =
                    "https://yyz1.discourse-cdn.com/free1" + data.user.avatar_template.replace(/{size}/g, "60");
                let templateProfile = Mustache.render($("#profile-template").html(), {"data": data});
                $("#profile").html(templateProfile);
            },
            error: function () {
                let content = Mustache.render($('#404-template').html());
                $('#main').html(content);
            },
        });
    } else {
        let content = Mustache.render($('#404-template').html());
        $('#main').html(content);
    }
});

function setProgress (badgeNo) {
    $.ajax({
        type: 'get',
        url: 'badges.json',
        dataType: 'json',
        success: function (data) {
            let updatedBadges = [];
            for (let key in data) {
                let badge = data[key];
                if (badge.level <= badgeNo) {
                    badge.textColor = "text-white";
                    badge.imageUrl = (parseInt(badge.level) + 1) + ".png";
                }
                updatedBadges.push(badge);
                setCurrentBadge(updatedBadges[badgeNo]);
            }
            let templateProgress = Mustache.render($("#progress-badge-template").html(), {"data": updatedBadges});
            $("#progress").html(templateProgress);
        }
    })
}

function setCurrentBadge (badge) {
    let templateCurrentBadge = Mustache.render($("#current-badge-template").html(), {"data": badge});
    $("#current-badge").html(templateCurrentBadge);
}
