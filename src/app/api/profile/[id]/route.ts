import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function PUT(req: Request) {
  const {
    full_name,
    username,
    email,
    phone,
    bio,
    location,
    website,
    profile_picture_url,
  } = await req.json();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("users")
    .update({
      full_name,
      username,
      email,
      phone,
      bio,
      location,
      website,
      profile_picture_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", session.user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", session.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Profile deleted successfully" });
}
