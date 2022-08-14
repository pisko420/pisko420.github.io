jQuery(document).ready(function(){
	
	var request;
		
	$('a.instapast').click(function(){
		
		var id = this.dataset.insta;
		
		request = $.ajax({
			url:  "observers_divulje2.php" + id, // instapast-ajax.php is in the directory templates
			type: "post"
		});
	
		request.done(function (data, textStatus, jqXHR){			
			var json = $.parseJSON(data);
			$('#instapastPopupTitle').html(json.title);
			$('#instapastPopupContent').html(json.text);

			$('#instapastPopup').foundation('open');
		});
		
	console.log("a")
	});
});