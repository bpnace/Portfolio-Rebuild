import { LandingPage } from "@/components/landing-pages/LandingPage";
import {
  getLandingPage,
  getLandingPageMetadata,
} from "@/lib/landing-pages";

const page = getLandingPage("landingpage-erstellen-lassen");

export const metadata = getLandingPageMetadata(page);

export default function LandingpageErstellenLassenPage() {
  return <LandingPage page={page} />;
}
