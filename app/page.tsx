import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = cookies();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
        storage: {
          getItem: (key) => cookieStore.get(key)?.value ?? null,
          setItem: () => {},
          removeItem: () => {},
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🔐 Si NO hay sesión → login
  if (!user) {
    redirect("/login");
  }

  // ✅ Si hay sesión → dashboard
  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user.email}</p>
    </main>
  );
}
