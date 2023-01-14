$(function () {
  loadNavAndFooter("/assets/content/static"); //relative path to content directory
});

let mentors = [];
let mentees = [];
let mentorProfilesData;
let menteeProfilesData;
let dataHolder = [];

//search mentors and mentees
$(document).ready(function () {
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#mentorProfiles tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
    $("#menteeProfiles tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
  $$("div.tags")
    .find("input:checkbox")
    .live("click", function () {
      $("#mentorProfiles > tr").hide();
      $("#menteeProfiles > tr").hide();
      $("div.tags")
        .find("input:checked")
        .each(function () {
          $("#mentorProfiles > tr." + $(this).val()).show();
        });
      $("div.tags")
        .find("input:checked")
        .each(function () {
          $("#menteeProfiles > tr." + $(this).val()).show();
        });
    });
});

//mentor mentee transition
$(document).ready(function () {
  $("#selection").on("change", function () {
    var selectedValue = $(this).val();
    if (selectedValue === "mentees") {
      $("#showMentees").show();
      $("#showMentors").hide();
      $("#university-filter").show();
      $("#industry-filter").hide();
    } else if (selectedValue === "mentors") {
      $("#showMentees").hide();
      $("#showMentors").show();
      $("#university-filter").hide();
      $("#industry-filter").show();
    }
  });
});

const data_url =
  "https://script.google.com/macros/s/AKfycbw0TVyldiK5ijUxjLJkhrxHpxZpIjoeLytZqrvOlftYeHywn1hBEnL0aHGIS8hOFxPp/exec";

async function getData() {
  const response = await fetch(data_url);
  const data = await response.json();
  return data;
}

async function loadData() {
  const { data } = await getData();
  mentors = data.mentors;
  mentees = data.mentees;
  mentorProfilesData = mentors[2019]
    .concat(mentors[2020])
    .concat(mentors[2021]);
  menteeProfilesData = mentees[2019]
    .concat(mentees[2020])
    .concat(mentees[2021]);
  renderAllProfiles();
}
loadData();
function renderProfiles(mentorYear, menteeYear) {
  let mentorProfiles = Mustache.render($("#templateMentors").html(), {
    mentorProfiles: mentorYear,
  });
  let menteeProfiles = Mustache.render($("#templateMentees").html(), {
    menteeProfiles: menteeYear,
  });
  $("#mentorProfiles").html(mentorProfiles);
  $("#menteeProfiles").html(menteeProfiles);
}
function renderAllProfiles() {
  let mentorProfiles = Mustache.render($("#templateMentors").html(), {
    mentorProfiles: mentorProfilesData,
  });
  let menteeProfiles = Mustache.render($("#templateMentees").html(), {
    menteeProfiles: menteeProfilesData,
  });
  $("#mentorProfiles").html(mentorProfiles);
  $("#menteeProfiles").html(menteeProfiles);
}
//function to return true if all industry checkboxes are unchecked.
function isEveryIndustryUnchecked() {
  for (let i = 1; i < 7; i++) {
    if (document.getElementById("industry_" + i).checked == true) {
      return false;
    }
  }
  return true;
}
//function to uncheck checkboxes
function uncheckFilters() {
  for (let i = 1; i < 7; i++) {
    document.getElementById("industry_" + i).checked = false;
  }
  for (let year = 2019; year <= 2022; year++) {
    document.getElementById(year).checked = false;
  }
}
//year by filters
function filterByYear() {
  let mentorsData = [];
  let menteesData = [];
  if (
    document.getElementById("2019").checked == false &&
    document.getElementById("2020").checked == false &&
    document.getElementById("2021").checked == false
  ) {
    renderAllProfiles();
  } else {
    for (let year = 2019; year <= 2022; year++) {
      if (document.getElementById(year).checked) {
        mentorsData = mentorsData.concat(mentors[year]);
        menteesData = menteesData.concat(mentees[year]);
        dataHolder = mentorsData;
        if (isEveryIndustryUnchecked()) {
          renderProfiles(mentorsData, menteesData);
        } else {
          filterByIndustry("");
        }
      }
    }
  }
}
//filter by industry
function filterByIndustry(value) {
  let mentorByIndustry = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };
  let mentorIndustryData = [];
  let mentorsData = [];
  //filter data based on the year
  if (
    document.getElementById("2019").checked == false &&
    document.getElementById("2020").checked == false &&
    document.getElementById("2021").checked == false
  ) {
    mentorsData = mentorProfilesData;
  } else {
    mentorsData = dataHolder;
  }
  //slicing mentors based on their industry
  for (let i = 0; i < mentorsData.length; i++) {
    if (mentorsData[i].fields == "Computer Science") {
      mentorByIndustry[1].push(mentorsData[i]);
    } else if (mentorsData[i].fields == "Engineering") {
      mentorByIndustry[2].push(mentorsData[i]);
    } else if (mentorsData[i].fields == "Life Sciences") {
      mentorByIndustry[3].push(mentorsData[i]);
    } else if (mentorsData[i].fields == "Data Science & AI") {
      mentorByIndustry[4].push(mentorsData[i]);
    } else if (mentorsData[i].fields == "Physical Science") {
      mentorByIndustry[5].push(mentorsData[i]);
    } else if (mentorsData[i].fields == "Other") {
      mentorByIndustry[6].push(mentorsData[i]);
    }
  }
  //industry checkbox selections
  for (let i = 1; i < 7; i++) {
    if (document.getElementById("industry_" + i).checked) {
      mentorIndustryData = mentorIndustryData.concat(mentorByIndustry[i]);
    }
  }
  if (value == "all") {
    renderAllProfiles();
    uncheckFilters();
  } else {
    if (isEveryIndustryUnchecked()) {
      renderProfiles(mentorsData, menteeProfilesData);
    } else {
      renderProfiles(mentorIndustryData, menteeProfilesData);
    }
  }
}
