import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import Colors from '@/constants/Colors';

interface SimulationViewerProps {
  simulationType: string;
  isPlaying: boolean;
  speed: number;
}

export function SimulationViewer({ simulationType, isPlaying, speed }: SimulationViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for Three.js objects
  const threeScene = useRef<THREE.Scene | null>(null);
  const threeCamera = useRef<THREE.PerspectiveCamera | null>(null);
  const threeRenderer = useRef<Renderer | null>(null);
  const simulationObjects = useRef<THREE.Object3D[]>([]);
  const animationFrameId = useRef<number | null>(null);
  
  // Animation state
  const animationState = useRef({
    time: 0,
    isPlaying: isPlaying,
    speed: speed,
  });
  
  // Setup Three.js scene
  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    try {
      setIsLoading(true);
      
      // Create renderer
      const renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      threeRenderer.current = renderer;
      
      // Create scene and camera
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(Colors.darkBackground);
      threeScene.current = scene;
      
      const camera = new THREE.PerspectiveCamera(
        75,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      threeCamera.current = camera;
      
      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
      
      // Create simulation based on type
      await createSimulation(simulationType, scene);
      
      // Animation loop
      const render = () => {
        if (animationState.current.isPlaying) {
          animationState.current.time += 0.01 * animationState.current.speed;
          updateSimulation(animationState.current.time);
        }
        
        renderer.render(scene, camera);
        gl.endFrameEXP();
        animationFrameId.current = requestAnimationFrame(render);
      };
      
      render();
      setIsLoading(false);
    } catch (e) {
      console.error("Error in GL context:", e);
      setError("Falha ao carregar simulação");
      setIsLoading(false);
    }
  };
  
  // Create simulation based on type
  const createSimulation = async (type: string, scene: THREE.Scene) => {
    // Clear previous simulation
    simulationObjects.current.forEach(obj => scene.remove(obj));
    simulationObjects.current = [];
    
    switch (type) {
      case 'greenhouse': {
        // Sun
        const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        sun.position.set(-3, 2, 0);
        scene.add(sun);
        simulationObjects.current.push(sun);
        
        // Earth
        const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
        const earthMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x2196F3,
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.position.set(0, 0, 0);
        scene.add(earth);
        simulationObjects.current.push(earth);
        
        // Atmosphere
        const atmosphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
        const atmosphereMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x64B5F6,
          transparent: true,
          opacity: 0.3,
        });
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        atmosphere.position.set(0, 0, 0);
        scene.add(atmosphere);
        simulationObjects.current.push(atmosphere);
        
        // Solar rays
        for (let i = 0; i < 5; i++) {
          const rayGeometry = new THREE.BoxGeometry(0.05, 0.05, 4);
          const rayMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
          const ray = new THREE.Mesh(rayGeometry, rayMaterial);
          ray.position.set(-1, 1, 0);
          ray.rotation.z = Math.PI / 4; // 45 degrees
          scene.add(ray);
          simulationObjects.current.push(ray);
        }
        
        break;
      }
      
      case 'ozone': {
        // Ozone Layer
        const ozoneGeometry = new THREE.RingGeometry(2, 2.3, 32);
        const ozoneMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x4CAF50,
          side: THREE.DoubleSide,
        });
        const ozoneLayer = new THREE.Mesh(ozoneGeometry, ozoneMaterial);
        scene.add(ozoneLayer);
        simulationObjects.current.push(ozoneLayer);
        
        // CFC molecules
        for (let i = 0; i < 5; i++) {
          const cfcGeometry = new THREE.SphereGeometry(0.15, 16, 16);
          const cfcMaterial = new THREE.MeshBasicMaterial({ color: 0xF44336 });
          const cfc = new THREE.Mesh(cfcGeometry, cfcMaterial);
          cfc.position.set(
            Math.cos(i * Math.PI / 2.5) * 3,
            Math.sin(i * Math.PI / 2.5) * 3,
            0
          );
          scene.add(cfc);
          simulationObjects.current.push(cfc);
        }
        
        break;
      }
      
      case 'acidRain': {
        // Cloud
        const cloudGeometry = new THREE.SphereGeometry(1, 32, 32);
        const cloudMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xE0E0E0,
        });
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(0, 2, 0);
        cloud.scale.set(1.5, 0.7, 1);
        scene.add(cloud);
        simulationObjects.current.push(cloud);
        
        // Factory
        const factoryGeometry = new THREE.BoxGeometry(1, 2, 1);
        const factoryMaterial = new THREE.MeshPhongMaterial({ color: 0x795548 });
        const factory = new THREE.Mesh(factoryGeometry, factoryMaterial);
        factory.position.set(-2, -1, 0);
        scene.add(factory);
        simulationObjects.current.push(factory);
        
        // Chimney
        const chimneyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 16);
        const chimneyMaterial = new THREE.MeshPhongMaterial({ color: 0x8D6E63 });
        const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
        chimney.position.set(-2, 0.5, 0);
        scene.add(chimney);
        simulationObjects.current.push(chimney);
        
        // Smoke particles
        for (let i = 0; i < 10; i++) {
          const smokeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
          const smokeMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x9E9E9E,
            transparent: true,
            opacity: 0.7,
          });
          const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
          smoke.position.set(-2, 1 + i * 0.2, 0);
          scene.add(smoke);
          simulationObjects.current.push(smoke);
        }
        
        // Rain drops
        for (let i = 0; i < 15; i++) {
          const dropGeometry = new THREE.SphereGeometry(0.05, 8, 8);
          const dropMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x90CAF9,
            transparent: true,
            opacity: 0.8,
          });
          const drop = new THREE.Mesh(dropGeometry, dropMaterial);
          drop.position.set(
            Math.random() * 4 - 2,
            Math.random() * 4 - 2,
            0
          );
          scene.add(drop);
          simulationObjects.current.push(drop);
        }
        
        break;
      }
      
      case 'smog': {
        // City buildings
        for (let i = 0; i < 5; i++) {
          const height = 1 + Math.random() * 2;
          const buildingGeometry = new THREE.BoxGeometry(0.5, height, 0.5);
          const buildingMaterial = new THREE.MeshPhongMaterial({ color: 0x9E9E9E });
          const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
          building.position.set(-2 + i, -1.5 + height / 2, 0);
          scene.add(building);
          simulationObjects.current.push(building);
        }
        
        // Sun
        const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFAB40 });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        sun.position.set(0, 2, -2);
        scene.add(sun);
        simulationObjects.current.push(sun);
        
        // Smog particles
        for (let i = 0; i < 50; i++) {
          const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
          const particleMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xA1887F,
            transparent: true,
            opacity: 0.5,
          });
          const particle = new THREE.Mesh(particleGeometry, particleMaterial);
          particle.position.set(
            Math.random() * 6 - 3,
            Math.random() * 2,
            Math.random() * 2 - 1
          );
          scene.add(particle);
          simulationObjects.current.push(particle);
        }
        
        break;
      }
      
      default: {
        // Default simple animation
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x3F51B5 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        simulationObjects.current.push(cube);
        break;
      }
    }
    
    // Reset animation time
    animationState.current.time = 0;
  };
  
  // Update simulation animation
  const updateSimulation = (time: number) => {
    if (!simulationObjects.current.length) return;
    
    switch (simulationType) {
      case 'greenhouse': {
        // Animate sun rays
        const rays = simulationObjects.current.slice(3);
        rays.forEach((ray, index) => {
          const basePos = -3 + index * 0.2;
          ray.position.x = basePos + Math.sin(time + index) * 0.1;
          ray.position.y = 2 - index * 0.7 + Math.cos(time + index) * 0.1;
        });
        
        // Animate atmosphere
        const atmosphere = simulationObjects.current[2];
        atmosphere.scale.set(
          1 + Math.sin(time * 0.5) * 0.05,
          1 + Math.sin(time * 0.5) * 0.05,
          1 + Math.sin(time * 0.5) * 0.05
        );
        break;
      }
      
      case 'ozone': {
        // Animate CFC molecules moving toward ozone layer
        const cfcs = simulationObjects.current.slice(1);
        cfcs.forEach((cfc, index) => {
          const r = 3 - time * 0.2;
          if (r > 2.2) {
            cfc.position.x = Math.cos(index * Math.PI / 2.5 + time * 0.3) * r;
            cfc.position.y = Math.sin(index * Math.PI / 2.5 + time * 0.3) * r;
          } else {
            // Create "holes" in ozone layer when CFCs reach it
            const ozoneLayer = simulationObjects.current[0] as THREE.Mesh;
            const ozoneMaterial = ozoneLayer.material as THREE.MeshBasicMaterial;
            ozoneMaterial.opacity = Math.max(0.2, 1 - time * 0.05);
            ozoneMaterial.transparent = true;
          }
        });
        break;
      }
      
      case 'acidRain': {
        // Animate smoke rising
        const smokes = simulationObjects.current.slice(3, 13);
        smokes.forEach((smoke, index) => {
          smoke.position.y = 1 + (index * 0.2) + time * 0.1;
          smoke.position.x = -2 + Math.sin(time + index) * 0.5;
          
          // Reset smoke position when it goes too high
          if (smoke.position.y > 3) {
            smoke.position.y = 1;
          }
        });
        
        // Animate rain drops falling
        const drops = simulationObjects.current.slice(13);
        drops.forEach((drop, index) => {
          drop.position.y -= 0.03;
          
          // Reset drop position when it falls below the screen
          if (drop.position.y < -3) {
            drop.position.y = 2;
            drop.position.x = Math.random() * 4 - 2;
          }
        });
        break;
      }
      
      case 'smog': {
        // Animate smog particles
        const particles = simulationObjects.current.slice(6);
        particles.forEach((particle, index) => {
          particle.position.x += Math.sin(time + index) * 0.005;
          particle.position.y += Math.cos(time + index) * 0.002;
          
          // Keep particles within bounds
          if (particle.position.x > 3) particle.position.x = -3;
          if (particle.position.x < -3) particle.position.x = 3;
          if (particle.position.y > 3) particle.position.y = 0;
          if (particle.position.y < 0) particle.position.y = 3;
        });
        
        // Make sun less visible over time (smog effect)
        const sun = simulationObjects.current[5] as THREE.Mesh;
        const sunMaterial = sun.material as THREE.MeshBasicMaterial;
        sunMaterial.opacity = Math.max(0.2, 1 - time * 0.05);
        sunMaterial.transparent = true;
        break;
      }
      
      default: {
        // Default animation
        const cube = simulationObjects.current[0];
        cube.rotation.x = time;
        cube.rotation.y = time * 0.5;
        break;
      }
    }
  };
  
  // Update simulation when type changes
  useEffect(() => {
    if (threeScene.current) {
      createSimulation(simulationType, threeScene.current);
    }
  }, [simulationType]);
  
  // Update animation state when play/pause changes
  useEffect(() => {
    animationState.current.isPlaying = isPlaying;
  }, [isPlaying]);
  
  // Update animation speed
  useEffect(() => {
    animationState.current.speed = speed;
  }, [speed]);
  
  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando simulação...</Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glView: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBackground,
  },
  loadingText: {
    color: Colors.white,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBackground,
  },
  errorText: {
    color: Colors.error,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});