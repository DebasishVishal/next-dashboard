"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

type OnboardingData = {
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
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
    apps: string[];
  };
};

type OnboardingContextType = {
  data: OnboardingData;
  updateData: (
    step: keyof OnboardingData,
    newData: Partial<OnboardingData[keyof OnboardingData]>
  ) => void;
  isStepValid: (step: keyof OnboardingData) => boolean;
};

const defaultData: OnboardingData = {
  personalInfo: { firstName: "", lastName: "", phone: "", country: "" },
  accountSetup: { platforms: [], roles: [], businessFocus: [] },
  appAndTool: { apps: [] },
  preferences: { interests: [] },
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<OnboardingData>(defaultData);

  const updateData = (
    step: keyof OnboardingData,
    newData: Partial<OnboardingData[keyof OnboardingData]>
  ) => {
    setData((prevData) => ({
      ...prevData,
      [step]: { ...prevData[step], ...newData },
    }));
  };

  const isStepValid = (step: keyof OnboardingData): boolean => {
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
        return data.appAndTool.apps.length > 0; // Fix: Check apps array length
      case "preferences":
        return data.preferences.interests.length > 0; // All fields are optional in preferences
      default:
        return false;
    }
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, isStepValid }}>
      {children}
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
