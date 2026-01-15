import { getTranslations } from "next-intl/server";
import PixelHome from "@/components/PixelHome";
import { getNavItems } from "@/config/navigation";

export default async function Home() {
  const headerT = await getTranslations("header");
  const homeT = await getTranslations("home");
  
  const navItems = getNavItems(headerT);

  // 构建翻译对象传递给客户端组件
  const translations = {
    title: homeT("title"),
    subtitle: homeT("subtitle"),
    stats: {
      projects: homeT("stats.projects"),
      coffee: homeT("stats.coffee"),
      commits: homeT("stats.commits"),
    },
    features: {
      title: homeT("features.title"),
      items: [
        {
          icon: homeT("features.items.0.icon"),
          title: homeT("features.items.0.title"),
          desc: homeT("features.items.0.desc"),
        },
        {
          icon: homeT("features.items.1.icon"),
          title: homeT("features.items.1.title"),
          desc: homeT("features.items.1.desc"),
        }
      ],
    },
    cta: {
      title: homeT("cta.title"),
      blog: homeT("cta.blog"),
      contact: homeT("cta.contact"),
    },
    footer: homeT("footer"),
  };

  return <PixelHome navItems={navItems} translations={translations} />;
}
