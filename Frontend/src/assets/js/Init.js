
function NiceSelect()
{

  setTimeout(function() {

    $("#tarifs").niceSelect();

    $("#CiviliteId").niceSelect();

    $("#Prefix").niceSelect();

    $(".niceSelect").niceSelect();
    $(".location__select1").niceSelect();
    $(".property__select1").niceSelect();

    $("#Search").niceSelect();







},0);

}



function AccountTab()
{

  setTimeout(function() {

 // account tab
 $(".account-content").hide();
 $(".account-content:first").show();
 $(".account-info__btn").on("click", function () {
   $(".account-info__btn").removeClass("account-info__btn-active");
   $(this).addClass("account-info__btn-active");
   $(".account-content").hide();
   var activeAccount = $(this).attr("href");
   $(activeAccount).fadeIn(100);
   return false;
 });




}, 0);

}


function Sidebar()
{

  setTimeout(function() {


  // collapsible sidebar
  $(".collapse__sidebar__btn").click(function () {
    $(".sidebar").toggleClass("sidebar__active");
  });

  // collapsible sidebar
  $(".close__sidebar").click(function () {
    $(".sidebar").toggleClass("sidebar__active");
  });




}, 0);

}



function LisrAndGridTabs()
{

  setTimeout(function() {


// property list and grid tabs
  $(".grid__view").on("click", function () {
  $(".property__grid__area__wrapper__inner").addClass(
    "col-xl-4 col-md-6",
    400
  );
  $(".property__grid__area__wrapper__inner__two").removeClass("col-xl-5");
  $(".property__grid__area__wrapper__inner__three").removeClass("col-xl-7");
  $(".property__list__wrapper").addClass("property__grid");
});

$(".grid__list").on("click", function () {
  $(".property__grid__area__wrapper__inner").removeClass(
    "col-xl-4 col-md-6",
    400
  );
  $(".property__grid__area__wrapper__inner__two").addClass("col-xl-5");
  $(".property__grid__area__wrapper__inner__three").addClass("col-xl-7");
  $(".property__list__wrapper").removeClass("property__grid");
});

$(".grid__btn").on("click", function () {
  $(".grid__btn").removeClass("grid__btn__active");
  $(this).addClass("grid__btn__active");
});





}, 0);

}

function GoToImage()
{

  $('html,body').animate({scrollTop: $("#gallery").offset().top}, 'fast');

}

function BackgroundImage()
{
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });

}

function Notification()
{
  $(".notification__icon").on("click", function () {
    $(".notification__wrapper").toggleClass("notification__wrapper__active");
  });

}






