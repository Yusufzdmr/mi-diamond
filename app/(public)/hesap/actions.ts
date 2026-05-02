"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function updateProfileAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Oturum bulunamadı." };

  const full_name = String(formData.get("full_name") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim() || null;

  const { error } = await supabase
    .from("profiles")
    .update({ full_name, phone })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/hesap");
  revalidatePath("/hesap/bilgilerim");
  return { ok: true };
}
