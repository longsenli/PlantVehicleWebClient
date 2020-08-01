function loginSuccess(result, realIP, username, password) {

	localStorage.clear();
	localStorage.setItem('userID', result.split("###")[0].trim());
	localStorage.setItem('userName', result.split("###")[1].trim());
	localStorage.setItem('password', password);
	localStorage.setItem('RemoteServiceIP',realIP  );
	localStorage.setItem('myDefaultIP',realIP  );
 
	window.location.href = "app_webview_main.html";
}

//设置自定义服务器IP
function setRemoteServiceIP() {
	if(isValidIP($('#RemoteServiceIP').val())) {
		//修改form提交方法
		$('#login_form').attr('onsubmit', 'return defLogin()');
	} else {
		alert('输入不是合法的ip地址,请重新输入');
	}
}
//验证是不是合法ip地址
function isValidIP(ip) {
	return true;
//	var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
//	return reg.test(ip);
}
var latestVersion = "";

//自定义服务器ip地址登录方法
function defLogin() {
	//				var defaultIP = "10.0.0.151:19001";

	var defineIP = $('#RemoteServiceIP').val().trim();
	
	var username = document.getElementById("form-username").value;
	var password = document.getElementById("form-password").value;
	$.ajax({
		type: 'POST',
		// url:'http://192.168.1.100:8080/api/login',
		//url: 'http://10.0.0.151:19001/ilpsService/api/login',
		url: 'http://' + defineIP.trim() + '/PlantVehicleMSService/api/login',
		dataType: "json",
		data: {
			'username': username,
			"password": password,
			"appVersion": localStorage.getItem("versionNow")
		},

		async: true, //设置为false时,timeout不生效
		timeout: 3000,
		success: function(result) {
			if(result.status == "1") {

				loginSuccess(result.message, defineIP.trim(), username, password);

			} else {
				var hintinfo = document.getElementById("hintinfo");
				hintinfo.innerHTML = '<font color="red">' + result.message + '</font>';
				//							hintinfo.innerText = "用户名或密码错误，请重新填写。";
			}
		},

		error: function(XMLHttpRequest, status, err) {
			//if(status != 'timeout')
		},
		complete: function(XMLHttpRequest, status) { //当请求完成时调用函数
			// alert(XMLHttpRequest.status + status); 
			if(status == 'timeout' || status == 'error') { //status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
				//console.log(JSON.stringify(XMLHttpRequest) + "=123=" + status)

				alert(status + "，连接服务器失败，请检查输入的IP是否争取！1.1.1.1:1001")
				//							alert(status + "，连接MES网络服务器失败，正在尝试登录mes网服务器！")
				//							mes_login();
			}
			//login();
		}

	});
	return false;
}

function appLoginPageload() {
	$("#form-username").val(localStorage.getItem('userID'));
	$("#form-password").val(localStorage.getItem('password'));
	//$('#RemoteServiceIP').val(localStorage.getItem('RemoteServiceIP'));
	$("#loginPage_show_RemoteServiceIP").text('当前服务器地址: ' + localStorage.getItem('RemoteServiceIP'));

}

function versionCompare() {
	var RemoteServiceIP1 = localStorage.getItem('RemoteServiceIP');
	if(RemoteServiceIP1 != null && RemoteServiceIP1 != 'undefined' && RemoteServiceIP1 != "") {
		window.webUiService = 'http://' + RemoteServiceIP1+ "/clgl";
	}
	//alert(window.serviceIP ); 
	var versionNow = "";
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		versionNow = inf.version;
		localStorage.setItem("versionNow", inf.version);
	});

	document.getElementById('versionInfo').innerText = "当前版本号: " + localStorage.getItem("versionNow");
	$.ajax({
		type: "get",
		url: window.serviceIP + '/api/getCurrentVersion',
		async: true,
		success: function(res) {

			document.getElementById('versionInfo').innerText = "当前版本号: " + localStorage.getItem("versionNow");
			//alert(res.message)
			latestVersion = res.message;
			if(res.message.toString().trim() > versionNow) //比对版本号
			{
				plus.nativeUI.showWaiting("新版本app下载中，请稍等......");
				//updateAppRun(window.webUiService + '/pages/H5EE481DB_0308142119.apk');
				//									alert(window.webUiService + '/tnpyILPS_' + res.message.toString().trim() + '.apk')
				updateAppRun(window.webUiService + '/clgl_' + res.message.toString().trim() + '.apk');

				//							//console.log(new_version+'新版本'+version);
				//							plus.nativeUI.confirm("应用有新版本，是否立即下载更新？", function(event) {
				//								if(event.index == 1) {
				//									plus.nativeUI.showWaiting();
				//									//updateAppRun(window.webUiService + '/pages/H5EE481DB_0308142119.apk');
				//									//									alert(window.webUiService + '/tnpyILPS_' + res.message.toString().trim() + '.apk')
				//									updateAppRun(window.webUiService + '/tnpyILPS_' + res.message.toString().trim() + '.apk');
				//
				//									//updateAppRun("http://fast.yingyonghui.com/82576ac98a5bf68aa822332c681ce0d9/5c84684a/apk/6363734/4e788c5e4446c6edece446bc92eef0af");
				//									//ks.update_ksd(new_json.url); //更新函数,在下面
				//
				//								}
				//							}, '更新确认', ['取消', '确认']);
			}
		}
	});

}

