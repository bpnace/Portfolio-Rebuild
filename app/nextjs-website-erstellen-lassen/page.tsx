import { LandingPage } from "@/components/landing-pages/LandingPage";
import {
  getLandingPage,
  getLandingPageMetadata,
} from "@/lib/landing-pages";

const page = getLandingPage("nextjs-website-erstellen-lassen");

export const metadata = getLandingPageMetadata(page);

export default function NextjsWebsiteErstellenLassenPage() {
  return <LandingPage page={page} />;
}
