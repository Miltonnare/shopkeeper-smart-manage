
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TopNav from "@/components/layout/TopNav";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (!user || userError) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", user.id)
        .single();
      if (!error && data) {
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ first_name: firstName, last_name: lastName })
      .eq("id", user.id);
    if (error) {
      toast({ title: "Error", description: "Could not update profile", variant: "destructive" });
    } else {
      toast({ title: "Profile updated", description: "Profile information saved!" });
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3edf9] via-[#c7f6ed] to-[#fafbfe]">
      <TopNav />
      <main className="max-w-lg mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 bg-modern-gradient bg-clip-text text-transparent drop-shadow">
          My Profile
        </h2>
        <form
          onSubmit={onSave}
          className="glass-card border max-w-md w-full mx-auto p-8 rounded-lg shadow flex flex-col gap-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1 text-dark-secondary" htmlFor="firstName">
              First Name
            </label>
            <Input
              id="firstName"
              value={firstName}
              disabled={loading}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Enter first name"
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-dark-secondary" htmlFor="lastName">
              Last Name
            </label>
            <Input
              id="lastName"
              value={lastName}
              disabled={loading}
              onChange={e => setLastName(e.target.value)}
              placeholder="Enter last name"
              className="bg-white"
            />
          </div>
          <Button type="submit" disabled={saving || loading} className="mt-2">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </main>
    </div>
  );
}
