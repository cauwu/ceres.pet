import { 
    AmbientLight, 
    Box3,
    CircleGeometry,
    DirectionalLight,
    DirectionalLightHelper, 
    Fog,
    LoadingManager, 
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera, 
    Scene, 
    TextureLoader,
    Vector3,
    WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js';

const createScene = (camera) => {
    const scene = new Scene();
    const bgtex = new TextureLoader().load( './static/site/canvas-pinkgradient.svg' );
    scene.background = bgtex;
    scene.fog = new Fog( 0xf3e5e9, 1, 1000 )
    scene.add( new AmbientLight( 0xfff4f2, 0.2 ) ); // https://planetpixelemporium.com/tutorialpages/light.html "full spectrum fluorescent"
    scene.add( camera );
    return scene;
}

const createCamera = (fillLight, rimLight, ratio) => {
    const camera = new PerspectiveCamera( 35, ratio, 1, 2000 );
    // Z is up for objects intended to be 3D printed.
    camera.add( fillLight );
    camera.add( rimLight );
    rimLight.position.set( -500, 100, -400 );
    camera.up.set( 0, 0, 1 );
    camera.position.set( - 130, - 200, 50 );
    return camera;
}

const setupControls = (controls, render) => {
    controls.addEventListener( 'change', render );
    controls.minDistance = 50;
    controls.maxDistance = 400;
    controls.enablePan = false;
    controls.update();
}


export const mount3mf = (id, filename) => {
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
    
    const fillLight = new DirectionalLight( 0xfff4f2, 0.8 );
    const edgeLight = new DirectionalLight( 0xc7cbe9, 1 );
    const showLight = new DirectionalLight( 0xfff4f2, 0.6 );
    const rimLight = new DirectionalLight( 0xffd4dd, 1.5 );
    const edgeLightHelper = new DirectionalLightHelper( edgeLight, 1 );
    const fillLightHelper = new DirectionalLightHelper( fillLight, 1 );
    const showLightHelper = new DirectionalLightHelper( showLight, 1 );
    const rimLightHelper = new DirectionalLightHelper( rimLight, 1 );

    const camera = createCamera(fillLight, rimLight, width / height);
    const scene = createScene(camera);
    const render = () => renderer.render( scene, camera );
    const controls = new OrbitControls( camera, renderer.domElement );
    const manager = new LoadingManager();
    const loader = new ThreeMFLoader( manager );
    setupControls(controls, render);

    loader.load(`static/3mf/${filename}`, ( threemf ) => {
        const box = new Box3().setFromObject( threemf );
        //threemf.recieveShadow = true;
        const center = box.getCenter( new Vector3() );

        threemf.position.x += ( threemf.position.x - center.x + 10 );
        threemf.position.y += ( threemf.position.y - center.y );
        threemf.position.z += ( threemf.position.z - center.z - 20 );

        controls.reset();

        scene.add( threemf );

        const floorgeometry = new CircleGeometry( 500, 32 );
        const floormaterial = new MeshBasicMaterial( {color: 0xffffff} );
        const floor = new Mesh( floorgeometry, floormaterial );
        floor.position.set( 0, 0, -89 );
        scene.add( floor );

        edgeLight.position.set( 40, 40, 80 );
        showLight.position.set( -60, -60, 20 );
        //showLight.castShadow = true;
        scene.add( edgeLight );
        scene.add( showLight );

        scene.add( edgeLight.target );
        scene.add( showLight.target );
        scene.add( fillLight.target );
        scene.add( rimLight.target );
        edgeLight.target.updateMatrixWorld(); // updatematrixworld needed for target to work
        showLight.target.updateMatrixWorld();
        fillLight.target.updateMatrixWorld();
        rimLight.target.updateMatrixWorld();
        /*
        edgeLightHelper.update();
        showLightHelper.update();
        fillLightHelper.update();
        rimLightHelper.update();
        scene.add( edgeLightHelper );
        scene.add( showLightHelper );
        scene.add( fillLightHelper );
        scene.add( rimLightHelper );
        */
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
