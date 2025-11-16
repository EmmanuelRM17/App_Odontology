import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeContext } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default function DetalleCitaScreen() {
  const router = useRouter();
  const theme = useContext(ThemeContext);

  if (!theme) return null;

  const { colors, isDark } = theme;

  // Navegar hacia atrás
  const handleBack = () => {
    router.push('/(tabs)');
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Detalle de Cita</Text>
            <Text style={styles.headerSubtitle}>Información completa</Text>
          </View>
          
          <View style={styles.placeholder} />
        </View>

        {/* Card principal */}
        <View style={styles.mainCard}>
          {/* Header de la cita */}
          <View style={styles.citaHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={32} color={colors.primary} />
            </View>
            <View style={styles.citaHeaderInfo}>
              <Text style={styles.citaTitulo}>Cita 1</Text>
              <Text style={styles.citaSesion}>Sesión 1 de 6</Text>
            </View>
            <View style={styles.estadoBadge}>
              <Text style={styles.estadoText}>Completada</Text>
            </View>
          </View>

          {/* Fecha y hora */}
          <View style={styles.fechaCard}>
            <View style={styles.fechaRow}>
              <Ionicons name="calendar-outline" size={18} color={colors.primary} />
              <Text style={styles.fechaText}>Miércoles, 24 de septiembre de 2025</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.fechaRow}>
              <Ionicons name="time-outline" size={18} color={colors.primary} />
              <Text style={styles.horaText}>10:00 AM</Text>
            </View>
          </View>

          {/* Información del paciente */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-outline" size={18} color={colors.text} />
              <Text style={styles.sectionTitle}>Información del Paciente</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Paciente:</Text>
                <Text style={styles.infoValue}>Emmanuel Rodríguez Martínez</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Edad:</Text>
                <Text style={styles.infoValue}>20 años</Text>
              </View>
            </View>
          </View>

          {/* Información médica */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="medical-outline" size={18} color={colors.text} />
              <Text style={styles.sectionTitle}>Información Médica</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Odontólogo:</Text>
                <Text style={styles.infoValue}>Dr. Hugo Gómez Ramírez</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tratamiento:</Text>
                <Text style={styles.infoValue}>Ortodoncia - Ajuste de brackets</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Duración:</Text>
                <Text style={styles.infoValue}>40 minutos</Text>
              </View>
            </View>
          </View>

          {/* Información de pago */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="cash-outline" size={18} color={colors.text} />
              <Text style={styles.sectionTitle}>Información de Pago</Text>
            </View>
            <View style={styles.pagoCard}>
              <View style={styles.pagoItem}>
                <Text style={styles.pagoLabel}>Monto</Text>
                <Text style={styles.pagoMonto}>$600 MXN</Text>
              </View>
              <View style={styles.pagoDivider} />
              <View style={styles.pagoItem}>
                <Text style={styles.pagoLabel}>Estatus</Text>
                <View style={styles.pagadoBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#FFF" />
                  <Text style={styles.pagadoText}>Pagado</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Notas clínicas */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="text" size={18} color={colors.text} />
              <Text style={styles.sectionTitle}>Notas Clínicas</Text>
            </View>
            <View style={styles.notasContainer}>
              <Text style={styles.notasText}>
                Se ajustó arco superior y se cambiaron ligas elásticas. Ligera sensibilidad esperada por 24-48 h
              </Text>
            </View>
          </View>
        </View>

        {/* Botones de navegación */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => router.push('/screens/citas')}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color={colors.primary} />
            <Text style={styles.navButtonText}>Volver a Citas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navButtonPrimary}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonTextPrimary}>Siguiente Cita</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isSmallDevice ? 20 : 24,
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
  placeholder: {
    width: isSmallDevice ? 40 : 44,
  },
  mainCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: isSmallDevice ? 18 : 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  citaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  citaHeaderInfo: {
    flex: 1,
  },
  citaTitulo: {
    fontSize: isSmallDevice ? 20 : 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  citaSesion: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  estadoBadge: {
    backgroundColor: '#22C55E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
    textTransform: 'uppercase',
  },
  fechaCard: {
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  fechaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  fechaText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  horaText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoContainer: {
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    width: 110,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  pagoCard: {
    flexDirection: 'row',
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    borderRadius: 12,
    padding: 16,
  },
  pagoItem: {
    flex: 1,
    alignItems: 'center',
  },
  pagoDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  pagoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  pagoMonto: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  pagadoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  pagadoText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  notasContainer: {
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    borderRadius: 12,
    padding: 14,
  },
  notasText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  navButtonPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  navButtonTextPrimary: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
});