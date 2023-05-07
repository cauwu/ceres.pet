import { 
    AmbientLight, 
    Box3,
    Color, 
    LoadingManager, 
    PerspectiveCamera, 
    PointLight, 
    Scene, 
    Vector3,
    WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js';

const createScene = (camera) => {
    const scene = new Scene();
    scene.background = new Color( 0x333333 );
    scene.add( new AmbientLight( 0xffffff, 0.2 ) );
    scene.add( camera );
    return scene;
}

const createCamera = (pointLight, ratio) => {
    const camera = new PerspectiveCamera( 35, ratio, 1, 500 );
    camera.add( pointLight );
    // Z is up for objects intended to be 3D printed.
    camera.up.set( 0, 0, 1 );
    camera.position.set( - 100, - 250, 100 );
    return camera;
}

const setupControls = (controls, render) => {
    controls.addEventListener( 'change', render );
    controls.minDistance = 50;
    controls.maxDistance = 400;
    controls.enablePan = false;
    controls.update();
}


export const mount = (id, filename) => {
    const container = document.getElementById(id);

    if (container === null) {
        throw new Error(`Could not locate element with id: ${id}`);
    };

    // same as const width = container.innerWidth 
    // and const height = container.innerHeight
    console.log(container);
    const { offsetWidth: width, offsetHeight: height } = container;

    const renderer = new WebGLRenderer( { antialias: true } );
    

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    
    const pointLight = new PointLight( 0xffffff, 0.8 );
    const camera = createCamera(pointLight, width / height);
    const scene = createScene(camera);
    const render = () => renderer.render( scene, camera );
    const controls = new OrbitControls( camera, renderer.domElement );
    const manager = new LoadingManager();
    const loader = new ThreeMFLoader( manager );
    setupControls(controls, render);

    loader.load(`assets/site/3mf/${filename}`, (asset) => {
        const box = new Box3().setFromObject( asset );
        const center = box.getCenter( new Vector3() );

        asset.position.x += ( asset.position.x - center.x );
        asset.position.y += ( asset.position.y - center.y );
        asset.position.z += ( asset.position.z - center.z );

        controls.reset();

        scene.add( asset );
        render();
    });

    window.addEventListener( 'resize', () => {
        const { offsetWidth: w, offsetHeight: h } = container;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize( w, h );
        render();
    } );

    container.appendChild( renderer.domElement );
}
