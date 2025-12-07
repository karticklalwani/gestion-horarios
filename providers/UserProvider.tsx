import { getUserRole } from "@/app/lib/roles";

useEffect(() => {
  async function load() {
    const session = await supabase.auth.getSession();
    const email = session.data.session?.user.email;

    if (email) {
      const rol = await getUserRole(email);
      setUser({ email, rol });
    }
  }

  load();
}, []);
