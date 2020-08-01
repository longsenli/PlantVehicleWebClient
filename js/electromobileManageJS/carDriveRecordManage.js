function getCarDriveRecord(carID) {

	var columnsArray = [];
	columnsArray.push({
		"title": "编号",
		"field": "carID"
	});
	columnsArray.push({
		"title": "电    动   车   车   型",
		"field": "carType"
	});
	columnsArray.push({
		"title": "员工姓名",
		"field": "driverName"
	});
	columnsArray.push({
		"title": "  所   属    部   门",
		"field": "department"
	});
	columnsArray.push({
		"title": "车  主  联  系  电  话",
		"field": "driverPhone"
	});
	columnsArray.push({
		"title": "车   辆   入   厂  扫  码   时  间",
		"field": "comeTime"
	});
	columnsArray.push({
		"title": "入厂登记人 ",
		"field": "comeRecorder"
	});

	columnsArray.push({
		"title": "车   辆   出   厂  扫  码   时  间",
		"field": "goTime"
	});

	columnsArray.push({
		"title": "出厂登记人",
		"field": "goRecorder"
	});

	var formData = new FormData();
	if(carID) {
		formData.append("id", carID);

		var today = new Date();
		formData.append("endTime", today.format("yyyy-MM-dd") + " 23:59");
		today.setDate(today.getDate() - 2)

		formData.append("startTime", today.format("yyyy-MM-dd"));

	} else {
		formData.append("id", $("#carID").val());
		if($("#carID").val() == '') {
			alert("请输入编码");
			return;
		}
		formData.append("startTime", $("#startTime").val());
		formData.append("endTime", $("#endTime").val() + " 23:59");

	}

	$.ajax({
		url: window.serviceIP + "/api/carDriveRecord/getCarDriveRecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(dataRes) {
			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				//				var resText = "";
				//				for(var i in models) {
				//					resText += "体温:" + models[i].temperature + "时间 :" + models[i].updateTime + "</br>"
				//				}
				//
				//				$('#latestTMPTText').html(resText);

				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 40,
					pageNumber: 1,
					uniqueId: "id",
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					search: false,
					searchAlign: 'right',
					pagination: true,
					//>>>>>>>>>>>>>>导出excel表格设置
					//					showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
					//					exportDataType: "all", //basic', 'all', 'selected'.
					//					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
					//					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
					//					exportOptions: { //导出参数
					//						//ignoreColumn: [0, 0], //忽略某一列的索引  
					//						fileName: '数据导出', //文件名称设置  
					//						worksheetName: 'Sheet1', //表格工作区名称  
					//						tableName: '数据导出表',
					//						excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
					//						//onMsoNumberFormat: DoOnMsoNumberFormat  
					//					},
					//导出excel表格设置<<<<<<<<<<<<<<<<
					columns: columnsArray
				});
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		},
		error: function(jqXHR, exception) {
			var msg = '';
			if(jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if(jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if(jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if(exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if(exception === 'timeout') {
				msg = 'Time out error.';
			} else if(exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert("请求出错," + msg);
		}
	});
}

function getCarStayInPlant() {
	var columnsArray = [];
	columnsArray.push({
		"title": "编号",
		"field": "carID"
	});
	columnsArray.push({
		"title": "电    动   车   车   型",
		"field": "carType"
	});
	columnsArray.push({
		"title": "员工姓名",
		"field": "driverName"
	});
	columnsArray.push({
		"title": "  所   属    部   门",
		"field": "department"
	});
	columnsArray.push({
		"title": "车  主  联  系  电  话",
		"field": "driverPhone"
	});
	columnsArray.push({
		"title": "车   辆   入   厂  扫  码   时  间",
		"field": "comeTime"
	});
	columnsArray.push({
		"title": "入厂登记人 ",
		"field": "comeRecorder"
	});

	columnsArray.push({
		"title": "车   辆   出   厂  扫  码   时  间",
		"field": "goTime"
	});

	columnsArray.push({
		"title": "出厂登记人",
		"field": "goRecorder"
	});

	$.ajax({
		url: window.serviceIP + "/api/carDriveRecord/getCarStayInPlant",
		type: "GET",
		//data: formData,
		processData: false,
		contentType: false,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(dataRes) {
			if(dataRes.status == 1) { 

				var models = eval("(" + dataRes.data + ")");
				//				var resText = "";
				//				for(var i in models) {
				//					resText += "体温:" + models[i].temperature + "时间 :" + models[i].updateTime + "</br>"
				//				}
				//
				//				$('#latestTMPTText').html(resText);

				$('#table').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#materialidToolbar',
					toolbarAlign: 'left',
					singleSelect: true,
					clickToSelect: true,
					sortName: "orderSplitid",
					sortOrder: "asc",
					pageSize: 40,
					pageNumber: 1,
					uniqueId: "id",
					pageList: "[10, 25, 50, 100, All]",
					//showToggle: true,
					//showRefresh: true,
					//showColumns: true,
					search: false,
					searchAlign: 'right',
					pagination: true,
					//>>>>>>>>>>>>>>导出excel表格设置
					//					showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
					//					exportDataType: "all", //basic', 'all', 'selected'.
					//					exportTypes: ['doc', 'excel'], //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
					//					//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
					//					exportOptions: { //导出参数
					//						//ignoreColumn: [0, 0], //忽略某一列的索引  
					//						fileName: '数据导出', //文件名称设置  
					//						worksheetName: 'Sheet1', //表格工作区名称  
					//						tableName: '数据导出表',
					//						excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
					//						//onMsoNumberFormat: DoOnMsoNumberFormat  
					//					},
					//导出excel表格设置<<<<<<<<<<<<<<<<
					columns: columnsArray
				});
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		},
		error: function(jqXHR, exception) {
			var msg = '';
			if(jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if(jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if(jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if(exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if(exception === 'timeout') {
				msg = 'Time out error.';
			} else if(exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert("请求出错," + msg);
		}
	});
}

function addCarDriveRecord(carID, driveType) {

	var formData = new FormData();
	formData.append("carID", carID);
	formData.append("driveType", driveType);
	formData.append("recorderID", localStorage.userID);
	formData.append("recorderName", localStorage.userName);

	$.ajax({
		url: window.serviceIP + "/api/carDriveRecord/addCarDriveRecord",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		//contentType: "application/json",
		//dataType: "json",
		//		headers: {
		//			Token: localStorage.getItem('token')
		//		},

		success: function(dataRes) {
			if(dataRes.status == 1) { 

				$('#latestTMPTText').html(dataRes.message);

			} else {
				$('#latestTMPTText').html(dataRes.message);
			}
			getCarDriveRecord(carID);
		},
		error: function(jqXHR, exception) {
			var msg = '';
			if(jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if(jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if(jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if(exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if(exception === 'timeout') {
				msg = 'Time out error.';
			} else if(exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert("请求出错," + msg);
		}
	});
}

function recognitionQR(qrCode) {

	if("record" == currentDriveType) {
		$("#carID").val(qrCode);
		getCarDriveRecord();
	} else {
		addCarDriveRecord(qrCode, currentDriveType);
	}

}

function handleAddRecord(type) {

	addCarDriveRecord($("#carID").val(), type);

}

var currentDriveType = "";
//重写scanQR方法
function scanLocationQR(type) {
	//执行H5扫描二维码方法
	currentDriveType = type;
	openBarcode();
}

////////以下是H5+调用摄像头进行扫一扫
// alert(openBarcode())
var img = null;
var blist = [];

function scaned(t, r, f) {
	// alert('t='+t+'r='+r+'f='+f);
	//获取扫描二维码信息
	recognitionQR(r);

}

function selected(id) {
	var h = blist[id];
	update(h.type, h.result, h.file);
	if(h.result.indexOf('http://') == 0 || h.result.indexOf('https://') == 0) {
		plus.nativeUI.confirm(h.result, function(i) {
			if(i.index == 0) {
				plus.runtime.openURL(h.result);
			}
		}, '', ['打开', '取消']);
	} else {
		plus.nativeUI.alert(h.result);
	}
}

function update(t, r, f) {
	outSet('扫描成功：');
	outLine(t);
	outLine(r);
	outLine('\n图片地址：' + f);
	if(!f || f == 'null') {
		img.src = '../../vendor/H5+/img/barcode.png';
	} else {
		plus.io.resolveLocalFileSystemURL(f, function(entry) {
			img.src = entry.toLocalURL();
		});
		//img.src = 'http://localhost:13131/'+f;
	}
}

function onempty() {
	if(window.plus) {
		plus.nativeUI.alert('无扫描记录');
	} else {
		alert('无扫描记录');
	}
}

function cleanHistroy() {
	if(blist.length > 0) {
		var hl = document.getElementById('history');
		hl.innerHTML = '<li id="nohistory" class="ditem" onclick="onempty();">无历史记录	</li>';
	}
	plus.io.resolveLocalFileSystemURL('_doc/barcode/', function(entry) {
		entry.removeRecursively(function() {
			// Success
		}, function(e) {
			//alert( "failed"+e.message );
		});
	});
}
// 打开二维码扫描界面 
function openBarcode() {
	createWithoutTitle('barcode_scan.html', {
		titleNView: {
			type: 'float',
			backgroundColor: 'rgba(215,75,40,0.3)',
			titleText: '扫一扫',
			titleColor: '#FFFFFF',
			autoBackButton: true,
			buttons: [{
				fontSrc: '_www/helloh5.ttf',
				text: '相册',
				fontSize: '15px',
				onclick: 'javascript:scanPicture()'
			}]
		}
	});
}
// 打开自定义扫描界面 
function openBarcodeCustom() {
	createWithoutTitle('barcode_custom.html', {
		titleNView: {
			type: 'float',
			backgroundColor: 'rgba(215,75,40,0.3)',
			titleText: '扫一扫',
			titleColor: '#FFFFFF',
			autoBackButton: true,
			buttons: [{
				// fontSrc: '_www/helloh5.ttf',
				text: '相册',
				fontSize: '15px',
				onclick: 'javascript:switchFlash()'
			}]
		}
	});
}

function printStaffQRCode() {
	//createQRCode();
	//	var img = document.getElementById("QRImage"); /// get image element
	//	var canvas = document.getElementsByTagName("canvas")[0]; /// get canvas element
	//	img.src = canvas.toDataURL("image/png"); /// update image

	var selectRow = $("#table").bootstrapTable('getSelections');

	//var arrayObj = new Array();
	for(var i = 0; i < selectRow.length; i++) {
		//console.log("dayin");

		var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
		LODOP.PRINT_INIT("打印任务名"); //首先一个初始化语句
		//LODOP.ADD_PRINT_BARCODE(0,0,200,100,"Code39","*123ABC4567890*");
		LODOP.ADD_PRINT_BARCODE(15, 70, 120, 120, "QRCode", selectRow[i].identityNO);

		LODOP.ADD_PRINT_TEXT(130, 60, 300, 250, selectRow[i].identityNO); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(152, 60, 200, 250, selectRow[i].name); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);
		LODOP.PRINT(); //最后一个打印(或预览、维护、设计)语句
	}
}