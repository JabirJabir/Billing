var fdb = new ForerunnerDB();
var db = fdb.db("items");
var accountingItem = db.collection("items");
var category = ["食", "衣", "住", "行","其他"];

// accountingItem.load(dataLoad);

function searchExpences() {
	console.log(accountingItem.find());
	var gte = "";
	var lte = "";

	if ($("[name=date]:checked").val() == "thisMonth") {
		var date = new Date();
		var year = date.getUTCFullYear();
		var month = date.getUTCMonth()+1;
		if (month < 10) {
			gte = year + "-0" + month + "-" + "01";
			lte = year + "-0" + month + "-" + "31";
		}else{
			gte = year + "-" + month + "-" + "01";
			lte = year + "-" + month + "-" + "31";
		}
		console.log(gte);
		console.log(lte);
	}else{
		gte = $("#dateFirst").val();		
		lte = $("#dateLast").val();
	}
	if (gte !=""||lte !="") {
		var search = accountingItem.find({
	    	date : {
	        	$gte : gte,
	        	$lte : lte
			}
		});
	}		
	console.log(search);
	updateTableCategory(search);
	categoryFunction(search);
}

function categoryFunction(items){
	var sumCategory = [0,0,0,0,0];
	var sum = 0;
	for (var i = 0; i < items.length; i++) {
		switch(items[i].kind){
			case category[0]:
				sumCategory[0] += items[i].cost*1;
				break;
			case category[1]:
				sumCategory[1] += items[i].cost*1;
				break;
			case category[2]:
				sumCategory[2] += items[i].cost*1;
				break;
			case category[3]:
				sumCategory[3] += items[i].cost*1;
				break;
			case category[4]:
				sumCategory[4] += items[i].cost*1;
				break;
			default:
				alert("Error!");
		}
		sum += items[i].cost*1;
	}

	$("#category-tbody").find("tr").remove();
	for (var i = 0; i < sumCategory.length; i++) {
		sumCategory[i]
		$("#category-tbody").append(
			"<tr>" +
			"<td>" + category[i] + "</td>" +
			"<td>" + sumCategory[i] + "</td>" +
			"<td>" + Math.round((sumCategory[i] /sum)*100) + "%</td>" +
			"</td>"
		);
	}
	$("#txtSum").text("總額: $" + sum);
}


$(document).ready(function(){
	accountingItem.load(dataLoad);	
});

function dataLoad() {
	var items = accountingItem.find(
					{},
					{$orderBy:{date:-1},$limit:10}
				);
	updateTableLast(items);
	console.log(items);
}

function updateTableCategory(items){
	$("#detail-tbody").find("tr").remove();
	for (var i = 0;i < items.length; i++) {
		$("#detail-tbody").append(
			"<tr>" +
			"<td>" + items[i].date + "</td>" +
			"<td>" + items[i].item + "</td>" +
			"<td>" + items[i].cost + "</td>" +
			"</td>"
		);
	}
}

function updateTableLast(items){
	$("#table-tbody").find("tr").remove();
	for (var i = 0;i < items.length; i++) {
		$("#table-tbody").append(
			"<tr>" +
			"<td>" + items[i].date + "</td>" +
			"<td>" + items[i].item + "</td>" +
			"<td>" + items[i].cost + "</td>" +
			"</td>"
		);
	}
}
function submit() {
	accountingItem.insert({
	    date: $("#date").val(),
	    kind: $("#kind").val(),
	    item: $("#item").val(),
	    cost: $("#cost").val()
	});
	accountingItem.save();
	$("#date").val("");
    $("#item").val("");
    $("#cost").val("");
    alert("成功!");
}

// $("[name=date]").change(function () {
	// 	// console.log(this.value);
	// 	if(this.value == "thisMonth"){
	// 		$("[name=date]").prop("readOnly", true);
	// 		console.log("thisMonth");
	// 	}else{
	// 		$("[name=date]").prop("readOnly", false);
	// 		console.log("period");
	// 	}
	// });