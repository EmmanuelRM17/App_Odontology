import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default function ExploreScreen() {
  const router = useRouter();
  const theme = useContext(ThemeContext);

  if (!theme) return null;

  const { colors, isDark } = theme;

  // Navegar hacia atrás
  const handleBack = () => {
    router.push('/(tabs)');
  };

  // Navegar al detalle del tratamiento
  const handleVerDetalle = () => {
    router.push('./detalle-tratamientos');
  };

  // Tratamiento activo del paciente (luego vendrá del API)
  const tratamiento = {
    id: 1,
    nombre: 'Ortodoncia',
    descripcion: 'Tratamiento de alineación dental',
    icon: 'medkit',
    progreso: 35,
    proximaCita: '20 Nov 2025',
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
          <TouchableOpacity 
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Mi Tratamiento</Text>
            <Text style={styles.headerSubtitle}>Tratamiento activo</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.tratamientoCard}
          activeOpacity={0.7}
          onPress={handleVerDetalle}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Ionicons name={tratamiento.icon as any} size={32} color={colors.primary} />
            </View>
            <View style={styles.cardHeaderInfo}>
              <Text style={styles.tratamientoNombre}>{tratamiento.nombre}</Text>
              <Text style={styles.tratamientoDescripcion}>{tratamiento.descripcion}</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progreso</Text>
              <Text style={styles.progressPercent}>{tratamiento.progreso}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${tratamiento.progreso}%` }]} />
            </View>
          </View>

          <View style={styles.citaSection}>
            <View style={styles.citaIcon}>
              <Ionicons name="calendar-outline" size={18} color={colors.primary} />
            </View>
            <View style={styles.citaInfo}>
              <Text style={styles.citaLabel}>Próxima cita</Text>
              <Text style={styles.citaFecha}>{tratamiento.proximaCita}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </View>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
          </View>
          <Text style={styles.infoText}>
            Toca la tarjeta para ver todos los detalles de tu tratamiento, historial de sesiones e información financiera.
          </Text>
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
    paddingBottom: 100,
    paddingHorizontal: width * 0.05,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isSmallDevice ? 24 : 28,
  },
  backButton: {
    width: isSmallDevice ? 40 : 44,
    height: isSmallDevice ? 40 : 44,
    borderRadius: isSmallDevice ? 20 : 22,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 3,
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: isSmallDevice ? 24 : 28,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: isSmallDevice ? 13 : 14,
    color: colors.textSecondary,
  },
  tratamientoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: isSmallDevice ? 18 : 24,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 3,
    marginBottom: isSmallDevice ? 16 : 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: isSmallDevice ? 60 : 70,
    height: isSmallDevice ? 60 : 70,
    borderRadius: isSmallDevice ? 30 : 35,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 3,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  tratamientoNombre: {
    fontSize: isSmallDevice ? 18 : 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  tratamientoDescripcion: {
    fontSize: isSmallDevice ? 13 : 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  progressSection: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  citaSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  citaIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  citaInfo: {
    flex: 1,
  },
  citaLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 3,
  },
  citaFecha: {
    fontSize: isSmallDevice ? 14 : 15,
    fontWeight: '600',
    color: colors.text,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: isSmallDevice ? 14 : 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoText: {
    flex: 1,
    fontSize: isSmallDevice ? 12 : 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});