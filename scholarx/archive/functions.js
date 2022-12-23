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
    let mentorProfiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfilesData });
    $("#mentorProfiles").html(mentorProfiles);

    menteeProfilesData = mentee[2019].concat(mentee[2020]).concat(mentee[2021]);
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
    let mentorProfiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfilesData });
    let menteeProfiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": menteeProfilesData });
    $("#mentorProfiles").html(mentorProfiles);
    $("#menteeProfiles").html(menteeProfiles);
}
//function to return true if all industry checkboxes are unchecked.
function allFalse(){
    let number = 0;
    for(let i=1; i<7; i++){
        if(document.getElementById("industry_"+i).checked == false){
            number++;
        }
    }
    if(number==6){
        return true
    }else{
        return false
    }
}
//function to uncheck checkboxes
function uncheckIndustryFilters(){
    for(let i=1; i<7; i++){
        document.getElementById("industry_"+i).checked = false;
    }
}
function uncheckYearByFilters(){
    let year = 2019
    for(let i=0; i<4; i++){
        document.getElementById(year).checked = false
        year++
    }
}
//year by filters
function filterByYear(){
    uncheckIndustryFilters();
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
                menteesData = menteesData.concat(mentee[year]);
                renderProfiles(mentorsData,menteesData)
            }
            year++;
        }
    }
}
//filter by industry
function filterProfiles(value){
    let mentorByIndustry = {
        1:[],
        2:[],
        3:[],
        4:[],
        5:[],
        6:[]
    }
    let mentorIndustryData=[]
    let year = 2019;
    let mentorsData = [];
    //filter data based on the year
    if(document.getElementById("2019").checked == false && document.getElementById("2020").checked == false && document.getElementById("2021").checked == false){
        mentorsData = mentorProfilesData;
    }else{
        for(let i=0; i<3; i++){
            if(document.getElementById(year).checked){
                mentorsData = mentorsData.concat(mentor[year]);
            }
            year++;
        }
    }
    //slicing mentors based on their industry
    for(let i=0; i<mentorsData.length; i++){
        if(mentorsData[i].fields == "Computer Science"){
            mentorByIndustry[1].push(mentorsData[i]);
        }else if(mentorsData[i].fields == "Life Sciences"){
            mentorByIndustry[2].push(mentorsData[i]);
        }else if(mentorsData[i].fields == "Engineering"){
            mentorByIndustry[3].push(mentorsData[i]);            
        }else if(mentorsData[i].fields == "Data Science & AI"){
            mentorByIndustry[4].push(mentorsData[i]);
        }else if(mentorsData[i].fields == "Physical Science"){
            mentorByIndustry[5].push(mentorsData[i]);            
        }else if(mentorsData[i].fields == "Other"){
            mentorByIndustry[6].push(mentorsData[i]);
        }
    }
    //industry checkbox selections
    for(let i=1; i<7; i++){
        if(document.getElementById("industry_" + i).checked){
            mentorIndustryData = mentorIndustryData.concat(mentorByIndustry[i]);
        }
    } 
    if(value == "all"){
        renderAllProfiles()
        uncheckYearByFilters()
        uncheckIndustryFilters()
    }else{
        if(allFalse()){
            renderProfiles(mentorsData,menteeProfilesData)
        }else{
            renderProfiles(mentorIndustryData,menteeProfilesData);
        }
    }
}
