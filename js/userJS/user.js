function changePswUserMng() {

	var newPsw = document.getElementById("newPsw").value;
	if(document.getElementById("oldPsw").value == newPsw)
	{

		alert("新旧密码不能一样！");
		return;
	}
	if(newPsw != (document.getElementById("confirmPsw").value))
	{
		alert("新密码不匹配！");
		return;
	}
	var formData = new FormData();
	formData.append("oldPsw", document.getElementById("oldPsw").value);
	formData.append("newPsw", newPsw);
	formData.append("userID", $.cookie('userID')); 
	$.ajax({
			url: window.serviceIP + "/api/user/changepsw",
			type: "POST",
			data: formData,
			headers: {
				Token: $.cookie('token')
			},
			cache: false, //不需要缓存
			processData: false,
			contentType: false,
			success: function(dataRes) {
				if(dataRes.status == 1) {

					alert("修改成功！请重新登录！");
					window.location.href = "login.html";

				} 
				else {
					alert("修改失败！" + dataRes.message);
				}
			}
		});

	};