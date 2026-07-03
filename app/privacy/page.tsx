import Topbar from "@/components/Topbar";
import Screen from "@/components/Screen";

export default function PrivacyPage() {
  return (
    <>
      <Topbar backHref="/" title="Privacy" />
      <Screen>
        <h1 className="mb-4 mt-0 font-display text-4xl font-medium">Your information</h1>
        <div className="space-y-4 leading-relaxed text-text-dim">
          <p>
            Ziarra collects the details you submit to respond to trip reservations and host
            applications.
          </p>
          <p>
            We use your name, contact details, school information, travel interests, and
            application answers only to coordinate Ziarra travel opportunities and follow up
            with you.
          </p>
          <p>
            Your information is restricted to authorized Ziarra team members and is not sold.
            Contact Ziarra if you want your submission corrected or deleted.
          </p>
        </div>
      </Screen>
    </>
  );
}
