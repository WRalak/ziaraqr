import Topbar from "@/components/Topbar";
import Screen from "@/components/Screen";
import StampTrack, { JOIN_STEPS } from "@/components/StampTrack";
import DiscoverGrid from "@/components/DiscoverGrid";
import { TRIPS } from "@/lib/data";

export default function DiscoverPage() {
  return (
    <>
      <Topbar backHref="/choose" title="Discover" wide />
      <Screen wide>
        <StampTrack steps={JOIN_STEPS} currentIndex={0} />
        <h2 className="m-0 mb-1.5 font-display text-[30px] font-medium leading-tight sm:text-4xl">
          Find your next trip.
        </h2>
        <p className="m-0 mb-5 text-base leading-relaxed text-text-dim">
          9 trips leaving soon. New ones added weekly.
        </p>
        <DiscoverGrid trips={TRIPS} />
      </Screen>
    </>
  );
}
