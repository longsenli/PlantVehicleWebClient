function initDataGrid(selectType) {
	var columnsArray = [];
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "车辆编号",
		"field": "carLicence",
		//		 "visible":false
	});
	columnsArray.push({
		"title": "车辆类型",
		"field": "carType"
	});
	columnsArray.push({
		"title": "车辆颜色",
		"field": "carColor"
	});
	columnsArray.push({
		"title": "驾驶人姓名",
		"field": "driverName"
	});
	columnsArray.push({
		"title": "驾驶人电话",
		"field": "driverPhone"
	});
	columnsArray.push({
		"title": "部门",
		"field": "department"
	});
	columnsArray.push({
		"title": "岗位",
		"field": "job"
	});
	columnsArray.push({
		"title": "紧急联系人",
		"field": "emergencyContact"
	});
	columnsArray.push({
		"title": "紧急联系人电话",
		"field": "emergencyPhone"
	});
	columnsArray.push({
		"title": "登记人",
		"field": "registerName"
	});
	columnsArray.push({
		"title": "登记时间",
		"field": "registrationTime"
	});
	columnsArray.push({
		"title": "备注",
		"field": "remark"
	});
	 
	var columnName = "-1";
	var selectValue = "";
	if("selectByParam" == selectType) {
		columnName = $("#selectColumnType").val();
		selectValue = $("#scanContext").val();
	}

	$.ajax({
		url: window.serviceIP + "/register/listVehicles?columnName=" + columnName + "&selectValue=" + selectValue,
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		//		headers: {
		//			Token: $.cookie('token')
		//		},
		processData: true,
		success: function(dataRes) {
			if(dataRes.status == 1) { 
				var models = eval("(" + dataRes.data + ")");
				//console.log(models);
				$('#dataGrid').bootstrapTable('destroy').bootstrapTable({
					data: models,
					toolbar: '#toolbar',
					singleSelect: false,
					clickToSelect: true,
					sortName: "recordTime",
					sortOrder: "desc",
					pageSize: 15,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					showToggle: true,
					showRefresh: true,
					showColumns: true,
					//>>>>>>>>>>>>>>导出excel表格设置
				      showExport: true,              //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
				      exportDataType:"basic",             //basic', 'all', 'selected'.
				      exportTypes:['doc','excel'],	    //导出类型'json','xml','png','csv','txt','sql','doc','excel','xlsx','pdf'
				      //exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
				      exportOptions:{  //导出参数
				          ignoreColumn: [0,0],            //忽略某一列的索引  
				          fileName: '数据导出',              //文件名称设置  
				          worksheetName: 'Sheet1',          //表格工作区名称  
				          tableName: '数据导出表',  
				          excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],  
				      },
				      //导出excel表格设置<<<<<<<<<<<<<<<<
		                clickToSelect: true,                //是否启用点击选中行
					search: true,
					pagination: true,
					columns: columnsArray
				});
			} else {
				alert("初始化数据失败！" + dataRes.message);
			}
		}
	});
}

//注册登记车辆
function showAddModal() {
	$("#vehicleModal").modal('show');
}
//加载要修改车辆信息
function showEditModal() {
	//获取选中行的数据
	var rows = $("#dataGrid").bootstrapTable('getSelections');
	if(rows.length != 1) {
		alert('请选择一行数据！')
	} else {
		var row = rows[0];
		$('#inputcarLicence').attr('readonly', 'readonly');
		$('#inputcarLicence').val(row.carlicence);
		$('#inputcarType').val(row.cartype);
		$('#inputcarColor').val(row.carcolor);
		$('#inputdriverName').val(row.drivername);
		$('#inputdriverPhone').val(row.driverphone);
		$('#inputemergencyContact').val(row.emergencycontact);
		$('#inputemergencyPhone').val(row.emergencyphone);
		$('#inputregistrationtime').val(row.registrationtime);
		document.getElementById("sendBT").innerText = '保  存';
		$('#sendBT').attr('onclick', 'isrequired("update")');
		$("#vehicleModal").modal('show');
	}
}

