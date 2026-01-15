import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/data/blog';
import BlogPageClient from '@/components/blog/BlogPageClient';

export default async function BlogPage() {
  const t = await getTranslations('blog');
  const headerT = await getTranslations('header');
  
  const posts = getAllPosts();
  
  const navItems = [
    { label: headerT('home'), href: '/' },
    { label: headerT('blog'), href: '/blog' },
    { label: headerT('about'), href: '/about' },
    { label: headerT('contact'), href: '/contact' },
  ];

  return (
    <BlogPageClient 
      title={t('title')}
      description={t('description')}
      posts={posts}
      readTimeText={t('readTime')}
      emptyText={t('empty')}
      navItems={navItems}
    />
  );
}
