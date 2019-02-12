// $(document).ready(function() {
//   //Validations for the phone number
//   CheckOnlyNumbers();
// });

// var CheckOnlyNumbers = function() {
//   $('.numbersOnly').keyup(function() {
//     this.value = this.value.replace(/[^0-9]/g, '');
//   });
// };

// var SubmitForm = function(formButton) {
//   $("#AddCompany").validator();
//   var valid = $("#AddCompany").data("bs.validator");
//   valid.validate();
//   var data = $("#AddCompany").serialize();
//   console.log(data);
//   if(!valid.hasErrors()) 
//   {
//     $(".help-block with-errors").html("");
//     var hidText = document.getElementById('HidText1');
//     hidText.value = eval('formButton');

//     $.ajax({
//       method: 'POST',
//       data: data,
//       contentType: 'json',
//       url: '/companies/new',
//       success: CallBack
//     });
//   }
// };

// var CallBack = function(companyDetails) {
//   console.log(companyDetails);
// };

$(document).ready(function() {
  var form = $('#AddCompany');
  form.on('submit', handleForm);
  function handleForm(e) {
    e.preventDefault();
    const options = {
      method: 'POST',
      url: '/companies/new',
      data: form.serialize()
    };
    $.ajax(options).done(response => {
      console.log(response);
    });
  }
});


// $(document).ready(function(){
	
// 	console.log('ready')
//   $('#submitBtn').click(function(event) {
//   	event.preventDefault();
// 		console.log('form submitted')  
//     var username = $('#txtUserName').val();
    
//     console.log('value :' + username)
//   })
// });