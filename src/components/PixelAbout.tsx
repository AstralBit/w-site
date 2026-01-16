"use client";

import styled, { keyframes } from "styled-components";
import Header from "./Header";
import StarWarsBackground from "./StarWarsBackground";
import { PageWrapper, PixelDecoration } from "./commonStyled";

// 像素字体
const pixelFont = `'Press Start 2P', 'Courier New', monospace`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
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

const fillBar = keyframes`
  from { width: 0; }
  to { width: var(--skill-level); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const hologram = keyframes`
  0%, 100% { 
    opacity: 0.9;
    filter: hue-rotate(0deg);
  }
  50% { 
    opacity: 1;
    filter: hue-rotate(10deg);
  }
`;

const Container = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 24px 64px;
  position: relative;
  z-index: 1;
`;

// Hero 区域
const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 64px;
`;

const Title = styled.h1`
  font-family: ${pixelFont};
  font-size: 2rem;
  color: #fff;
  margin-bottom: 16px;
  text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41,
    4px 4px 0 #ff2d7b;
  animation: ${glitch} 5s ease-in-out infinite;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.p<{ $locale: string }>`
  font-family: ${pixelFont};
  font-size: ${(props) => (props.$locale === "en" ? "0.75rem" : "1rem")};
  color: #00d4ff;
  line-height: 2;
  text-shadow: 0 0 10px #00d4ff;

  &::after {
    content: "_";
    animation: ${blink} 1s step-end infinite;
    color: #00ff41;
  }
`;

// 卡片通用样式 - 全息风格
const Card = styled.div`
  background: rgba(10, 10, 30, 0.8);
  border: 3px solid #00ff41;
  padding: 24px;
  margin-bottom: 32px;
  position: relative;
  backdrop-filter: blur(10px);
  animation: ${hologram} 4s ease-in-out infinite;

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
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
  }
`;

const SectionTitle = styled.h2`
  font-family: ${pixelFont};
  font-size: 1rem;
  color: #00ff41;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 0 10px #00ff41;

  &::before {
    content: "◆";
    color: #00d4ff;
    text-shadow: 0 0 10px #00d4ff;
  }

  &::after {
    content: "◆";
    color: #ff2d7b;
    text-shadow: 0 0 10px #ff2d7b;
  }
`;

// Bio 区域
const BioContent = styled.p<{ $locale: string }>`
  font-family: ${pixelFont};
  font-size: ${(props) => (props.$locale === "en" ? "0.625rem" : "1rem")};
  color: #aaa;
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
  border: 2px solid rgba(0, 255, 65, 0.3);
  background: rgba(0, 255, 65, 0.05);
  transition: all 0.3s ease;

  /* 像素角 */
  clip-path: polygon(
    0 6px,
    6px 6px,
    6px 0,
    calc(100% - 6px) 0,
    calc(100% - 6px) 6px,
    100% 6px,
    100% calc(100% - 6px),
    calc(100% - 6px) calc(100% - 6px),
    calc(100% - 6px) 100%,
    6px 100%,
    6px calc(100% - 6px),
    0 calc(100% - 6px)
  );

  &:hover {
    border-color: #00d4ff;
    transform: translateX(8px);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }
`;

const TimelineYear = styled.span`
  font-family: ${pixelFont};
  font-size: 0.75rem;
  color: #00d4ff;
  min-width: 60px;
  text-shadow: 0 0 10px #00d4ff;
`;

const TimelineIcon = styled.span`
  font-size: 1.5rem;
  animation: ${pulse} 2s ease-in-out infinite;
  filter: drop-shadow(0 0 10px currentColor);
`;

const TimelineEvent = styled.span<{ $locale: string }>`
  font-family: ${pixelFont};
  font-size: ${(props) => (props.$locale === "en" ? "0.625rem" : "1rem")};
  color: #aaa;
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
  color: #fff;
`;

const SkillLevel = styled.span`
  font-family: ${pixelFont};
  font-size: 0.5rem;
  color: #00d4ff;
  text-shadow: 0 0 10px #00d4ff;
`;

