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

export default function TratamientosScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const tratamientos = [
    {
      id: 1,
      titulo: 'Ortodoncia',
      progreso: 65,
      proximaCita: '28 Oct 2025',
      doctor: 'Dra. Carol García',
      estado: 'activo',
    },
    {
      id: 2,
      titulo: 'Limpieza Dental',
      progreso: 30,
      proximaCita: '5 Nov 2025',
      doctor: 'Dr. Luis Mendoza',
      estado: 'activo',
    },
    {
      id: 3,
      titulo: 'Extracción',
      progreso: 100,
      proximaCita: 'Completado',
      doctor: 'Dr. Carlos Ruiz',
      estado: 'completado',
    },
  ];

  const filtros = ['Todos', 'Activos', 'Completados'];

  const tratamientosFiltrados = tratamientos.filter(t => {
    if (selectedFilter === 'Activos') return t.estado === 'activo';
    if (selectedFilter === 'Completados') return t.estado === 'completado';
    const matchSearch = t.titulo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

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
          <Text style={styles.headerTitle}>Mis Tratamientos</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Búsqueda */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.7)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar tratamiento..."
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

        {/* Tratamientos */}
        <View style={styles.section}>
          {tratamientosFiltrados.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open-outline" size={64} color="rgba(255, 255, 255, 0.4)" />
              <Text style={styles.emptyText}>No hay tratamientos</Text>
            </View>
          ) : (
            tratamientosFiltrados.map((tratamiento) => (
              <View 
                key={tratamiento.id} 
                style={[
                  styles.tratamientoCard,
                  tratamiento.estado === 'completado' && styles.cardCompletado
                ]}
              >
                {/* Header */}
                <View style={styles.cardHeader}>
                  <View style={[
                    styles.iconBox,
                    tratamiento.estado === 'completado' && styles.iconBoxCompletado
                  ]}>
                    <MaterialCommunityIcons 
                      name="tooth-outline" 
                      size={24} 
                      color="#FFF" 
                    />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{tratamiento.titulo}</Text>
                    <Text style={styles.cardDoctor}>{tratamiento.doctor}</Text>
                  </View>
                  {tratamiento.estado === 'completado' && (
                    <View style={styles.badgeCompletado}>
                      <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                    </View>
                  )}
                </View>

                {/* Progreso */}
                <View style={styles.progressSection}>
                  <View style={styles.progressInfo}>
                    <Text style={styles.progressLabel}>Progreso</Text>
                    <Text style={styles.progressPercent}>{tratamiento.progreso}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${tratamiento.progreso}%` },
                        tratamiento.estado === 'completado' && styles.progressCompletado
                      ]} 
                    />
                  </View>
                </View>

                {/* Próxima cita */}
                <View style={styles.citaInfo}>
                  <Ionicons name="calendar-outline" size={16} color="rgba(255, 255, 255, 0.8)" />
                  <Text style={styles.citaText}>Próxima cita: {tratamiento.proximaCita}</Text>
                </View>

                {/* Botones */}
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => router.push('/screens/detalle-tratamientos')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.actionButtonText}>Ver Detalles</Text>
                  <Ionicons name="chevron-forward" size={20} color="#FFF" />
                </TouchableOpacity>
                
                {tratamiento.estado === 'activo' && (
                  <TouchableOpacity 
                    style={styles.actionButtonSecondary}
                    onPress={() => router.push('/screens/citas')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="calendar" size={20} color="#FFF" />
                    <Text style={styles.actionButtonText}>Ver Citas</Text>
                  </TouchableOpacity>
                )}
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
  tratamientoCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 6,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardCompletado: {
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  iconBoxCompletado: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  cardDoctor: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  badgeCompletado: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.5)',
  },
  progressSection: {
    marginBottom: 14,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.75)',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  progressCompletado: {
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
  },
  citaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
  },
  citaText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  actionButtonSecondary: {
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
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
});