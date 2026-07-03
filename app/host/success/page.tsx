import SuccessScreen from "@/components/SuccessScreen";

export default function HostSuccessPage() {
  return (
    <SuccessScreen
      heading="Amazing!"
      copy="Our partnerships team will reach out within 48 hours to help you launch your first trip."
      continueHref="/community"
      items={[
        {
          glyph: "📱",
          title: "Download the Ziarra app",
          subtitle: "Set up your host profile",
          href: "#",
          fakeLabel: "App download link",
        },
        {
          glyph: "💬",
          title: "Join the Hosts WhatsApp",
          subtitle: "Meet other student hosts",
          href: "https://wa.me/254700000000",
          external: true,
        },
      ]}
    />
  );
}
