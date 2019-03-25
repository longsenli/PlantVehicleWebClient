
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch("../vendor/login/img/backgrounds/1.jpg");
    
    /*
        Form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
//  $('.login-form').on('submit', function(e) {
//  	
//  	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
//  		if( $(this).val() == "" ) {
//  			e.preventDefault();
//  			$(this).addClass('input-error');
//  		}
//  		else {
//  			$(this).removeClass('input-error');
//  		}
//  	});
//  	
//  });
//  
    
});

function openIndex(){
	window.location.href="http://blog.sina.com.cn/mleavs";
	//window.location.href="/index.html"
//if(!document.form-username.value) {
//alert("请输入用户名！"); document.form_name.username.focus(); return false;
//}else document.form-username.action="aaa.htm";
};

