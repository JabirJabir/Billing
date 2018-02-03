var fdb = new ForerunnerDB();
var db = fdb.db("items");
var accountingItem = db.collection("items");

accountingItem.load();

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
		
		var search = accountingItem.find({
    	date : {
        	$gte : gte,
        	$lte : lte
		}
		});
		console.log(search);
		updateTable(search);
	}else{
		
	}
	
}

$(document).ready(function(){
	accountingItem.load(dataLoad);
})

function dataLoad() {
	var items = accountingItem.find(
					{},
					{$orderBy:{date:-1},$limit:10}
				);
	updateTable(items);
}

function updateTable(items){
	$("#table-tbody").find("tr").remove();
	for (var i = 0;i < items.ledngth; i++) {
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



