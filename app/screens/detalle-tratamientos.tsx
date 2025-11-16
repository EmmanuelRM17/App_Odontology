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
import { ThemeContext } from './../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default function DetalleTratamientoScreen() {
  const router = useRouter();
  const theme = useContext(ThemeContext);

  if (!theme) return null;

  const { colors, isDark } = theme;

  // Navegar hacia atrás
  const handleBack = () => {
    router.push('/(tabs)');
  };

  // Datos del tratamiento (luego vendrán del API)
  const tratamiento = {
    nombre: 'Ortodoncia',
    descripcion: 'Tratamiento de alineación dental con brackets metálicos',
    fechaInicio: '15 Ene 2024',
    duracionEstimada: '18 meses',
    progreso: 35,
    proximaCita: '20 Nov 2024',
    dentista: 'Dr. Hugo Gómez Ramírez',
    costoTotal: '$35,000',
    pagado: '$12,250',
    pendiente: '$22,750',
  };

  const sesiones = [
    { id: 1, fecha: '15 Ene 2024', descripcion: 'Colocación de brackets', completada: true },
    { id: 2, fecha: '15 Feb 2024', descripcion: 'Primer ajuste', completada: true },
    { id: 3, fecha: '15 Mar 2024', descripcion: 'Segundo ajuste', completada: true },
    { id: 4, fecha: '20 Nov 2024', descripcion: 'Tercer ajuste', completada: false },
    { id: 5, fecha: '20 Dic 2024', descripcion: 'Cuarto ajuste', completada: false },
  ];

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
            <Text style={styles.headerSubtitle}>Detalles y progreso</Text>
          </View>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.iconBox}>
            <Ionicons name="medkit" size={32} color={colors.primary} />
          </View>
          <Text style={styles.tratamientoNombre}>{tratamiento.nombre}</Text>
          <Text style={styles.tratamientoDescripcion}>{tratamiento.descripcion}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>Inicio</Text>
              <Text style={styles.infoValue}>{tratamiento.fechaInicio}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>Duración</Text>
              <Text style={styles.infoValue}>{tratamiento.duracionEstimada}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progreso del Tratamiento</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressPercent}>{tratamiento.progreso}%</Text>
              <Text style={styles.progressLabel}>Completado</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${tratamiento.progreso}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Especialista</Text>
          <View style={styles.dentistaCard}>
            <View style={styles.dentistaIcon}>
              <Ionicons name="person" size={24} color={colors.primary} />
            </View>
            <View style={styles.dentistaInfo}>
              <Text style={styles.dentistaName}>{tratamiento.dentista}</Text>
              <Text style={styles.dentistaLabel}>Ortodoncista</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Financiera</Text>
          <View style={styles.financialCard}>
            <View style={styles.financialRow}>
              <Text style={styles.financialLabel}>Costo Total</Text>
              <Text style={styles.financialValue}>{tratamiento.costoTotal}</Text>
            </View>
            <View style={styles.financialRow}>
              <Text style={styles.financialLabel}>Pagado</Text>
              <Text style={[styles.financialValue, { color: '#10B981' }]}>{tratamiento.pagado}</Text>
            </View>
            <View style={styles.financialRow}>
              <Text style={styles.financialLabel}>Pendiente</Text>
              <Text style={[styles.financialValue, { color: '#EF4444' }]}>{tratamiento.pendiente}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historial de Sesiones</Text>
          <View style={styles.sesionesContainer}>
            {sesiones.map((sesion) => (
              <View key={sesion.id} style={styles.sesionCard}>
                <View style={[
                  styles.sesionIcon,
                  sesion.completada && styles.sesionIconCompleted
                ]}>
                  <Ionicons 
                    name={sesion.completada ? "checkmark" : "time-outline"} 
                    size={20} 
                    color={sesion.completada ? '#FFF' : colors.textSecondary} 
                  />
                </View>
                <View style={styles.sesionInfo}>
                  <Text style={styles.sesionDescripcion}>{sesion.descripcion}</Text>
                  <Text style={styles.sesionFecha}>{sesion.fecha}</Text>
                </View>
                {sesion.completada && (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>Completada</Text>
                  </View>
                )}
              </View>
            ))}
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
    paddingBottom: 100,
    paddingHorizontal: width * 0.05,
  },
  header: {
    flexDirection: 'row',
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
  mainCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: isSmallDevice ? 18 : 24,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 3,
    marginBottom: isSmallDevice ? 20 : 24,
    alignItems: 'center',
  },
  iconBox: {
    width: isSmallDevice ? 60 : 70,
    height: isSmallDevice ? 60 : 70,
    borderRadius: isSmallDevice ? 30 : 35,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 3,
  },
  tratamientoNombre: {
    fontSize: isSmallDevice ? 20 : 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  tratamientoDescripcion: {
    fontSize: isSmallDevice ? 13 : 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: isSmallDevice ? 13 : 14,
    fontWeight: '600',
    color: colors.text,
  },
  section: {
    marginBottom: isSmallDevice ? 20 : 24,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: isSmallDevice ? 16 : 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressPercent: {
    fontSize: isSmallDevice ? 24 : 28,
    fontWeight: '700',
    color: colors.primary,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
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
  dentistaCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: isSmallDevice ? 16 : 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dentistaIcon: {
    width: isSmallDevice ? 48 : 52,
    height: isSmallDevice ? 48 : 52,
    borderRadius: isSmallDevice ? 24 : 26,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dentistaInfo: {
    flex: 1,
  },
  dentistaName: {
    fontSize: isSmallDevice ? 15 : 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  dentistaLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  financialCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: isSmallDevice ? 16 : 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 3,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  financialLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  financialValue: {
    fontSize: isSmallDevice ? 15 : 16,
    fontWeight: '600',
    color: colors.text,
  },
  sesionesContainer: {
    gap: 10,
  },
  sesionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: isSmallDevice ? 14 : 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sesionIcon: {
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
  sesionIconCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  sesionInfo: {
    flex: 1,
  },
  sesionDescripcion: {
    fontSize: isSmallDevice ? 14 : 15,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 3,
  },
  sesionFecha: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  completedBadge: {
    backgroundColor: isDark ? '#10B98120' : '#10B98115',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  completedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
});