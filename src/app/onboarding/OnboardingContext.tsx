"use client";

import { createContext, useContext, useState, useEffect } from "react";

type OnboardingData = {
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    countryCode: string;
  };
  accountSetup: {
    platforms: string[];
    roles: string[];
    businessFocus: string[];
    otherRole?: string;
  };
  preferences: {
    interests: string[];
  };
  appAndTool: {
    apps: { appId: string; name: string }[];
  };
};

type StepId = "personalInfo" | "accountSetup" | "appAndTool" | "preferences";

type OnboardingContextType = {
  data: OnboardingData;
  currentStep: StepId;
  completedSteps: string[];
  updateData: (
    step: keyof OnboardingData,
    newData: Partial<OnboardingData[keyof OnboardingData]>
  ) => void;
  isStepValid: (step: StepId) => boolean;
  setCurrentStep: (step: StepId) => void;
  setCompletedSteps: (steps: string[]) => void;
};

// const defaultData: OnboardingData = {
//   personalInfo: {
//     firstName: "",
//     lastName: "",
//     phone: "",
//     country: initialCountry,
//     countryCode: "",
//   },
//   accountSetup: { platforms: ["Shopify"], roles: [], businessFocus: [] },
//   appAndTool: { apps: ["BSS", "AMP"] },
//   preferences: { interests: ["Technology", "Politics"] },
// };

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider: React.FC<{
  children: React.ReactNode;
  initialCountry?: string;
}> = ({ children, initialCountry = "" }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<OnboardingData>(() => {
    const defaultData: OnboardingData = {
      personalInfo: {
        firstName: "",
        lastName: "",
        phone: "",
        country: initialCountry,
        countryCode: "",
      },
      accountSetup: { platforms: ["Shopify"], roles: [], businessFocus: [] },
      appAndTool: {
        apps: [
          { appId: "5e7100d6dd8a25eae7b75d50f0d897df", name: "BSS" },
          { appId: "7c8e03518d96c8f3941ce1e6a4124239", name: "AMP" },
        ],
      },
      preferences: { interests: ["Technology", "Politics"] },
    };

    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("onboardingData");
      return savedData ? JSON.parse(savedData) : defaultData;
    }
    return defaultData;
  });

  const [currentStep, setCurrentStep] = useState<StepId>(() => {
    if (typeof window !== "undefined") {
      const savedStep = localStorage.getItem("lastStep");
      return (savedStep as StepId) || "personalInfo";
    }
    return "personalInfo";
  });

  const [completedSteps, setCompletedSteps] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("completedSteps");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Set isMounted to true after initial hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("onboardingData", JSON.stringify(data));
    }
  }, [data, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("lastStep", currentStep);
    }
  }, [currentStep, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }
  }, [completedSteps, isMounted]);

  const updateData = (
    step: keyof OnboardingData,
    newData: Partial<OnboardingData[keyof OnboardingData]>
  ) => {
    setData((prevData) => ({
      ...prevData,
      [step]: { ...prevData[step], ...newData },
    }));
  };

  const isStepValid = (step: StepId): boolean => {
    switch (step) {
      case "personalInfo":
        return (
          !!data.personalInfo.firstName &&
          !!data.personalInfo.lastName &&
          !!data.personalInfo.country
        );
      case "accountSetup":
        return (
          data.accountSetup.platforms.length > 0 &&
          data.accountSetup.roles.length > 0 &&
          data.accountSetup.businessFocus.length > 0
        );
      case "appAndTool":
        return data.appAndTool.apps.length > 0;
      case "preferences":
        return data.preferences.interests.length > 0;
      default:
        return false;
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        currentStep,
        completedSteps,
        updateData,
        isStepValid,
        setCurrentStep,
        setCompletedSteps,
      }}
    >
      {isMounted ? children : null}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
