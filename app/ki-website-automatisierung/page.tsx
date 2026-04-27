import { LandingPage } from "@/components/landing-pages/LandingPage";
import {
  getLandingPage,
  getLandingPageMetadata,
} from "@/lib/landing-pages";

const page = getLandingPage("ki-website-automatisierung");

export const metadata = getLandingPageMetadata(page);

export default function KiWebsiteAutomatisierungPage() {
  return <LandingPage page={page} />;
}
