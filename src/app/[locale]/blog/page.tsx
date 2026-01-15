import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/data/blog';
import BlogPageClient from '@/components/blog/BlogPageClient';
import { getNavItems } from '@/config/navigation';
import { Locale } from '@/i18n/routing';

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations('blog');
  const headerT = await getTranslations('header');
  
  const posts = getAllPosts();
  const navItems = getNavItems(headerT);

  return (
    <BlogPageClient 
      title={t('title')}
      description={t('description')}
      posts={posts}
      readTimeText={t('readTime')}
      emptyText={t('empty')}
      navItems={navItems}
      locale={locale}
    />
  );
}
