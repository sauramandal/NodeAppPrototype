$(document).ready(function() {
  $("#AddProduct").validator().on('submit', function(e) {
    if(e.isDefaultPrevented()) { console.log('error'); }
    else {
      console.log('success');
      e.preventDefault();
      var form = $('#AddProduct')[0]; 
      var formData = new FormData(form);     
      $.ajax({
        method: 'POST',
        url: '/products/addProduct',
        data: formData,
        contentType: false, 
        processData: false,
        success: successHandler
      });
    }
  });

  /*$('#Register').on('click', function(event) {
    event.preventDefault();
    // validate the form here
    // if everything goes well then submit form else continue
    
  });*/
});

var successHandler = function(response) {
  var form = $('#AddProduct');
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
  $('#myModal').modal('show');
  resetForm();
};

var resetForm = function() {
  $('#AddProduct')[0].reset();
};