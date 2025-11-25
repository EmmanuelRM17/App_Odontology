// services/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://back-end-4803.onrender.com/api';

const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};

const api = {
  // Login
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/users/loginMovil`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Citas
  async getCitas(pacienteId: string) {
    const token = await getToken();
    const response = await fetch(`${API_URL}/citas/paciente/${pacienteId}`, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.json();
  },

  // Tratamientos
  async getTratamientos(pacienteId: string) {
    const token = await getToken();
    const response = await fetch(`${API_URL}/tratamientos/paciente/${pacienteId}`, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.json();
  },

  // Pagos
  async getPagos(pacienteId: string) {
    const token = await getToken();
    const response = await fetch(`${API_URL}/Finanzas/Pagos/paciente/${pacienteId}`, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.json();
  },

  // Servicios
  async getServicios() {
    const response = await fetch(`${API_URL}/servicios`);
    return response.json();
  },
};

export default api;