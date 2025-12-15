"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/UserProvider";

export default function DashboardPage() {
  const { user, role, loading } = useUser();
  const router = useRouter();

  // 🔐 Protección de ruta
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <main
      style={{
        padding: 24,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          Gestión Horaria
        </h1>
        <p style={{ color: "#666", marginTop: 6 }}>
          Bienvenido {user.email}
        </p>
      </header>

      {/* GRID */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        {/* TIENDAS */}
        {role === "superadmin" && (
          <Card
            title="Tiendas"
            description="Crear y administrar tiendas"
            onClick={() => router.push("/tiendas")}
          />
        )}

        {/* HORARIOS */}
        <Card
          title="Horarios"
          description="Ver y gestionar horarios"
          onClick={() => router.push("/horarios")}
        />

        {/* AUSENCIAS */}
        <Card
          title="Ausencias"
          description="Notificaciones y bajas"
          onClick={() => router.push("/ausencias")}
        />

        {/* EMPLEADOS */}
        {role === "superadmin" && (
          <Card
            title="Empleados"
            description="Invitaciones y códigos"
            onClick={() => router.push("/empleados")}
          />
        )}

        {/* AJUSTES */}
        {role === "superadmin" && (
          <Card
            title="Ajustes"
            description="Configuración general"
            onClick={() => router.push("/ajustes")}
          />
        )}
      </section>
    </main>
  );
}

/* ======================================================
   🔹 COMPONENTE CARD (iOS style)
====================================================== */
function Card({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 20,
        textAlign: "left",
        border: "none",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        cursor: "pointer",
        transition: "transform .15s ease",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ fontSize: 18, fontWeight: 600 }}>
        {title}
      </h3>
      <p style={{ marginTop: 6, color: "#666", fontSize: 14 }}>
        {description}
      </p>
    </button>
  );
}
