import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { SpaceMono_400Regular, SpaceMono_700Bold } from '@expo-google-fonts/space-mono';
import { SplashScreen } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initErrorTracking } from '@/utils/sentry';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  // Initialize error tracking
  useEffect(() => {
    initErrorTracking({ enabled: true });
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
    'SpaceMono-Regular': SpaceMono_400Regular,
    'SpaceMono-Bold': SpaceMono_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('App Error:', error);
        console.error('Error Info:', errorInfo);
        // Enviar para serviço de tracking
        try {
          const { captureException } = require('@/utils/sentry');
          captureException(error, { component: 'ErrorBoundary', errorInfo });
        } catch (e) {
          console.warn('Could not send error to tracker:', e);
        }
      }}
    >
      <GestureHandlerRootView>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="chapter1" options={{ headerShown: false }} />
          <Stack.Screen name="chapter2" options={{ headerShown: false }} />
          <Stack.Screen name="chapter3" options={{ headerShown: false }} />
          <Stack.Screen name="chapter3a" options={{ headerShown: false }} />
          <Stack.Screen name="chapter3b" options={{ headerShown: false }} />
          <Stack.Screen name="chapter4" options={{ headerShown: false }} />
          <Stack.Screen name="introduction" options={{ headerShown: false }} />
          <Stack.Screen name="sobre" options={{ headerShown: false }} />
          <Stack.Screen name="desenvolvedores" options={{ headerShown: false }} />
          <Stack.Screen name="referencias" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}