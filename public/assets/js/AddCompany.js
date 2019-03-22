$(document).ready(function() {
  console.log('dom loaded');
  $("#AddCompany").validator().on('submit', function(e) {
    if(e.isDefaultPrevented()) {
      //handle invalid response
      console.log('error');
    } else {
      console.log('success');
      e.preventDefault();
      var form = $('#AddCompany');
      //submit form via ajax request
      $.ajax({
        method: 'POST',
        url: '/companies/new',
        data: form.serialize(),
        success: callBack
      });
    }
  }); 
});

var callBack = function(res) {
  //console.log(res);
  var companyDetails = JSON.parse(res);
  console.log(companyDetails);
  var form = $('#AddCompany');
  form[0].reset();
  // form.validator('destroy');
  // form.validator();
  var messageText = "";
  notification("Add Company Profile", messageText, "success", onRegisterClick);
}

var notification = function(title, text, type, callback, value) {
  switch(type.toLowerCase())
  {
    case "success" : 
      swal({
        content: true,
        title: title,
        text: text,
        icon: "success"
      });
      break;
  }
};

var onRegisterClick = function() {
  resetForm();
};

var resetForm = function() {
  $('#AddCompany')[0].reset();
};