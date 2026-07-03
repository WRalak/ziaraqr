"use client";

import Button from "./Button";
import { useToast } from "./ToastProvider";

export default function ShareWithFriendButton({
  label = "Share w/ Friend",
}: {
  label?: string;
}) {
  const toast = useToast();

  async function share() {
    const url = `${window.location.origin}/download`;
    const shareData = {
      title: "Download the Ziarra app",
      text: "Join me on Ziarra to discover trips and travel experiences.",
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if ((error as DOMException).name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(
        `${shareData.text} ${shareData.url}`
      );
      toast("Share link copied!");
    } catch {
      toast(`Share this link: ${url}`);
    }
  }

  return (
    <Button type="button" variant="outline" onClick={share}>
      {label}
    </Button>
  );
}
