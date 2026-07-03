import Topbar from "@/components/Topbar";
import Screen from "@/components/Screen";
import StampTrack, { HOST_STEPS } from "@/components/StampTrack";
import HostForm from "@/components/HostForm";

export default function HostApplyPage() {
  return (
    <>
      <Topbar backHref="/host" title="Host application" />
      <Screen>
        <StampTrack steps={HOST_STEPS} currentIndex={1} />
        <h2 className="m-0 mb-2.5 font-display text-[30px] font-medium leading-tight">
          Tell us about you.
        </h2>
        <p className="m-0 mb-6 text-base leading-relaxed text-text-dim">
          Our partnerships team reviews every application personally.
        </p>
        <HostForm />
      </Screen>
    </>
  );
}
