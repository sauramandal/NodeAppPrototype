$(document).ready(function() {
  $("#AddCategory").validator().on('submit', function(e) {
    if(e.isDefaultPrevented()) { console.log('error'); }
    else {
      console.log('success');
      e.preventDefault();
      var form = $('#AddCategory')[0];
      var formData = new FormData(form);
      $.ajax({
        method: 'POST',
        url: '/products/addCategory',
        data: formData,
        contentType: false,
        processData: false,
        success: successHandler
      });
    }
  });
});

var successHandler = function(response) {
  var form = $('#AddCategory');
  form[0].reset();
  var messageText = "Category has been successfully added";
  showNotification("Added Category", messageText, "success", onRegisterClick);
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
  $('#AddCategory')[0].reset();
};
