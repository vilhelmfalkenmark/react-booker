$(document).ready(function() {

 $(".show-mybookings-btn").click(function() {
  $(".mybookings-container").toggleClass("show-modal");
 });

 $(".hide-modal").click(function() {

  // $(this).toggleClass("show-modal");
 });

 $(document).on('keydown',function(e) {
     if ((e.keyCode == 27) && ($(".mybookings-container").hasClass("show-modal") == true )) {
      $(".mybookings-container").toggleClass("show-modal");
     }
 });


 });// End $(document).ready
