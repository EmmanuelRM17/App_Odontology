import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeContext } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default function CitasScreen() {
  const router = useRouter();
  const theme = useContext(ThemeContext);
  const [selectedFilter, setSelectedFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  if (!theme) return null;

  const { colors, isDark } = theme;

  // Navegar hacia atrás
  const handleBack = () => {
    router.push('/(tabs)');
  };

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
        return '#22C55E';
      case 'pendiente':
        return '#FBBF24';
      case 'cancelada':
        return '#EF4444';
      default:
        return colors.textSecondary;
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
            <Text style={styles.headerTitle}>Mis Citas</Text>
            <Text style={styles.headerSubtitle}>Gestiona tus consultas</Text>
          </View>
          
          <View style={styles.placeholder} />
        </View>

        {/* Búsqueda */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={colors.icon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar cita..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={20} color={colors.icon} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filtros */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filtros.map((filtro) => (
            <TouchableOpacity
              key={filtro}
              style={[
                styles.filterChip,
                selectedFilter === filtro && styles.filterChipActive,
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
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Citas */}
        <View style={styles.citasContainer}>
          {citasFiltradas.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="calendar-outline" size={48} color={colors.icon} />
              </View>
              <Text style={styles.emptyText}>No hay citas</Text>
              <Text style={styles.emptySubtext}>Las citas aparecerán aquí</Text>
            </View>
          ) : (
            citasFiltradas.map((cita) => (
              <TouchableOpacity 
                key={cita.id} 
                style={styles.citaCard}
                activeOpacity={0.7}
                onPress={() => router.push('/screens/detalle-cita')}
              >
                {/* Header de la cita */}
                <View style={styles.citaHeader}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="calendar" size={24} color={colors.primary} />
                  </View>
                  
                  <View style={styles.citaHeaderInfo}>
                    <Text style={styles.citaTitulo}>{cita.titulo}</Text>
                    <View style={styles.fechaHoraRow}>
                      <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                      <Text style={styles.citaFecha}>{cita.fecha} • {cita.hora}</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(cita.estado) }]}>
                    <Text style={styles.estadoText}>{getEstadoTexto(cita.estado)}</Text>
                  </View>
                </View>

                {/* Info principal */}
                <View style={styles.infoSection}>
                  <View style={styles.infoRow}>
                    <Ionicons name="person-outline" size={16} color={colors.textSecondary} />
                    <Text style={styles.infoLabel}>Odontólogo:</Text>
                    <Text style={styles.infoValue}>{cita.odontologo}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Ionicons name="medical-outline" size={16} color={colors.textSecondary} />
                    <Text style={styles.infoLabel}>Tratamiento:</Text>
                    <Text style={styles.infoValue}>{cita.tratamiento}</Text>
                  </View>
                </View>

                {/* Detalles rápidos */}
                <View style={styles.quickDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={16} color={colors.icon} />
                    <Text style={styles.detailText}>{cita.duracion}</Text>
                  </View>
                  
                  <View style={styles.detailDivider} />
                  
                  <View style={styles.detailItem}>
                    <Ionicons name="cash-outline" size={16} color={colors.icon} />
                    <Text style={styles.detailText}>{cita.monto}</Text>
                  </View>
                  
                  <View style={styles.detailDivider} />
                  
                  <View style={styles.detailItem}>
                    <Text style={[styles.detailText, { color: cita.pago === 'Pagado' ? '#22C55E' : colors.textSecondary }]}>
                      {cita.pago}
                    </Text>
                  </View>
                </View>

                {/* Notas */}
                {cita.notas && (
                  <View style={styles.notasContainer}>
                    <View style={styles.notasHeader}>
                      <Ionicons name="document-text-outline" size={14} color={colors.textSecondary} />
                      <Text style={styles.notasLabel}>Notas:</Text>
                    </View>
                    <Text style={styles.notasText} numberOfLines={2}>{cita.notas}</Text>
                  </View>
                )}

                {/* Ver más */}
                <View style={styles.verMasContainer}>
                  <Text style={styles.verMasText}>Ver detalles completos</Text>
                  <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                </View>
              </TouchableOpacity>
            ))
          )}
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
  searchContainer: {
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: isSmallDevice ? 10 : 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    gap: 10,
    paddingRight: 20,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterTextActive: {
    color: '#FFF',
  },
  citasContainer: {
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  citaCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: isSmallDevice ? 16 : 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  citaHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  citaHeaderInfo: {
    flex: 1,
  },
  citaTitulo: {
    fontSize: isSmallDevice ? 16 : 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  fechaHoraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  citaFecha: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  estadoBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginLeft: 8,
  },
  estadoText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
    textTransform: 'uppercase',
  },
  infoSection: {
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  quickDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  detailDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },
  detailText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  notasContainer: {
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  notasHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  notasLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  notasText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  verMasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 6,
  },
  verMasText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});