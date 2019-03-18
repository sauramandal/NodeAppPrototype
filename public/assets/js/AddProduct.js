var addProduct = {};
var customOnLoad = $(document).ready(function() {
  console.log('hi');
  addProduct.submitForm();
});

addProduct.submitForm = function() {
  $("#addProductButton").on('click', function() {
    $("#addProductForm").bootstrapValidator({
      //Use feedback icons
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        product_name: {
          message: 'Product Name is not valid',
          validators: {
            notEmpty: {
              message: 'Product name is requried'
            },
            stringLength: {
              min: 6,
              max: 30,
              message: 'Product name must be more than 6 and less than 30 characters long'
            },
            regexp: {
              regexp: /^[ a-zA-Z0-9]+$/,
              message: 'Product name can only consists of alphabets and numbers'
            }
          }
        },
        product_description: {
          validators: {
            notEmpty: {
              message: 'Product description is requried'
            },
            stringLength: {
              min: 20,
              max: 100,
              message: 'Product description must be more between 20 and 100 chars'
            }
          }
        },
        product_price: {
          validators: {
            notEmpty: {
              message: 'Product price is required'
            }
          }
        },
        product_image: {
          validators: {
            notEmpty: {
              message: 'Product image is required'
            }
          }
        }
      }
    });
    /*$("#addProductForm").submit(function(event) {
      event.preventDefault();
      console.log('Submit form via ajax request');
    });*/
  });
};