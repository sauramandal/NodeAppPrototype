$(document).ready(function() {
  // $("#AddProduct").validator().on('submit', function(e) {
  //   if(e.isDefaultPrevented()) { console.log('error'); }
  //   else {
  //     console.log('success');
  //     e.preventDefault();
  //     var form = $('#AddProduct');
  //     console.log(form.serialize());
  //     $.ajax({
  //       method: 'POST',
  //       url: '/products/addProduct',
  //       data: form.serialize(),
  //       success: successHandler
  //     });
  //   }
  // });

  $('#Register').on('click', function(event) {
    event.preventDefault();
    // validate the form here
    // if everything goes well then submit form else continue
  debugger
  });
});

var successHandler = function(response) {
  console.log(response);
  var productDetails = JSON.parse(response); console.log(productDetails);
  var form = $('#AddCompany');
  form[0].reset();
  var messageText = "Product has been successfully added";
  showNotification("Added Product", messageText, "success", onRegisterClick);
};

var showNotification = function(title, text, type, callback, value) {
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