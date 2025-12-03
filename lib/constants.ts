// =======================================
// 🟦 BLOQUE 1 — CONSTANTES GLOBALES
// Sistema de tiendas, roles, admins,
// turnos y días del sistema de horarios
// =======================================

// 🔐 Password para entrar a la web (gestor de horarios - administradores)
export const MASTER_PASSWORD = "0101";

// 🟦 Administradores superadmin
export const ADMINS = [
  {
    nombre: "Saray",
    email: "tradinguniverse@hotmail.com",
    rol: "superadmin",
  },
  {
    nombre: "Chirag",
    email: "karticklalwani@hotmail.com",
    rol: "superadmin",
  },
  {
    nombre: "Ciara",
    email: "kartikzzler97@hotmail.com",
    rol: "superadmin",
  },
];

// 🏪 Tiendas iniciales del sistema
export const INITIAL_TIENDAS = {
  "Varadero": [],
  "Oasis Douglas": [],
  "Oasis Cita": [],
};

// 📅 Días de la semana
export const DIAS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

// 🕒 Turnos base (puedes editarlos luego si cambian)
export const TURNOS = {
  M: { label: "M", horario: "09:00 - 16:00", color: "from-blue-500 to-blue-600" },
  T: { label: "T", horario: "16:00 - 23:00", color: "from-purple-500 to-purple-600" },
  LD: { label: "LD", horario: "Libre", color: "from-gray-500 to-gray-600" },
};

// 🎭 Estados laborales
export const ESTADOS = {
  VAC: { label: "VACACIONES", color: "from-orange-500 to-orange-600" },
  LIB: { label: "LIBRE ESPECIAL", color: "from-purple-500 to-purple-600" },
  FEST: { label: "FESTIVO", color: "from-green-500 to-green-600" },
  BAJA: { label: "BAJA", color: "from-red-500 to-red-600" },
  ACUM: { label: "ACUMULADO", color: "from-blue-500 to-blue-600" },
};

// 🟧 Datos para asignación automática de cobertura
export const COBERTURA = {
  "Varadero": { mañana: 4, tarde: 4 },
  "Oasis Douglas": { mañana: 3, tarde: 3 },
  "Oasis Cita": { mañana: 3, tarde: 3 },
};

// 🟪 Motivos de ausencia libre (el empleado escribe el texto)
export const ALLOWED_ABSENCE_TYPES = ["texto-libre"];

// 🔥 Token Firebase/OneSignal (se añade más tarde cuando conectemos backend)
export const PUSH_CONFIG = {
  firebaseSenderId: "",
  firebaseVapidKey: "",
  onesignalAppId: "",
};
