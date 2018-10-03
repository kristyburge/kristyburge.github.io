// Load contact information
$.getJSON( "../data/contact.json", function( data ) {
  $('span .phone').append('<a href="tel:' + data[0].phone + '" class="phone"> ' + data[0].phone + '</a>');
  $('span .email').append('<a href="mailto:' + data[0].email + '" class="email"> ' + data[0].email + '</a>');
});
