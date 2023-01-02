// Write custom js functions for the scholarx 2020 page here
let mentorProfiles = [];
let filteredProfiles = [];
const selectedCategories = new Set();

$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
    loadProfiles(); // load profiles
    toggleCategory("all"); // Select all categories
    // Listner for FAQ
    $('.panel').click(
        function () {
            if($(this).hasClass("collapsed")){
                const collapseSign = $('.plusMinusSign');
                collapseSign.removeClass("fa-minus");
                collapseSign.addClass("fa-plus");
                $(this).children("div").children("i").removeClass("fa-plus");
                $(this).children("div").children("i").addClass("fa-minus");
                $('.card-toggle').removeClass("card shadow");
                $(this).parent("div").parent("div").addClass("card shadow");
            }else{
                $(this).parent("div").parent("div").removeClass("card shadow");
                $(this).children("div").children("i").removeClass("fa-minus");
                $(this).children("div").children("i").addClass("fa-plus");
            }
        }
    );
});

//slice array to two parts
function sliceProfiles(profiles) {
    //slice array to two parts
    if (profiles.length >= 8) {
        let partOne = profiles.slice(0, 8);
        let partTwo = profiles.slice(8);
        //mustache render - part one
        let contentPartOne = Mustache.render($("#templateTeam").html(), {"profiles": partOne});
        //display first 8 profiles
        $("#teamContent").html(contentPartOne);
        $("#btnShowLess").hide();
        //hide button
        $("#btnShowMore").click(function () {
            let contentPartTwo = Mustache.render($("#templateTeam").html(), {"profiles": partTwo});
            $(contentPartTwo).appendTo("#teamContent").hide().fadeIn(1000);
            $("#btnShowMore").hide();
            $("#btnShowLess").show();
        });
        $("#btnShowLess").click(function () {
            $("#teamContent").html(contentPartOne);
            $("#btnShowMore").show();
            $("#btnShowLess").hide();
        });
    } else {
        //mustache render
        let content = Mustache.render($("#templateTeam").html(), {"profiles": profiles});
        //display first 8 profiles
        $("#teamContent").html(content);
        //hide button
        $("#btnShowMore").hide();
        $("#btnShowLess").hide();
    }
}

//function to load profile data
function loadProfiles() {
    $.ajax({
        type: 'get',
        url: 'https://script.google.com/macros/s/AKfycbzfo3HV14j-SilxPv5X5zLmvBLlhJ-VAZfxcy0ph41toJY-ad5RQ6uHRJRcojpWVyOQ/exec',
        dataType: 'json',
        success: function (profiles) {
            // Add a new key named `index` with the index (To use with moustache template)
            profiles.forEach(function (profile, index) {
                profile.index = index;
            });
            mentorProfiles = profiles;
            filteredProfiles = profiles;
            sliceProfiles(profiles);
            document.getElementById('btnMentors').style.visibility = "visible";
        }
    });
}

// function to filter profiles based on category
function filterProfiles(category) {
    toggleCategory(category);
    if(category === "all"){
        filteredProfiles = mentorProfiles;
    } else {
        filteredProfiles = [];
        mentorProfiles.forEach(profile => {
            for(const field of profile["fields"]) {
                if(selectedCategories.has(field)) {
                    filteredProfiles.push(profile);
                    break;
                }
            }
        });
    }

    let content;
    if(filteredProfiles.length > 0) {
        content = Mustache.render($("#templateTeam").html(), {"profiles": filteredProfiles});
    } else {
        content = $("#teamFilterError").html();
    }
    //display content
    $("#teamContent").html(content);
    //hide button
    $("#btnShowMore").hide();
}

const availableCategories = ["Computer Science", "Engineering", "Life Sciences", "Data Science & AI", "Physical Science", "Other"];

// If the given category already exists in the selectedCategories set, remove that category,
// else add the category to the set.
function toggleCategory(category) {
    if(category === "all") {
        availableCategories.forEach(availableCategory => {
            selectedCategories.add(availableCategory);
            // selecting all checkboxes
            const categoryCheckboxID = `#chk${availableCategory.replaceAll(" ", "").replaceAll("&", "n")}`;
            $(categoryCheckboxID).prop("checked", true);
        });
    } else {
        const categoryCheckboxID = `#chk${category.replaceAll(" ", "").replaceAll("&", "n")}`;
        if(! selectedCategories.delete(category)) {            
            selectedCategories.add(category);
            $(categoryCheckboxID).prop("checked", true);
        } else {
            $(categoryCheckboxID).prop("checked", false);
        }
    }
}

function openMentorProfile(index){
    // Get the selected mentor
    const profile = mentorProfiles[parseInt(index)];
    // Add content to the template
    const template = $('#template-profile-modal-content').html();
    const content = Mustache.render(template, profile);
    // Update the modal
    $('#profile-modal-content').html(content);
    // Open the modal
    $('#profile-modal').modal();
}
