"use server";

export async function handleSubmit(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Log to console or save to a database
  console.log({ name, email, message });

  // Add your logic here (e.g., send email, save to DB)
  // Return a response if needed
  return { success: true };
}
