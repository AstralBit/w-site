import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/data/blog';
import BlogDetailClient from '@/components/blog/BlogDetailClient';

// 生成静态参数
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
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
  
  const navItems = [
    { label: headerT('home'), href: '/' },
    { label: headerT('blog'), href: '/blog' },
    { label: headerT('about'), href: '/about' },
    { label: headerT('contact'), href: '/contact' },
  ];

  return (
    <BlogDetailClient 
      post={post}
      readTimeText={t('readTime')}
      backText={t('backToList')}
      navItems={navItems}
    />
  );
}

