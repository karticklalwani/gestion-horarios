// =======================================
// 🟦 Firebase Config (Push Notifications)
// =======================================

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Estas keys las ponemos vacías porque me dijiste que
// vas a dármelas después cuando generemos tu proyecto Firebase.
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Inicializar Firebase App
export const firebaseApp = initializeApp(firebaseConfig);

// Crear messaging
let messaging: any = null;

// Solo se ejecuta en el cliente (navegador)
if (typeof window !== "undefined") {
  try {
    messaging = getMessaging(firebaseApp);
  } catch (e) {
    console.warn("Firebase Messaging no disponible aún:", e);
  }
}

// Solicitar token para notificaciones push
export const solicitarPermisoNotificaciones = async () => {
  if (!messaging) return null;

  try {
    const token = await getToken(messaging, {
      vapidKey: "", // también me la darás luego
    });
    return token;
  } catch (error) {
    console.error("Error obteniendo token FCM:", error);
    return null;
  }
};

// Listener cuando llega una notificación en primer plano
export const escucharMensajesFirebase = (callback: Function) => {
  if (!messaging) return;
  onMessage(messaging, (payload) => callback(payload));
};
