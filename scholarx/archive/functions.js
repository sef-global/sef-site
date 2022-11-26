$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
});

const data_url = "https://script.google.com/macros/s/AKfycbw0TVyldiK5ijUxjLJkhrxHpxZpIjoeLytZqrvOlftYeHywn1hBEnL0aHGIS8hOFxPp/exec";
let mentors2021 = [];
let mentors2020 = [];
let mentors2019 = [];
let mentees2021 = [];
let mentees2020 = [];
let mentees2019 = [];

async function getData() {
    const response = await fetch(data_url);
    const data = await response.json();

    mentors2019 = data.mentor2019;
    mentees2019 = data.mentee2019;
    mentors2020 = data.mentor2020;
    mentees2020 = data.mentee2020;
    mentors2021 = data.mentor2021;
    mentees2021 = data.mentee2021;
    
}

async function loadData() {
    await getData();
    const mentorProfiles = mentors2021.concat(mentors2020).concat(mentors2019);
    let content = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfiles });
    $("#team").html(content);
}
loadData();
