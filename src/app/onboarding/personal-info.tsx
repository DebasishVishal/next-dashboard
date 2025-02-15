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
import { useOnboarding } from "./onboarding-context";
import { countries } from "./countries";

export default function PersonalInfo() {
  const { data, updateData } = useOnboarding();
  const { firstName, lastName, phone, country, countryCode } =
    data.personalInfo;

  // Get the selected country object
  const selectedCountry = countries.find((c) => c.code === country);

  // Handle country change
  const handleCountryChange = (value: string) => {
    const selectedCountry = countries.find((c) => c.code === value);
    if (selectedCountry) {
      updateData("personalInfo", {
        country: value,
        countryCode: selectedCountry.phoneCode, // Update countryCode when country changes
      });
    }
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
              className="w-1/2 sm:w-full"
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
              className="w-1/2 sm:w-full"
              onChange={(e) =>
                updateData("personalInfo", { lastName: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* <div className="space-y-1">
          <Label htmlFor="phone" className="text-sm">
            Phone number (optional)
          </Label>
          <Input
            id="phone"
            placeholder="Enter phone number"
            value={phone}
            className="w-1/2"
            onChange={(e) =>
              updateData("personalInfo", { phone: e.target.value })
            }
          />
        </div> */}

        {/* Phone Number with Country Code */}
        <div className="space-y-1">
          <Label htmlFor="phone" className="text-sm">
            Phone number (optional)
          </Label>
          <div className="flex gap-2 w-2/3">
            {/* Country Code Selector */}
            <Select
              value={countryCode}
              onValueChange={(value) =>
                updateData("personalInfo", { countryCode: value })
              }
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Code" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-80">
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.phoneCode}>
                      {country.name} ({country.phoneCode})
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>

            {/* Phone Number Input */}
            <Input
              id="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={handlePhoneNumberChange}
              type="tel"
            />
          </div>
        </div>

        <div className="space-y-1 w-1/3">
          <Label htmlFor="country" className="text-sm">
            Choose your country
          </Label>
          <Select
            value={country}
            onValueChange={(value) =>
              updateData("personalInfo", { country: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-80 ">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
