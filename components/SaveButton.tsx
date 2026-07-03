"use client";

import { useState } from "react";
import { useToast } from "./ToastProvider";
import { IconBtn } from "./Topbar";

export default function SaveButton() {
  const toast = useToast();
  const [saved, setSaved] = useState(false);
  return (
    <IconBtn
      label="Save to wishlist"
      onClick={() => {
        setSaved((s) => !s);
        toast(saved ? "Removed from wishlist" : "Saved to wishlist ✦");
      }}
    >
      {saved ? "♥" : "♡"}
    </IconBtn>
  );
}
