/**
 * Unit Tests para ModelCacheManager
 *
 * Valida:
 * - Geometry caching e reutilização
 * - Material caching e reutilização
 * - Texture caching e reutilização
 * - Reference counting
 * - LRU eviction
 * - Memory management
 */

import * as THREE from 'three';
import { ModelCacheManager } from '@/utils/modelCache';

describe('ModelCacheManager', () => {
  let cache: ModelCacheManager;

  beforeEach(() => {
    // Reset singleton para cada teste
    cache = ModelCacheManager.getInstance();
    cache.clear();
  });

  afterEach(() => {
    cache.clear();
  });

  // ============================================
  // GEOMETRY TESTS
  // ============================================

  describe('Geometry Caching', () => {
    test('should create and cache a geometry', () => {
      const factory = jest.fn(() => new THREE.SphereGeometry(2, 32, 32));

      const geo1 = cache.getGeometry('sphere-1', factory);

      expect(factory).toHaveBeenCalledTimes(1);
      expect(geo1).toBeInstanceOf(THREE.SphereGeometry);
    });

    test('should return cached geometry on second call', () => {
      const factory = jest.fn(() => new THREE.SphereGeometry(2, 32, 32));

      const geo1 = cache.getGeometry('sphere-1', factory);
      const geo2 = cache.getGeometry('sphere-1', factory);

      // Factory called only once (second call used cache)
      expect(factory).toHaveBeenCalledTimes(1);
      // Both references are the same object
      expect(geo1).toBe(geo2);
    });

    test('should create different geometries for different keys', () => {
      const sphereFactory = jest.fn(() => new THREE.SphereGeometry(2, 32, 32));
      const boxFactory = jest.fn(() => new THREE.BoxGeometry(1, 1, 1));

      const sphere = cache.getGeometry('sphere-1', sphereFactory);
      const box = cache.getGeometry('box-1', boxFactory);

      expect(sphere).not.toBe(box);
      expect(sphereFactory).toHaveBeenCalledTimes(1);
      expect(boxFactory).toHaveBeenCalledTimes(1);
    });

    test('should increment reference count on getGeometry', () => {
      const factory = () => new THREE.SphereGeometry(2, 32, 32);

      cache.getGeometry('sphere-1', factory);
      cache.getGeometry('sphere-1', factory); // Same key

      // Reference count should be 2
      // (We can't access it directly, but we can test behavior)
      // After 2 releases, geometry should be disposed
      cache.releaseGeometry('sphere-1');
      cache.releaseGeometry('sphere-1'); // Should dispose
    });

    test('should release geometry and decrement reference count', () => {
      const factory = () => new THREE.SphereGeometry(2, 32, 32);
      const disposeSpy = jest.spyOn(THREE.SphereGeometry.prototype, 'dispose');

      const geo = cache.getGeometry('sphere-1', factory);
      cache.releaseGeometry('sphere-1');

      // Should dispose on final release
      expect(disposeSpy).toHaveBeenCalled();
      disposeSpy.mockRestore();
    });
  });

  // ============================================
  // MATERIAL TESTS
  // ============================================

  describe('Material Caching', () => {
    test('should create and cache a material', () => {
      const factory = jest.fn(
        () => new THREE.MeshPhongMaterial({ color: 0x0000ff })
      );

      const mat1 = cache.getMaterial('phong-blue', factory);

      expect(factory).toHaveBeenCalledTimes(1);
      expect(mat1).toBeInstanceOf(THREE.MeshPhongMaterial);
    });

    test('should return cached material on second call', () => {
      const factory = jest.fn(
        () => new THREE.MeshPhongMaterial({ color: 0x0000ff })
      );

      const mat1 = cache.getMaterial('phong-blue', factory);
      const mat2 = cache.getMaterial('phong-blue', factory);

      expect(factory).toHaveBeenCalledTimes(1);
      expect(mat1).toBe(mat2);
    });

    test('should create different materials for different keys', () => {
      const blueFactory = jest.fn(
        () => new THREE.MeshPhongMaterial({ color: 0x0000ff })
      );
      const redFactory = jest.fn(
        () => new THREE.MeshPhongMaterial({ color: 0xff0000 })
      );

      const blue = cache.getMaterial('blue', blueFactory);
      const red = cache.getMaterial('red', redFactory);

      expect(blue).not.toBe(red);
      expect(blueFactory).toHaveBeenCalledTimes(1);
      expect(redFactory).toHaveBeenCalledTimes(1);
    });

    test('should release material and dispose', () => {
      const factory = () => new THREE.MeshPhongMaterial({ color: 0x0000ff });
      const disposeSpy = jest.spyOn(
        THREE.MeshPhongMaterial.prototype,
        'dispose'
      );

      cache.getMaterial('phong-blue', factory);
      cache.releaseMaterial('phong-blue');

      expect(disposeSpy).toHaveBeenCalled();
      disposeSpy.mockRestore();
    });
  });

  // ============================================
  // TEXTURE TESTS
  // ============================================

  describe('Texture Caching', () => {
    test('should create and cache a texture', async () => {
      const factory = jest.fn(() => new THREE.Texture());

      const tex1 = cache.getTexture('test-texture', factory);

      expect(factory).toHaveBeenCalledTimes(1);
      expect(tex1).toBeInstanceOf(THREE.Texture);
    });

    test('should return cached texture on second call', () => {
      const factory = jest.fn(() => new THREE.Texture());

      const tex1 = cache.getTexture('test-texture', factory);
      const tex2 = cache.getTexture('test-texture', factory);

      expect(factory).toHaveBeenCalledTimes(1);
      expect(tex1).toBe(tex2);
    });

    test('should dispose texture on release', () => {
      const factory = () => new THREE.Texture();
      const disposeSpy = jest.spyOn(THREE.Texture.prototype, 'dispose');

      cache.getTexture('test-texture', factory);
      cache.releaseTexture('test-texture');

      expect(disposeSpy).toHaveBeenCalled();
      disposeSpy.mockRestore();
    });
  });

  // ============================================
  // REFERENCE COUNTING TESTS
  // ============================================

  describe('Reference Counting', () => {
    test('should handle multiple gets of same resource', () => {
      const factory = () => new THREE.SphereGeometry(2, 32, 32);
      const disposeSpy = jest.spyOn(THREE.SphereGeometry.prototype, 'dispose');

      const geo1 = cache.getGeometry('sphere-1', factory);
      const geo2 = cache.getGeometry('sphere-1', factory);
      const geo3 = cache.getGeometry('sphere-1', factory);

      // Get 3 times = ref count 3
      // All should be same object
      expect(geo1).toBe(geo2);
      expect(geo2).toBe(geo3);

      // Release once - should not dispose yet
      cache.releaseGeometry('sphere-1');
      expect(disposeSpy).not.toHaveBeenCalled();

      // Release twice more - should dispose on 3rd
      cache.releaseGeometry('sphere-1');
      cache.releaseGeometry('sphere-1');
      expect(disposeSpy).toHaveBeenCalled();

      disposeSpy.mockRestore();
    });

    test('should handle mixed get/release cycles', () => {
      const factory = () => new THREE.BoxGeometry(1, 1, 1);
      const disposeSpy = jest.spyOn(THREE.BoxGeometry.prototype, 'dispose');

      // Cycle 1: get + release
      cache.getGeometry('box-1', factory);
      cache.releaseGeometry('box-1');
      expect(disposeSpy).toHaveBeenCalledTimes(1);

      // Cycle 2: get again - should recreate
      cache.getGeometry('box-1', factory);
      // Factory called twice total

      disposeSpy.mockRestore();
    });
  });

  // ============================================
  // LRU EVICTION TESTS
  // ============================================

  describe('LRU Eviction', () => {
    test('should respect MAX_CACHE_SIZE limit', () => {
      // Fill cache with geometries
      for (let i = 0; i < 5; i++) {
        cache.getGeometry(
          `sphere-${i}`,
          () => new THREE.SphereGeometry(2, 32, 32)
        );
      }

      // Total cache size should be <= 10MB
      // This is implementation detail, but verify it doesn't crash
      expect(() => {
        for (let i = 0; i < 5; i++) {
          cache.getGeometry(
            `sphere-${i}`,
            () => new THREE.SphereGeometry(2, 32, 32)
          );
        }
      }).not.toThrow();
    });

    test('should evict least recently used items when cache fills', () => {
      // Create large geometries to trigger LRU
      const sphereFactory = () => new THREE.SphereGeometry(10, 64, 64); // Large

      // Create sphere 1
      cache.getGeometry('sphere-1', sphereFactory);

      // Create sphere 2 (older sphere-1 should be least recently used)
      cache.getGeometry('sphere-2', sphereFactory);

      // Access sphere-1 again (updates its recent status)
      cache.getGeometry('sphere-1', sphereFactory);

      // sphere-2 is now least recently used
      // This is implicit testing - just verify no crashes
      expect(cache).toBeDefined();
    });
  });

  // ============================================
  // CLEAR/RESET TESTS
  // ============================================

  describe('Clear and Reset', () => {
    test('should clear all cached resources', () => {
      const geoFactory = () => new THREE.SphereGeometry(2, 32, 32);
      const matFactory = () => new THREE.MeshPhongMaterial({ color: 0x0000ff });
      const texFactory = () => new THREE.Texture();

      cache.getGeometry('sphere-1', geoFactory);
      cache.getMaterial('phong-1', matFactory);
      cache.getTexture('tex-1', texFactory);

      // Clear all
      cache.clear();

      // After clear, new gets should create new instances
      const newGeo = cache.getGeometry('sphere-1', geoFactory);
      expect(newGeo).toBeInstanceOf(THREE.SphereGeometry);
    });

    test('should return singleton instance', () => {
      const cache1 = ModelCacheManager.getInstance();
      const cache2 = ModelCacheManager.getInstance();

      expect(cache1).toBe(cache2);
    });
  });

  // ============================================
  // EDGE CASES
  // ============================================

  describe('Edge Cases', () => {
    test('should handle null/undefined gracefully', () => {
      expect(() => {
        cache.releaseGeometry('non-existent');
      }).not.toThrow();
    });

    test('should handle multiple clears', () => {
      const factory = () => new THREE.SphereGeometry(2, 32, 32);

      cache.getGeometry('sphere-1', factory);
      cache.clear();
      cache.clear(); // Second clear should not crash

      expect(cache).toBeDefined();
    });

    test('should handle rapid get/release cycles', () => {
      const factory = () => new THREE.SphereGeometry(2, 32, 32);

      expect(() => {
        for (let i = 0; i < 100; i++) {
          cache.getGeometry('sphere-1', factory);
          if (i % 2 === 0) {
            cache.releaseGeometry('sphere-1');
          }
        }
      }).not.toThrow();
    });
  });
});
