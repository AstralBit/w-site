"use client";

import styled, { keyframes } from "styled-components";
import { Link } from "../i18n/routing";
import Header from "./Header";
import Antigravity from "./Antigravity";

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

// 动画
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

// 样式组件
const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--background);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.03) 50%);
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 10;
  }
`;

const Scanline = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  animation: ${scanline} 8s linear infinite;
  pointer-events: none;
  z-index: 11;
`;

const PixelGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(var(--card-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--card-border) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  pointer-events: none;
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
  color: var(--foreground);
  text-align: center;
  margin-bottom: 40px;

  &::before,
  &::after {
    content: "◆";
    margin: 0 16px;
    color: #ff2d7b;
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
  background: var(--card-bg);
  border: 4px solid var(--foreground);
  padding: 32px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: 100%;
    height: 100%;
    background: var(--foreground);
    z-index: -1;
    transform: translate(8px, 8px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 16px;
`;

const FeatureTitle = styled.h3`
  font-family: ${pixelFont};
  font-size: 0.875rem;
  color: var(--foreground);
  margin-bottom: 12px;
`;

const FeatureDesc = styled.p`
  font-family: ${pixelFont};
  font-size: 0.625rem;
  color: var(--text-secondary);
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
  color: var(--text-muted);

  span {
    color: #ff2d7b;
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
    background: var(--text-muted);
  }
`;

// 像素艺术装饰
const PixelDecoration = styled.div`
  position: absolute;
  font-size: 24px;
  opacity: 0.3;
  animation: ${float} 4s ease-in-out infinite;

  &:nth-child(1) {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }
  &:nth-child(2) {
    top: 40%;
    right: 15%;
    animation-delay: 1s;
  }
  &:nth-child(3) {
    bottom: 30%;
    left: 5%;
    animation-delay: 2s;
  }
  &:nth-child(4) {
    bottom: 20%;
    right: 10%;
    animation-delay: 1.5s;
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
      <Scanline />
      <PixelGrid />
      <PixelDecoration>⭐</PixelDecoration>
      <PixelDecoration>🎮</PixelDecoration>
      <PixelDecoration>💎</PixelDecoration>
      <PixelDecoration>🚀</PixelDecoration>

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
              color={"#FF9FFC"}
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
    </PageWrapper>
  );
}
