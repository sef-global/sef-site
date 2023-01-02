$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
});

let mentors = []
let mentees = []

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
    mentors = data.mentors;
    mentees = data.mentees;
    const mentorProfilesData = mentors[2019].concat(mentors[2020]).concat(mentors[2021]);
    let mentorProfiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfilesData });
    $("#mentorProfiles").html(mentorProfiles);

    const menteeProfilesData = mentees[2019].concat(mentees[2020]).concat(mentees[2021]);
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
    const mentorProfilesData = mentors[2019].concat(mentors[2020]).concat(mentors[2021]);
    const menteeProfilesData = mentees[2019].concat(mentees[2020]).concat(mentees[2021]);
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
                mentorsData = mentorsData.concat(mentors[year]),
                menteesData = menteesData.concat(mentees[year]),
                renderProfiles(mentorsData,menteesData)
            }
            year++;
        }
    }
}
