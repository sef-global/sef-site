$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
});

//search mentors and mentees
$(document).ready(function () {
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#mentorProfiles tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        $("#menteeProfiles tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $$('div.tags').find('input:checkbox').live('click', function () {
        $('#mentorProfiles > tr').hide();
        $('#menteeProfiles > tr').hide();
        $('div.tags').find('input:checked').each(function () {
            $('#mentorProfiles > tr.' + $(this).val()).show();
        });
        $('div.tags').find('input:checked').each(function () {
            $('#menteeProfiles > tr.' + $(this).val()).show();
        });
    });
});

//mentor mentee transition
$(document).ready(function(){
    $('#selection').on('change', function(){
    	var selectedValue = $(this).val();
        if(selectedValue === "mentees"){
            document.getElementById("showMentors").style.display = "none";
            document.getElementById("showMentees").style.display = "flex";
        } else if(selectedValue === "mentors"){
            document.getElementById("showMentees").style.display = "none";
            document.getElementById("showMentors").style.display = "flex";
        }      
    });
});

const data_url = "https://script.google.com/macros/s/AKfycbw0TVyldiK5ijUxjLJkhrxHpxZpIjoeLytZqrvOlftYeHywn1hBEnL0aHGIS8hOFxPp/exec";

async function getData() {
    const response = await fetch(data_url);
    const data = await response.json();
    return data;
}

async function loadData() {
    const payload = await getData();
    const mentorProfiles = payload.mentor2021.concat(payload.mentor2020).concat(payload.mentor2019);
    let mentor_Profiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfiles });
    $("#mentorProfiles").html(mentor_Profiles);

    const menteeProfiles = payload.mentee2021.concat(payload.mentee2020).concat(payload.mentee2019);
    let mentee_Profiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": menteeProfiles });
    $("#menteeProfiles").html(mentee_Profiles);
}
loadData();

//mentor mentee models
$(document).ready(function(){
    $(".profile-model").click(function(){
        $("#myModal").modal('show');
    });
});

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