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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeContext } from '../contexts/ThemeContext';
import dentistImage from "../../assets/images/dentist.png";

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default function TabTwoScreen() {
  const router = useRouter();
  const theme = useContext(ThemeContext);

  if (!theme) return null;

  const { colors, isDark } = theme;

  // Navegar hacia atrás
  const handleBack = () => {
    router.push('/(tabs)');
  };

  const servicios = [
    {
      id: 1,
      titulo: 'Limpieza Dental',
      descripcion: 'Programar una limpieza profesional para mantener tu salud bucal',
      icono: 'water-outline',
      precio: 'Desde $500',
    },
    {
      id: 2,
      titulo: 'Ortodoncia',
      descripcion: 'Consulta para aparatos y alineación dental perfecta',
      icono: 'grid-outline',
      precio: 'Consultar',
    },
    {
      id: 3,
      titulo: 'Blanqueamiento',
      descripcion: 'Opción para un blanqueamiento seguro y efectivo',
      icono: 'sparkles-outline',
      precio: 'Desde $2,500',
    },
    {
      id: 4,
      titulo: 'Endodoncia',
      descripcion: 'Tratamiento de conducto profesional',
      icono: 'medical-outline',
      precio: 'Desde $3,000',
    },
    {
      id: 5,
      titulo: 'Implantes',
      descripcion: 'Reemplazo dental permanente',
      icono: 'construct-outline',
      precio: 'Consultar',
    },
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
            <Text style={styles.headerTitle}>Servicios</Text>
            <Text style={styles.headerSubtitle}>Servicios Odontológicos</Text>
          </View>
          
          <View style={styles.placeholder} />
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Cuidado Dental</Text>
            <Text style={styles.heroSubtitle}>
              Ofrecemos servicios de calidad para mantener tu sonrisa saludable
            </Text>
          </View>
          <Image 
            source={dentistImage}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Servicios Section */}
        <View style={styles.sectionHeader}>
          <Ionicons name="medical-outline" size={20} color={colors.text} />
          <Text style={styles.sectionTitle}>Nuestros Servicios</Text>
        </View>

        {/* Servicios List */}
        <View style={styles.serviciosContainer}>
          {servicios.map((servicio) => (
            <TouchableOpacity 
              key={servicio.id}
              style={styles.servicioCard}
              activeOpacity={0.7}
            >
              <View style={styles.servicioHeader}>
                <View style={styles.iconContainer}>
                  <Ionicons name={servicio.icono as any} size={28} color={colors.primary} />
                </View>
                
                <View style={styles.servicioInfo}>
                  <Text style={styles.servicioTitulo}>{servicio.titulo}</Text>
                  <Text style={styles.servicioDescripcion}>{servicio.descripcion}</Text>
                </View>
              </View>

              <View style={styles.servicioFooter}>
                <View style={styles.precioContainer}>
                  <Ionicons name="cash-outline" size={16} color={colors.primary} />
                  <Text style={styles.precioPrecio}>{servicio.precio}</Text>
                </View>
                <TouchableOpacity style={styles.agendarButton} activeOpacity={0.7}>
                  <Text style={styles.agendarText}>Agendar</Text>
                  <Ionicons name="chevron-forward" size={16} color="#FFF" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>¿Necesitas ayuda?</Text>
            <Text style={styles.infoText}>
              Contáctanos para más información sobre nuestros servicios
            </Text>
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
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: isSmallDevice ? 20 : 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: isSmallDevice ? 20 : 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  heroImage: {
    width: 80,
    height: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '600',
    color: colors.text,
  },
  serviciosContainer: {
    gap: 16,
    marginBottom: 24,
  },
  servicioCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: isSmallDevice ? 16 : 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  servicioHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  servicioInfo: {
    flex: 1,
  },
  servicioTitulo: {
    fontSize: isSmallDevice ? 16 : 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  servicioDescripcion: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  servicioFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  precioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  precioPrecio: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  agendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 4,
  },
  agendarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});