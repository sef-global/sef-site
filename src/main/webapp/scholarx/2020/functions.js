// Write custom js functions for the scholarx 2020 page here

let mentorProfiles = [];

$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory

    loadProfiles(); // load profiles
    loadFeaturedStories(); // load featured stories
});

//function to load profile data
function loadProfiles() {
    $.ajax({
        type: 'get',
        url: 'mentors.json',
        dataType: 'json',
        success: function (profiles) {
            mentorProfiles = profiles;
            // Add a new key named `index` with the index (To use with moustache template)
            profiles.forEach(function (profile, index) {
                profile.index = index;
            });
            //slice array to two parts
            if (profiles.length >= 8) {
                let partOne = profiles.slice(0, 8);
                let partTwo = profiles.slice(8);

                //mustache render - part one
                let contentPartOne = Mustache.render($("#templateTeam").html(), {"profiles": partOne});

                //display first 8 profiles
                $("#teamContent").html(contentPartOne);

                //hide button
                $("#btnShowMore").click(function () {
                    let contentPartTwo = Mustache.render($("#templateTeam").html(), {"profiles": partTwo});
                    $(contentPartTwo).appendTo("#teamContent").hide().fadeIn(1000);
                    $("#btnShowMore").hide();
                });
            } else {
                //mustache render
                let content = Mustache.render($("#templateTeam").html(), {"data": profiles});

                //display first 8 profiles
                $("#teamContent").html(content);

                //hide button
                $("#btnShowMore").hide();
            }
        }
    });
}

//function to load profile data
function loadFeaturedStories() {
    $.ajax({
        type: 'get',
        url: 'featured-stories.json',
        dataType: 'json',
        success: function (data) {

            //slice array to two parts
            if (data.length >= 6) {
                let partOne = data.slice(0, 6);
                let partTwo = data.slice(6);

                //mustache render - part one
                let contentPartOne = Mustache.render(
                    $('#template-featured-stories').html(), {'data': partOne});

                //display first 8 profiles
                $('#featured-stories').html(contentPartOne);

                //hide button
                $('#btn-featured-stories-show-more').click(function () {
                    let contentPartTwo = Mustache.render(
                        $('#template-featured-stories').html(), {'data': partTwo});
                    $(contentPartTwo).appendTo('#featured-stories').hide().fadeIn(1000);
                    $('#btn-featured-stories-show-more').hide();
                });
            } else {
                //mustache render
                let content = Mustache.render(
                    $('#template-featured-stories').html(), {'data': data});

                //display first 8 profiles
                $('#featured-stories').html(content);

                //hide button
                $('#btn-featured-stories-show-more').hide();
            }
        }
    });
}

function openMentorProfile(index){
    // Get the selected mentor
    const profile = mentorProfiles[parseInt(index)];
    // Add content to the template
    const template = $('#template-profile-modal-content').html();
    const content = Mustache.render(template, profile);
    // Update the modal
    $('#profile-modal-content').html(content);
    // Open the modal
    $('#profile-modal').modal();
}
