import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOnboarding } from "./OnboardingContext";
import { countries } from "../../lib/countries";

export default function PersonalInfo() {
  const { data, updateData } = useOnboarding();
  const { firstName, lastName, phone, country, countryCode } =
    data.personalInfo;

  // Get the selected country object
  const selectedCountry = countries.find((c) => c.phoneCode === countryCode);

  // Handle country selection (updates country and countryCode)
  const handleCountryChange = (value: string) => {
    const selected = countries.find((c) => c.code === value);
    if (selected) {
      updateData("personalInfo", {
        country: value,
        countryCode: selected.phoneCode, // Auto-update country code
      });
    }
  };

  // Handle country code change
  const handleCountryCodeChange = (value: string) => {
    updateData("personalInfo", { countryCode: value });
  };

  // Handle phone number input change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    updateData("personalInfo", { phone: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground">Step 1 of 4</p>
        <h1 className="text-2xl font-semibold">How do we get in touch?</h1>
        <p className="text-muted-foreground text-sm">
          Leave us your details and we&apos;ll reach out within 24 hours!
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="firstName" className="text-sm">
              First name
            </Label>
            <Input
              id="firstName"
              placeholder="First name"
              value={firstName}
              className="w-full"
              onChange={(e) =>
                updateData("personalInfo", { firstName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName" className="text-sm">
              Last name
            </Label>
            <Input
              id="lastName"
              placeholder="Last name"
              value={lastName}
              className="w-full"
              onChange={(e) =>
                updateData("personalInfo", { lastName: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Country */}
        <div className="space-y-1 w-1/2">
          <Label htmlFor="country" className="text-sm">
            Choose your country
          </Label>

          <div className="flex gap-2">
            <Select value={country} onValueChange={handleCountryChange}>
              <SelectTrigger className="[&[data-placeholder]]:font-normal [&[data-placeholder]]:text-neutral-500">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-60 w-60">
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name} {country.flag}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Phone Number with Country Code */}
        <div className="space-y-1">
          <Label htmlFor="phone" className="text-sm">
            Phone number
            <span className="font-light text-neutral-500"> (Optional)</span>
          </Label>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-2/3">
            <Select value={countryCode} onValueChange={handleCountryCodeChange}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="🇺🇸">
                  {selectedCountry ? selectedCountry.flag : "🇮🇳"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-60 w-60">
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.phoneCode}>
                      {country.name} {country.flag} ({country.phoneCode})
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>

            <Input
              id="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={handlePhoneNumberChange}
              type="tel"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
