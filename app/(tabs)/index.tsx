import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default function HomeScreen() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);

  if (!theme || !auth) return null;

  const { colors, isDark, themeMode, setThemeMode } = theme;
  const userName = auth.user?.name || "Usuario";

  const toggleTheme = () => {
    if (themeMode === "light") setThemeMode("dark");
    else if (themeMode === "dark") setThemeMode("auto");
    else setThemeMode("light");
  };

  const getThemeIcon = () => {
    if (themeMode === "auto") return "phone-portrait-outline";
    return isDark ? "moon" : "sunny";
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            try {
              await auth.logout();
              router.replace('/screens/login');
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
            }
          },
        },
      ]
    );
  };

  const handleEmergencyCall = () => {
    const phoneNumber = 'tel:771 333 9456';
    Linking.openURL(phoneNumber).catch(() => {
      Alert.alert('Error', 'No se pudo realizar la llamada');
    });
  };

  const styles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <MaterialCommunityIcons name="account" size={isSmallDevice ? 20 : 24} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.welcomeText}>Bienvenido</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={toggleTheme} style={styles.iconButton} activeOpacity={0.7}>
              <Ionicons name={getThemeIcon()} size={20} color={colors.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.iconButton} activeOpacity={0.7}>
              <Ionicons name="log-out-outline" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Clínica Dental</Text>
          <Text style={styles.welcomeSubtitle}>
            Gestiona tus citas y tratamientos
          </Text>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Servicios</Text>
          
          <TouchableOpacity 
            style={styles.serviceCard} 
            activeOpacity={0.7}
            onPress={() => router.push('/screens/tratamientos')}
          >
            <View style={styles.serviceIcon}>
              <MaterialCommunityIcons 
                name="tooth-outline" 
                size={24} 
                color={colors.primary} 
              />
            </View>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Tratamientos</Text>
              <Text style={styles.serviceDescription}>Seguimiento de procedimientos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.serviceCard} 
            activeOpacity={0.7}
            onPress={() => router.push('/screens/citas')}
          >
            <View style={styles.serviceIcon}>
              <Ionicons 
                name="calendar-outline" 
                size={24} 
                color={colors.primary} 
              />
            </View>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Citas</Text>
              <Text style={styles.serviceDescription}>Consulta tu agenda</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.serviceCard} 
            activeOpacity={0.7}
            onPress={() => router.push('/screens/pagos')}
          >
            <View style={styles.serviceIcon}>
              <MaterialCommunityIcons 
                name="credit-card-outline" 
                size={24} 
                color={colors.primary} 
              />
            </View>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Pagos</Text>
              <Text style={styles.serviceDescription}>Historial financiero</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.emergencySection}>
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <View style={styles.emergencyIconContainer}>
                <Ionicons name="call" size={22} color="#FFF" />
              </View>
              <View style={styles.emergencyContent}>
                <Text style={styles.emergencyTitle}>Urgencias 24/7</Text>
                <Text style={styles.emergencySubtitle}>
                  Atención inmediata disponible
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.emergencyButton}
              onPress={handleEmergencyCall}
              activeOpacity={0.8}
            >
              <Text style={styles.emergencyButtonText}>Llamar Ahora</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: isSmallDevice ? 40 : 50,
    paddingBottom: 40,
    paddingHorizontal: width * 0.05,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isSmallDevice ? 24 : 32,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: isSmallDevice ? 42 : 48,
    height: isSmallDevice ? 42 : 48,
    borderRadius: isSmallDevice ? 21 : 24,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  welcomeText: {
    fontSize: isSmallDevice ? 12 : 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  userName: {
    fontSize: isSmallDevice ? 16 : 18,
    color: colors.text,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: isSmallDevice ? 36 : 40,
    height: isSmallDevice ? 36 : 40,
    borderRadius: isSmallDevice ? 18 : 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  welcomeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: isSmallDevice ? 20 : 24,
    marginBottom: isSmallDevice ? 24 : 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  welcomeTitle: {
    fontSize: isSmallDevice ? 20 : 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: isSmallDevice ? 13 : 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  servicesSection: {
    marginBottom: isSmallDevice ? 20 : 24,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: isSmallDevice ? 14 : 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceIcon: {
    width: isSmallDevice ? 44 : 48,
    height: isSmallDevice ? 44 : 48,
    borderRadius: isSmallDevice ? 22 : 24,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: isSmallDevice ? 14 : 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  serviceDescription: {
    fontSize: isSmallDevice ? 12 : 13,
    color: colors.textSecondary,
  },
  emergencySection: {
    marginTop: isSmallDevice ? 8 : 12,
  },
  emergencyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: isSmallDevice ? 16 : 18,
    borderWidth: 2,
    borderColor: colors.error,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyIconContainer: {
    width: isSmallDevice ? 40 : 44,
    height: isSmallDevice ? 40 : 44,
    borderRadius: isSmallDevice ? 20 : 22,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: isSmallDevice ? 14 : 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  emergencySubtitle: {
    fontSize: isSmallDevice ? 12 : 13,
    color: colors.textSecondary,
  },
  emergencyButton: {
    backgroundColor: colors.error,
    paddingVertical: isSmallDevice ? 12 : 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#FFF',
    fontSize: isSmallDevice ? 14 : 15,
    fontWeight: '600',
  },
});