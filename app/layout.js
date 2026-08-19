import "./globals.css";

export const metadata = {
  title: "Reseñas IA — Respuestas y diagnóstico automático",
  description:
    "Genera respuestas profesionales y diagnósticos accionables para las reseñas de tu negocio, con inteligencia artificial.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
