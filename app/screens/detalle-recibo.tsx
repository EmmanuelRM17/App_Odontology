import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Share,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemeContext } from "../contexts/ThemeContext";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;

export default function DetalleReciboScreen() {
  const router = useRouter();
  const theme = useContext(ThemeContext);
  const params = useLocalSearchParams();

  if (!theme) return null;

  const { colors, isDark } = theme;

  const { id, fecha, cita, monto, metodo, estado, referencia } = params;

  // Navegar hacia atrás
  const handleBack = () => {
    router.back();
  };

  // Compartir recibo como texto
  const handleShareReceipt = async () => {
    try {
      const message = `
━━━━━━━━━━━━━━━━━━━━━━
ODONTOLOGÍA CAROL
Recibo de Pago
━━━━━━━━━━━━━━━━━━━━━━

No. Recibo: ${referencia}
Estado: ${estado}

SERVICIO:
${cita}

Fecha del servicio: ${fecha}

DETALLES DE PAGO:
Método: ${metodo}
ID: #${id}
Subtotal: $${Number(monto).toLocaleString()} MXN

━━━━━━━━━━━━━━━━━━━━━━
TOTAL: $${Number(monto).toLocaleString()} MXN
━━━━━━━━━━━━━━━━━━━━━━

Este es un comprobante oficial de pago.
Para cualquier aclaración contactar a la clínica.

Tel: 33 1234 5678
Email: contacto@odontologiacarol.com
      `;

      await Share.share({
        message: message,
        title: "Recibo de Pago",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Copiar número de referencia
  const handleCopyReference = () => {
    Alert.alert("Copiado", `Referencia ${referencia} copiada`);
  };

  // Obtener color del estado
  const getEstadoColor = (est: string) => {
    return est === "Pagado" ? "#22C55E" : "#FBBF24";
  };

  // Obtener fecha actual
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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
            <Text style={styles.headerTitle}>Recibo de Pago</Text>
            <Text style={styles.headerSubtitle}>#{referencia}</Text>
          </View>

          <TouchableOpacity
            style={styles.shareButton}
            activeOpacity={0.7}
            onPress={handleShareReceipt}
          >
            <Ionicons name="share-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Recibo Card */}
        <View style={styles.receiptCard}>
          {/* Header del recibo */}
          <View style={styles.receiptHeader}>
            <View style={styles.clinicInfo}>
              <View style={styles.logoContainer}>
                <Ionicons name="medical" size={32} color={colors.primary} />
              </View>
              <View style={styles.clinicDetails}>
                <Text style={styles.clinicName}>Odontología Carol</Text>
                <Text style={styles.clinicSubtitle}>Clínica Dental</Text>
              </View>
            </View>

            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getEstadoColor(estado as string) },
              ]}
            >
              <Text style={styles.statusText}>{estado}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Info del recibo */}
          <View style={styles.receiptInfo}>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>No. Recibo</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleCopyReference}
                >
                  <Text style={styles.infoValue}>{referencia}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Fecha</Text>
                <Text style={styles.infoValue}>{getCurrentDate()}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Servicio</Text>
              <Text style={styles.infoValueLarge}>{cita}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Fecha del servicio</Text>
              <Text style={styles.infoValue}>{fecha}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Detalles de pago */}
          <View style={styles.paymentDetails}>
            <Text style={styles.sectionTitle}>Detalles de Pago</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Método de pago</Text>
              <Text style={styles.detailValue}>{metodo}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>ID Transacción</Text>
              <Text style={styles.detailValue}>#{id}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Subtotal</Text>
              <Text style={styles.detailValue}>
                ${Number(monto).toLocaleString()} MXN
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>IVA (16%)</Text>
              <Text style={styles.detailValue}>$0.00 MXN</Text>
            </View>
          </View>

          {/* Total */}
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>
              ${Number(monto).toLocaleString()}
            </Text>
            <Text style={styles.totalCurrency}>MXN</Text>
          </View>

          {/* Footer del recibo */}
          <View style={styles.receiptFooter}>
            <View style={styles.footerItem}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.footerText}>Pago verificado</Text>
            </View>
            <View style={styles.footerItem}>
              <Ionicons
                name="shield-checkmark"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.footerText}>Transacción segura</Text>
            </View>
          </View>

          {/* Nota */}
          <View style={styles.noteSection}>
            <Text style={styles.noteText}>
              Este recibo es un comprobante oficial de pago. Para cualquier
              aclaración, favor de contactar a la clínica.
            </Text>
          </View>
        </View>

        {/* Botón de compartir */}
        <TouchableOpacity
          style={styles.shareButtonLarge}
          activeOpacity={0.7}
          onPress={handleShareReceipt}
        >
          <Ionicons name="share-social" size={20} color="#FFF" />
          <Text style={styles.shareButtonText}>Compartir Recibo</Text>
        </TouchableOpacity>

        {/* Info adicional */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.infoCardTitle}>Información de Contacto</Text>
          </View>

          <View style={styles.infoCardItem}>
            <Ionicons
              name="call-outline"
              size={18}
              color={colors.textSecondary}
            />
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>Teléfono</Text>
              <Text style={styles.infoCardText}>33 1234 5678</Text>
            </View>
          </View>

          <View style={styles.infoCardItem}>
            <Ionicons
              name="mail-outline"
              size={18}
              color={colors.textSecondary}
            />
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>Email</Text>
              <Text style={styles.infoCardText}>
                contacto@odontologiacarol.com
              </Text>
            </View>
          </View>

          <View style={styles.infoCardItem}>
            <Ionicons
              name="location-outline"
              size={18}
              color={colors.textSecondary}
            />
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>Dirección</Text>
              <Text style={styles.infoCardText}>
                Av. Principal #123, Guadalajara, Jalisco
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
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
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: isSmallDevice ? 20 : 24,
    },
    backButton: {
      width: isSmallDevice ? 40 : 44,
      height: isSmallDevice ? 40 : 44,
      borderRadius: isSmallDevice ? 20 : 22,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderBottomWidth: 3,
    },
    headerContent: {
      flex: 1,
      marginLeft: 12,
    },
    headerTitle: {
      fontSize: isSmallDevice ? 24 : 28,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: isSmallDevice ? 13 : 14,
      color: colors.textSecondary,
    },
    shareButton: {
      width: isSmallDevice ? 40 : 44,
      height: isSmallDevice ? 40 : 44,
      borderRadius: isSmallDevice ? 20 : 22,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderBottomWidth: 3,
    },
    receiptCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: isSmallDevice ? 20 : 24,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
      borderBottomWidth: 4,
    },
    receiptHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 20,
    },
    clinicInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    logoContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    clinicDetails: {
      gap: 2,
    },
    clinicName: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
    },
    clinicSubtitle: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    statusBadge: {
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 12,
    },
    statusText: {
      fontSize: 11,
      fontWeight: "700",
      color: "#FFF",
      textTransform: "uppercase",
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 20,
    },
    receiptInfo: {
      gap: 16,
    },
    infoGrid: {
      flexDirection: "row",
      gap: 16,
    },
    infoItem: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 4,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    infoValueLarge: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },
    paymentDetails: {
      gap: 12,
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    detailLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    detailValue: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    totalSection: {
      backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      marginTop: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    totalLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.textSecondary,
      marginBottom: 8,
      letterSpacing: 1,
    },
    totalValue: {
      fontSize: 36,
      fontWeight: "700",
      color: colors.primary,
      marginBottom: 4,
    },
    totalCurrency: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.textSecondary,
    },
    receiptFooter: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 24,
      marginTop: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    footerItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    footerText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    noteSection: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    noteText: {
      fontSize: 11,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 16,
    },
    shareButtonLarge: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 16,
      marginBottom: 24,
      borderBottomWidth: 4,
      borderBottomColor: "#1E40AF",
    },
    shareButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#FFF",
    },
    infoCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: isSmallDevice ? 16 : 18,
      borderWidth: 1,
      borderColor: colors.border,
      borderBottomWidth: 3,
    },
    infoCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    infoCardTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    infoCardItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
      paddingVertical: 10,
    },
    infoCardContent: {
      flex: 1,
    },
    infoCardLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    infoCardText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
  });