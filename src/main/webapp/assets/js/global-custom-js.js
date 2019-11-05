$('.panel').click(
    function () {
        if($(this).hasClass("collapsed")){
            $('.plusMinusSign').removeClass("fa-minus");
            $('.plusMinusSign').addClass("fa-plus");
            $(this).children("div").children("i").removeClass("fa-plus");
            $(this).children("div").children("i").addClass("fa-minus");
            $('.card-toggle').removeClass("card shadow");
            $(this).parent("h5").parent("div").parent("div").addClass("card shadow");
        }else{
            $(this).parent("h5").parent("div").parent("div").removeClass("card shadow");
            $(this).children("div").children("i").removeClass("fa-minus");
            $(this).children("div").children("i").addClass("fa-plus");
        }
    }
)