$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
});

let mentors = []
let mentees = []
let years = []

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

const data_url = "https://script.google.com/macros/s/AKfycbxxuC5tlaEQpYBFnf09fsgxMgc6--97F6iOXo2mtxNgwwrp2ukzirlComP_GPjY8amN/exec";

async function getData() {
    const response = await fetch(data_url);
    const data = await response.json();
    return data;
}

async function loadData() {
    const {data}  = await getData();
    for(let i=0; i<data.length; i++){
        years.push(data[i].year)
        if (data[i].type == "mentor"){
            mentors.push(data[i])
        }else {
            mentees.push(data[i])
        }
    }
    years = [...new Set(years)]
    renderAllProfiles();
    renderCohortCheckboxes();
}
loadData();
function renderProfiles(mentorYear,menteeYear) {
    let mentorProfiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorYear });
    let menteeProfiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": menteeYear });
    $("#mentorProfiles").html(mentorProfiles);
    $("#menteeProfiles").html(menteeProfiles);
}
function renderAllProfiles() {
    let mentorProfiles = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentors });
    let menteeProfiles = Mustache.render($("#templateMentees").html(), { "menteeProfiles": mentees });
    $("#mentorProfiles").html(mentorProfiles);
    $("#menteeProfiles").html(menteeProfiles);
}
function renderCohortCheckboxes(){
    const checkboxYears = []
    for(let i=0; i<years.length; i++){
        checkboxYears.push({ id: years[i] });
    }
    var data = {checkboxes:checkboxYears};
    var template = document.getElementById("template").innerHTML;
    var output = Mustache.render(template, data);
    document.getElementById("cohort-filters").innerHTML = output;
}
function filterByYear(){
    let mentorsData = [];
    let menteesData = [];
    let temporyMentorData = [];
    let temporyMenteeData=[];
    if(!document.getElementById("2019").checked && !document.getElementById("2020").checked && !document.getElementById("2021").checked){
        renderAllProfiles();
    }else{
        for(let year=years[0]; year<=years[years.length-1]; year++){
            if(document.getElementById(year).checked)
            {
                for(let i=0; i<mentors.length; i++){
                    if(mentors[i].year == year){
                        temporyMentorData.push(mentors[i])
                    }
                }
                for(let i=0; i<mentees.length; i++){
                    if(mentees[i].year == year){
                        temporyMenteeData.push(mentees[i])
                    }
                }
                mentorsData = mentorsData.concat(temporyMentorData);
                menteesData = menteesData.concat(temporyMenteeData);
            }
        }
        renderProfiles(mentorsData,menteesData)
    }
}
