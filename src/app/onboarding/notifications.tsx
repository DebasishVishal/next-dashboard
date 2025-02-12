import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const notificationPreferences = [
  {
    id: "email-updates",
    title: "Email Updates",
    description: "Receive updates about your account via email",
  },
  {
    id: "marketing",
    title: "Marketing Communications",
    description: "Receive marketing communications and promotions",
  },
  {
    id: "security",
    title: "Security Alerts",
    description: "Get notified about security updates and unusual activity",
  },
  {
    id: "newsletter",
    title: "Newsletter",
    description: "Subscribe to our weekly newsletter",
  },
];

const topics = [
  "Technology",
  "Politics",
  "Sports",
  "Entertainment",
  "Science",
  "Business",
  "Health",
  "Music",
  "Art",
  "Food",
  "Travel",
  "Fashion",
];

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notification Preferences</h1>
        <p className="text-muted-foreground">
          Choose how you&apos;d like to be notified about updates.
        </p>
      </div>

      <div className="space-y-4">
        {notificationPreferences.map((pref) => (
          <div
            key={pref.id}
            className="flex items-center justify-between space-x-2"
          >
            <Label htmlFor={pref.id} className="flex flex-col space-y-1">
              <span>{pref.title}</span>
              <span className="text-sm text-muted-foreground">
                {pref.description}
              </span>
            </Label>
            <Switch id={pref.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
