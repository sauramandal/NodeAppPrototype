$(document).ready(function() {
    var quantity = 0;
    $('.quantity-right-plus').click(function(e) {
        //prevent default button action
        e.preventDefault();
        var quantity = parseInt($('#quantity').val());
        if(quantity<5)
            $('#quantity').val(quantity + 1); //inc
    });
    $('.quantity-left-minus').click(function(e) {
        e.preventDefault();
        var quantity = parseInt($('#quantity').val());
        if(quantity>1)
            $('#quantity').val(quantity - 1); //dec
    });
});