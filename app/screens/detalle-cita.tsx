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
  Linking,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemeContext } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default function DetalleCitaScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useContext(ThemeContext);

  if (!theme) return null;

  const { colors, isDark } = theme;

  // Navegar hacia atrás
  const handleBack = () => {
    router.push('/(tabs)');
  };

  // Función para manejar "No Asistiré"
  const handleNoAsistire = () => {
    Alert.alert(
      'No Asistiré',
      '¿Cómo deseas avisar que no podrás asistir a esta cita?',
      [
        { 
          text: 'Cancelar', 
          style: 'cancel' 
        },
        { 
          text: 'Llamar', 
          onPress: () => Linking.openURL('tel:7713339456')
        },
        { 
          text: 'WhatsApp', 
          onPress: () => {
            const mensaje = `Hola, soy ${params.paciente}. Lamentablemente no podré asistir a mi cita del ${params.fecha} a las ${params.hora}. Me gustaría reagendarla.`;
            Linking.openURL(`whatsapp://send?phone=527713339456&text=${encodeURIComponent(mensaje)}`);
          }
        },
      ]
    );
  };

  // Función para obtener color del estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completada':
        return '#22C55E';
      case 'pendiente':
        return '#FBBF24';
      case 'cancelada':
        return '#EF4444';
      default:
        return colors.textSecondary;
    }
  };

  // Función para obtener texto del estado
  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'completada':
        return 'Completada';
      case 'pendiente':
        return 'Pendiente';
      case 'cancelada':
        return 'Cancelada';
      default:
        return estado;
    }
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
              <Text style={styles.citaTitulo}>{params.titulo}</Text>
              <Text style={styles.citaSesion}>{params.tratamiento}</Text>
            </View>
            <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(params.estado as string) }]}>
              <Text style={styles.estadoText}>{getEstadoTexto(params.estado as string)}</Text>
            </View>
          </View>

          {/* Fecha y hora */}
          <View style={styles.fechaCard}>
            <View style={styles.fechaRow}>
              <Ionicons name="calendar-outline" size={18} color={colors.primary} />
              <Text style={styles.fechaText}>{params.fecha}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.fechaRow}>
              <Ionicons name="time-outline" size={18} color={colors.primary} />
              <Text style={styles.horaText}>{params.hora}</Text>
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
                <Text style={styles.infoValue}>{params.paciente}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Edad:</Text>
                <Text style={styles.infoValue}>{params.edad} años</Text>
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
                <Text style={styles.infoValue}>{params.odontologo}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tratamiento:</Text>
                <Text style={styles.infoValue}>{params.tratamiento}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Duración:</Text>
                <Text style={styles.infoValue}>{params.duracion}</Text>
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
                <Text style={styles.pagoMonto}>{params.monto}</Text>
              </View>
              <View style={styles.pagoDivider} />
              <View style={styles.pagoItem}>
                <Text style={styles.pagoLabel}>Estatus</Text>
                <View style={[
                  styles.pagadoBadge, 
                  { backgroundColor: params.pago === 'Pagado' ? '#22C55E' : params.pago === 'Pendiente' ? '#FBBF24' : colors.textSecondary }
                ]}>
                  <Ionicons 
                    name={params.pago === 'Pagado' ? 'checkmark-circle' : params.pago === 'Pendiente' ? 'time' : 'close-circle'} 
                    size={16} 
                    color="#FFF" 
                  />
                  <Text style={styles.pagadoText}>{params.pago}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Notas clínicas */}
          {params.notas && params.notas.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="text" size={18} color={colors.text} />
                <Text style={styles.sectionTitle}>Notas Clínicas</Text>
              </View>
              <View style={styles.notasContainer}>
                <Text style={styles.notasText}>{params.notas}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Botones de acción */}
        <View style={styles.navigationButtons}>
          {params.estado === 'pendiente' && (
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={handleNoAsistire}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle-outline" size={20} color="#EF4444" />
              <Text style={[styles.navButtonText, { color: '#EF4444' }]}>No Asistiré</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={styles.navButtonPrimary}
            onPress={() => router.push('/screens/citas')}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonTextPrimary}>Ver Mis Citas</Text>
            <Ionicons name="calendar" size={20} color="#FFF" />
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
  placeholder: {
    width: isSmallDevice ? 40 : 44,
  },
  mainCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: isSmallDevice ? 18 : 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 3,
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
    borderBottomWidth: 3,
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
    borderWidth: 1,
    borderColor: colors.border,
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
    borderWidth: 1,
    borderColor: colors.border,
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
    borderWidth: 1,
    borderColor: colors.border,
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
    borderWidth: 1,
    borderColor: colors.border,
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
    borderBottomWidth: 3,
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
    borderBottomWidth: 3,
    borderColor: colors.primary,
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