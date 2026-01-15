"use client";

import styled, { keyframes } from "styled-components";
import Header from "./Header";

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

// 动画
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const fillBar = keyframes`
  from { width: 0; }
  to { width: var(--skill-level); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
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
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 24px 64px;
  position: relative;
  z-index: 1;
`;

// 像素装饰
const PixelDecoration = styled.div`
  position: absolute;
  font-size: 24px;
  opacity: 0.3;
  animation: ${float} 4s ease-in-out infinite;

  &:nth-child(1) { top: 15%; left: 5%; animation-delay: 0s; }
  &:nth-child(2) { top: 25%; right: 8%; animation-delay: 1s; }
  &:nth-child(3) { bottom: 20%; left: 8%; animation-delay: 2s; }
  &:nth-child(4) { bottom: 30%; right: 5%; animation-delay: 1.5s; }
`;

// Hero 区域
const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 64px;
`;

const Title = styled.h1`
  font-family: ${pixelFont};
  font-size: 2rem;
  color: var(--foreground);
  margin-bottom: 16px;
  text-shadow: 4px 4px 0 #ff2d7b, -2px -2px 0 #00d4ff;
  animation: ${glitch} 5s ease-in-out infinite;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.p`
  font-family: ${pixelFont};
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 2;

  &::after {
    content: "_";
    animation: ${blink} 1s step-end infinite;
  }
`;

// 卡片通用样式
const Card = styled.div`
  background: var(--card-bg);
  border: 4px solid var(--foreground);
  padding: 24px;
  margin-bottom: 32px;
  position: relative;
  box-shadow: 8px 8px 0 var(--foreground);

  &::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    border: 2px dashed var(--card-border);
    pointer-events: none;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${pixelFont};
  font-size: 1rem;
  color: var(--foreground);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: "◆";
    color: #00d4ff;
  }

  &::after {
    content: "◆";
    color: #ff2d7b;
  }
`;

// Bio 区域
const BioContent = styled.p<{ $locale: string }>`
  font-family: ${pixelFont};
  font-size: ${props => props.$locale === 'en' ? '0.625rem' : '1rem'};
  color: var(--text-secondary);
  line-height: 2.5;
`;

// 时间线
const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border: 2px solid var(--card-border);
  transition: all 0.2s ease;

  &:hover {
    border-color: #00d4ff;
    transform: translateX(8px);
    box-shadow: 4px 4px 0 #00d4ff;
  }
`;

const TimelineYear = styled.span`
  font-family: ${pixelFont};
  font-size: 0.75rem;
  color: #00d4ff;
  min-width: 60px;
`;

const TimelineIcon = styled.span`
  font-size: 1.5rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const TimelineEvent = styled.span`
  font-family: ${pixelFont};
  font-size: 0.625rem;
  color: var(--text-secondary);
`;

// 技能条
const SkillsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkillName = styled.span`
  font-family: ${pixelFont};
  font-size: 0.625rem;
  color: var(--foreground);
`;

const SkillLevel = styled.span`
  font-family: ${pixelFont};
  font-size: 0.5rem;
  color: #00d4ff;
`;

const SkillBarBg = styled.div`
  height: 16px;
  background: var(--card-border);
  border: 2px solid var(--foreground);
  position: relative;
  overflow: hidden;
`;

const SkillBarFill = styled.div<{ $level: number }>`
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #7b2dff);
  --skill-level: ${props => props.$level}%;
  animation: ${fillBar} 1.5s ease-out forwards;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.1) 50%);
    background-size: 100% 4px;
  }
`;

// 兴趣爱好
const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InterestItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 2px solid var(--card-border);
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff2d7b;
    transform: translateY(-4px);
    box-shadow: 4px 4px 0 #ff2d7b;
  }
`;

const InterestIcon = styled.span`
  font-size: 2rem;
`;

const InterestName = styled.span`
  font-family: ${pixelFont};
  font-size: 0.5rem;
  color: var(--text-secondary);
