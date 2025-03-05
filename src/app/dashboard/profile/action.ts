"use server";

export async function handleProfileSubmit(formData: FormData) {
  const profileData = {
    email: formData.get("email") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    username: formData.get("username") as string,
    bio: formData.get("bio") as string,
    company: formData.get("company") as string,
    website: formData.get("website") as string,
    streetAddress: formData.get("streetAddress") as string,
    zipCode: formData.get("zipCode") as string,
    city: formData.get("city") as string,
    country: formData.get("country") as string,
    newsletter: formData.get("newsletter") === "on", // Checkbox sends "on" or nothing
  };

  // Log the data (or save to a database, send to an API, etc.)
  console.log("Profile data submitted:", profileData);

  // Add your persistence logic here (e.g., save to DB)
  return { success: true };
}
