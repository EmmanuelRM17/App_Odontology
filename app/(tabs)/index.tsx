import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const userName = auth?.user?.name || "Usuario";

  // Cierre de sesión
  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            await auth?.logout();
            router.replace('/screens/login');
          },
        },
      ]
    );
  };

  // Llamada de emergencia
  const handleEmergencyCall = () => {
    const phoneNumber = 'tel:911';
    Linking.openURL(phoneNumber).catch(() => {
      Alert.alert('Error', 'No se pudo realizar la llamada');
    });
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
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={28} color="#FFF" />
            </View>
            <View>
              <Text style={styles.welcomeText}>Bienvenido(a)</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} activeOpacity={0.7}>
            <Ionicons name="log-out-outline" size={26} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Saludo */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingTitle}>Tu sonrisa es nuestra prioridad</Text>
          <Text style={styles.greetingSubtitle}>
            Accede rápidamente a tus servicios
          </Text>
        </View>

        {/* Cards transparentes */}
        <View style={styles.cardsContainer}>
          {/* Card 1: Tratamientos */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => router.push('/screens/tratamientos')}
          >
            <View style={styles.cardIcon}>
              <MaterialCommunityIcons name="tooth-outline" size={40} color="#FFF" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Tratamientos</Text>
              <Text style={styles.cardDescription}>
                Visualiza el avance de cada tratamiento paso a paso
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.8)" />
          </TouchableOpacity>

          {/* Card 2: Citas pendientes */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => router.push('/screens/citas')}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="calendar-outline" size={40} color="#FFF" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Citas pendientes</Text>
              <Text style={styles.cardDescription}>
                Consulta tus citas pasadas y próximas
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.8)" />
          </TouchableOpacity>

          {/* Card 3: Historial de pagos */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => router.push('/screens/pagos')}
          >
            <View style={styles.cardIcon}>
              <MaterialCommunityIcons name="calculator" size={40} color="#FFF" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Historial de pagos</Text>
              <Text style={styles.cardDescription}>
                Revisa tus pagos realizados y estado de cuenta
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.8)" />
          </TouchableOpacity>

          {/* Card de emergencia */}
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <View style={styles.emergencyIconContainer}>
                <Ionicons name="warning" size={28} color="#FFF" />
              </View>
              <View style={styles.emergencyText}>
                <Text style={styles.emergencyTitle}>¿Urgencia dental?</Text>
                <Text style={styles.emergencySubtitle}>
                  Dolor intenso, fractura, inflamación o sangrado
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.emergencyButton}
              onPress={handleEmergencyCall}
              activeOpacity={0.7}
            >
              <Ionicons name="call" size={22} color="#FFF" />
              <Text style={styles.emergencyButtonText}>Llamar ahora</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpace} />
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },
  userName: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '700',
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  greetingContainer: {
    marginHorizontal: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    borderBottomWidth: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
  },
  greetingSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 22,
  },
  cardsContainer: {
    paddingHorizontal: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    borderBottomWidth: 6,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 19,
  },
  emergencyCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 18,
    padding: 20,
    marginTop: 8,
    borderWidth: 2,
    borderColor: 'rgba(239, 68, 68, 0.5)',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
    borderBottomWidth: 6,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  emergencyIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(239, 68, 68, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 6,
  },
  emergencySubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 19,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.95)',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
    borderBottomWidth: 6,
    borderBottomColor: 'rgba(153, 27, 27, 0.9)',
  },
  emergencyButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  bottomSpace: {
    height: 0,
  },
});