import { OnboardingProvider } from "./OnboardingContext";
import { OnboardingFlow } from "./OnboardingFlow";
import { SidebarProvider } from "@/components/ui/sidebar";

async function getUserCountry() {
  const baseUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

  const res = await fetch(`${baseUrl}/api/region`, {
    headers: { "Content-Type": "application/json" },
  });
  const { country } = await res.json();
  console.log("Country received:", country);
  return country || "US";
}

export default async function OnboardingPage() {
  const detectedCountry = await getUserCountry();

  return (
    <SidebarProvider>
      <OnboardingProvider initialCountry={detectedCountry}>
        <OnboardingFlow />
      </OnboardingProvider>
    </SidebarProvider>
  );
}