function downloadAPP() {
	plus.nativeUI.showWaiting("新版本app下载中，请稍等......");
	//alert(window.webUiService   +  '/clgl.apk')
	updateAppRun(window.webUiService   +  '/clgl.apk');
}
//ks.update_ksd==========
function updateAppRun(url) {
	//console.log(url);
	//创建下载管理对象
	var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
		// 下载完成
		if(status == 200) { //下载成功后的回调函数
			//alert("下载成功，准备安装" + d.filename)
			plus.nativeUI.toast("下载成功，准备安装" + d.filename);
			//console.log(d);
			//安装程序，第一个参数是路径，默认的下载路径在_downloads里面
			//plus.runtime.install('_downloads/ksd.apk', {}, function() {
			plus.runtime.install(d.filename, {}, function() {
				plus.nativeUI.toast('安装成功');
			}, function() {
				plus.nativeUI.toast('安装失败');
			});
			plus.nativeUI.closeWaiting();
		} else {
			alert("下载失败 " + status);
			plus.nativeUI.closeWaiting();
		}
	});
	//dtask.addEventListener( "statechanged", onStateChanged, false );
	dtask.start(); //开始下载任务
}

function login() {

	var versionNow;
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		versionNow = inf.version;
		localStorage.setItem("versionNow", inf.version)
	});
 
	if(latestVersion > versionNow) //比对版本号
	{
		alert("请退出更新APP，当前版本：" + versionNow + ",最新版本为：" + latestVersion);
		//return;
	}

	if($('#RemoteServiceIP').val() && $('#RemoteServiceIP').val().toString().length > 6) {
		if(!isValidIP($('#RemoteServiceIP').val())) {
			alert("请正确输入IP，如：1.1.1.1");
		}
		defLogin();
		return;
	}

	var defaultIP = "tnjtpyjd.com:19001:19001";
	if(localStorage.getItem('myDefaultIP')) {
 
		defaultIP = localStorage.getItem('myDefaultIP');
	}
 
	var username = document.getElementById("form-username").value;
	var password = document.getElementById("form-password").value;
	// var RemoteServiceIP1 = localStorage.getItem('RemoteServiceIP');

	// 				if(RemoteServiceIP1 != null && RemoteServiceIP1 != 'undefined' && RemoteServiceIP1 != "") {
	// 					window.serviceIP = 'http://' + RemoteServiceIP1 + '/ilpsService';
	// 				}
	// 				alert('RemoteServiceIP1' + RemoteServiceIP1)
	// 				alert('window.serviceIP' + window.serviceIP)
	
	$.ajax({
		type: 'POST',
		// url:'http://192.168.1.100:8080/api/login',
		//url: 'http://10.0.0.151:19001/ilpsService/api/login',
		url: 'http://' + defaultIP.trim() + '/PlantVehicleMSService/api/login',
		dataType: "json",
		data: {
			'username': username,
			"password": password,
			"appVersion": localStorage.getItem("versionNow")
		},
		async: true, //设置为false时,timeout不生效
		timeout: 3000,
		success: function(result) {
			if(result.status == "1") {
				$("#loginButton").attr("disabled", false);
				loginSuccess(result.message, defaultIP.trim(),  username, password);

			} else {
				var hintinfo = document.getElementById("hintinfo");
				hintinfo.innerHTML = '<font color="red">' + result.message + '</font>';
				//							hintinfo.innerText = "用户名或密码错误，请重新填写。";
			}
		},

		error: function(XMLHttpRequest, status, err) {
			$("#loginButton").attr("disabled", false);
			//if(status != 'timeout')
		},
		complete: function(XMLHttpRequest, status) { //当请求完成时调用函数
			// alert(XMLHttpRequest.status + status);
			$("#loginButton").attr("disabled", false);
			if(status == 'timeout' || status == 'error') { //status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
				//alert(status + "，连接服务器失败，请检查配置信息及网络连接！")
				//	alert(status + "，连接MES网络服务器失败，正在尝试登录mes网服务器！")
				//mes_login();
				nw1_login();
			}
			
		}
	});
	return false;
}

