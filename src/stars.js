import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Stars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Orbit controls for debugging
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // Grid Helper
    const gridHelper = new THREE.GridHelper(200, 50);
    //scene.add(gridHelper);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // Stars array
    const stars = [];
    function addStar() {
      const geometry = new THREE.OctahedronGeometry(0.3, 0);
      const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true });
      const star = new THREE.Mesh(geometry, material);
    
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
      star.position.set(x, y, z);
      scene.add(star);
      stars.push(star);
    }
    
    Array(300).fill().forEach(addStar);
    
    camera.position.z = 10;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
      
        stars.forEach((star, i) => {

          // Camera circular motion
          const speed = 0.0001;
          const radius = 15;
          const theta = performance.now() * speed + i * 0.02;
          camera.position.x = radius * Math.cos(theta);
          camera.position.z = radius * Math.sin(theta);
          camera.position.y = Math.sin(theta * 2) * 10; 
      
          // Twinkle effect
          star.material.opacity = Math.abs(Math.sin(performance.now() * 0.001 + i)) * 0.7 + 0.3;
      
          // Rotate the stars
          star.rotation.x += 0.01;
          star.rotation.y += 0.01;
          star.rotation.z += 0.01;
        });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      controls.dispose();
      renderer.dispose();
      gridHelper.geometry.dispose();
      gridHelper.material.dispose();

      stars.forEach(star => {
        star.geometry.dispose();
        star.material.dispose();
      });

    };
  }, []);

  return <canvas ref={canvasRef} className="three-canvas"></canvas>;
};


export default Stars;
