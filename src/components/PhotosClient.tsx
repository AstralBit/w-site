'use client';

import dynamic from "next/dynamic";
import { PageWrapper, PixelDecoration } from "./commonStyled";
import Header from "./Header";

const StarWarsBackground = dynamic(() => import("./StarWarsBackground"), {
  ssr: false,
});

const DomeGallery = dynamic(() => import("./DomeGallery"), {
  ssr: false,
});
  
interface PhotosClientProps {
  navItems: { label: string; href: string }[];
}

// 样式组件

export default function PhotosClient({ navItems }: PhotosClientProps) {
  return (
    <PageWrapper>
      {/* 星际大战背景 */}
      <StarWarsBackground />

      {/* 浮动装饰 */}
      <PixelDecoration $top="15%" $left="5%" $delay={0}>
        🛸
      </PixelDecoration>
      <PixelDecoration $top="25%" $right="8%" $delay={1}>
        🌟
      </PixelDecoration>

      <Header navItems={navItems} />
      <div style={{ width: "100vw", height: "100vh" }}>
        <DomeGallery />
      </div>
    </PageWrapper>
  );
}
