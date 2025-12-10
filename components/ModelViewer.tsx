import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { ModelType } from '@/types';
import { modelCache } from '@/utils/modelCache';

interface ModelViewerProps {
  modelType: ModelType | string;
  zoomLevel: number;
}

export function ModelViewer({ modelType, zoomLevel }: ModelViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const threeScene = useRef<THREE.Scene | null>(null);
  const threeCamera = useRef<THREE.PerspectiveCamera | null>(null);
  const threeRenderer = useRef<Renderer | null>(null);
  const modelMesh = useRef<THREE.Mesh | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const glRef = useRef<ExpoWebGLRenderingContext | null>(null);
  const currentModelKeys = useRef<{ geometry: string; material: string } | null>(null);
  
  const rotationX = useSharedValue(0);
  const rotationY = useSharedValue(0);
  
  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    try {
      setIsLoading(true);
      glRef.current = gl;
      
      const renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      renderer.setClearColor(Colors.darkBackground, 1);
      threeRenderer.current = renderer;
      
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(Colors.darkBackground);
      threeScene.current = scene;
      
      const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
      camera.position.z = 5;
      threeCamera.current = camera;
      
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      await createModel(modelType, scene);
      
      const render = () => {
        try {
          if (modelMesh.current) {
            modelMesh.current.rotation.x = rotationX.value;
            modelMesh.current.rotation.y = rotationY.value;
          }
          
          renderer.render(scene, camera);
          gl.endFrameEXP();
        } catch (renderError) {
          console.error('Render error:', renderError);
        }
        
        animationFrameId.current = requestAnimationFrame(render);
      };
      
      animationFrameId.current = requestAnimationFrame(render);
      setIsLoading(false);
    } catch (e) {
      console.error('Error in GL context:', e);
      setError('Falha ao carregar modelo 3D');
      setIsLoading(false);
    }
  };
  
  const createModel = async (type: string, scene: THREE.Scene) => {
    if (currentModelKeys.current) {
      modelCache.releaseGeometry(currentModelKeys.current.geometry);
      modelCache.releaseMaterial(currentModelKeys.current.material);
    }
    
    if (modelMesh.current) {
      scene.remove(modelMesh.current);
    }
    
    const geometryKey = `geo-${type}`;
    const materialKey = `mat-${type}`;
    
    let geometry: THREE.BufferGeometry;
    let material: THREE.Material;
    
    switch (type) {
      case 'atmosphere':
        geometry = modelCache.getGeometry(geometryKey, () => new THREE.SphereGeometry(2, 32, 32));
        material = modelCache.getMaterial(materialKey, () => new THREE.MeshPhongMaterial({ color: 0x2196F3, transparent: true, opacity: 0.8, flatShading: false }));
        break;
      case 'layers':
        geometry = modelCache.getGeometry(geometryKey, () => new THREE.SphereGeometry(2, 32, 32));
        material = modelCache.getMaterial(materialKey, () => new THREE.MeshPhongMaterial({ color: 0x1E88E5, wireframe: true }));
        break;
      case 'composition':
        geometry = modelCache.getGeometry(geometryKey, () => new THREE.SphereGeometry(2, 32, 32));
        material = modelCache.getMaterial(materialKey, () => new THREE.MeshPhongMaterial({ color: 0x64B5F6, emissive: 0x0D47A1, emissiveIntensity: 0.2 }));
        break;
      case 'co2':
        geometry = modelCache.getGeometry(geometryKey, () => new THREE.SphereGeometry(1, 32, 32));
        material = modelCache.getMaterial(materialKey, () => new THREE.MeshPhongMaterial({ color: 0xF44336 }));
        break;
      case 'ch4':
        geometry = modelCache.getGeometry(geometryKey, () => new THREE.TetrahedronGeometry(1.5));
        material = modelCache.getMaterial(materialKey, () => new THREE.MeshPhongMaterial({ color: 0x2196F3 }));
        break;
      case 'n2o':
        geometry = modelCache.getGeometry(geometryKey, () => new THREE.CylinderGeometry(0.5, 0.5, 2, 32));
        material = modelCache.getMaterial(materialKey, () => new THREE.MeshPhongMaterial({ color: 0x4CAF50 }));
        break;
      case 'o3':
        geometry = modelCache.getGeometry(geometryKey, () => new THREE.IcosahedronGeometry(1.5, 0));
        material = modelCache.getMaterial(materialKey, () => new THREE.MeshPhongMaterial({ color: 0x9C27B0 }));
        break;
      case 'cfc':
        geometry = modelCache.getGeometry(geometryKey, () => new THREE.BoxGeometry(1.5, 1.5, 1.5));
        material = modelCache.getMaterial(materialKey, () => new THREE.MeshPhongMaterial({ color: 0xFFC107 }));
        break;
      default:
        geometry = modelCache.getGeometry(geometryKey, () => new THREE.SphereGeometry(2, 32, 32));
        material = modelCache.getMaterial(materialKey, () => new THREE.MeshBasicMaterial({ color: 0xaaaaaa }));
    }
    
    const mesh = new THREE.Mesh(geometry, material);
    modelMesh.current = mesh;
    currentModelKeys.current = { geometry: geometryKey, material: materialKey };
    scene.add(mesh);
    
    rotationX.value = 0.5;
    rotationY.value = 0.5;
  };
  
  useEffect(() => {
    if (threeScene.current) {
      createModel(modelType, threeScene.current);
    }
  }, [modelType]);
  
  useEffect(() => {
    if (threeCamera.current) {
      threeCamera.current.position.z = 5 / zoomLevel;
    }
  }, [zoomLevel]);

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      if (currentModelKeys.current) {
        modelCache.releaseGeometry(currentModelKeys.current.geometry);
        modelCache.releaseMaterial(currentModelKeys.current.material);
      }

      if (threeScene.current) {
        threeScene.current.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((m: THREE.Material) => m.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }

      if (threeRenderer.current) {
        try {
          threeRenderer.current.dispose();
        } catch (e) {
          console.warn('Error disposing renderer:', e);
        }
      }
    };
  }, []);
  
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = rotationX.value;
      ctx.startY = rotationY.value;
    },
    onActive: (event, ctx) => {
      rotationX.value = ctx.startX + event.translationY / 100;
      rotationY.value = ctx.startY + event.translationX / 100;
    },
  });
  
  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando modelo...</Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.glContainer}>
          <GLView style={styles.glView} onContextCreate={onContextCreate} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  glContainer: {
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
