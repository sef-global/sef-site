// Write custom js functions for the upspeak
// page here
$(function () {
    loadNavAndFooter('/assets/content/static');  //relative path to content directory
    });

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
