import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  isDark: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colors: ColorScheme;
}

interface ColorScheme {
  background: string;
  backgroundSecondary: string;
  card: string;
  primary: string;
  primaryDark: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  errorBg: string;
  inputBg: string;
  icon: string;
  shadow: string;
}

const lightColors: ColorScheme = {
  background: '#7BB7F2',
  backgroundSecondary: '#FFFFFF',
  card: '#FFFFFF',
  primary: '#1E40AF',
  primaryDark: '#1E3A8A',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#D1D5DB',
  error: '#EF4444',
  errorBg: '#FEF2F2',
  inputBg: '#F9FAFB',
  icon: '#6B7280',
  shadow: '#000000',
};

const darkColors: ColorScheme = {
  background: '#1F2937',
  backgroundSecondary: '#111827',
  card: '#374151',
  primary: '#60A5FA',
  primaryDark: '#3B82F6',
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  border: '#4B5563',
  error: '#F87171',
  errorBg: '#7F1D1D',
  inputBg: '#1F2937',
  icon: '#9CA3AF',
  shadow: '#000000',
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
  const [isDark, setIsDark] = useState(systemTheme === 'dark');

  // Carga preferencia guardada
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Actualiza tema cuando cambia el modo o el sistema
  useEffect(() => {
    const newIsDark = themeMode === 'auto' 
      ? systemTheme === 'dark' 
      : themeMode === 'dark';
    setIsDark(newIsDark);
  }, [themeMode, systemTheme]);

  const loadThemePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem('themeMode');
      if (saved) setThemeModeState(saved as ThemeMode);
    } catch (error) {
      console.error('Error cargando tema:', error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error guardando tema:', error);
    }
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, themeMode, setThemeMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};