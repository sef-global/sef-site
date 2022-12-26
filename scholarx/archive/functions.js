$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
});

let mentor = []
let mentee = []
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
    const { data } = await getData();
    mentor = data.mentors;
    mentee = data.mentees;
    const mentorProfilesData = mentor[2019].concat(mentor[2020]).concat(mentor[2021]);
    let mentorProfiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfilesData });
    $("#mentorProfiles").html(mentorProfiles);

    const menteeProfilesData = mentee[2019].concat(mentee[2020]).concat(mentee[2021]);
    let menteeProfiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": menteeProfilesData });
    $("#menteeProfiles").html(menteeProfiles);
}
loadData();
function renderProfiles(mentorYear,menteeYear) {
    let mentorProfiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorYear });
    let menteeProfiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": menteeYear });
    $("#mentorProfiles").html(mentorProfiles);
    $("#menteeProfiles").html(menteeProfiles);
}
function renderAllProfiles() {
    const mentorProfilesData = mentor[2019].concat(mentor[2020]).concat(mentor[2021]);
    const menteeProfilesData = mentee[2019].concat(mentee[2020]).concat(mentee[2021]);
    let mentorProfiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfilesData });
    let menteeProfiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": menteeProfilesData });
    $("#mentorProfiles").html(mentorProfiles);
    $("#menteeProfiles").html(menteeProfiles);
}
function filterByYear(){
    let year = 2019;
    let mentorsData = [];
    let menteesData = [];
    if(document.getElementById("2019").checked == false && document.getElementById("2020").checked == false && document.getElementById("2021").checked == false){
        renderAllProfiles();
    }else{
        for(let i=0; i<3; i++){
            if(document.getElementById(year).checked)
            {
                mentorsData = mentorsData.concat(mentor[year]),
                menteesData = menteesData.concat(mentee[year]),
                renderProfiles(mentorsData,menteesData)
            }
            year++;
        }
    }
}
