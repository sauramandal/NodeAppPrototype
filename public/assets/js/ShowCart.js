
var check = false;

function changeVal(el) {
    var qt = parseFloat(el.parent().children(".qt").html());
    var perproductprice = parseFloat(el.parent().children(".perproductprice").html());
    var volumePrice = qt * perproductprice;
    var subtotal = parseFloat($(".subtotal span").html());

    if (qt === 0) {
        return;
    } 

    if (el.html() === '+') {
        subtotal += perproductprice;
    } else {
        subtotal -= perproductprice;
    }
    
    var tax = Math.round(subtotal * 0.05 * 100) / 100;
    var shipping = parseFloat($(".shipping span").html());
    var totalAmount = Math.round((subtotal + tax + shipping) *100) / 100;

    if(subtotal == 0) {
        totalAmount = 0;
    }

    $(el.parent().children(".full-price")).html(volumePrice);
    $(".subtotal span").html(subtotal);
    $(".tax span").html(tax);
    $(".total span").html(totalAmount);
}

function changeTotal() {
    var price = 0;

    $(".full-price").each(function(index){
        price += parseFloat($(".full-price").eq(index).html());
    });

    price = Math.round(price * 100) / 100;
    var tax = Math.round(price * 0.05 * 100) / 100
    var shipping = parseFloat($(".shipping span").html());
    var fullPrice = Math.round((price + tax + shipping) *100) / 100;

    if(price == 0) {
        fullPrice = 0;
    }

    $(".subtotal span").html(price);
    $(".tax span").html(tax);
    $(".total span").html(fullPrice);
}

$(document).ready(function(){
    //calculate sub total price
    var subTotalPrice = 0.0;
    var priceList = $('.full-price');
    for(var i=0;i<priceList.length; i++) {
        subTotalPrice = subTotalPrice + parseFloat(priceList[i].innerText);
    }
    $(".subtotal span").html(subTotalPrice);
    const taxes = Math.round(0.05 * subTotalPrice * 100)/100;
    const shippingCost = 5;
    var fullPrice = Math.round((subTotalPrice + taxes + shippingCost)*100)/100;
    $(".total span").html(fullPrice);
    $(".remove").click(function(){
        var el = $(this);
        el.parent().parent().addClass("removed");
        window.setTimeout(
        function(){
            el.parent().parent().slideUp('fast', function() { 
            el.parent().parent().remove(); 
            if($(".product").length == 0) {
                if(check) {
                $("#cart").html("<h1>The shop does not function, yet!</h1><p>If you liked my shopping cart, please take a second and heart this Pen on <a href='https://codepen.io/ziga-miklic/pen/xhpob'>CodePen</a>. Thank you!</p>");
                } else {
                $("#cart").html("<h1>No products!</h1>");
                }
            }
            changeTotal(); 
            });
        }, 200);
    });
    
    $(".qt-plus").click(function(){
        $(this).parent().children(".qt").html(parseInt($(this).parent().children(".qt").html()) + 1);
        
        $(this).parent().children(".full-price").addClass("added");
        
        var el = $(this);
        window.setTimeout(function(){el.parent().children(".full-price").removeClass("added"); changeVal(el);}, 150);
    });
    
    $(".qt-minus").click(function(){
        
        child = $(this).parent().children(".qt");
        if (parseInt(child.html()) === 1) {
            return;
        }
        
        if(parseInt(child.html()) > 1) {
        child.html(parseInt(child.html()) - 1);
        }
        
        $(this).parent().children(".full-price").addClass("minused");
        
        var el = $(this);
        window.setTimeout(function(){el.parent().children(".full-price").removeClass("minused"); changeVal(el);}, 150);
    });
    
    window.setTimeout(function(){$(".is-open").removeClass("is-open")}, 1200);
    
    $(".btn").click(function(){
        check = true;
        $(".remove").click();
    });
});
