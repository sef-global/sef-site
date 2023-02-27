$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
});

let mentors = []
let mentees = []
let years = []
let industries = []
let filteredMentees = []
let filteredMentors = []

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
        industries.push(data[i].fields)
        if (data[i].type == "mentor"){
            mentors.push(data[i])
        }else {
            mentees.push(data[i])
        }
    }
    years = [...new Set(years)]
    industries = [...new Set(industries)]
    //remove unwanted industry & year fields (to consider as an industry it need to be a string and string length need to be > 0 / year need to be a number)
    industries = industries.filter(industry => typeof industry === 'string' && industry.trim().length > 0);
    years = years.filter(year => typeof year === 'number' && year.toString().length > 0);
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
function uncheckCheckboxes(){
    for(let i=years.sort()[0]; i<=years[years.length-1]; i++){
        document.getElementById(i).checked = false;
    }
    for(let i=0; i<industries.length; i++){
        document.getElementById(industries[i].replace(/\s+/g, '_').toLowerCase()).checked = false;
    }
}
function selectedIndustriesData(){
    return industries.filter((industry) => document.getElementById(industry.replace(/\s+/g, '_').toLowerCase()).checked);
}
function selectedYearsData(){
    return years.filter((year) => document.getElementById(year).checked);
}
function renderCohortCheckboxes(){
    const data = { checkboxes: years.map(function(year) {
        return { id: year };
    }) };
    const industriesData = { checkboxes: industries.map(function(industry) {
        return { id: industry , htmlId:industry.replace(/\s+/g, '_').toLowerCase()}
    }) };
    let template = document.getElementById("cohort").innerHTML;
    let output = Mustache.render(template, data);
    document.getElementById("cohort-filters").innerHTML = output;
    //render industry checkboxes dynamically
    let industryTemplate = document.getElementById("industry-filter-template").innerHTML;
    let industry = Mustache.render(industryTemplate, industriesData);
    document.getElementById("dynamic-industry-filters").innerHTML = industry;
}
function filterByIndustry(industry){
    let mentorsData = []
    const selectedYears = selectedYearsData();
    const selectedIndustries = selectedIndustriesData();
    if(industry === 'all'){
       uncheckCheckboxes(); 
       renderAllProfiles()
       return
    } else{
        if(selectedYears.length == 0 || selectedYears.length == years.length){
            filteredMentors = mentors;
        } else{
            filteredMentors = mentors.filter((mentor) => selectedYears.includes(mentor.year));
            filteredMentees = mentees.filter((mentee) => selectedYears.includes(mentee.year));
        }
        for(let industry in industries){
            if(document.getElementById(industries[industry].replace(/\s+/g, '_').toLowerCase()).checked){
                for(let mentor in filteredMentors){
                    if(filteredMentors[mentor].fields === industries[industry]){
                        mentorsData.push(filteredMentors[mentor])
                    }
                }
            }
        }
        renderProfiles(mentorsData,filteredMentees)
    }
    if(selectedIndustries.length == 0){
        filterByYear();
    }
}
function filterByYear() {
    const selectedYears = selectedYearsData();
    const selectedIndustries = selectedIndustriesData();
    if(selectedIndustries.length == 0 && selectedYears.length == 0){
        renderAllProfiles()
        return
    }
    if (selectedIndustries.length == 0) {
       filteredMentors = mentors.filter((mentor) => selectedYears.includes(mentor.year));
       filteredMentees = mentees.filter((mentee) => selectedYears.includes(mentee.year));
       renderProfiles(filteredMentors, filteredMentees);
    } else{
        filterByIndustry("")
    }
}
