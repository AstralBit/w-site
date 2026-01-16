import PhotosClient from "@/components/PhotosClient";
import { getTranslations } from "next-intl/server";
import { getNavItems } from "@/config/navigation";

export default async function PhotosPage() {
  const headerT = await getTranslations("header");
  const navItems = getNavItems(headerT);

  return <PhotosClient navItems={navItems} />;
}
