$(document).ready(function() {
  //Validations for the phone number
  CheckOnlyNumbers();
});

var CheckOnlyNumbers = function() {
  $('.numbersOnly').keyup(function() {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
};

var SubmitForm = function(formButton) {
  $("#AddCompany").validator();
  var valid = $("#AddCompany").data("bs.validator");
  valid.validate();
  // var data = $("#AddCompany").serialize();
  // console.log(data);
  if(!valid.hasErrors()) 
  {
    $(".help-block with-errors").html("");
    var hidText = document.getElementById('HidText1');
    hidText.value = eval('formButton');

    $.ajax({
      method: 'POST',
      data: {"name": "saura", "age": 24},
      contentType: 'json',
      url: 'http://localhost:3000/companies/new',
      success: CallBack
    });
  }
};

var CallBack = function(companyDetails) {
  console.log(companyDetails);
};