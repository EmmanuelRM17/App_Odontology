import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TratamientoScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <View style={styles.headerTitleRow}>
            <MaterialCommunityIcons name="tooth-outline" size={30} color="#000" />
            <Text style={styles.headerTitle}>Proceso</Text>
          </View>
          <Text style={styles.headerSubtitle}>Seguimiento visual del tratamiento</Text>
        </View>
      </View>

      {/* Sesión 1 */}
      <View style={[styles.sessionContainer, styles.lightBlueCard]}>
        <View style={styles.sessionHeader}>
          <View style={styles.sessionTitleContainer}>
            <MaterialCommunityIcons name="tooth-outline" size={22} color="#0077b6" />
            <Text style={styles.sessionTitle}>Sesión 1 - 24 septiembre de 2025</Text>
          </View>
        </View>
        <View style={styles.imageRow}>
          <TouchableOpacity style={styles.imagePlaceholder}>
            <Image
              style={styles.placeholderImage}
              source={{ uri: 'https://via.placeholder.com/150' }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imagePlaceholder}>
            <Image
              style={styles.placeholderImage}
              source={{ uri: 'https://via.placeholder.com/150' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.buttonBefore]}>
            <Text style={styles.buttonText}>Antes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonAfter]}>
            <Text style={styles.buttonText}>Después</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sesión 2 */}
      <View style={[styles.sessionContainer, styles.lightBlueCard]}>
        <View style={styles.sessionHeader}>
          <View style={styles.sessionTitleContainer}>
            <MaterialCommunityIcons name="tooth-outline" size={22} color="#0077b6" />
            <Text style={styles.sessionTitle}>Sesión 2 - 19 octubre de 2025</Text>
          </View>
        </View>
        <View style={styles.imageRow}>
          <TouchableOpacity style={styles.imagePlaceholder}>
            <Image
              style={styles.placeholderImage}
              source={{ uri: 'https://via.placeholder.com/150' }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imagePlaceholder}>
            <Image
              style={styles.placeholderImage}
              source={{ uri: 'https://via.placeholder.com/150' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.buttonBefore]}>
            <Text style={styles.buttonText}>Antes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonAfter]}>
            <Text style={styles.buttonText}>Después</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    backgroundColor: '#8bbdeeff',
    paddingTop: 28, // más espacio arriba
    paddingBottom: 15, // más espacio abajo
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 4,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 55, // baja el botón para alinearlo con el nuevo espacio
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10, // baja todo el contenido
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end', // texto ligeramente más abajo que el icono
    justifyContent: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
  },
  sessionContainer: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  lightBlueCard: {
    backgroundColor: '#d1eff3ff',
  },
  sessionHeader: {
    marginBottom: 10,
  },
  sessionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 5,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonBefore: {
    backgroundColor: '#f8e2c0ff',
  },
  buttonAfter: {
    backgroundColor: '#98e998ff',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});
