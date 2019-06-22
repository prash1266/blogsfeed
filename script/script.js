$(document).ready(function() {
  $(window).scroll(function() {
    var height = $('.space').height();
    if($(this).scrollTop() >= height - 70) {
      $('.transparent-nav').addClass('addcolor');
    } else {
      $('.transparent-nav').removeClass('addcolor');
    }
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#imagepreview').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function authentication(){
  var user = document.getElementById('username').value;
  var pass = document.getElementById('password').value;
  if (user == 'admin' && pass == 'admin070881') {
    location.href = '/blogs/new';
  }
  else {
    alert('Wrong Username or Password');
  }
}