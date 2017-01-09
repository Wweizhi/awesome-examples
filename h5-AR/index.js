
var localStream = null
var $video = document.getElementById('AR-H5'),
	$btn_close = document.getElementById('btn-close-AR')

alert(JSON.stringify(navigator.getUserMedia))
if(navigator.getUserMedia){
	navigator.getUserMedia({
		"video": {
			"optional": [{}]
		}
	}, successCallback, errorCallback)
}else{
	//alert('No Api: getUserMedia!')
}

function successCallback(stream){
	$video.src = window.URL && window.URL.createObjectURL(stream) || stream
	localStream = stream
}

function errorCallback(error){
	alert("Error: " + error)
}

function closeMedia(){
	localStream.stop()
	$video.src = ''
}