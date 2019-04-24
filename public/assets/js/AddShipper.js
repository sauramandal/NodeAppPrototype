$(document).ready(function() {
    console.log('dom loaded');
    $("#AddShipper").validator().on('submit', function(e) {
      if(e.isDefaultPrevented()) {
        //handle invalid response
        console.log('error');
      } else {
        console.log('success');
        e.preventDefault();
        var form = $('#AddShipper');
        //submit form via ajax request
        $.ajax({
          method: 'POST',
          url: '/sellers/new',
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
    var form = $('#AddShipper');
    form[0].reset();
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
    $('#AddShipper')[0].reset();
  };