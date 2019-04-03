function isrequired(flag) {
	if($("#inputlaissezpasserid").val() == '') {
		alert($("#inputlaissezpasserid").attr('placeholder'));
		$("#inputlaissezpasserid").focus();
		return false;
	}
	if($("#inputcarLicence").val() == '') {
		alert($("#inputcarLicence").attr('placeholder'));
		$("#inputcarLicence").focus();
		return false;
	}
	//	if ( $("#inputdriverName").val() == '' )
	//	    {alert($("#inputdriverName").attr('placeholder'));$("#inputdriverName").focus();return false;}
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
	if($("#inputregistrationtime").val() == '') {
		alert($("#inputregistrationtime").attr('placeholder'));
		$("#inputregistrationtime").focus();
		return false;
	}
	if(flag == 'update') {
		updateLaissezpasser();
	}
	if(flag == 'add') {
		laissezpasserRegister();
	}
}

function initDataGrid(selectType) {
	var columnsArray = [];
	columnsArray.push({
		radio: true
	});
	columnsArray.push({
		"title": "ID",
		"field": "id",
		"visible": false
	});
	columnsArray.push({
		"title": "通行证号",
		"field": "laissezpasserid"
	});
	columnsArray.push({
		"title": "车牌号",
		"field": "carlicence"
	});
	columnsArray.push({
		"title": "停车位置",
		"field": "stoplocation"
	});
	columnsArray.push({
		"title": "有效期开始时间",
		"field": "starttime"
	});
	columnsArray.push({
		"title": "有效期结束时间",
		"field": "endtime"
	});
	columnsArray.push({
		"title": "办证日期",
		"field": "updatetime"
	});
	columnsArray.push({
		"title": "办证人员",
		"field": "operator"
	});
	columnsArray.push({
		"title": "状态",
		"field": "status",
		"visible": false,
		align: 'center',
		formatter: function(value, row, index) {
			if(value == '1') {
				return '<span class="badge badge-primary">正常</span>';
			} else if(value == '0') {
				return '<span class="badge badge-danger">停用</span>';
			}
		}
	});

	var columnName = "-1";
	var selectValue = "";
	if("selectByParam" == selectType) {
		columnName = $("#selectColumnType").val();
		selectValue = $("#scanContext").val();
	}

	$.ajax({
		url: window.serviceIP + "/laissezpasser/listLaissezpassers?columnName=" + columnName + "&selectValue=" + selectValue,
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
					singleSelect: true,
					clickToSelect: true,
					sortName: "recordTime",
					sortOrder: "desc",
					pageSize: 15,
					pageNumber: 1,
					pageList: "[10, 25, 50, 100, All]",
					showToggle: true,
					showRefresh: true,
					showColumns: true,
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

//新增通行证
function showAddModal() {

	var today = new Date();

	$('#inputstarttime').val(today.format("yyyy-MM-dd hh:mm:ss"));
	$('#inputstatus').val("1");
	$('#inputupdatetime').val(today.format("yyyy-MM-dd hh:mm:ss"));
	$('#inputoperator').val($.cookie('userName'));

	$('#inputendtime').val("2099-01-01");
	$("#addOrUpdateModal").modal('show');
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
				document.getElementById("laisserzpasserForm").reset();
				$('#addOrUpdateModal').modal('hide')
				initDataGrid();
			} else {
				alert(data.message);
			}
		},
		error: function() {}
	});
}

//加载要修改车辆信息
function showEditModal() {
	//获取选中行的数据
	var rows = $("#dataGrid").bootstrapTable('getSelections');
	if(rows.length != 1) {
		alert('请选择一行数据！')
	} else {
		var row = rows[0];
		$('#inputid').attr('readonly', 'readonly');
		$('#inputid').val(row.id);
		$('#inputlaissezpasserid').val(row.laissezpasserid);
		$('#inputcarLicence').val(row.carlicence);
		$('#inputstoplocation').val(row.stoplocation);
		$('#inputstarttime').val(row.starttime);
		$('#inputendtime').val(row.endtime);
		$('#inputupdatetime').val(row.updatetime);
		$('#inputoperator').val(row.operator);
		$('#inputstatus').val(row.status);
		document.getElementById("sendBT").innerText = '保  存';
		$('#sendBT').attr('onclick', 'isrequired("update")');
		$("#addOrUpdateModal").modal('show');
	}
}

////修改车辆信息
function updateLaissezpasser() {
	var param = $("#laisserzpasserForm").serializeArray();
	param.push({
		"name": "id",
		"value": $('#inputid').val()
	});
	//		alert($("#industrialplant_id").find("option:selected").text());

	$.ajax({
		url: window.serviceIP + "/laissezpasser/updateLaissezpasser",
		method: "post",
		data: param,
		dataType: "json",
		success: function(data) {
			// alert("新增成功");
			if(data.status == "1") {
				alert(data.message);
				document.getElementById("laisserzpasserForm").reset();
				$('#addOrUpdateModal').modal('hide')
				initDataGrid();
			} else {
				alert(data.message);
			}
		},
		error: function() {}
	});
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
function deleteLaissezpasser() {
	var rows = $("#dataGrid").bootstrapTable("getSelections");
	var ids = [];
	var len = rows.length;

	for(var i = 0; i < len; i++) {
		ids.push(rows[i].id);
	}

	$.ajax({
		url: window.serviceIP + "/laissezpasser/deleteLaissezpasser",
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
			// 						document.getElementById("tipContent").innerText="删除成功";
			// 						$("#Tip").modal('show');

			// $("#dataGrid").bootstrapTable("refresh");
		},
		error: function() {
			document.getElementById("tipContent").innerText = "删除失败";
			$("#Tip").modal('show');
		}
	});
}