$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
});

let mentor = {
    2019:[],
    2020:[],
    2021:[]
}
let mentee = {
    2019:[],
    2020:[],
    2021:[]
}
let mentorProfilesData;
let menteeProfilesData;

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
            $("#showMentees").show();
            $("#showMentors").hide();
            $("#university-filter").show();
            $("#industry-filter").hide();
        } else if(selectedValue === "mentors"){
            $("#showMentees").hide();
            $("#showMentors").show();
            $("#university-filter").hide();
            $("#industry-filter").show();
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
    const { data } = await getData();
    mentor = data.mentors;
    mentee = data.mentees;
    mentorProfilesData = mentor[2019].concat(mentor[2020]).concat(mentor[2021]);
    mentorProfilesData.forEach(function (mentorProfilesData, index) {
        mentorProfilesData.index = index;
    });
    let mentorProfiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfilesData });
    $("#mentorProfiles").html(mentorProfiles);

    menteeProfilesData = mentee[2019].concat(mentee[2020]).concat(mentee[2021]);
    let menteeProfiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": menteeProfilesData });
    $("#menteeProfiles").html(menteeProfiles);
}
loadData();

function openMentorProfile(index){
    // Get the selected mentor
    const profile = mentorProfilesData[parseInt(index)];
    
    // Add content to the template
    const template = $("#template-profile-modal-content").html();
    const content = Mustache.render(template, profile);
    // Update the modal
    $("#profile-modal-content").html(content);
    // Open the modal
    $("#profile-modal").modal();
}

function openMenteeProfile(index){
    // Get the selected mentee
    const profile = menteeProfilesData[parseInt(index)];
    
    // Add content to the template
    const template = $("#template-profile-modal-content").html();
    const content = Mustache.render(template, profile);
    // Update the modal
    $("#profile-modal-content").html(content);
    // Open the modal
    $("#profile-modal").modal();
}
