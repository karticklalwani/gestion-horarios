"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";

type Tienda = {
  id: string;
  nombre: string;
};

export default function TiendasPage() {
  const { user, role, loading } = useUser();
  const router = useRouter();

  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [nombre, setNombre] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      if (role !== "superadmin") router.push("/");
    }
  }, [user, role, loading, router]);

  useEffect(() => {
    cargarTiendas();
  }, []);

  async function cargarTiendas() {
    const { data } = await supabase.from("tiendas").select("*").order("nombre");
    if (data) setTiendas(data);
  }

  async function crearTienda() {
    if (!nombre.trim()) return;
    setSaving(true);

    const { error } = await supabase
      .from("tiendas")
      .insert({ nombre: nombre.trim() });

    setSaving(false);

    if (!error) {
      setNombre("");
      cargarTiendas();
    } else {
      alert("La tienda ya existe");
    }
  }

  async function borrarTienda(id: string) {
    if (!confirm("¿Eliminar tienda?")) return;
    await supabase.from("tiendas").delete().eq("id", id);
    cargarTiendas();
  }

  if (loading) return null;

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600 }}>Tiendas</h1>

      {/* Crear tienda */}
      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        <input
          placeholder="Nombre de la tienda"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        />
        <button
          onClick={crearTienda}
          disabled={saving}
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            background: "#000",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          Añadir
        </button>
      </div>

      {/* Lista */}
      <div style={{ marginTop: 32 }}>
        {tiendas.map((t) => (
          <div
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              borderRadius: 14,
              background: "#fff",
              marginBottom: 10,
              boxShadow: "0 4px 14px rgba(0,0,0,.06)",
            }}
          >
            <span>{t.nombre}</span>
            <button
              onClick={() => borrarTienda(t.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "#c00",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
