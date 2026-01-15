import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/data/blog';
import BlogDetailClient from '@/components/blog/BlogDetailClient';
import { locales } from '@/i18n/routing';
import { getNavItems } from '@/config/navigation';

// 生成静态参数 - 为每个语言和每篇文章生成
export function generateStaticParams() {
  const posts = getAllPosts();
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    for (const post of posts) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }
  
  return params;
}

interface BlogDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const t = await getTranslations('blog');
  const headerT = await getTranslations('header');
  
  const navItems = getNavItems(headerT);

  return (
    <BlogDetailClient 
      post={post}
      readTimeText={t('readTime')}
      backText={t('backToList')}
      navItems={navItems}
    />
  );
}
