$(document).ready(function(){
    $('input.typeahead').typeahead({
        source: function(searchString, process) {
            return $.get('http://localhost:8000/products/search', {query: searchString}, function(data) {
                console.log(data);
                data = JSON.parse(data);
                return process(data);
            });
        }
    });
    
    $('#AddProductDetails').validator().on('submit', function(e) {
        if(e.isDefaultPrevented())
        {
            console.log('success');
        }
        else 
        {
            e.preventDefault();
            var form = $('#AddProductDetails')[0];
            var formData = new FormData(form);
            $.ajax({
                method: 'POST',
                url: '/products/addProductDetails',
                data: formData,
                contentType: false, 
                processData: false,
                success: successHandler
            });
        }
    });

    var successHandler = function(response) {
        let form = $('#AddProductDetails');
        form[0].reset();
        let messageText = "Product details updated";
        showNotification("Added product details", messageText, "success", onRegisterClick);
    };

    var showNotification = function(title, text, type, callback, value) {
        switch(type.toLowerCase())
        {
            case "success":
                swal({
                    content: true,
                    title: title,
                    text: text,
                    icon: "success"
                });
                break;
        }
    };

    var onRegisterClick = function() { resetForm(); };
    var resetForm = function() {
        $('#AddProduct')[0].reset();
    };
});