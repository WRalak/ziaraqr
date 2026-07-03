import SuccessScreen from "@/components/SuccessScreen";
import { getTrip } from "@/lib/data";

export default function JoinSuccessPage({
  searchParams,
}: {
  searchParams: { trip?: string };
}) {
  const trip = searchParams.trip ? getTrip(Number(searchParams.trip)) : undefined;

  return (
    <SuccessScreen
      heading="You're in!"
      copy={
        trip
          ? `We'll contact you shortly with everything you need for ${trip.name}.`
          : "We'll contact you shortly with everything you need for the trip."
      }
      continueHref="/community"
      items={[
        {
          glyph: "📱",
          title: "Download the Ziarra app",
          subtitle: "Track your trip & chat with the group",
          href: "#",
          fakeLabel: "App download link",
        },
        {
          glyph: "💬",
          title: "Join our WhatsApp community",
          subtitle: "Trip updates, group chats, new drops",
          href: "https://wa.me/254700000000",
          external: true,
        },
        {
          glyph: "📸",
          title: "Follow @ziarra.travel",
          subtitle: "Instagram & TikTok — see trips in real time",
          href: "#",
          fakeLabel: "Instagram / TikTok",
        },
      ]}
    />
  );
}
