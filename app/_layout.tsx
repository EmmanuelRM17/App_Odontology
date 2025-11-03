import { Stack } from "expo-router";
import { useContext, useEffect, useRef } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Image,
} from "react-native";

import logoImage from "../assets/images/logo.png";

// Componente de pantalla de carga mejorada
function LoadingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación de rotación continua
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.loadingContainer}>
      <Animated.View
        style={[
          styles.loadingContent,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image source={logoImage} style={styles.logo} />
        <View style={styles.logoCircle}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <View style={styles.spinnerOuter} />
          </Animated.View>
          <View style={styles.logoInner}>
            <Text style={styles.logoText}>OC</Text>
          </View>
        </View>

        <Text style={styles.loadingTitle}>Odontología Carol</Text>
        <Text style={styles.loadingSubtitle}>
          Cargando tu experiencia dental...
        </Text>

        <View style={styles.progressContainer}>
          <ActivityIndicator size="large" color="#1E3A8A" />
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.footerDots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
}

// Componente de contenido del layout
function LayoutContent() {
  const auth = useContext(AuthContext);

  if (!auth) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Error de Configuración</Text>
          <Text style={styles.errorText}>AuthProvider no encontrado</Text>
        </View>
      </View>
    );
  }

  const { loading, isLoggedIn } = auth;

  // Pantalla de carga mejorada
  if (loading) {
    return <LoadingScreen />;
  }

  // Navegación condicional basada en autenticación
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </>
      ) : (
        <Stack.Screen name="screens/login" />
      )}
    </Stack>
  );
}

// Layout raíz con el provider
export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LayoutContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  // Estilos de pantalla de carga
  loadingContainer: {
    flex: 1,
    backgroundColor: "#7BB7F2",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 72,
    marginBottom: 32,
    resizeMode: "contain",
  },
  logoCircle: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
  },
  spinnerOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "transparent",
    borderTopColor: "#1E3A8A",
    borderRightColor: "#1E3A8A",
  },
  logoInner: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1E3A8A",
    letterSpacing: 2,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  loadingSubtitle: {
    fontSize: 15,
    color: "#E0F2FE",
    marginBottom: 32,
    textAlign: "center",
  },
  progressContainer: {
    marginTop: 16,
  },
  footer: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
  },
  footerDots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  dotActive: {
    backgroundColor: "#FFFFFF",
    width: 24,
  },
  // Estilos de error
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    padding: 24,
  },
  errorContent: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 32,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 8,
    textAlign: "center",
  },
  errorText: {
    fontSize: 15,
    color: "#7F1D1D",
    textAlign: "center",
  },
});
