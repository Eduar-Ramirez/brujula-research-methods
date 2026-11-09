/* Configuración de Charo IA. Hay dos formas de conectarla (NUNCA pegues aquí una clave de Gemini):
   A) endpoint: URL de un servidor que responda POST {message, history, context} → {reply}
      (el Worker de backend-charo/ o la ruta /api/charo de la app de Google AI Studio desplegada).
   B) appUrl: dirección de la app de Charo en Google AI Studio. Brújula la abre en otra pestaña con
      ?origen=brujula&modo=…&ctx=…&q=… (la pregunta y lo que el estudiante tiene en pantalla).
   Si están vacías las dos, Charo prepara la pregunta con su contexto para copiarla. */
window.CHARO_IA_CONFIG = {
  endpoint: "https://charo-ia.eduarstiven-ramirez.workers.dev/api/charo",
  appUrl: "https://charo-ia.eduarstiven-ramirez.workers.dev",
  // Texto de la herramienta en la Tabla 5 de INDAGA (declaración de uso de IA).
  herramienta: "Charo IA (Brújula) · Gemini (Google AI Studio)",
  // Solo si has activado Turnstile en el Worker.
  turnstileSiteKey: "",
  // Mensajes por persona y día (límite en el navegador).
  limiteDiario: 40
};
