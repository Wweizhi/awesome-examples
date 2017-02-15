if(Detector.webgl){
	var scene = null,
		camera = null,
		renderer = null,
		cube = null
	/*init()
	createGeometry()
	render()*/
}else{
	var warning = Detector.getWebGLErrorMessage()
	document.body.appendChild(warning)
}

function init (){
	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

	renderer = new THREE.WebGLRenderer()
	renderer.setSize( window.innerWidth, window.innerHeight )
	document.body.appendChild( renderer.domElement )
}

function createGeometry(){
	var geometry = new THREE.BoxGeometry(1,1,1) 
	var material = new THREE.MeshBasicMaterial({color: 0x00ffb0})
	cube = new THREE.Mesh(geometry, material) 
	scene.add(cube)

	camera.position.z = 5
}

function render () {
	requestAnimationFrame( render )

	cube.rotation.x += 0.1
	cube.rotation.y += 0.1

	renderer.render(scene, camera)
}

var renderer = new THREE.WebGLRenderer({
    alpha: true, 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xFFFFFF, 1.0);
document.getElementById('canvas-frame').appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 800);
camera.position.set(0, 0, 40);
camera.lookAt(new THREE.Vector3(0, 0, 0));


var material = new THREE.LineBasicMaterial({
    color: 0x000000
});
var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));

/*geometry.vertices.push(new THREE.Vector3(10, 0, 0));
geometry.vertices.push(new THREE.Vector3(10, 10, 0));
geometry.vertices.push(new THREE.Vector3(-10, 10, 0));
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
*/

var scene = new THREE.Scene()
var lineX = null
for(var i = 0; i < 20; i++){
    lineX = new THREE.Line(geometry, material)
    lineX.position.z = 1 * i 
    scene.add(lineX);

    /*var lineY = new THREE.Line(geometry, material)
    lineY.position.x = 1 * i - 10
    lineY.position.z = 10
    lineY.rotation.y = 90 * Math.PI / 180
    scene.add(lineY);*/
}

renderer.render(scene, camera);