function confirmDel() {
	//获取选中行的数据
	var rows = $("#dataGrid").bootstrapTable('getSelections');
	if(rows.length != 1) {
		alert('请选择一行数据！')
	} else {
		$("#confirmDelModal").modal('show');
	}
}

/**
 * 删除角色提交方法
 */
function deleteVehicle() {
	var rows = $("#dataGrid").bootstrapTable("getSelections");
	var ids = [];
	var len = rows.length;

	for(var i = 0; i < len; i++) {
		ids.push(rows[i].carlicence);
	}

	$.ajax({
		url: window.serviceIP + "/register/deleteVehicle",
		dataType: "json",
		traditional: true, //属性在这里设置
		method: "post",
		data: {
			"ids": ids
		},
		success: function(data) {
			// alert(data.state);
			if(data.status == '1') {
				alert('删除成功');
				initDataGrid();
			}
		},
		error: function() {
			document.getElementById("tipContent").innerText = "删除失败";
			$("#Tip").modal('show');
		}
	});
}

function isrequired(flag) {
	if($("#inputcarLicence").val() == '') {
		alert($("#inputcarLicence").attr('placeholder'));
		$("#inputcarLicence").focus();
		return false;
	}
 
	if($("#inputdriverName").val() == '') {
		alert($("#inputdriverName").attr('placeholder'));
		$("#inputdriverName").focus();
		return false;
	}
	if($("#inputdriverPhone").val() == '') {
		alert($("#inputdriverPhone").attr('placeholder'));
		$("#inputdriverPhone").focus();
		return false;
	}
	if($("#inputemergencyContact").val() == '') {
		alert($("#inputemergencyContact").attr('placeholder'));
		$("#inputemergencyContact").focus();
		return false;
	}
	if($("#inputemergencyPhone").val() == '') {
		alert($("#inputemergencyPhone").attr('placeholder'));
		$("#inputemergencyPhone").focus();
		return false;
	}
	//	if ( $("#inputregistrationtime").val() == '' )
	//		{alert($("#inputregistrationtime").attr('placeholder'));$("#inputregistrationtime").focus();return false;}
	if(flag == 'update') {
		updateVehicle();
	}
	if(flag == 'add') {
		vehicleRegister();
	}

}

//用户登记
function vehicleRegister() {
	
	
	var mapData = window.formToObject($("#vehicleRegisterForm"));
mapData["registerName"] = localStorage.userName
	$.ajax({
		url: window.serviceIP + "/register/vehicleRegister",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(mapData).toString(),
		success: function(data) {
			// alert("新增成功");
			if(data.status == "1") {
				alert(data.message);
				$('#sendBT').attr('onclick', 'isrequired("add")');
				document.getElementById("vehicleRegisterForm").reset();
				$('#vehicleModal').modal('hide')
				initDataGrid();
			} else {
				alert(data.message);
			}
		},
		error: function() {}
	});
}

////修改车辆信息
function updateVehicle() {
	var today = new Date();

	var param = $("#vehicleRegisterForm").serializeArray();
	//		alert($("#industrialplant_id").find("option:selected").text());

	$.ajax({
		url: window.serviceIP + "/register/updateVehicle",
		method: "post",
		data: param,
		dataType: "json",
		success: function(data) {
			// alert("新增成功");
			if(data.status == "1") {
				alert(data.message);
				document.getElementById("vehicleRegisterForm").reset();
				$('#vehicleModal').modal('hide')
				initDataGrid();
			} else {
				alert(data.message);
			}
		},
		error: function() {}
	});
}

