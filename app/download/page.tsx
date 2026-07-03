import Logo from "@/components/Logo";
import Screen from "@/components/Screen";
import ShareWithFriendButton from "@/components/ShareWithFriendButton";
import Topbar from "@/components/Topbar";

const stores = [
  {
    name: "Google Play",
    eyebrow: "Get it on",
    icon: "▶",
    href: "https://play.google.com/store/apps/details?id=com.app.ziara&pcampaignid=web_share",
  },
  {
    name: "App Store",
    eyebrow: "Download on the",
    icon: "●",
    href: "https://apps.apple.com/ke/app/ziarra/id6748342447",
  },
];

export default function DownloadPage() {
  return (
    <>
      <Topbar backHref="/" title="Get the app" />
      <Screen>
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <Logo size={72} showWordmark={false} />
          </div>
          <p className="mb-2 font-cond text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Ziarra mobile
          </p>
          <h1 className="m-0 font-display text-4xl font-medium leading-tight">
            Your next adventure,
            <br />
            right in your pocket.
          </h1>
          <p className="mx-auto mb-8 mt-4 max-w-[34ch] leading-relaxed text-text-dim">
            Discover trips, manage reservations, and stay connected with your travel community.
          </p>

          <div className="flex flex-col gap-3">
            {stores.map((store) => (
              <a
                key={store.name}
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg2 border border-line bg-card px-5 py-4 text-left transition-colors hover:border-gold-line"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-wash text-xl text-gold">
                  {store.icon}
                </span>
                <span>
                  <small className="block font-cond text-[11px] uppercase tracking-[0.08em] text-text-faint">
                    {store.eyebrow}
                  </small>
                  <strong className="font-display text-xl font-medium">{store.name}</strong>
                </span>
                <span className="ml-auto text-gold">↗</span>
              </a>
            ))}
          </div>

          <div className="mt-6">
            <ShareWithFriendButton label="Share the App" />
          </div>
        </div>
      </Screen>
    </>
  );
}
