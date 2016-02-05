// custom script 
jQuery(function() { 
    jQuery('#signup-form').on('submit', function(e) { 
        var form = jQuery(this);
		form.parsley().validate();
        if (form.parsley().isValid()){
            jQuery.post("signup.php", jQuery(form).serialize());       
        }
    });
}); 

// WOW 
new WOW().init();

// svg fallback
function supportsSVG(){
  return !! document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect;  
}
if (supportsSVG()) {
  document.documentElement.className += ' svg';
} else {
  document.documentElement.className += ' no-svg';
  var imgs = document.getElementsByTagName('img');
  var dotSVG = /.*\.svg$/;
  for (var i = 0; i != imgs.length; ++i) {
    if(imgs[i].src.match(dotSVG)) {
      imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
    }
  }
}