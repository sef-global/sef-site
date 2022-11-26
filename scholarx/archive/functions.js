$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
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
    let content = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfiles });
    $("#team").html(content);
}
loadData();
