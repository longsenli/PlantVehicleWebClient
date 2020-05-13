function changePswUserMng() {

	var newPsw = document.getElementById("newPsw").value;
	if(document.getElementById("oldPsw").value == newPsw) {

		alert("新旧密码不能一样！");
		return;
	}
	if(newPsw != (document.getElementById("confirmPsw").value)) {
		alert("新密码不匹配！");
		return;
	}
	if(localStorage.getItem('password') != (document.getElementById("oldPsw").value)) {
		alert("旧密码输入错误！");
		return;
	}
	var formData = new FormData();
	formData.append("oldPassword", document.getElementById("oldPsw").value);
	formData.append("newPassword", newPsw);
	formData.append("userID", localStorage.getItem('userID'));
	$.ajax({
		url: window.serviceIP + "/api/changePassword",
		type: "POST",
		data: formData,

		cache: false, //不需要缓存
		processData: false,
		contentType: false,
		success: function(dataRes) {
			if(dataRes.status == 1) {

				alert("修改成功！请重新登录！");
				//window.location.href = "login.html";

			} else {
				alert("修改失败！" + dataRes.message);
			}
		}
	});

};

function rowClickChangeColor(row) {

	$('.changeTableRowColor').removeClass('changeTableRowColor');
	$(row).find("td").addClass('changeTableRowColor');
}

function getUserList(type) {

	var columnsArray = [];
	
	columnsArray.push({
		checkbox: true
	});
	columnsArray.push({
		"title": "用户ID",
		"field": "id"
	});
	columnsArray.push({
		"title": "用户名称",
		"field": "name"
	});

	var formData = new FormData();
	if(type == '-1') {
		formData.append("userID", "-1");
		formData.append("userName", "-1");

	} else {
		if($("#userID").val() != '') {
			formData.append("userID", $("#userID").val());
		} else {
			formData.append("userID", "-1");
		}
		if($("#userName").val() != '') {
			formData.append("userName", $("#userName").val());
		} else {
			formData.append("userName", "-1");
		}

	}

	$.ajax({
		url: window.serviceIP + "/api/selectUserInfo",
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
					search: true,
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
				alert("查询用户失败！" + dataRes.message);
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
};

function addUserInfo() {

	if($("#userID").val() == '' || $("#userName").val() == '' || $("#userPassword").val() == '') {
		alert("账号  用户名  密码 不能为空");
		return;
	}
	var formData = new FormData();
	formData.append("userID", $("#userID").val());
	formData.append("userName", $("#userName").val());
	formData.append("password", $("#userPassword").val());
	$.ajax({
		url: window.serviceIP + "/api/addUserInfo",
		type: "POST",
		data: formData,

		cache: false, //不需要缓存
		processData: false,
		contentType: false,
		success: function(dataRes) {
			if(dataRes.status == 1) {
				getUserList('-1');
				alert("添加成功！ ");
				//window.location.href = "login.html";

			} else {
				alert("添加用户失败！" + dataRes.message);
			}
		}
	});

};

function deleteUserInfo() {

	var row = $.map($('#table').bootstrapTable('getSelections'), function(row) {
		return row;
	});
	if(row.length != 1) {
		alert("请选择要修改的数据,一次只能选择一行! 当前行数为:" + row.length);
		return;
	}

	if(!window.changeConfirmDlg("确定删除该员工账号?" + row[0].name)) {
		return;
	}
	$.ajax({
		url: window.serviceIP + "/api/deleteUserInfo?userID=" + row[0].id,
		type: "POST",
		contentType: "application/json",
		dataType: "json",

		success: function(data) {
			if(data.status == 1) {
				getUserList('-1');
				alert('删除成功!');
			} else {
				alert("删除失败！" + data.message);
			}
		}
	});
};