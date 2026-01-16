import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogCategory } from '@/types/blog';

// 博客文章目录
const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export const blogCategories: BlogCategory[] = [
  { id: '1', name: '技术', slug: 'tech' },
  { id: '2', name: '设计', slug: 'design' },
  { id: '3', name: '产品', slug: 'product' },
];

// 计算阅读时间（假设每分钟阅读 200 个中文字符或 250 个英文单词）
function calculateReadingTime(content: string): number {
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = content.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).filter(Boolean).length;
  const totalMinutes = chineseChars / 200 + englishWords / 250;
  return Math.max(1, Math.ceil(totalMinutes));
}

// 获取单个 md 文件的内容
function getPostFromFile(filePath: string): BlogPost | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    const slug = path.basename(filePath, '.md');
    
    return {
      id: slug,
      slug,
      title: data.title || '无标题',
      excerpt: data.excerpt || '',
      content: content.trim(),
      coverImage: data.coverImage || '/images/blog/default.jpg',
      author: {
        name: data.author?.name || '匿名',
        avatar: data.author?.avatar || '/images/avatars/default.jpg',
      },
      category: data.category || 'tech',
      tags: data.tags || [],
      publishedAt: data.publishedAt 
        ? new Date(data.publishedAt).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// 获取所有博客文章
export function getAllPosts(): BlogPost[] {
  // 确保目录存在
  if (!fs.existsSync(BLOG_DIR)) {
    console.warn(`Blog directory not found: ${BLOG_DIR}`);
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const mdFiles = files.filter(file => file.endsWith('.md'));
  
  const posts = mdFiles
    .map(file => getPostFromFile(path.join(BLOG_DIR, file)))
    .filter((post): post is BlogPost => post !== null);
  
  // 按发布日期降序排序
  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// 根据 slug 获取单篇文章
export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  
  return getPostFromFile(filePath) || undefined;
}

// 根据分类获取文章
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(post => post.category === category);
}

// 获取所有分类
export function getAllCategories(): BlogCategory[] {
  return blogCategories;
}

// 获取所有文章的 slugs（用于静态生成）
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
}
