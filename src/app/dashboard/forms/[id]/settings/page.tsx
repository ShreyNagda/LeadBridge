import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Form from "@/models/Form";
import { notFound } from "next/navigation";
import FormSettings from "@/components/dashboard/form-settings";

async function getForm(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  await connectDB();
  const form = await Form.findOne({ _id: id, userId: session.user.id });
  return form ? JSON.parse(JSON.stringify(form)) : null;
}

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const form = await getForm(id);

  if (!form) {
    notFound();
  }

  return (
    <div>
      <FormSettings form={form} />
    </div>
  );
}