const SkillBarBg = styled.div`
  height: 16px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #00ff41;
  position: relative;
  overflow: hidden;

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
`;

const SkillBarFill = styled.div<{ $level: number }>`
  height: 100%;
  background: linear-gradient(90deg, #00ff41, #00d4ff, #a78bfa);
  --skill-level: ${(props) => props.$level}%;
  animation: ${fillBar} 1.5s ease-out forwards;
  position: relative;
  box-shadow: 0 0 10px #00ff41;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.2) 50%);
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
  border: 2px solid rgba(255, 45, 123, 0.3);
  background: rgba(255, 45, 123, 0.05);
  transition: all 0.3s ease;

  /* 像素角 */
  clip-path: polygon(
    0 6px,
    6px 6px,
    6px 0,
    calc(100% - 6px) 0,
    calc(100% - 6px) 6px,
    100% 6px,
    100% calc(100% - 6px),
    calc(100% - 6px) calc(100% - 6px),
    calc(100% - 6px) 100%,
    6px 100%,
    6px calc(100% - 6px),
    0 calc(100% - 6px)
  );

  &:hover {
    border-color: #ff2d7b;
    transform: translateY(-4px);
    box-shadow: 0 0 20px rgba(255, 45, 123, 0.3);
  }
`;

const InterestIcon = styled.span`
  font-size: 2rem;
  filter: drop-shadow(0 0 10px currentColor);
`;

const InterestName = styled.span<{ $locale: string }>`
  font-family: ${pixelFont};
  font-size: ${(props) => (props.$locale === "en" ? "0.5rem" : "1rem")};
  color: #aaa;
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
  border: 2px solid rgba(0, 212, 255, 0.3);
  background: rgba(0, 212, 255, 0.05);
  font-family: ${pixelFont};
  font-size: 0.7rem;
  color: #aaa;
  transition: all 0.3s ease;

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

  &::before {
    content: "▶";
    color: #00d4ff;
    font-size: 0.5rem;
    text-shadow: 0 0 10px #00d4ff;
  }

  &:hover {
    border-color: #00d4ff;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
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

    &:nth-child(1) {
      background: #ff2d7b;
      box-shadow: 0 0 10px #ff2d7b;
    }
    &:nth-child(2) {
      background: #ffff00;
      box-shadow: 0 0 10px #ffff00;
    }
    &:nth-child(3) {
      background: #00ff41;
      box-shadow: 0 0 10px #00ff41;
    }
    &:nth-child(4) {
      background: #00d4ff;
      box-shadow: 0 0 10px #00d4ff;
    }
    &:nth-child(5) {
      background: #a78bfa;
      box-shadow: 0 0 10px #a78bfa;
    }
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

// 霓虹标语
const NeonBanner = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${pixelFont};
  font-size: 0.5rem;
  color: #ffff00;
  padding: 10px 20px;
  border: 2px solid #ffff00;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 10px #ffff00, 0 0 20px #ffff00;
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
    };
    cta: {
      title: string;
      button: string;
    };
  };
}

export default function PixelAbout({
  navItems,
  locale,
  translations,
}: PixelAboutProps) {
  const t = translations;

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
      <PixelDecoration $bottom="20%" $left="8%" $delay={2}>
        🚀
      </PixelDecoration>
      <PixelDecoration $bottom="30%" $right="5%" $delay={1.5}>
        ⭐
      </PixelDecoration>

      <Header navItems={navItems} />

      <Container>
        <HeroSection>
          <Title>{t.title}</Title>
          <Subtitle $locale={locale}>{t.subtitle}</Subtitle>
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
                  <TimelineEvent $locale={locale}>{item.event}</TimelineEvent>
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
                <InterestName $locale={locale}>{interest.name}</InterestName>
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

      {/* 霓虹标语 */}
      <NeonBanner>A LONG TIME AGO IN A GALAXY FAR, FAR AWAY...</NeonBanner>
    </PageWrapper>
  );
}