function laissisrequired(flag) {
	if($("#inputlaissezpasserid").val() == '') {
		alert($("#inputlaissezpasserid").attr('placeholder'));
		$("#inputlaissezpasserid").focus();
		return false;
	}
	if($("#inputcarLicence1").val() == '') {
		alert($("#inputcarLicence1").attr('placeholder'));
		$("#inputcarLicence1").focus();
		return false;
	}
	//		if ( $("#inputdriverName").val() == '' )
	//		    {alert($("#inputdriverName").attr('placeholder'));$("#inputdriverName").focus();return false;}
	if($("#inputstoplocation").val() == '') {
		alert($("#inputstoplocation").attr('placeholder'));
		$("#inputstoplocation").focus();
		return false;
	}
	if($("#inputstarttime").val() == '') {
		alert($("#inputstarttime").attr('placeholder'));
		$("#inputstarttime").focus();
		return false;
	}
	if($("#inputendtime").val() == '') {
		alert($("#inputendtime").attr('placeholder'));
		$("#inputendtime").focus();
		return false;
	}
	if($("#inputupdatetime").val() == '') {
		alert($("#inputupdatetime").attr('placeholder'));
		$("#inputupdatetime").focus();
		return false;
	}
	if($("#inputoperator").val() == '') {
		alert($("#inputoperator").attr('placeholder'));
		$("#inputoperator").focus();
		return false;
	}
	//		if ( $("#inputregistrationtime").val() == '' )
	//			{alert($("#inputregistrationtime").attr('placeholder'));$("#inputregistrationtime").focus();return false;}
	if(flag == 'update') {
		updateLaissezpasser();
	}
	if(flag == 'add') {
		laissezpasserRegister();
	}
}

//新增通行证
function relLaissezpasser() {
	//获取选中行的数据
	var rows = $("#dataGrid").bootstrapTable('getSelections');
	if(rows.length != 1) {
		alert('请选择一行数据！')
	} else {
		var row = rows[0];
		var today = new Date();
		$('#inputcarLicence1').attr('readonly', 'readonly');
		$('#inputcarLicence1').val(row.carlicence);
		$('#inputstoplocation').val("");
		$('#inputstarttime').val(today.format("yyyy-MM-dd hh:mm:ss"));
		$('#inputstatus').val("1");
		$('#inputupdatetime').val(today.format("yyyy-MM-dd hh:mm:ss"));
		$('#inputoperator').val($.cookie('userName'));

		$('#inputendtime').val("2099-01-01");

		document.getElementById("sendBT").innerText = '保  存';
		$('#sendBT').attr('onclick', 'isrequired("update")');
		$("#addOrUpdateModal").modal('show');
	}
}
//新通行证登记
function laissezpasserRegister() {
	var param = $("#laisserzpasserForm").serializeArray();
	//	alert($("#industrialplant_id").find("option:selected").text());

	$.ajax({
		url: window.serviceIP + "/laissezpasser/laissezpasserregister",
		method: "post",
		data: param,
		dataType: "json",
		success: function(data) {
			// alert("新增成功");
			if(data.status == "1") {
				alert(data.message);
				$('#sendBT').attr('onclick', 'isrequired("add")');
				document.getElementById("vehicleRegisterForm").reset();
				$('#addOrUpdateModal').modal('hide')
				initDataGrid();
			} else {
				alert(data.message);
			}
		},
		error: function() {}
	});
}


function printCarQRCode() {
	var selectRow = $("#dataGrid").bootstrapTable('getSelections');
	for(var i = 0; i < selectRow.length; i++) {
		
		var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
		LODOP.PRINT_INIT("打印任务名"); //首先一个初始化语句
		LODOP.ADD_PRINT_BARCODE(15, 70, 120, 120, "QRCode", selectRow[i].carLicence);

		LODOP.ADD_PRINT_TEXT(133, 60, 200, 250,selectRow[i].carLicence + "   "+ selectRow[i].driverName); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);

		LODOP.ADD_PRINT_TEXT(152, 60, 200, 250, selectRow[i].driverPhone); //增加纯文本项
		LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
		LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
		LODOP.SET_PRINT_STYLEA(0, "Bold", 2);
		
		LODOP.PRINT(); //最后一个打印(或预览、维护、设计)语句
	}
}