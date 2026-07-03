"use client";

import Button from "@/components/Button";
import ShareWithFriendButton from "@/components/ShareWithFriendButton";
import { useToast } from "@/components/ToastProvider";

export default function CommunityPage() {
  const toast = useToast();

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 pb-16 pt-14 text-center sm:pt-20">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-[1.5px] border-dashed border-gold bg-gold-wash text-[34px]">
        🎉
      </div>
      <h1 className="m-0 mb-2.5 font-display text-[32px] font-medium leading-tight">
        Welcome to the
        <br />
        Ziarra Community!
      </h1>
      <p className="m-0 mb-8 text-[15.5px] leading-relaxed text-text-dim">
        Your next adventure is closer than you think.
      </p>

      <div className="flex w-full flex-col gap-2.5">
        <Button href="/download">Download App</Button>
        <Button href="/discover" variant="ghost">
          Browse More Trips
        </Button>
        <Button href="/host" variant="ghost">
          Become a Host
        </Button>
        <div className="flex gap-2.5">
          <Button variant="outline" onClick={() => toast("Opening Instagram / TikTok…")}>
            Follow Ziarra
          </Button>
          <ShareWithFriendButton />
        </div>
      </div>
    </div>
  );
}
