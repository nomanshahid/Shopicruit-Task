var totalPrice = 0;
var totalPriceWithTax = 0;
var i = 1;

$(document).ready(function () {
	$('.info').hide();
	while (i < 15) {
		$.getJSON("http://shopicruit.myshopify.com/products.json?page=" + i.toString(), function (obj) {
				$.each(obj.products, function (key, val) {
					if (this.product_type === "Clock" || this.product_type === "Watch") {
						$.each(this.variants, function (key, val) {
							totalPrice += Number(this.price);
							if (this.taxable == true) {
								totalPriceWithTax += Number(this.price) * 1.13; 
							}
							else { 
								totalPriceWithTax += Number(this.price);
							}
						});
					}
				}); 
		});
		++i;
	}

});


$(document).one('click', '#button', function () {
	$('#sub-total').append(Math.floor(totalPrice*100)/100);
	$('#total').append(Math.floor(totalPriceWithTax*100)/100);
	$('.info').fadeIn(500);
});

