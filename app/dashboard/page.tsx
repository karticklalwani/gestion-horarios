"use client";

import { useUser } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import StatCard from "@/components/StatCard";
import SectionCard from "@/components/SectionCard";

export default function DashboardPage() {
  const { user, role, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (role !== "superadmin") {
      router.push("/");
    }
  }, [user, role, loading, router]);

  if (loading) return <p>Cargando...</p>;

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600 }}>Dashboard</h1>

      {/* MÉTRICAS */}
      <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
        <StatCard title="Tiendas" value="4" />
        <StatCard title="Empleados" value="23" />
        <StatCard title="Ausencias pendientes" value="3" />
      </div>

      {/* SECCIONES */}
      <div style={{ marginTop: 32, display: "grid", gap: 16 }}>
        <SectionCard
          title="Gestión de Tiendas"
          description="Crear, editar y asignar tiendas"
          onClick={() => router.push("/tiendas")}
        />
        <SectionCard
          title="Empleados"
          description="Alta, baja y asignación de empleados"
          onClick={() => router.push("/empleados")}
        />
        <SectionCard
          title="Ausencias"
          description="Revisión y aprobación de ausencias"
          onClick={() => router.push("/ausencias")}
        />
      </div>
    </main>
  );
}
