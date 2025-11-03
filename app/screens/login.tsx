import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dentistImage from "../../assets/images/dentist.png";
import logoImage from "../../assets/images/logo.png";

const { width, height } = Dimensions.get("window");
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo|live|uthh\.edu)\.(com|mx)$/;
const API_URL = "https://back-end-4803.onrender.com/api/users/loginMovil";

export default function Login() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    loadSavedEmail();

    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  if (!auth || !theme) {
    return <Text>Error: Login debe estar dentro de AuthProvider y ThemeProvider</Text>;
  }

  const { login } = auth;
  const { isDark, themeMode, setThemeMode, colors } = theme;

  const toggleTheme = () => {
    if (themeMode === 'light') setThemeMode('dark');
    else if (themeMode === 'dark') setThemeMode('auto');
    else setThemeMode('light');
  };

  const getThemeIcon = () => {
    if (themeMode === 'auto') return 'phone-portrait-outline';
    return isDark ? 'moon' : 'sunny';
  };

  const loadSavedEmail = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("savedEmail");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (error) {
      console.error("Error cargando email:", error);
    }
  };

  const handleOpenUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("No se pudo abrir el enlace", "URL no soportada.");
      }
    } catch (err) {
      console.error("Error abriendo URL:", err);
      Alert.alert("Error", "No se pudo abrir el enlace.");
    }
  };

  const handleForgotPassword = () => {
    handleOpenUrl("https://odontologiacarol.com/recuperacion");
  };

  const handleRegister = () => {
    handleOpenUrl("https://odontologiacarol.com/register");
  };

  const validateField = (value: string, fieldName: string, regex?: RegExp) => {
    if (!value.trim()) {
      return `${fieldName} es requerido`;
    }
    if (regex && !regex.test(value)) {
      return `${fieldName} no es válido`;
    }
    return "";
  };

  const validateForm = () => {
    const emailErr = validateField(email, "El correo", EMAIL_REGEX);
    const passErr = validateField(password, "La contraseña");

    setEmailError(emailErr);
    setPasswordError(passErr);

    return !emailErr && !passErr;
  };

  const handleServerResponse = async (response: Response, data: any) => {
    if (response.ok) {
      if (!data.user?.id) {
        setPasswordError("Error en el servidor");
        return;
      }

      const userData = {
        id: data.user.id.toString(),
        name: data.user.name || data.user.nombre || "Usuario",
        email: data.user.email || email,
      };

      await login(data.user.id.toString(), userData);
      
      if (rememberMe) {
        await AsyncStorage.setItem("savedEmail", email.trim());
      } else {
        await AsyncStorage.removeItem("savedEmail");
      }
      
      router.replace("/(tabs)");
    } else {
      handleLoginError(data.message);
    }
  };

  const handleLoginError = (message?: string) => {
    if (!message) {
      setPasswordError("Credenciales incorrectas");
      return;
    }

    const msg = message.toLowerCase();
    if (msg.includes("contraseña")) {
      setPasswordError("La contraseña es incorrecta");
    } else if (msg.includes("correo") || msg.includes("email")) {
      setEmailError("El correo no está registrado");
    } else {
      setPasswordError("Credenciales incorrectas");
    }
  };

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();
      await handleServerResponse(response, data);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert(
        "Error de conexión",
        "No se pudo conectar con el servidor. Verifica tu conexión a internet."
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = createStyles(colors, keyboardVisible);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
              {/* Logo con fondo */}
              <View style={styles.logoWrapper}>
                <View style={styles.logoBackground}>
                  <Image source={logoImage} style={styles.logoImage} />
                </View>
              </View>

              {/* Toggle de tema con fondo */}
              <TouchableOpacity 
                style={styles.themeToggle}
                onPress={toggleTheme}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={getThemeIcon()} 
                  size={22} 
                  color={isDark ? '#F9FAFB' : '#1F2937'}
                />
              </TouchableOpacity>

              {/* Imagen del dentista */}
              {!keyboardVisible && (
                <View style={styles.imageContainer}>
                  <Image source={dentistImage} style={styles.dentistImage} />
                </View>
              )}

              {/* Formulario */}
              <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.title}>Bienvenido</Text>
                  <Text style={styles.subtitle}>Odontología Carol</Text>
                  <Text style={styles.description}>Accede a tu cuenta personal dental</Text>
                </View>

                <View style={styles.formContent}>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                      <Ionicons
                        name="mail-outline"
                        size={20}
                        color={emailError ? colors.error : colors.icon}
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={[styles.input, emailError && styles.inputError]}
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={colors.textSecondary}
                        returnKeyType="next"
                        value={email}
                        onChangeText={(text) => {
                          setEmail(text);
                          if (emailError) setEmailError("");
                        }}
                        editable={!loading}
                      />
                    </View>
                    {emailError ? (
                      <Text style={styles.errorText}>{emailError}</Text>
                    ) : null}
                  </View>

                  <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={passwordError ? colors.error : colors.icon}
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={[styles.input, passwordError && styles.inputError]}
                        placeholder="Contraseña"
                        secureTextEntry={!showPassword}
                        placeholderTextColor={colors.textSecondary}
                        returnKeyType="done"
                        value={password}
                        onChangeText={(text) => {
                          setPassword(text);
                          if (passwordError) setPasswordError("");
                        }}
                        onSubmitEditing={handleLogin}
                        editable={!loading}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                        disabled={loading}
                      >
                        <Ionicons
                          name={showPassword ? "eye-outline" : "eye-off-outline"}
                          size={20}
                          color={colors.icon}
                        />
                      </TouchableOpacity>
                    </View>
                    {passwordError ? (
                      <Text style={styles.errorText}>{passwordError}</Text>
                    ) : null}
                  </View>

                  <View style={styles.optionsRow}>
                    <TouchableOpacity
                      style={styles.checkboxContainer}
                      onPress={() => setRememberMe(!rememberMe)}
                      disabled={loading}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={rememberMe ? "checkbox" : "square-outline"}
                        size={22}
                        color={colors.primary}
                      />
                      <Text style={styles.checkboxLabel}>Recordar usuario</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleForgotPassword}
                      disabled={loading}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.forgotText}>¿Olvidó su contraseña?</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    {loading ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.registerContainer}>
                    <Text style={styles.registerQuestion}>¿No tienes cuenta?</Text>
                    <TouchableOpacity
                      onPress={handleRegister}
                      disabled={loading}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.registerLink}>Regístrate aquí</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any, keyboardVisible: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    minHeight: keyboardVisible ? height * 0.85 : height,
  },
  logoWrapper: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 40,
    left: 20,
    zIndex: 10,
  },
  logoBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoImage: {
    width: width * 0.2,
    height: width * 0.12,
    resizeMode: "contain",
  },
  themeToggle: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 40,
    right: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: colors.card,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.08,
    minHeight: height * 0.35,
  },
  dentistImage: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: "contain",
  },
  formContainer: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: keyboardVisible ? 30 : 40,
    paddingBottom: keyboardVisible ? 20 : 32,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    minHeight: keyboardVisible ? undefined : height * 0.55,
  },
  headerContainer: {
    paddingHorizontal: 24,
    marginBottom: keyboardVisible ? 20 : 32,
    alignItems: "center",
  },
  title: {
    fontSize: keyboardVisible ? 24 : 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: keyboardVisible ? 18 : 20,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: keyboardVisible ? 13 : 15,
    color: colors.textSecondary,
  },
  formContent: {
    paddingHorizontal: 24,
  },
  inputWrapper: {
    marginBottom: keyboardVisible ? 16 : 20,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    height: keyboardVisible ? 48 : 52,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 48,
    backgroundColor: colors.inputBg,
    fontSize: 15,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: colors.errorBg,
  },
  inputIcon: {
    position: "absolute",
    top: keyboardVisible ? 14 : 16,
    left: 14,
    zIndex: 1,
  },
  eyeIcon: {
    position: "absolute",
    top: keyboardVisible ? 14 : 16,
    right: 14,
    zIndex: 1,
    padding: 4,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: "500",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: keyboardVisible ? 20 : 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  forgotText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: colors.primaryDark,
    paddingVertical: keyboardVisible ? 14 : 16,
    borderRadius: 12,
    width: "100%",
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 17,
    letterSpacing: 0.5,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: keyboardVisible ? 16 : 24,
    gap: 6,
  },
  registerQuestion: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
});