# Ziarra — Onboarding & Trips (Next.js + Tailwind)

A full rebuild of the Ziarra onboarding prototype as a real, responsive Next.js
14 (App Router) + Tailwind CSS web app — no phone/device frame, just a normal
responsive site that works on mobile, tablet, and desktop.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # run the production build
```

> Fonts (Cormorant Garamond, Barlow Condensed, Barlow) load from Google Fonts
> via `next/font/google` at build time, so an internet connection is required
> for `npm run build` / `npm run dev` the first time.

## Routes

| Route                     | Screen                              |
| ------------------------- | ------------------------------------ |
| `/`                       | Landing / hero                       |
| `/choose`                 | Join a trip vs. host a trip          |
| `/discover`               | Trip grid with vibe filters          |
| `/trip/[id]`               | Trip detail                          |
| `/trip/[id]/reserve`       | Reservation form                     |
| `/join/success`            | Join confirmation                    |
| `/host`                    | Host intro / benefits                |
| `/host/apply`               | Host application form                |
| `/host/success`            | Host confirmation                    |
| `/community`               | Final "welcome to the community"     |

## Structure

- `app/` — routes (App Router), one folder per screen
- `components/` — shared UI: `Button`, `Topbar`, `StampTrack`, `TripCard`,
  `DiscoverGrid`, `ReserveForm`, `HostForm`, `SuccessScreen`, `Confetti`,
  `ToastProvider`, etc.
- `lib/data.ts` — trip data, vibe filters, host destination chips. **This is
  the file to swap out for a real API/CMS/database call** — every page
  already reads trips through `getTrip()` / the `TRIPS` array, so pointing
  those at a real data source (e.g. a `fetch` to your backend, or a database
  query in a Server Component) is a drop-in change.
- `lib/types.ts` — the `Trip` type.

## Notable behavior carried over from the prototype

- Passport-style step "stamps" track progress through the join/host flows.
- A live countdown appears on trips with a booking deadline.
- Confetti bursts on the join/host success screens.
- Non-functional links (app download, Instagram/TikTok, share sheet) show a
  toast instead of navigating, matching the original prototype's placeholders.
- The WhatsApp community links are real (`wa.me`) and open in a new tab.

## Connecting real trip data

Replace the contents of `lib/data.ts` with a fetch from your API/CMS, e.g.:

```ts
// lib/data.ts
export async function getTrips() {
  const res = await fetch("https://api.yourbackend.com/trips", { next: { revalidate: 60 } });
  return res.json();
}
```

Then update `app/discover/page.tsx` and `app/trip/[id]/page.tsx` to `await`
that call instead of importing the static `TRIPS` array (they're already
Server Components, so this requires no other changes).
