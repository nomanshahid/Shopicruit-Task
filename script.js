var maxWeight = 100 * 1000;
var totalWeight = 0;
var totalPrice = 0;
var totalPriceWithTax = 0;

$(document).ready(function () {
	$('.info').hide();
	$.getJSON("http://shopicruit.myshopify.com/products.json", function (obj) {
		$.each(obj.products, function (key, val) {
				if (this.product_type === "Keyboard" || this.product_type === "Computer") {
					$.each(this.variants, function (key, val) {	
						if (totalWeight + this.grams <= maxWeight) {
							totalWeight += this.grams;
							totalPrice += Number(this.price);
							if (this.taxable === true) {
								totalPriceWithTax += Number(this.price) * 1.13; 
							}
							else { 
								totalPriceWithTax += Number(this.price);
							}
						}
					});
				}
			}); 
		});
	});
	
$(document).one('click', '#button', function () {
	$('#weight').append(totalWeight / 1000 + "kg");
	$('#sub-total').append(totalPrice);
	$('#total').append(Math.floor(totalPriceWithTax*100)/100);
	$('.info').fadeIn(500);
	});

