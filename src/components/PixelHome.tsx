"use client";

import styled, { keyframes } from "styled-components";
import dynamic from "next/dynamic";
import Header from "./Header";

const StarWarsBackground = dynamic(() => import("./StarWarsBackground"), {
  ssr: false,
});

const Antigravity = dynamic(() => import("./Antigravity"), {
  ssr: false,
});

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

// 动画
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const glitch = keyframes`
  0%, 100% { 
    text-shadow: 2px 0 #ff2d7b, -2px 0 #00d4ff;
    transform: translate(0);
  }
  20% { 
    text-shadow: -2px 0 #ff2d7b, 2px 0 #00d4ff;
    transform: translate(-2px, 2px);
  }
  40% { 
    text-shadow: 2px 0 #ff2d7b, -2px 0 #00d4ff;
    transform: translate(2px, -2px);
  }
  60% { 
    text-shadow: -2px 0 #ff2d7b, 2px 0 #00d4ff;
    transform: translate(-2px, -2px);
  }
  80% { 
    text-shadow: 2px 0 #ff2d7b, -2px 0 #00d4ff;
    transform: translate(2px, 2px);
  }
`;

const neonPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor;
    opacity: 1;
  }
  50% { 
    box-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor;
    opacity: 0.8;
  }
`;

// 样式组件
const PageWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  /* 添加初始背景色，避免异步加载时的白屏闪烁 */
  background: radial-gradient(ellipse at center, #0a0a1a 0%, #000005 100%);
`;

const Container = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 120px 24px 64px;
  position: relative;
  z-index: 1;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 80px;
