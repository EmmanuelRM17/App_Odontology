import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#2563EB',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: 'transparent',
          height: Platform.OS === 'ios' ? 85 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          paddingHorizontal: 30,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '700',
          marginTop: 6,
        },
        tabBarItemStyle: {
          paddingVertical: 0,
          marginHorizontal: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 65,
                height: 50,
                backgroundColor: focused ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)',
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: focused ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: focused ? 6 : 3 },
                shadowOpacity: focused ? 0.4 : 0.2,
                shadowRadius: focused ? 8 : 4,
                elevation: focused ? 6 : 2,
                borderBottomWidth: focused ? 5 : 0,
                borderBottomColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={26} 
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Servicios',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 65,
                height: 50,
                backgroundColor: focused ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)',
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: focused ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: focused ? 6 : 3 },
                shadowOpacity: focused ? 0.4 : 0.2,
                shadowRadius: focused ? 8 : 4,
                elevation: focused ? 6 : 2,
                borderBottomWidth: focused ? 5 : 0,
                borderBottomColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <Ionicons 
                name={focused ? 'medical' : 'medical-outline'} 
                size={26} 
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}