import { LandingPage } from "@/components/landing-pages/LandingPage";
import {
  getLandingPage,
  getLandingPageMetadata,
} from "@/lib/landing-pages";

const page = getLandingPage("website-erstellen-lassen-deutschland");

export const metadata = getLandingPageMetadata(page);

export default function WebsiteErstellenLassenDeutschlandPage() {
  return <LandingPage page={page} />;
}