`;

const FeaturesSection = styled.section`
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-family: ${pixelFont};
  font-size: 1.25rem;
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41;

  &::before,
  &::after {
    content: "◆";
    margin: 0 16px;
    color: #ff2d7b;
    text-shadow: 0 0 10px #ff2d7b;
  }

  &:hover {
    animation: ${glitch} 0.5s ease-in-out;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: rgba(10, 10, 30, 0.8);
  border: 3px solid #00ff41;
  padding: 32px;
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  /* 像素角 */
  clip-path: polygon(
    0 12px,
    12px 12px,
    12px 0,
    calc(100% - 12px) 0,
    calc(100% - 12px) 12px,
    100% 12px,
    100% calc(100% - 12px),
    calc(100% - 12px) calc(100% - 12px),
    calc(100% - 12px) 100%,
    12px 100%,
    12px calc(100% - 12px),
    0 calc(100% - 12px)
  );

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 12px;
    right: 12px;
    height: 3px;
    background: linear-gradient(90deg, #ff2d7b, #00d4ff, #ffff00, #00ff41);
  }

  &:hover {
    border-color: #00d4ff;
    transform: translateY(-5px);
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 16px;
  filter: drop-shadow(0 0 10px currentColor);
`;

const FeatureTitle = styled.h3`
  font-family: ${pixelFont};
  font-size: 0.875rem;
  color: #00ff41;
  margin-bottom: 12px;
  text-shadow: 0 0 10px #00ff41;
`;

const FeatureDesc = styled.p`
  font-family: ${pixelFont};
  font-size: 0.625rem;
  color: #aaa;
  line-height: 2;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 40px 0;
  margin-top: 40px;
`;

const FooterText = styled.p`
  font-family: ${pixelFont};
  font-size: 0.5rem;
  color: #666;

  span {
    color: #ff2d7b;
    text-shadow: 0 0 10px #ff2d7b;
  }
`;

const PixelDivider = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 24px 0;

  span {
    width: 8px;
    height: 8px;
    background: #333;

    &:nth-child(1) {
      background: #ff2d7b;
    }
    &:nth-child(2) {
      background: #ffff00;
    }
    &:nth-child(3) {
      background: #00ff41;
    }
    &:nth-child(4) {
      background: #00d4ff;
    }
    &:nth-child(5) {
      background: #a78bfa;
    }
  }
`;

// 像素艺术装饰
const PixelDecoration = styled.div<{
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $delay: number;
}>`
  position: fixed;
  top: ${(props) => props.$top || "auto"};
  left: ${(props) => props.$left || "auto"};
  right: ${(props) => props.$right || "auto"};
  bottom: ${(props) => props.$bottom || "auto"};
  font-size: 2rem;
  opacity: 0.4;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay}s;
  filter: drop-shadow(0 0 10px currentColor);
  pointer-events: none;
  z-index: 2;

  @media (max-width: 768px) {
    display: none;
  }
`;

// 霓虹标语
const NeonBanner = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${pixelFont};
  font-size: 0.5rem;
  color: #00ff41;
  padding: 10px 20px;
  border: 2px solid #00ff41;
  background: rgba(0, 0, 0, 0.8);
  animation: ${neonPulse} 2s ease-in-out infinite;
  z-index: 10;

  /* 像素角 */
  clip-path: polygon(
    0 4px,
    4px 4px,
    4px 0,
    calc(100% - 4px) 0,
    calc(100% - 4px) 4px,
    100% 4px,
    100% calc(100% - 4px),
    calc(100% - 4px) calc(100% - 4px),
    calc(100% - 4px) 100%,
    4px 100%,
    4px calc(100% - 4px),
    0 calc(100% - 4px)
  );

  @media (max-width: 768px) {
    font-size: 0.4rem;
    padding: 8px 16px;
  }
`;

interface PixelHomeProps {
  navItems: { label: string; href: string }[];
  translations: {
    title: string;
    subtitle: string;
    stats: {
      projects: string;
      coffee: string;
      commits: string;
    };
    features: {
      title: string;
      items: {
        icon: string;
        title: string;
        desc: string;
      }[];
    };
    cta: {
      title: string;
      blog: string;
      contact: string;
    };
    footer: string;
  };
}

export default function PixelHome({ navItems, translations }: PixelHomeProps) {
  const t = translations;

  return (
    <PageWrapper>
      {/* 星际大战背景 */}
      <StarWarsBackground />

      {/* 浮动装饰 */}
      <PixelDecoration $top="20%" $left="5%" $delay={0}>
        🚀
      </PixelDecoration>
      <PixelDecoration $top="40%" $right="8%" $delay={1}>
        🛸
      </PixelDecoration>
      <PixelDecoration $bottom="30%" $left="8%" $delay={2}>
        ⭐
      </PixelDecoration>
      <PixelDecoration $bottom="20%" $right="5%" $delay={1.5}>
        🌟
      </PixelDecoration>

      <Header navItems={navItems} />

      <Container>
        <HeroSection>
          <div style={{ width: "100%", height: "400px", position: "relative" }}>
            <Antigravity
              count={300}
              magnetRadius={6}
              ringRadius={7}
              waveSpeed={0.4}
              waveAmplitude={1}
              particleSize={1.5}
              lerpSpeed={0.05}
              color={"#00ff41"}
              autoAnimate={true}
              particleVariance={1}
            />
          </div>
        </HeroSection>

        <FeaturesSection>
          <SectionTitle>{t.features.title}</SectionTitle>
          <FeatureGrid>
            {t.features.items.map((item, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{item.icon}</FeatureIcon>
                <FeatureTitle>{item.title}</FeatureTitle>
                <FeatureDesc>{item.desc}</FeatureDesc>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </FeaturesSection>

        <Footer>
          <PixelDivider>
            <span />
            <span />
            <span />
            <span />
            <span />
          </PixelDivider>
          <FooterText>
            {t.footer} <span>♥</span>
          </FooterText>
        </Footer>
      </Container>

      {/* 霓虹标语 */}
      <NeonBanner>MAY THE CODE BE WITH YOU</NeonBanner>
    </PageWrapper>
  );
}
