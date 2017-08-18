 import * as THREE from 'three'

/// USAGE
// var cubeSphere = new CubeSphere({
//             parent: PARENT, // scene or Object3D
//             scale: 1, // in case scaling according to other objects in scene
//             radius: 5, // size of sphere
//             textureFaces: [
//                 new THREE.ImageUtils.loadTexture(04.jpg),
//                 new THREE.ImageUtils.loadTexture(03.jpg),
//                 new THREE.ImageUtils.loadTexture(05.jpg),
//                 new THREE.ImageUtils.loadTexture(06.jpg),
//                 new THREE.ImageUtils.loadTexture(02.jpg),
//                 new THREE.ImageUtils.loadTexture(01.jpg)
//             ]

//         })





 class CubeSphere {
     constructor(opts) {
         this.parent = null
         this.scale = 1;
         this.radius = 30;
         this.segments = 32
         this.depth = true;
         this.transparent = false;

         Object.assign(this, opts);

         // this.drawLine()
         this.init()
     }
     init() {

         this.cubeSphereMaterial = this.createCubeFaceMaterial()

         this.cubeGeometry = new THREE.BoxGeometry(this.radius * this.scale, this.radius * this.scale, this.radius * this.scale, this.segments, this.segments, this.segments);
         // this.cubeGeometry.scale(1200, 1200, 1200)
         for (var i in this.cubeGeometry.vertices) {
             var vertex = this.cubeGeometry.vertices[i];
             vertex.setLength(this.radius * this.scale);
             // vertex.normalize().multiplyScalar(this.RADIUS);
         }
         // geometry.makeGroups();
         this.cubeGeometry.computeVertexNormals()
         this.cubeGeometry.computeFaceNormals();
         this.cubeGeometry.computeMorphNormals();
         this.cubeGeometry.computeBoundingSphere();
         this.cubeGeometry.computeBoundingBox();
         this.cubeGeometry.computeLineDistances();
         // this.cubeGeometry.computeTangents();

         this.cubeGeometry.verticesNeedUpdate = true;
         this.cubeGeometry.elementsNeedUpdate = true;
         this.cubeGeometry.uvsNeedUpdate = true;
         this.cubeGeometry.normalsNeedUpdate = true;
         this.cubeGeometry.tangentsNeedUpdate = true;
         this.cubeGeometry.colorsNeedUpdate = true;
         this.cubeGeometry.lineDistancesNeedUpdate = true;
         this.cubeGeometry.buffersNeedUpdate = true;
         this.cubeGeometry.groupsNeedUpdate = true;

         this.cubeSphere = new THREE.Mesh(this.cubeGeometry, this.cubeSphereMaterial);

         this.spheres = new THREE.Object3D(0, 0, 0);
         // set sphere y at prime meridian
         // accoridng to the cube projections, rotating 45 degrees centers otexn a seam, which is the prime meridian
         var yAxis = new THREE.Vector3(0, 1, 0);
         var oldVec = new THREE.Vector3(0, -45 * (Math.PI / 180), 0);
         var newVec = oldVec.applyAxisAngle(yAxis, 180 * (Math.PI / 180));
         // var newVec = oldVec.applyAxisAngle( xAxis, latRads )
         // this.spheres.rotation.x = newVec.x
         this.spheres.rotation.y = newVec.y
             // this.spheres.add(this.glowSphereBack)
         this.spheres.add(this.cubeSphere)
             // this.createMappedSphere()
         this.parent.add(this.spheres)

     }
     createCubeFaceMaterial() {
     	var _this = this;
        var textureFaces = this.textureFaces;
        var faces = textureFaces.map(function(textureFace, i) {

             var face = new THREE.MeshPhongMaterial({
                 map: textureFaces[i],
                 color: new THREE.Color(0xffffff),
                 shininess: 0,
                 bumpScale: .5,
                 depthWrite: _this.depth,
                 depthTest: _this.depth,
                 // renderOrder: 111,
                 transparent: _this.transparent
                 // transparent: true,
                 // opacity: 1,
                 // needsUpdate: true
             });

             face.map.needsUpdate = true;

             return face;

         })

         return faces;

     }

 }


 export default CubeSphere;