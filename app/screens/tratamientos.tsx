import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
} from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default function ExploreScreen() {
  const router = useRouter();
  const theme = useContext(ThemeContext);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  if (!theme) return null;

  const { colors, isDark } = theme;

  const categories = [
    { id: 'all', name: 'Todos', icon: 'grid-outline' },
    { id: 'preventive', name: 'Preventivos', icon: 'shield-checkmark-outline' },
    { id: 'aesthetic', name: 'Estéticos', icon: 'sparkles-outline' },
    { id: 'restorative', name: 'Restaurativos', icon: 'build-outline' },
    { id: 'emergency', name: 'Urgencias', icon: 'alert-circle-outline' },
  ];

  const services = [
    { 
      id: 1, 
      name: 'Limpieza Dental', 
      category: 'preventive',
      description: 'Profilaxis profesional',
      icon: 'water-outline',
      price: 'Desde $500'
    },
    { 
      id: 2, 
      name: 'Blanqueamiento', 
      category: 'aesthetic',
      description: 'Tratamiento estético',
      icon: 'sparkles-outline',
      price: 'Desde $2,500'
    },
    { 
      id: 3, 
      name: 'Ortodoncia', 
      category: 'aesthetic',
      description: 'Alineación dental',
      icon: 'grid-outline',
      price: 'Consultar'
    },
    { 
      id: 4, 
      name: 'Endodoncia', 
      category: 'restorative',
      description: 'Tratamiento de conducto',
      icon: 'medical-outline',
      price: 'Desde $3,000'
    },
    { 
      id: 5, 
      name: 'Extracción', 
      category: 'emergency',
      description: 'Procedimiento quirúrgico',
      icon: 'cut-outline',
      price: 'Desde $800'
    },
    { 
      id: 6, 
      name: 'Implantes', 
      category: 'restorative',
      description: 'Reemplazo dental',
      icon: 'fitness-outline',
      price: 'Consultar'
    },
  ];

  const filteredServices = selectedCategory === 'Todos' 
    ? services 
    : services.filter(s => s.category === categories.find(c => c.name === selectedCategory)?.id);

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
          <View>
            <Text style={styles.headerTitle}>Servicios</Text>
            <Text style={styles.headerSubtitle}>Explora nuestros tratamientos</Text>
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            activeOpacity={0.7}
            onPress={() => setFilterModalVisible(true)}
          >
            <Ionicons name="options-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.selectedFilterContainer}>
          <View style={styles.selectedFilter}>
            <Text style={styles.selectedFilterText}>{selectedCategory}</Text>
          </View>
        </View>

        <View style={styles.servicesContainer}>
          {filteredServices.map((service) => (
            <TouchableOpacity 
              key={service.id}
              style={styles.serviceCard}
              activeOpacity={0.7}
            >
              <View style={styles.serviceIcon}>
                <Ionicons name={service.icon as any} size={28} color={colors.primary} />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={filterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrar por categoría</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryOption,
                    selectedCategory === category.name && styles.categoryOptionActive
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedCategory(category.name);
                    setFilterModalVisible(false);
                  }}
                >
                  <View style={[
                    styles.categoryIconContainer,
                    selectedCategory === category.name && styles.categoryIconActive
                  ]}>
                    <Ionicons 
                      name={category.icon as any} 
                      size={22} 
                      color={selectedCategory === category.name ? '#FFF' : colors.primary} 
                    />
                  </View>
                  <Text style={[
                    styles.categoryName,
                    selectedCategory === category.name && styles.categoryNameActive
                  ]}>
                    {category.name}
                  </Text>
                  {selectedCategory === category.name && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  filterButton: {
    width: isSmallDevice ? 40 : 44,
    height: isSmallDevice ? 40 : 44,
    borderRadius: isSmallDevice ? 20 : 22,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedFilterContainer: {
    marginBottom: isSmallDevice ? 16 : 20,
  },
  selectedFilter: {
    alignSelf: 'flex-start',
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  selectedFilterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  servicesContainer: {
    gap: 12,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: isSmallDevice ? 14 : 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceIcon: {
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
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: isSmallDevice ? 14 : 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  serviceDescription: {
    fontSize: isSmallDevice ? 12 : 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: isSmallDevice ? 12 : 13,
    fontWeight: '600',
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryOptionActive: {
    borderColor: colors.primary,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
  },
  categoryIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: isDark ? colors.card : '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryIconActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  categoryNameActive: {
    fontWeight: '600',
    color: colors.text,
  },
});