import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CitasScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const citas = [
    {
      id: 1,
      titulo: 'Cita 1',
      fecha: '24 de septiembre de 2025',
      hora: '10:00 AM',
      paciente: 'Emmanuel Rodríguez Martínez',
      edad: 20,
      odontologo: 'Dr. Hugo Gómez Ramírez',
      tratamiento: 'Ortodoncia - Ajuste de brackets',
      estado: 'completada',
      duracion: '40 min',
      pago: 'Pagado',
      monto: '$600 MXN',
      notas: 'Se ajustó arco superior y se cambiaron ligas elásticas. Ligera sensibilidad esperada por 24-48 h',
    },
    {
      id: 2,
      titulo: 'Cita 2',
      fecha: '28 de octubre de 2025',
      hora: '11:30 AM',
      paciente: 'Emmanuel Rodríguez Martínez',
      edad: 20,
      odontologo: 'Dra. Carol García',
      tratamiento: 'Ortodoncia - Revisión mensual',
      estado: 'pendiente',
      duracion: '30 min',
      pago: 'Pendiente',
      monto: '$500 MXN',
      notas: 'Revisión rutinaria del progreso',
    },
    {
      id: 3,
      titulo: 'Cita 3',
      fecha: '15 de noviembre de 2025',
      hora: '09:00 AM',
      paciente: 'Emmanuel Rodríguez Martínez',
      edad: 20,
      odontologo: 'Dr. Luis Mendoza',
      tratamiento: 'Limpieza dental profunda',
      estado: 'pendiente',
      duracion: '45 min',
      pago: 'Pendiente',
      monto: '$800 MXN',
      notas: '',
    },
    {
      id: 4,
      titulo: 'Cita 4',
      fecha: '10 de octubre de 2025',
      hora: '02:00 PM',
      paciente: 'Emmanuel Rodríguez Martínez',
      edad: 20,
      odontologo: 'Dr. Carlos Ruiz',
      tratamiento: 'Extracción muela del juicio',
      estado: 'cancelada',
      duracion: '60 min',
      pago: 'No aplica',
      monto: '-',
      notas: 'Cancelada por el paciente',
    },
  ];

  const filtros = ['Todas', 'Pendientes', 'Completadas', 'Canceladas'];

  const citasFiltradas = citas.filter(c => {
    if (selectedFilter === 'Pendientes') return c.estado === 'pendiente';
    if (selectedFilter === 'Completadas') return c.estado === 'completada';
    if (selectedFilter === 'Canceladas') return c.estado === 'cancelada';
    const matchSearch = c.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.tratamiento.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completada':
        return 'rgba(34, 197, 94, 0.3)';
      case 'pendiente':
        return 'rgba(251, 191, 36, 0.3)';
      case 'cancelada':
        return 'rgba(239, 68, 68, 0.3)';
      default:
        return 'rgba(0, 0, 0, 0.3)';
    }
  };

  const getEstadoBorderColor = (estado: string) => {
    switch (estado) {
      case 'completada':
        return 'rgba(34, 197, 94, 0.5)';
      case 'pendiente':
        return 'rgba(251, 191, 36, 0.5)';
      case 'cancelada':
        return 'rgba(239, 68, 68, 0.5)';
      default:
        return 'rgba(255, 255, 255, 0.25)';
    }
  };

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
          <Text style={styles.headerTitle}>Mis Citas</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Búsqueda */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.7)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar cita..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={20} color="rgba(255, 255, 255, 0.7)" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          {filtros.map((filtro) => (
            <TouchableOpacity
              key={filtro}
              style={[
                styles.filterButton,
                selectedFilter === filtro && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filtro)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filtro && styles.filterTextActive,
                ]}
              >
                {filtro}
              </Text>
              {selectedFilter === filtro && (
                <Ionicons name="checkmark-circle" size={20} color="#2563EB" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Citas */}
        <View style={styles.section}>
          {citasFiltradas.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={64} color="rgba(255, 255, 255, 0.4)" />
              <Text style={styles.emptyText}>No hay citas</Text>
            </View>
          ) : (
            citasFiltradas.map((cita) => (
              <View 
                key={cita.id} 
                style={[
                  styles.citaCard,
                  { borderColor: getEstadoBorderColor(cita.estado) }
                ]}
              >
                {/* Header de la cita */}
                <View style={styles.citaHeader}>
                  <View style={styles.citaHeaderLeft}>
                    <View style={styles.iconBox}>
                      <Ionicons name="calendar" size={24} color="#FFF" />
                    </View>
                    <View style={styles.citaHeaderInfo}>
                      <Text style={styles.citaTitulo}>{cita.titulo}</Text>
                      <Text style={styles.citaFecha}>{cita.fecha}</Text>
                      <Text style={styles.citaHora}>{cita.hora}</Text>
                    </View>
                  </View>
                  <View 
                    style={[
                      styles.estadoBadge,
                      { 
                        backgroundColor: getEstadoColor(cita.estado),
                        borderColor: getEstadoBorderColor(cita.estado)
                      }
                    ]}
                  >
                    <Text style={styles.estadoText}>{getEstadoTexto(cita.estado)}</Text>
                  </View>
                </View>

                {/* Info de la cita */}
                <View style={styles.citaInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Paciente:</Text>
                    <Text style={styles.infoValue}>{cita.paciente}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Edad:</Text>
                    <Text style={styles.infoValue}>{cita.edad} años</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Odontólogo:</Text>
                    <Text style={styles.infoValue}>{cita.odontologo}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Tratamiento:</Text>
                    <Text style={styles.infoValue}>{cita.tratamiento}</Text>
                  </View>
                </View>

                {/* Detalles adicionales */}
                <View style={styles.detallesRow}>
                  <View style={styles.detalleBox}>
                    <Ionicons name="time-outline" size={16} color="rgba(255, 255, 255, 0.8)" />
                    <Text style={styles.detalleText}>{cita.duracion}</Text>
                  </View>
                  <View style={styles.detalleBox}>
                    <Ionicons name="cash-outline" size={16} color="rgba(255, 255, 255, 0.8)" />
                    <Text style={styles.detalleText}>{cita.pago}</Text>
                  </View>
                  <View style={styles.detalleBox}>
                    <Text style={styles.detalleText}>{cita.monto}</Text>
                  </View>
                </View>

                {/* Notas clínicas */}
                {cita.notas && (
                  <View style={styles.notasContainer}>
                    <Text style={styles.notasLabel}>Notas clínicas:</Text>
                    <Text style={styles.notasText}>{cita.notas}</Text>
                  </View>
                )}

                {/* Botón ver detalles */}
                <TouchableOpacity 
                  style={styles.verDetallesButton}
                  onPress={() => router.push('/screens/detalle-cita')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.verDetallesText}>Ver Detalles Completos</Text>
                  <Ionicons name="chevron-forward" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))
          )}
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
  },
  filtersContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  filterButtonActive: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
  },
  filterText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  filterTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 16,
  },
  citaCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
  citaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  citaHeaderLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  citaHeaderInfo: {
    flex: 1,
  },
  citaTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  citaFecha: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 2,
  },
  citaHora: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  estadoBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  estadoText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
  citaInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    width: 100,
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    color: '#FFF',
    fontWeight: '500',
  },
  detallesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  detalleBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 6,
  },
  detalleText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  notasContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  notasLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  notasText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 18,
  },
  verDetallesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  verDetallesText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
});