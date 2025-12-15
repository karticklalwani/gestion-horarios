import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function getUserProfile() {
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

  if (!user) return null;

  const { data: profile } = await supabase
    .from("usuarios")
    .select("id, nombre, rol, tienda")
    .eq("id", user.id)
    .single();

  return { user, profile };
}
