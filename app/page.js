"use client";

import React, { useState } from "react";

const EJEMPLOS = [
  {
    texto:
      "El servicio fue lentísimo, esperamos 40 minutos por dos platos y el baño estaba sucio. La comida estaba bien pero no vuelvo.",
    rating: 2,
    negocio: "Restaurante La Terraza",
    rubro: "restaurante",
  },
  {
    texto:
      "Excelente atención, el mesero muy amable y la pasta espectacular. Volveremos seguro.",
    rating: 5,
    negocio: "Restaurante La Terraza",
    rubro: "restaurante",
  },
  {
    texto:
      "Cobraron más de lo que decía la carta y cuando reclamé me trataron mal. Muy decepcionante.",
    rating: 1,
    negocio: "Restaurante La Terraza",
    rubro: "restaurante",
  },
];

function Estrellas({ n }) {
  return (
    <span className="tracking-wider" style={{ color: "#E8A33D" }}>
      {"★".repeat(n)}
      <span style={{ color: "#4A4438" }}>{"★".repeat(5 - n)}</span>
    </span>
  );
}

function TicketLine() {
  return <div className="border-t border-dashed" style={{ borderColor: "#C9BFA0" }} />;
}

export default function Home() {
  const [texto, setTexto] = useState(EJEMPLOS[0].texto);
  const [rating, setRating] = useState(EJEMPLOS[0].rating);
  const [negocio, setNegocio] = useState(EJEMPLOS[0].negocio);
  const [rubro, setRubro] = useState(EJEMPLOS[0].rubro);
  const [estado, setEstado] = useState("idle");
  const [resultado, setResultado] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const cargarEjemplo = (ej) => {
    setTexto(ej.texto);
    setRating(ej.rating);
    setNegocio(ej.negocio);
    setRubro(ej.rubro);
    setEstado("idle");
    setResultado(null);
  };

  const generar = async () => {
    if (!texto.trim()) return;
    setEstado("cargando");
    setErrorMsg("");
    setResultado(null);

    try {
      const response = await fetch("/api/generar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto, rating, negocio, rubro }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error desconocido");
      }

      setResultado(data);
      setEstado("listo");
    } catch (e) {
      console.error(e);
      setErrorMsg(e.message || "No se pudo generar el análisis. Intenta de nuevo.");
      setEstado("error");
    }
  };

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center px-4 py-10 md:py-16"
      style={{
        background: "#14181C",
        backgroundImage: "radial-gradient(circle at 50% 0%, #1F2620 0%, #14181C 60%)",
      }}
    >
      <div className="w-full max-w-3xl mb-10 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 font-mono text-xs tracking-widest"
          style={{ background: "#1F2620", color: "#E8A33D", border: "1px solid #3A3226" }}
        >
          <span className="w-1.5 h-1.5 rounded-full blink-dot" style={{ background: "#E8A33D" }} />
          MOTOR DE REPUTACIÓN · EN VIVO
        </div>
        <h1
          className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-3"
          style={{ color: "#F4EFE1" }}
        >
          Cada reseña, resuelta antes de que se vuelva un problema
        </h1>
        <p className="text-base md:text-lg" style={{ color: "#8B9088" }}>
          Pega una reseña real. Mira la respuesta, el diagnóstico y las acciones que tu IA
          generaría — como si saliera impresa en la comanda de cocina.
        </p>
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6">
        <div
          className="rounded-lg p-6 flex flex-col gap-4"
          style={{ background: "#1B2119", border: "1px solid #2E3629" }}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-sm tracking-widest" style={{ color: "#8B9088" }}>
              01 — ENTRADA
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#C0432E" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#E8A33D" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#4C8B5D" }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {EJEMPLOS.map((ej, i) => (
              <button
                key={i}
                onClick={() => cargarEjemplo(ej)}
                className="font-mono text-xs px-3 py-1.5 rounded transition-colors"
                style={{
                  background: texto === ej.texto ? "#E8A33D" : "#242C22",
                  color: texto === ej.texto ? "#14181C" : "#B8BDB0",
                  border: "1px solid #3A4232",
                }}
              >
                Ejemplo {i + 1} · {ej.rating}★
              </button>
            ))}
          </div>

          <div>
            <label className="font-mono text-xs block mb-1" style={{ color: "#8B9088" }}>
              NEGOCIO
            </label>
            <input
              value={negocio}
              onChange={(e) => setNegocio(e.target.value)}
              className="w-full rounded px-3 py-2 font-mono text-sm outline-none"
              style={{ background: "#14181C", color: "#F4EFE1", border: "1px solid #2E3629" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono text-xs block mb-1" style={{ color: "#8B9088" }}>
                RUBRO
              </label>
              <input
                value={rubro}
                onChange={(e) => setRubro(e.target.value)}
                className="w-full rounded px-3 py-2 font-mono text-sm outline-none"
                style={{ background: "#14181C", color: "#F4EFE1", border: "1px solid #2E3629" }}
              />
            </div>
            <div>
              <label className="font-mono text-xs block mb-1" style={{ color: "#8B9088" }}>
                RATING
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full rounded px-3 py-2 font-mono text-sm outline-none"
                style={{ background: "#14181C", color: "#F4EFE1", border: "1px solid #2E3629" }}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} estrella{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-mono text-xs block mb-1" style={{ color: "#8B9088" }}>
              TEXTO DE LA RESEÑA
            </label>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              rows={6}
              className="w-full rounded px-3 py-2 font-mono text-sm outline-none resize-none"
              style={{ background: "#14181C", color: "#F4EFE1", border: "1px solid #2E3629" }}
              placeholder="Pega aquí el texto real de una reseña..."
            />
          </div>

          <button
            onClick={generar}
            disabled={estado === "cargando" || !texto.trim()}
            className="font-display font-semibold text-sm tracking-wide rounded py-3 transition-opacity disabled:opacity-50"
            style={{ background: "#E8A33D", color: "#14181C" }}
          >
            {estado === "cargando" ? "GENERANDO ANÁLISIS..." : "GENERAR RESPUESTA + DIAGNÓSTICO"}
          </button>
          {estado === "error" && (
            <p className="font-mono text-xs" style={{ color: "#C0432E" }}>
              {errorMsg}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <span className="font-display text-sm tracking-widest mb-3" style={{ color: "#8B9088" }}>
            02 — RESULTADO
          </span>

          {estado !== "listo" && (
            <div
              className="flex-1 rounded-lg flex items-center justify-center p-8 text-center"
              style={{ background: "#1B2119", border: "1px dashed #2E3629" }}
            >
              <p className="font-mono text-sm" style={{ color: "#5C6156" }}>
                {estado === "cargando"
                  ? "Imprimiendo comanda de respuesta..."
                  : "Genera un análisis para ver el resultado aquí, como una comanda impresa."}
              </p>
            </div>
          )}

          {estado === "listo" && resultado && (
            <div
              className="ticket-print rounded-sm p-6 font-mono text-sm shadow-2xl"
              style={{ background: "#F4EFE1", color: "#2B2820", boxShadow: "0 20px 40px -12px rgba(0,0,0,0.6)" }}
            >
              <div className="text-center mb-3">
                <p className="font-display font-semibold tracking-widest text-xs" style={{ color: "#5C4A1E" }}>
                  {negocio.toUpperCase()}
                </p>
                <p className="text-xs" style={{ color: "#8A7F5E" }}>
                  ANÁLISIS DE RESEÑA · {new Date().toLocaleDateString("es-ES")}
                </p>
              </div>
              <TicketLine />
              <div className="py-3">
                <p className="text-xs mb-1" style={{ color: "#8A7F5E" }}>
                  RATING RECIBIDO
                </p>
                <Estrellas n={rating} />
                <p className="text-xs mt-2 uppercase tracking-wide" style={{ color: "#8A7F5E" }}>
                  categoría: {resultado.categoria}
                </p>
              </div>
              <TicketLine />
              <div className="py-3">
                <p className="text-xs mb-1" style={{ color: "#8A7F5E" }}>
                  DIAGNÓSTICO
                </p>
                <p className="leading-snug">{resultado.diagnostico}</p>
              </div>
              <TicketLine />
              <div className="py-3">
                <p className="text-xs mb-1" style={{ color: "#8A7F5E" }}>
                  RESPUESTA SUGERIDA (copiar y pegar)
                </p>
                <p className="leading-snug whitespace-pre-line">{resultado.respuesta}</p>
              </div>
              <TicketLine />
              <div className="py-3">
                <p className="text-xs mb-2" style={{ color: "#8A7F5E" }}>
                  ACCIONES SUGERIDAS
                </p>
                <ul className="space-y-1">
                  {resultado.acciones?.map((a, i) => (
                    <li key={i} className="flex gap-2">
                      <span style={{ color: "#B58A2A" }}>□</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="text-center pt-3 mt-2 text-xs tracking-widest"
                style={{ borderTop: "1px dashed #C9BFA0", color: "#A69A72" }}
              >
                *** FIN DE COMANDA ***
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