`;

// 联系方式
const ContactGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid var(--card-border);
  font-family: ${pixelFont};
  font-size: 0.625rem;
  color: var(--text-secondary);

  &::before {
    content: "▶";
    color: #00d4ff;
    font-size: 0.5rem;
  }
`;

// Footer
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

// 两列布局
const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface NavItem {
  label: string;
  href: string;
}

interface JourneyItem {
  year: string;
  event: string;
  icon: string;
}

interface SkillItemType {
  name: string;
  level: number;
}

interface InterestItemType {
  icon: string;
  name: string;
}

interface PixelAboutProps {
  navItems: NavItem[];
  locale: string;
  translations: {
    title: string;
    subtitle: string;
    bio: {
      title: string;
      content: string;
    };
    journey: {
      title: string;
      items: JourneyItem[];
    };
    skills: {
      title: string;
      items: SkillItemType[];
    };
    interests: {
      title: string;
      items: InterestItemType[];
    };
    contact: {
      title: string;
      email: string;
      github: string;
      twitter: string;
    };
    cta: {
      title: string;
      button: string;
    };
  };
}

export default function PixelAbout({ navItems, locale, translations }: PixelAboutProps) {
  const t = translations;

  return (
    <PageWrapper>
      <Scanline />
      <PixelGrid />
      <PixelDecoration>🎮</PixelDecoration>
      <PixelDecoration>💻</PixelDecoration>
      <PixelDecoration>⭐</PixelDecoration>
      <PixelDecoration>🚀</PixelDecoration>

      <Header navItems={navItems} />

      <Container>
        <HeroSection>
          <Title>{t.title}</Title>
          <Subtitle>{t.subtitle}</Subtitle>
        </HeroSection>

        {/* Bio */}
        <Card>
          <SectionTitle>{t.bio.title}</SectionTitle>
          <BioContent $locale={locale}>{t.bio.content}</BioContent>
        </Card>

        <TwoColumnGrid>
          {/* Journey */}
          <Card>
            <SectionTitle>{t.journey.title}</SectionTitle>
            <Timeline>
              {t.journey.items.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineYear>{item.year}</TimelineYear>
                  <TimelineIcon>{item.icon}</TimelineIcon>
                  <TimelineEvent>{item.event}</TimelineEvent>
                </TimelineItem>
              ))}
            </Timeline>
          </Card>

          {/* Skills */}
          <Card>
            <SectionTitle>{t.skills.title}</SectionTitle>
            <SkillsGrid>
              {t.skills.items.map((skill, index) => (
                <SkillItem key={index}>
                  <SkillHeader>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel>{skill.level}%</SkillLevel>
                  </SkillHeader>
                  <SkillBarBg>
                    <SkillBarFill $level={skill.level} />
                  </SkillBarBg>
                </SkillItem>
              ))}
            </SkillsGrid>
          </Card>
        </TwoColumnGrid>

        {/* Interests */}
        <Card>
          <SectionTitle>{t.interests.title}</SectionTitle>
          <InterestsGrid>
            {t.interests.items.map((interest, index) => (
              <InterestItem key={index}>
                <InterestIcon>{interest.icon}</InterestIcon>
                <InterestName>{interest.name}</InterestName>
              </InterestItem>
            ))}
          </InterestsGrid>
        </Card>

        {/* Contact */}
        <Card>
          <SectionTitle>{t.contact.title}</SectionTitle>
          <ContactGrid>
            <ContactItem>📧 {t.contact.email}</ContactItem>
            <ContactItem>🐙 {t.contact.github}</ContactItem>
          </ContactGrid>
        </Card>

        <Footer>
          <PixelDivider>
            <span />
            <span />
            <span />
            <span />
            <span />
          </PixelDivider>
          <FooterText>
            GAME OVER? <span>♥</span> INSERT COIN TO CONTINUE
          </FooterText>
        </Footer>
      </Container>
    </PageWrapper>
  );
}

