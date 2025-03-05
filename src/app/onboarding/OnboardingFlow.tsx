"use client";

import { useEffect } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import PersonalInfo from "./PersonalInfo";
import AccountSetup from "./AccountSetup";
import Preferences from "./Preferences";
import { OnboardingProvider, useOnboarding } from "./OnboardingContext";
import Link from "next/link";
import AppAndTools from "./AppAndTools";
import { useRouter } from "next/navigation";

const steps = [
  { id: "personalInfo", title: "Personal Info", component: PersonalInfo },
  { id: "accountSetup", title: "Account Setup", component: AccountSetup },
  { id: "appAndTool", title: "Apps and Tools", component: AppAndTools },
  { id: "preferences", title: "Preferences", component: Preferences },
] as const;

export function OnboardingFlow() {
  const router = useRouter();

  const {
    data,
    isStepValid,
    currentStep,
    completedSteps,
    setCurrentStep,
    setCompletedSteps,
  } = useOnboarding();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const response = await fetch("/api/onboarding/status", {
          credentials: "include",
        });

        // console.log("Response status:", response.status);

        if (response.ok) {
          const status = await response.json();
          // console.log("Onboarding status:", status);

          if (status) {
            // console.log("Redirecting to dashboard page");
            router.push("/dashboard");
          }
        } else {
          router.push("/dashboard");
          console.error("Failed to fetch onboarding status");
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  // Type-safe current step handling
  const CurrentStepComponent = steps.find(
    (step) => step.id === currentStep
  )?.component;

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1 && isStepValid(currentStep)) {
      const newCompletedSteps = [...completedSteps, currentStep];
      setCompletedSteps(newCompletedSteps);
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleFinish = async () => {
    if (isStepValid(currentStep)) {
      const newCompletedSteps = [...completedSteps, currentStep];
      setCompletedSteps(newCompletedSteps);

      try {
        const response = await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // Set Content-Type
          body: JSON.stringify(data),
          credentials: "include", // Include cookies
        });

        if (!response.ok) {
          let errorResponse;
          try {
            errorResponse = await response.json(); // Try to parse the error response as JSON
          } catch (error) {
            errorResponse = await response.text(); // Fallback to text if JSON parsing fails
          }
          console.error("Error response:", errorResponse);
          throw new Error("Failed to save onboarding data");
        }

        const contentType = response.headers.get("content-type");
        let result;
        if (contentType && contentType.includes("application/json")) {
          result = await response.json(); // Parse JSON response
        } else {
          result = await response.text(); // Fallback to text
        }

        // console.log("Onboarding data saved:", result);

        // Clear onboarding data from local storage
        localStorage.removeItem("onboardingData");
        localStorage.removeItem("lastStep");
        localStorage.removeItem("completedSteps");

        router.push("/dashboard"); // Redirect to dashboard after saving
      } catch (error) {
        console.error("Error saving onboarding data:", error);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-90px)] w-full">
      {/* <Sidebar className="w-64 flex-shrink-0">
        <SidebarHeader>
          <h2 className="px-6 text-xl font-semibold">Onboarding</h2>
        </SidebarHeader>
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {steps.map((step) => (
                  <SidebarMenuItem key={step.id}>
                    <SidebarMenuButton
                      isActive={currentStep === step.id}
                      className="gap-3"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                        {completedSteps.includes(step.id) ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <span>
                            {steps.findIndex((s) => s.id === step.id) + 1}
                          </span>
                        )}
                      </div>
                      {step.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t">
          <Link
            href="#"
            className="flex items-center gap-2 place-content-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path d="M 24 3 C 14.076636 3 6 11.076643 6 21 C 6 30.417177 13.276989 38.157278 22.5 38.923828 L 22.5 43 L 10.5 43 A 1.50015 1.50015 0 1 0 10.5 46 L 37.5 46 A 1.50015 1.50015 0 1 0 37.5 43 L 25.5 43 L 25.5 38.923828 C 34.723011 38.157278 42 30.417177 42 21 C 42 11.076643 33.923364 3 24 3 z M 24 6 C 27.609084 6 30.913744 7.2677413 33.498047 9.3808594 L 29.798828 13.080078 C 28.142073 11.862235 26.204519 11 24 11 C 21.795481 11 19.857927 11.862235 18.201172 13.080078 L 14.501953 9.3808594 C 17.086256 7.2677413 20.390916 6 24 6 z M 12.380859 11.501953 L 16.080078 15.201172 C 14.862237 16.857927 14 18.795483 14 21 C 14 23.204517 14.862237 25.142073 16.080078 26.798828 L 12.380859 30.498047 C 10.267742 27.913744 9 24.609081 9 21 C 9 17.390919 10.267742 14.086256 12.380859 11.501953 z M 35.619141 11.501953 C 37.732258 14.086256 39 17.390919 39 21 C 39 24.609081 37.732258 27.913744 35.619141 30.498047 L 31.919922 26.798828 C 33.137763 25.142073 34 23.204517 34 21 C 34 18.795483 33.137763 16.857927 31.919922 15.201172 L 35.619141 11.501953 z M 24 14 C 27.883764 14 31 17.116238 31 21 C 31 24.883762 27.883764 28 24 28 C 20.116236 28 17 24.883762 17 21 C 17 17.116238 20.116236 14 24 14 z M 18.201172 28.919922 C 19.857927 30.137765 21.795481 31 24 31 C 26.204519 31 28.142073 30.137765 29.798828 28.919922 L 33.498047 32.619141 C 30.913744 34.732259 27.609084 36 24 36 C 20.390916 36 17.086256 34.732259 14.501953 32.619141 L 18.201172 28.919922 z"></path>
            </svg>
            <span className="text-sm">Support & Feedback</span>
          </Link>
        </SidebarFooter>
      </Sidebar> */}

      <main className="flex-1 p-6 flex">
        <div className="mx-auto max-w-2xl space-y-7 h-[490px] md:w-[530px] mt-5">
          {CurrentStepComponent && <CurrentStepComponent />}

          <div className="flex items-center gap-2">
            {currentStep !== "personalInfo" && (
              <Button variant="outline" onClick={handleBack} className="px-2">
                <ChevronLeft className="h-4 w-4" /> Go Back
              </Button>
            )}
            <div className="ml-auto">
              {currentStep !== "preferences" ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  disabled={!isStepValid(currentStep)}
                >
                  Finish
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
