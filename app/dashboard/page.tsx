import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/getUserProfile";

export default async function DashboardPage() {
  const data = await getUserProfile();

  if (!data) {
    redirect("/login");
  }

  const { user, profile } = data;

  if (!profile) {
    return <p>Error: perfil no encontrado</p>;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>

      <p>
        Bienvenido <strong>{profile.nombre}</strong>
      </p>

      <p>Rol: {profile.rol}</p>
      <p>Tienda: {profile.tienda}</p>

      <hr />

      {profile.rol === "superadmin" && (
        <section>
          <h2>Panel Superadmin</h2>
          <ul>
            <li>Gestionar tiendas</li>
            <li>Gestionar empleados</li>
            <li>Ver ausencias</li>
          </ul>
        </section>
      )}

      {profile.rol === "admin" && (
        <section>
          <h2>Panel Administrador</h2>
          <p>Gestión de tu tienda</p>
        </section>
      )}

      {profile.rol === "empleado" && (
        <section>
          <h2>Panel Empleado</h2>
          <p>Ver mi horario</p>
          <p>Solicitar ausencia</p>
        </section>
      )}
    </main>
  );
}
