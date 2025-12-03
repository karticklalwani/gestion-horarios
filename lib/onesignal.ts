// =======================================
// 🟦 OneSignal SDK Config
// =======================================

export const initOneSignal = () => {
  if (typeof window === "undefined") return;

  // Evitar inicialización doble
  if ((window as any).OneSignalInitialized) return;
  (window as any).OneSignalInitialized = true;

  // Crear script
  const script = document.createElement("script");
  script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    // Inicializar OneSignal
    window.OneSignal = window.OneSignal || [];
    window.OneSignal.push(() => {
      window.OneSignal.init({
        appId: "",
        safari_web_id: "",
        allowLocalhostAsSecureOrigin: true,
      });
    });
  };
};
