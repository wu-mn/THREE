// prettier-ignore
import * as THREE from '/node_modules/three/build/three.module.js';
// prettier-ignore
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
// prettier-ignore
import { OBJLoader } from '/node_modules/three/examples/jsm/loaders/OBJLoader.js';

// objファイル導入
const loader = new OBJLoader();
loader.load(
  "../src/obj/Table-And-Chairs.obj",
  // called when resource is loaded
  function (object) {
    scene.add(object);
  },
  // called when loading is in progresses
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);
const scene = new THREE.Scene();
//カメラ作成
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//カメラ場所設置
camera.position.set(0, 0, 5);
//renderer作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const cameraControl = new OrbitControls(camera, renderer.domElement);
// ライトを作る1
let dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 3, 5); // 光の向き
scene.add(dirLight);
// ライトを作る2
let ambLight = new THREE.AmbientLight(0x333333);
scene.add(ambLight);
const earth = createMesh(1, "./img/earthmap1k.jpg");
const moon = createMesh(0.2, "./img/moonbump1k.jpg");
scene.add(earth);
scene.add(moon);

function createMesh(w, path) {
  // テクスチャ
  let txLoader = new THREE.TextureLoader();
  let normalMap = txLoader.load(path);
  // ジオメトリ、wは半径
  let geometry = new THREE.SphereGeometry(w, 35, 35);
  // マテリアル
  let material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: normalMap,
  });
  // メッシュ
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

let radian = 0;
function animate() {
  earth.rotation.y += 0.01;
  moon.rotation.y += 0.02;
  moon.position.x = 2 * Math.cos(radian); // 月を周回させる
  moon.position.z = 2 * Math.sin(radian);
  radian += 0.004;
  //カメラとsceneをrendererに入れる
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
