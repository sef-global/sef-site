$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
});

const data_url = "https://script.google.com/macros/s/AKfycbzOQyrs0M8uN5ztxhRm2GMKlNkBaul_oaH2i4kiSKieyZtVzeNlvdR__HLveBxNU86S/exec";
let mentors2021 = [];
let mentors2020 = [];
let mentors2019 = [];
let mentees2021 = [];
let mentees2020 = [];
let mentees2019 = [];

async function getData() {
    const response = await fetch(data_url);
    const data = await response.json();

    mentors2021 = data.mentor2021;
    mentees2021 = data.mentee2021;
    mentors2021.forEach(mentor => {
        menteesOfMentor = []
        mentees2021.forEach(mentee => {
            if (mentee.mentor == mentor.name) {
                menteesOfMentor.push(mentee.name);
            }
        });
        mentor.mentees = menteesOfMentor;
    });

    mentors2020 = data.mentor2020;
    mentees2020 = data.mentee2020;
    mentors2020.forEach(mentor => {
        menteesOfMentor = []
        mentees2020.forEach(mentee => {
            if (mentee.mentor == mentor.name) {
                menteesOfMentor.push(mentee.name);
            }
        });
        mentor.mentees = menteesOfMentor;
    });

    mentors2019 = data.mentor2019;
    mentees2019 = data.mentee2019;
    mentors2019.forEach(mentor => {
        menteesOfMentor = []
        mentees2019.forEach(mentee => {
            if (mentee.mentor == mentor.name) {
                menteesOfMentor.push(mentee.name);
            }
        });
        mentor.mentees = menteesOfMentor;
    });
}

async function loadData() {
    await getData();
    const mentorProfiles = mentors2021.concat(mentors2020).concat(mentors2019);
    let content = Mustache.render($("#templateMentors").html(), { "mentorProfiles": mentorProfiles });
    $("#team").html(content);
}
loadData();
