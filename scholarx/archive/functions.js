$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
});

//global variables to hold mentor and mentee data
var mentor2019; var mentor2020; var mentor2021; var mentor20202021; var mentor20192020; var mentor20192021;
var mentee2019; var mentee2020; var mentee2021; var mentee20202021; var mentee20192020; var mentee20192021;

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
    const m2019 = payload.mentor2019; const m2020 = payload.mentor2020; const m2021 = payload.mentor2021;
    const n2019 = payload.mentee2019; const n2020 = payload.mentee2020; const n2021 = payload.mentee2021;

    //save mentor mentee details in global array variables to faster data access.
    [mentor2019,mentor2020,mentor2021,mentor20192020,mentor20202021,mentor20192021] = [m2019,m2020,m2021,m2020.concat(m2021),m2020.concat(m2021),m2019.concat(m2021)];
    [mentee2019,mentee2020,mentee2021,mentee20192020,mentee20202021,mentee20192021] = [n2019,n2020,n2021,n2020.concat(n2019),n2020.concat(n2021),n2019.concat(n2021)];
 
    const mentorProfiles = m2019.concat(m2020).concat(m2021);
    let mentor_Profiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfiles });
    $("#mentorProfiles").html(mentor_Profiles);

    const menteeProfiles = n2019.concat(n2020).concat(n2021);
    let mentee_Profiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": menteeProfiles });
    $("#menteeProfiles").html(mentee_Profiles);
}
loadData();

function renderData(mentorYear,menteeYear) {
    let mentor_Profiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorYear });
    let mentee_Profiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": menteeYear });
    $("#mentorProfiles").html(mentor_Profiles);
    $("#menteeProfiles").html(mentee_Profiles);
}

function renderAll() {
    const mentorProfiles = mentor2019.concat(mentor2020).concat(mentor2021);
    const menteeProfiles = mentee2019.concat(mentee2020).concat(mentee2021);
    let mentor_Profiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfiles });
    let mentee_Profiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": menteeProfiles });
    $("#mentorProfiles").html(mentor_Profiles);
    $("#menteeProfiles").html(mentee_Profiles);
}

function cohort(){
    if(document.getElementById("chk2019").checked == true && document.getElementById("chk2020").checked == false && document.getElementById("chk2021").checked == false){
        renderData(mentor2019,mentee2019);
    } else if(document.getElementById("chk2019").checked == false && document.getElementById("chk2020").checked == true && document.getElementById("chk2021").checked == false){
        renderData(mentor2020,mentee2020);
    } else if(document.getElementById("chk2019").checked == false && document.getElementById("chk2020").checked == false && document.getElementById("chk2021").checked == true){
        renderData(mentor2021,mentee2021);
    } else if(document.getElementById("chk2019").checked == false && document.getElementById("chk2020").checked == true && document.getElementById("chk2021").checked == true){
        renderData(mentor20202021,mentee20202021);
    } else if(document.getElementById("chk2019").checked == true && document.getElementById("chk2020").checked == true && document.getElementById("chk2021").checked == false){
        renderData(mentor20192020,mentee20192020);
    } else if(document.getElementById("chk2019").checked == true && document.getElementById("chk2020").checked == false && document.getElementById("chk2021").checked == true){
        renderData(mentor20192021,mentee20192021);
    } else{
        renderAll();
    }
}
