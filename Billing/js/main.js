var fdb = new ForerunnerDB();
var db = fdb.db("items");
var accountingItem = db.collection("items");
accountingItem.load();

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



