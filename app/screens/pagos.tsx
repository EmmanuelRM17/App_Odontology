import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemeContext } from "../contexts/ThemeContext";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;

export default function PagosScreen() {
  const router = useRouter();
  const theme = useContext(ThemeContext);
  const [selectedFecha, setSelectedFecha] = useState("Todos");
  const [selectedEstado, setSelectedEstado] = useState("Todos");
  const [selectedMetodo, setSelectedMetodo] = useState("Todos");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"fecha" | "estado" | "metodo">(
    "fecha"
  );

  if (!theme) return null;

  const { colors, isDark } = theme;

  // Navegar hacia atrás
  const handleBack = () => {
    router.push("/(tabs)");
  };

  const pagos = [
    {
      id: 1,
      fecha: "15 de diciembre del 2025",
      mes: "diciembre",
      cita: "Ortodoncia - Ajuste de brackets",
      monto: 1200,
      metodo: "Transferencia",
      estado: "Pendiente",
      referencia: "RC-1225-1034",
    },
    {
      id: 2,
      fecha: "28 de noviembre del 2025",
      mes: "noviembre",
      cita: "Limpieza dental profunda",
      monto: 800,
      metodo: "Efectivo",
      estado: "Pendiente",
      referencia: "RC-1125-0842",
    },
    {
      id: 3,
      fecha: "20 de noviembre del 2025",
      mes: "noviembre",
      cita: "Revisión de ortodoncia",
      monto: 400,
      metodo: "Tarjeta",
      estado: "Pendiente",
      referencia: "RC-1125-0523",
    },
    {
      id: 4,
      fecha: "05 de octubre del 2025",
      mes: "octubre",
      cita: "Blanqueamiento dental",
      monto: 2500,
      metodo: "Transferencia",
      estado: "Pagado",
      referencia: "RC-1025-0312",
    },
    {
      id: 5,
      fecha: "20 de septiembre del 2025",
      mes: "septiembre",
      cita: "Extracción muela del juicio",
      monto: 1800,
      metodo: "Efectivo",
      estado: "Pagado",
      referencia: "RC-0925-0789",
    },
    {
      id: 6,
      fecha: "10 de agosto del 2025",
      mes: "agosto",
      cita: "Endodoncia molar",
      monto: 3000,
      metodo: "Tarjeta",
      estado: "Pagado",
      referencia: "RC-0825-0156",
    },
    {
      id: 7,
      fecha: "15 de julio del 2025",
      mes: "julio",
      cita: "Limpieza dental",
      monto: 600,
      metodo: "Efectivo",
      estado: "Pagado",
      referencia: "RC-0725-0421",
    },
  ];

  const filtrosOpcionesMap = {
    fecha: [
      "Todos",
      "Este mes",
      "Mes anterior",
      "Últimos 3 meses",
      "Últimos 6 meses",
    ],
    estado: ["Todos", "Pendiente", "Pagado"],
    metodo: ["Todos", "Efectivo", "Tarjeta", "Transferencia"],
  };

  // Filtrar y ordenar pagos (pendientes primero)
  const pagosFiltrados = pagos
    .filter((pago) => {
      // Filtro por estado
      if (selectedEstado !== "Todos" && pago.estado !== selectedEstado) {
        return false;
      }

      // Filtro por método
      if (selectedMetodo !== "Todos" && pago.metodo !== selectedMetodo) {
        return false;
      }

      // Filtro por fecha
      if (selectedFecha !== "Todos") {
        const mesActual = "noviembre";
        const mesAnterior = "octubre";
        const ultimos3 = ["noviembre", "octubre", "septiembre"];
        const ultimos6 = [
          "noviembre",
          "octubre",
          "septiembre",
          "agosto",
          "julio",
          "junio",
        ];

        if (selectedFecha === "Este mes" && pago.mes !== mesActual) {
          return false;
        }
        if (selectedFecha === "Mes anterior" && pago.mes !== mesAnterior) {
          return false;
        }
        if (
          selectedFecha === "Últimos 3 meses" &&
          !ultimos3.includes(pago.mes)
        ) {
          return false;
        }
        if (
          selectedFecha === "Últimos 6 meses" &&
          !ultimos6.includes(pago.mes)
        ) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      // Primero pendientes, luego pagados
      if (a.estado === "Pendiente" && b.estado === "Pagado") return -1;
      if (a.estado === "Pagado" && b.estado === "Pendiente") return 1;

      // Dentro del mismo estado, más recientes primero
      const mesesOrden = [
        "diciembre",
        "noviembre",
        "octubre",
        "septiembre",
        "agosto",
        "julio",
        "junio",
        "mayo",
      ];
      return mesesOrden.indexOf(a.mes) - mesesOrden.indexOf(b.mes);
    });

  // Calcular totales
  const totalPagado = pagosFiltrados
    .filter((p) => p.estado === "Pagado")
    .reduce((sum, p) => sum + p.monto, 0);

  const totalPendiente = pagosFiltrados
    .filter((p) => p.estado === "Pendiente")
    .reduce((sum, p) => sum + p.monto, 0);

  const getEstadoColor = (estado: string) => {
    return estado === "Pagado" ? "#22C55E" : "#FBBF24";
  };

  // Abrir modal de filtros
  const openFilterModal = (type: "fecha" | "estado" | "metodo") => {
    setModalType(type);
    setModalVisible(true);
  };

  // Seleccionar filtro
  const selectFilter = (value: string) => {
    if (modalType === "fecha") setSelectedFecha(value);
    if (modalType === "estado") setSelectedEstado(value);
    if (modalType === "metodo") setSelectedMetodo(value);
    setModalVisible(false);
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSelectedFecha("Todos");
    setSelectedEstado("Todos");
    setSelectedMetodo("Todos");
  };

  const hasActiveFilters =
    selectedFecha !== "Todos" ||
    selectedEstado !== "Todos" ||
    selectedMetodo !== "Todos";

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
            <Text style={styles.headerTitle}>Historial de Pagos</Text>
            <Text style={styles.headerSubtitle}>Consulta tus pagos</Text>
          </View>

          <View style={styles.placeholder} />
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFecha !== "Todos" && styles.filterButtonActive,
            ]}
            activeOpacity={0.7}
            onPress={() => openFilterModal("fecha")}
          >
            <Text
              style={[
                styles.filterText,
                selectedFecha !== "Todos" && styles.filterTextActive,
              ]}
            >
              {selectedFecha}
            </Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color={selectedFecha !== "Todos" ? colors.primary : colors.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedEstado !== "Todos" && styles.filterButtonActive,
            ]}
            activeOpacity={0.7}
            onPress={() => openFilterModal("estado")}
          >
            <Text
              style={[
                styles.filterText,
                selectedEstado !== "Todos" && styles.filterTextActive,
              ]}
            >
              {selectedEstado}
            </Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color={selectedEstado !== "Todos" ? colors.primary : colors.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedMetodo !== "Todos" && styles.filterButtonActive,
            ]}
            activeOpacity={0.7}
            onPress={() => openFilterModal("metodo")}
          >
            <Text
              style={[
                styles.filterText,
                selectedMetodo !== "Todos" && styles.filterTextActive,
              ]}
            >
              {selectedMetodo}
            </Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color={selectedMetodo !== "Todos" ? colors.primary : colors.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Limpiar filtros */}
        {hasActiveFilters && (
          <TouchableOpacity
            style={styles.clearButton}
            activeOpacity={0.7}
            onPress={clearFilters}
          >
            <Ionicons name="close-circle" size={18} color={colors.primary} />
            <Text style={styles.clearText}>Limpiar filtros</Text>
          </TouchableOpacity>
        )}

        {/* Resumen */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Pagado</Text>
              <Text style={styles.summaryValue}>
                ${totalPagado.toLocaleString()}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Pendiente</Text>
              <Text style={[styles.summaryValue, { color: "#FBBF24" }]}>
                ${totalPendiente.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Ionicons name="receipt-outline" size={20} color={colors.text} />
          <Text style={styles.sectionTitle}>
            Pagos ({pagosFiltrados.length})
          </Text>
        </View>

        {/* Pagos List */}
        <View style={styles.pagosContainer}>
          {pagosFiltrados.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Ionicons
                  name="receipt-outline"
                  size={48}
                  color={colors.icon}
                />
              </View>
              <Text style={styles.emptyText}>No hay pagos</Text>
              <Text style={styles.emptySubtext}>
                No se encontraron pagos con los filtros aplicados
              </Text>
            </View>
          ) : (
            pagosFiltrados.map((pago) => (
              <TouchableOpacity
                key={pago.id}
                style={styles.pagoCard}
                activeOpacity={0.7}
                onPress={() =>
                  router.push({
                    pathname: "/screens/detalle-recibo",
                    params: {
                      id: pago.id,
                      fecha: pago.fecha,
                      cita: pago.cita,
                      monto: pago.monto,
                      metodo: pago.metodo,
                      estado: pago.estado,
                      referencia: pago.referencia,
                    },
                  })
                }
              >
                {/* Header */}
                <View style={styles.pagoHeader}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="card-outline"
                      size={24}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.pagoHeaderInfo}>
                    <Text style={styles.pagoCita}>{pago.cita}</Text>
                    <View style={styles.fechaRow}>
                      <Ionicons
                        name="calendar-outline"
                        size={14}
                        color={colors.textSecondary}
                      />
                      <Text style={styles.pagoFecha}>{pago.fecha}</Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.estadoBadge,
                      { backgroundColor: getEstadoColor(pago.estado) },
                    ]}
                  >
                    <Text style={styles.estadoText}>{pago.estado}</Text>
                  </View>
                </View>

                {/* Info */}
                <View style={styles.infoSection}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Monto:</Text>
                    <Text style={styles.infoValue}>
                      ${pago.monto.toLocaleString()} MXN
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Método:</Text>
                    <Text style={styles.infoValue}>{pago.metodo}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Referencia:</Text>
                    <Text style={styles.infoValue}>{pago.referencia}</Text>
                  </View>
                </View>

                {/* Ver más */}
                <View style={styles.verMasContainer}>
                  <Text style={styles.verMasText}>Ver recibo</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.primary}
                  />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal de filtros */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Filtrar por{" "}
                {modalType === "fecha"
                  ? "Fecha"
                  : modalType === "estado"
                  ? "Estado"
                  : "Método"}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsContainer}>
              {filtrosOpcionesMap[modalType].map((opcion) => {
                const isSelected =
                  (modalType === "fecha" && opcion === selectedFecha) ||
                  (modalType === "estado" && opcion === selectedEstado) ||
                  (modalType === "metodo" && opcion === selectedMetodo);

                return (
                  <TouchableOpacity
                    key={opcion}
                    style={[
                      styles.optionItem,
                      isSelected && styles.optionItemActive,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => selectFilter(opcion)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextActive,
                      ]}
                    >
                      {opcion}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
    placeholder: {
      width: isSmallDevice ? 40 : 44,
    },
    filtersContainer: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 12,
    },
    filterButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.card,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filterButtonActive: {
      borderColor: colors.primary,
      backgroundColor: isDark ? colors.card : colors.inputBg,
    },
    filterText: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.text,
    },
    filterTextActive: {
      color: colors.primary,
    },
    clearButton: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: colors.card,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
      gap: 6,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    clearText: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.primary,
    },
    summaryCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: isSmallDevice ? 18 : 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    summaryRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    summaryItem: {
      flex: 1,
      alignItems: "center",
    },
    summaryDivider: {
      width: 1,
      height: 40,
      backgroundColor: colors.border,
    },
    summaryLabel: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 6,
    },
    summaryValue: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.primary,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: isSmallDevice ? 16 : 18,
      fontWeight: "600",
      color: colors.text,
    },
    pagosContainer: {
      gap: 16,
    },
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 60,
    },
    emptyIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 6,
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
    },
    pagoCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: isSmallDevice ? 16 : 18,
      borderWidth: 1,
      borderColor: colors.border,
    },
    pagoHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    pagoHeaderInfo: {
      flex: 1,
    },
    pagoCita: {
      fontSize: isSmallDevice ? 15 : 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    fechaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    pagoFecha: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    estadoBadge: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 12,
      marginLeft: 8,
    },
    estadoText: {
      fontSize: 11,
      fontWeight: "700",
      color: "#FFF",
      textTransform: "uppercase",
    },
    infoSection: {
      backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
      borderRadius: 12,
      padding: 14,
      marginBottom: 12,
      gap: 10,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    infoLabel: {
      fontSize: 13,
      fontWeight: "500",
      color: colors.textSecondary,
    },
    infoValue: {
      fontSize: 13,
      color: colors.text,
      fontWeight: "600",
    },
    verMasContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 6,
    },
    verMasText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.primary,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingTop: 20,
      paddingBottom: 40,
      paddingHorizontal: 20,
      maxHeight: "70%",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    optionsContainer: {
      gap: 12,
    },
    optionItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: isDark ? colors.backgroundSecondary : colors.inputBg,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    optionItemActive: {
      borderColor: colors.primary,
    },
    optionText: {
      fontSize: 15,
      fontWeight: "500",
      color: colors.text,
    },
    optionTextActive: {
      fontWeight: "600",
      color: colors.primary,
    },
  });
