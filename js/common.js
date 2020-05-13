var RemoteServiceIP = localStorage.getItem('RemoteServiceIP');

window.serviceIP = "http://192.168.1.113:8080";
//window.serviceIP = "http://117.158.49.108:19001/PlantVehicleMSService";
//window.netServiceIP = "http://192.168.1.106:8088/";
window.webUiService = "http://117.158.49.108:19001/clgl";
//window.webUiService = "http://192.168.1.108:8081";
if (RemoteServiceIP!=null && RemoteServiceIP!='undefined' && RemoteServiceIP !=""){
	window.serviceIP = 'http://'+RemoteServiceIP+'/PlantVehicleMSService';
}


//设置时间格式
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S": this.getMilliseconds() //millisecond 
	}

	if(/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

//将form数据转为json格式
function getFormDataToJson(formDataOrign) {
	var objData = {};
	var entries = formDataOrign.entries();
	for(var entry of entries) {
		objData[entry[0]] = entry[1];
	}
	return JSON.stringify(objData);
}

function formToObject(formOrign)
{
    var o = {};
    var a = formOrign.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//将时间字符串转换为指定格式的时间字符串
function stringToDatetimeLocalType(str, style) {
	if(str == null || str == "undefined" || str.toString().length < 5) {
		return "";
	}
	var dt = new Date(str)
	if(style == null || style.length < 2) {
		style = "yyyy-MM-ddThh:mm:ss";
	}
	return dt.format(style);
}


//判断浏览器是手机还是PC
function judgeAgentInfo() {
	var userAgentInfo = navigator.userAgent;

	var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

	var mobile_flag = false;

	//根据userAgent判断是否是手机
	for(var v = 0; v < mobileAgents.length; v++) {
		if(userAgentInfo.indexOf(mobileAgents[v]) > 0) {
			mobile_flag = true;
			break;
		}
	}
	return mobile_flag;
}

function mesgNotice(tagmsg, message, linkedURL) {
	if(window.Notification && Notification.permission !== "denied") {
		Notification.requestPermission(function(status) {
			var notice_ = new Notification('新的消息', {
				tag: tagmsg,
				body: message,
				icon: '../image/logo.jpg',
				data: {
					url: linkedURL
				}
				//requireInteraction: true
			});
			setTimeout(function() {
				n.close();
			}, 10000);
			notice_.onclick = function() { //单击消息提示框，进入浏览器页面
				window.open(notice_.data.url, '_blank');
				// notice_.close(); 
			}
		});
	}
}


function formToObject(formOrign)
{
    var o = {};
    var a = formOrign.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function changeConfirmDlg(msg) {

	if(confirm(msg) == true) {
		return true;
	} else {
		return false;
	}
}

var windowOrderStatusEnum = {
	ordered: 1,
	printed: 2,
	doing: 3,
	finished: 4,
	closed: 5,
	deleted: 6
}

var windowProcessEnum = {
	QM: '1001',
	HG: '1002',
	TB: '1003',
	GH: '1004',
	FB: '1005',
	BB: '1006',
	ZH: '1007',
	JS: '1008',
	CD: '1009',
	BZ: '1010',
	JZ: '1011'
}