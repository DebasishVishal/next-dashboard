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
  const { firstName, lastName, phone, country } = data.personalInfo;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">How do we get in touch?</h1>
        <p className="text-muted-foreground">
          Leave us your details and we&apos;ll reach out within 24 hours!
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-md">
              First name *
            </Label>
            <Input
              id="firstName"
              placeholder="First name"
              value={firstName}
              onChange={(e) =>
                updateData("personalInfo", { firstName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-md">
              Last name *
            </Label>
            <Input
              id="lastName"
              placeholder="Last name"
              value={lastName}
              onChange={(e) =>
                updateData("personalInfo", { lastName: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-md">
            Phone number (optional)
          </Label>
          <Input
            id="phone"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) =>
              updateData("personalInfo", { phone: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-md">
            Choose your country *
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
              <ScrollArea className="h-80">
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
