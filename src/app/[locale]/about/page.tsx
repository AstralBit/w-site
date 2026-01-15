import { getTranslations, getLocale } from "next-intl/server";
import PixelAbout from "@/components/PixelAbout";
import { getNavItems } from "@/config/navigation";

export default async function AboutPage() {
  const locale = await getLocale();
  const headerT = await getTranslations("header");
  const aboutT = await getTranslations("about");

  const navItems = getNavItems(headerT);

  // 构建翻译对象传递给客户端组件
  const translations = {
    title: aboutT("title"),
    subtitle: aboutT("subtitle"),
    bio: {
      title: aboutT("bio.title"),
      content: aboutT("bio.content"),
    },
    journey: {
      title: aboutT("journey.title"),
      items: [
        {
          year: aboutT("journey.items.0.year"),
          event: aboutT("journey.items.0.event"),
          icon: aboutT("journey.items.0.icon"),
        },
        {
          year: aboutT("journey.items.1.year"),
          event: aboutT("journey.items.1.event"),
          icon: aboutT("journey.items.1.icon"),
        },
      ],
    },
    skills: {
      title: aboutT("skills.title"),
      items: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "UI/UX Design", level: 75 },
      ],
    },
    interests: {
      title: aboutT("interests.title"),
      items: [
        { icon: aboutT("interests.items.0.icon"), name: aboutT("interests.items.0.name") },
        { icon: aboutT("interests.items.1.icon"), name: aboutT("interests.items.1.name") },
        { icon: aboutT("interests.items.2.icon"), name: aboutT("interests.items.2.name") },
        { icon: aboutT("interests.items.3.icon"), name: aboutT("interests.items.3.name") },
        { icon: aboutT("interests.items.4.icon"), name: aboutT("interests.items.4.name") },
        { icon: aboutT("interests.items.5.icon"), name: aboutT("interests.items.5.name") },
      ],
    },
    contact: {
      title: aboutT("contact.title"),
      email: aboutT("contact.email"),
      github: aboutT("contact.github"),
    },
    cta: {
      title: aboutT("cta.title"),
      button: aboutT("cta.button"),
    },
  };

  return <PixelAbout navItems={navItems} locale={locale} translations={translations} />;
}

