import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DetalleCitaScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={26} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalles de la Cita</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Card principal */}
        <View style={styles.card}>
          {/* Header de la cita */}
          <View style={styles.citaHeader}>
            <View style={styles.iconBox}>
              <Ionicons name="calendar" size={28} color="#FFF" />
            </View>
            <View style={styles.citaHeaderInfo}>
              <Text style={styles.citaTitulo}>Cita 1</Text>
              <Text style={styles.citaSesion}>Sesión 1 de 6</Text>
            </View>
          </View>

          {/* Fecha y hora */}
          <View style={styles.fechaBox}>
            <View style={styles.fechaRow}>
              <Ionicons name="calendar-outline" size={18} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.fechaText}>Miércoles, 24 de septiembre de 2025</Text>
            </View>
            <View style={styles.fechaRow}>
              <Ionicons name="time-outline" size={18} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.horaText}>10:00 AM</Text>
            </View>
          </View>

          {/* Información del paciente */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información del Paciente</Text>
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
            <Text style={styles.sectionTitle}>Información Médica</Text>
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

          {/* Estado de la cita */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Estado</Text>
            <View style={styles.estadoContainer}>
              <View style={styles.estadoBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                <Text style={styles.estadoText}>Completada</Text>
              </View>
            </View>
          </View>

          {/* Información de pago */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información de Pago</Text>
            <View style={styles.pagoContainer}>
              <View style={styles.pagoRow}>
                <View style={styles.pagoBox}>
                  <Text style={styles.pagoLabel}>Monto</Text>
                  <Text style={styles.pagoMonto}>$600 MXN</Text>
                </View>
                <View style={styles.pagoBox}>
                  <Text style={styles.pagoLabel}>Estatus</Text>
                  <View style={styles.pagadoBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#FFF" />
                    <Text style={styles.pagadoText}>Pagado</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Notas clínicas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notas Clínicas</Text>
            <View style={styles.notasContainer}>
              <MaterialCommunityIcons name="text" size={20} color="rgba(255, 255, 255, 0.7)" />
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
            <Ionicons name="arrow-back" size={20} color="#FFF" />
            <Text style={styles.navButtonText}>Volver a Citas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navButtonSecondary}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonText}>Siguiente Cita</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563EB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
  },
  placeholder: {
    width: 44,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 6,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
  citaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  citaHeaderInfo: {
    flex: 1,
  },
  citaTitulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  citaSesion: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  fechaBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    gap: 10,
  },
  fechaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fechaText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '500',
  },
  horaText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
    color: 'rgba(255, 255, 255, 0.7)',
    width: 110,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  estadoContainer: {
    flexDirection: 'row',
  },
  estadoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.5)',
  },
  estadoText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
  pagoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 14,
  },
  pagoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  pagoBox: {
    flex: 1,
  },
  pagoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  pagoMonto: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  pagadoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  pagadoText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  notasContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  notasText: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 20,
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  navButtonSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
});