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
    [mentor[2019],mentor[2020],mentor[2021]] = [payload.mentor2019,payload.mentor2020,payload.mentor2021];
    [mentee[2019],mentee[2020],mentee[2021]] = [payload.mentee2019,payload.mentee2020,payload.mentee2021];
 
    const mentorProfiles = mentor[2019].concat(mentor[2020]).concat(mentor[2021]);
    let mentor_Profiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfiles });
    $("#mentorProfiles").html(mentor_Profiles);

    const menteeProfiles = mentee[2019].concat(mentee[2020]).concat(mentee[2021]);
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
    const mentorProfiles = mentor[2019].concat(mentor[2020]).concat(mentor[2021]);
    const menteeProfiles = mentee[2019].concat(mentee[2020]).concat(mentee[2021]);
    let mentor_Profiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfiles });
    let mentee_Profiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": menteeProfiles });
    $("#mentorProfiles").html(mentor_Profiles);
    $("#menteeProfiles").html(mentee_Profiles);
}
function cohort(){
    let year = 2019;
    let mentorsData = [];
    let menteesData = [];
    for(let i=0; i<3; i++){
        if(document.getElementById("chk"+year).checked == true)
        {
            mentorsData = mentorsData.concat(mentor[year]),
            menteesData = menteesData.concat(mentee[year]),
            renderData(mentorsData,menteesData)
        }
        else if(document.getElementById("chk2019").checked == false && document.getElementById("chk2020").checked == false && document.getElementById("chk2021").checked == false){
            renderAll();
        }
        year++;
    }
}
