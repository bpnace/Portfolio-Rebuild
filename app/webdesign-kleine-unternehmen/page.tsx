import { LandingPage } from "@/components/landing-pages/LandingPage";
import {
  getLandingPage,
  getLandingPageMetadata,
} from "@/lib/landing-pages";

const page = getLandingPage("webdesign-kleine-unternehmen");

export const metadata = getLandingPageMetadata(page);

export default function WebdesignKleineUnternehmenPage() {
  return <LandingPage page={page} />;
}
