$(document).ready(function(){
  var date_input=$('input[name="date"]'); //our date input has the name "date"
  var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
  var options={
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);


  $(".platinum-box").click(function(){
      $("#platinum").show();
      $("#silver").hide();
      $("#gold").hide();
  });
  $(".silver-box").click(function(){
      $("#silver").show();
      $("#platinum").hide();
      $("#gold").hide();
  });
  $(".gold-box").click(function(){
      $("#gold").show();
      $("#platinum").hide();
      $("#silver").hide();
  });


   $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });



});