//mes段网络登录调用方法
function nw1_login() {

	//				alert('second_login被调用了')

	var username = document.getElementById("form-username").value;
	var password = document.getElementById("form-password").value;
	// var RemoteServiceIP1 = localStorage.getItem('RemoteServiceIP');
	// 				if(RemoteServiceIP1 != null && RemoteServiceIP1 != 'undefined' && RemoteServiceIP1 != "") {
	// 					window.serviceIP = 'http://' + RemoteServiceIP1 + '/ilpsService';
	// 				}
	// 					alert('RemoteServiceIP1' + RemoteServiceIP1)
	// 				alert('window.serviceIP' + window.serviceIP)
	$.ajax({
		type: 'POST',
		url: 'http://192.168.80.228:19001/PlantVehicleMSService/api/appLogin',
		dataType: "json",
		data: {
			'username': username,
			"password": password,
			"appVersion": localStorage.getItem("versionNow")
		},
		async: true, //设置为false时,timeout不生效
		timeout: 3000,
		success: function(result) {
			if(result.status == "1") {
				$("#loginButton").attr("disabled", false);
				loginSuccess(result.message, '192.168.80.228:19001',  username, password);
			} else {
				var hintinfo = document.getElementById("hintinfo");
				hintinfo.innerHTML = '<font color="red">' + result.message + '</font>';
				//							hintinfo.innerText = "用户名或密码错误，请重新填写。";
			}
		},

		error: function(xhr, status, err) {
			//					 	alert('出现错误,请联系管理员!')
		},
		complete: function(XMLHttpRequest, status) { //当请求完成时调用函数
			$("#loginButton").attr("disabled", false);
			if(status == 'timeout' || status == 'error') { //status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
				ww1_login();
				//alert(status + "，连接服务器失败，请检查配置信息及网络连接！")
			}
		}

	});
	return false;
}


//mes段网络登录调用方法
function ww1_login() {

	//				alert('second_login被调用了')

	var username = document.getElementById("form-username").value;
	var password = document.getElementById("form-password").value;
	// var RemoteServiceIP1 = localStorage.getItem('RemoteServiceIP');
	// 				if(RemoteServiceIP1 != null && RemoteServiceIP1 != 'undefined' && RemoteServiceIP1 != "") {
	// 					window.serviceIP = 'http://' + RemoteServiceIP1 + '/ilpsService';
	// 				}
	// 					alert('RemoteServiceIP1' + RemoteServiceIP1)
	// 				alert('window.serviceIP' + window.serviceIP)
	$.ajax({
		type: 'POST',
		url: 'http://tnjtpyjd.com:19001/PlantVehicleMSService/api/appLogin',
		dataType: "json",
		data: {
			'username': username,
			"password": password,
			"appVersion": localStorage.getItem("versionNow")
		},
		async: true, //设置为false时,timeout不生效
		timeout: 3000,
		success: function(result) {
			if(result.status == "1") {
				$("#loginButton").attr("disabled", false);
				loginSuccess(result.message, 'tnjtpyjd.com:19001',  username, password);
			} else {
				var hintinfo = document.getElementById("hintinfo");
				hintinfo.innerHTML = '<font color="red">' + result.message + '</font>';
				//							hintinfo.innerText = "用户名或密码错误，请重新填写。";
			}
		},

		error: function(xhr, status, err) {
			//					 	alert('出现错误,请联系管理员!')
		},
		complete: function(XMLHttpRequest, status) { //当请求完成时调用函数
			$("#loginButton").attr("disabled", false);
			if(status == 'timeout' || status == 'error') { //status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
				ww2_login();
				//alert(status + "，连接服务器失败，请检查配置信息及网络连接！")
			}
		}

	});
	return false;
}

//mes段网络登录调用方法
function ww2_login() {

	var unselectedMenu = localStorage.getItem('unselectedMenu');
	var username = document.getElementById("form-username").value;
	var password = document.getElementById("form-password").value;
	// var RemoteServiceIP1 = localStorage.getItem('RemoteServiceIP');
	// 				if(RemoteServiceIP1 != null && RemoteServiceIP1 != 'undefined' && RemoteServiceIP1 != "") {
	// 					window.serviceIP = 'http://' + RemoteServiceIP1 + '/ilpsService';
	// 				}
	// 					alert('RemoteServiceIP1' + RemoteServiceIP1)
	// 				alert('window.serviceIP' + window.serviceIP)
	$.ajax({
		type: 'POST',
		url: 'http://222.136.105.178:19001/PlantVehicleMSService/api/appLogin',
		dataType: "json",
		data: {
			'username': username,
			"password": password,
			"appVersion": localStorage.getItem("versionNow")
		},
		async: true, //设置为false时,timeout不生效
		timeout: 3000,
		success: function(result) {
			if(result.status == "1") {
				$("#loginButton").attr("disabled", false);
				loginSuccess(result.message, '222.136.105.178:19001', unselectedMenu, username, password);
			} else {
				var hintinfo = document.getElementById("hintinfo");
				hintinfo.innerHTML = '<font color="red">' + result.message + '</font>';
				//							hintinfo.innerText = "用户名或密码错误，请重新填写。";
			}
		},

		error: function(xhr, status, err) {
			//					 	alert('出现错误,请联系管理员!')
		},
		complete: function(XMLHttpRequest, status) { //当请求完成时调用函数
			$("#loginButton").attr("disabled", false);
			if(status == 'timeout' || status == 'error') { //status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
				alert(status + "，连接服务器失败，请检查配置信息及网络连接！")
			}
		}

	});
	return false;
}