import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#2563EB' },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="tratamiento" />
      <Stack.Screen name="citas" />
      <Stack.Screen name="pagos" />
      <Stack.Screen name="detalle-cita" />
    </Stack>
  );
}