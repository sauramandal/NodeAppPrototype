$(document).ready(function() {
	tab = $('.tabs h3 a');

	tab.on('click', function(event) {
		event.preventDefault();
		tab.removeClass('active');
		$(this).addClass('active');

		tab_content = $(this).attr('href');
		$('div[id$="tab-content"]').removeClass('active');
		$(tab_content).addClass('active');
    });
    
    $("#Datepicker").datepicker({
        minDate: new Date('1900-01-01'),
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-mm-yy'
    });

    $('#LoginForm').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true, 
                minlength: 6
            }
        }, 
        messages: {
            email: "Please enter a valid email address",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long"
            }
        },
        submitHandler: function(form, e) {
            form.submit();
        }
    });

    
    
    $('#SignUpForm').validate({
        rules: {
            first_name: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            last_name: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            email: {
                required: true,
                email: true
            },
            phone_number: {
                required: true,
                number: true
            },
            dob: {
                required: true
            },
            password: {
                required: true,
                minlength: 6
            },
            agree: "required"
        },
        messages: {
            first_name: { 
                required: "Please provide your first name",
                minlength: "Your name must be at least 2 characteres long",
                maxlength: "Your name must be at max 20 characteres long"
            },
            last_name: { 
                required: "Please provide your last name",
                minlength: "Your name must be at least 2 characteres long",
                maxlength: "Your name must be at max 20 characteres long"
            },
            email: "Please enter a valid email address",
            phone_number: {
                required: "Please enter your phone number",
                number: "Please enter only numeric value"
            },
            dob: {
                required: "Please provide your date of birth"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long"
            }
            
        },
        submitHandler: function(form, e) {
            e.preventDefault();
            console.log('Form Submitted');
            var formele = $('#SignUpForm');
            //submit form via ajax request
            $.ajax({
                method: 'POST',
                url: '/signup',
                data: formele.serialize(),
                success: function(result) {
                    // window.location.href = "localhost:3000/index";
                    console.log(result);
                    if(result.error) {
                        let messageText = "User already exists! Please Log In to continue";
                        notification("User sign up", messageText, "success", onRegisterClick);
                        $('#SignUpForm')[0].reset();
                    } else {
                        let messageText = "Signed up successfully, Please Log In to continue";
                        notification("User sign up", messageText, "success", onRegisterClick);
                        $('#SignUpForm')[0].reset();
                    }
                }
            });
        }
    });
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
    var callback = function() {
        resetForm();
    };
    
    var resetForm = function() {
        $('#SignUpForm')[0].reset();
    };
});