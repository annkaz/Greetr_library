//gets an new object (the architecture allows us to not have to use the new keyword here)
var g = G$('Anna', 'K');
//g.greet().greet(true).log();
//g.jQUpdateSelector('#greeting', true);
$('#login').click(function () {
  //getting input for name and surname
  var g = G$($('#name').val(), $('#surname').val());

  //let the user choose if they want a formal greeting, if they skip, setting it to default value of false;
  var formalValue = $('input[name="formality"]:checked').val();
  if (formalValue) {
    formalValue = formalValue === 'true' ? true : false;
  } else {
    formalValue = false;
  }

  //hide the loging on the screen
  $('.logindiv').hide();

  //fire off an HTML greeting, passing '#greeting' as a secector and the choosen language; logs to the console as well
  g.setLang($('#lang').val()).jQUpdateSelector('#greeting', formalValue).log();
});
