// Write custom js functions for the scholarx 2020 page here

let mentorProfiles = [];

$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory

    loadProfiles(); // load profiles

    // Listner for FAQ
    $('.panel').click(
        function () {
            if($(this).hasClass("collapsed")){
                const collapseSign = $('.plusMinusSign');
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
});

//function to load profile data
function loadProfiles() {
    $.ajax({
        type: 'get',
        url: 'https://script.google.com/macros/s/AKfycbzBskBGAm_mwR3DYg1PyWB0F4agysO94ytMuKjrS_xgMl3ZD8h8hNKuAVQB7TBIG2-epA/exec',
        dataType: 'json',
        success: function (profiles) {
            mentorProfiles = profiles;
            document.getElementById('btnMentors').style.visibility = "visible";
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
                $("#btnShowLess").hide();

                //hide button
                $("#btnShowMore").click(function () {
                    let contentPartTwo = Mustache.render($("#templateTeam").html(), {"profiles": partTwo});
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
                //mustache render
                let content = Mustache.render($("#templateTeam").html(), {"data": profiles});

                //display first 8 profiles
                $("#teamContent").html(content);

                //hide button
                $("#btnShowMore").hide();
                $("#btnShowLess").hide();
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

