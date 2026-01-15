'use client';

import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// ========== 动画 ==========
const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const neonPulse = keyframes`
  0%, 100% { 
    opacity: 0.3;
    filter: blur(20px);
  }
  50% { 
    opacity: 0.6;
    filter: blur(30px);
  }
`;

const gridMove = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 50px; }
`;

const dataStream = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const hexFloat = keyframes`
  0%, 100% { 
    transform: translateY(0) rotate(0deg);
    opacity: 0.1;
  }
  50% { 
    transform: translateY(-30px) rotate(180deg);
    opacity: 0.3;
  }
`;

const rainbowBorder = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

// ========== 样式组件 ==========
const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

// 深色渐变背景
const GradientBase = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(0, 255, 65, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(255, 45, 123, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 70%),
    var(--background);
`;

// 动态网格
const CyberGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: ${gridMove} 20s linear infinite;
  
  /* 透视网格效果 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: 
      linear-gradient(
        to bottom,
        transparent,
        rgba(0, 255, 65, 0.02)
      );
    mask-image: linear-gradient(
      to top,
      black 0%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to top,
      black 0%,
      transparent 100%
    );
  }
`;

// 霓虹光球
const NeonOrb = styled.div<{ $color: string; $top: string; $left: string; $size: string; $delay: number }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$size};
  height: ${props => props.$size};
  background: ${props => props.$color};
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  animation: ${neonPulse} ${props => 4 + props.$delay}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

// CRT 扫描线
const ScanlineEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(
    transparent 0%,
    rgba(255, 255, 255, 0.03) 50%,
    transparent 100%
  );
  animation: ${scanline} 8s linear infinite;
`;

// 数据流效果
const DataStreamLine = styled.div<{ $left: string; $delay: number }>`
  position: absolute;
  left: ${props => props.$left};
  top: 0;
  width: 1px;
  height: 100px;
  background: linear-gradient(
    to bottom,
    transparent,
    #00ff41,
    transparent
  );
  opacity: 0.3;
  animation: ${dataStream} ${props => 3 + props.$delay}s linear infinite;
  animation-delay: ${props => props.$delay}s;
`;

// 六边形装饰
const HexDecor = styled.div<{ $top: string; $left: string; $delay: number }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: 60px;
  height: 60px;
  border: 1px solid rgba(0, 255, 65, 0.2);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: ${hexFloat} ${props => 8 + props.$delay * 2}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;

  @media (max-width: 768px) {
    display: none;
  }
`;

// 角落装饰框
const CornerFrame = styled.div<{ $position: 'tl' | 'tr' | 'bl' | 'br' }>`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid rgba(0, 255, 65, 0.1);
  
  ${props => {
    switch(props.$position) {
      case 'tl':
        return `
          top: 20px;
          left: 20px;
          border-right: none;
          border-bottom: none;
        `;
      case 'tr':
        return `
          top: 20px;
          right: 20px;
          border-left: none;
          border-bottom: none;
        `;
      case 'bl':
        return `
          bottom: 20px;
          left: 20px;
          border-right: none;
          border-top: none;
        `;
      case 'br':
        return `
          bottom: 20px;
          right: 20px;
          border-left: none;
          border-top: none;
        `;
    }
  }}

  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: #00ff41;
    opacity: 0.5;
    
    ${props => {
      switch(props.$position) {
        case 'tl': return 'top: -2px; left: -2px;';
        case 'tr': return 'top: -2px; right: -2px;';
        case 'bl': return 'bottom: -2px; left: -2px;';
        case 'br': return 'bottom: -2px; right: -2px;';
      }
    }}
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

// 粒子画布
const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// 噪点叠加
const NoiseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
`;

// 底部渐变
const BottomGlow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(
    to top,
    rgba(0, 255, 65, 0.05),
    transparent
  );
`;

// 顶部渐变
const TopGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(
    to bottom,
    rgba(255, 45, 123, 0.03),
    transparent
  );
`;

// 动态线条
const GlowLine = styled.div<{ $top: string; $color: string; $width: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: 50%;
  transform: translateX(-50%);
  width: ${props => props.$width};
  height: 1px;
  background: ${props => props.$color};
  box-shadow: 0 0 10px ${props => props.$color}, 0 0 20px ${props => props.$color};
  opacity: 0.3;
  animation: ${rainbowBorder} 10s linear infinite;
`;

// ========== 粒子类型 ==========
interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  color: string;
}

// 创建粒子
function createParticle(width: number, height: number): Particle {
  const colors = ['#00ff41', '#00d4ff', '#ff2d7b', '#ffff00'];
  return {
    x: Math.random() * width,
    y: height + 10,
    size: Math.random() * 3 + 1,
    speedY: Math.random() * 1 + 0.5,
    opacity: Math.random() * 0.5 + 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

// 更新粒子位置
function updateParticle(particle: Particle, width: number, height: number): void {
  particle.y -= particle.speedY;
  if (particle.y < -10) {
    particle.y = height + 10;
    particle.x = Math.random() * width;
  }
}

// 绘制粒子
function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle): void {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fillStyle = particle.color;
  ctx.globalAlpha = particle.opacity;
  ctx.fill();
  ctx.globalAlpha = 1;
}

// ========== 组件 ==========
export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 画布尺寸状态
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    // 设置画布大小
    const resizeCanvas = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 创建粒子
    const particles: Particle[] = [];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(canvasWidth, canvasHeight));
    }

    // 动画循环
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      particles.forEach(particle => {
        updateParticle(particle, canvasWidth, canvasHeight);
        drawParticle(ctx, particle);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <BackgroundWrapper>
      <GradientBase />
      <CyberGrid />
      
      {/* 霓虹光球 */}
      <NeonOrb $color="#00ff41" $top="10%" $left="10%" $size="300px" $delay={0} />
      <NeonOrb $color="#ff2d7b" $top="60%" $left="80%" $size="250px" $delay={2} />
      <NeonOrb $color="#00d4ff" $top="40%" $left="50%" $size="200px" $delay={1} />
      <NeonOrb $color="#a78bfa" $top="80%" $left="20%" $size="180px" $delay={3} />
      
      {/* 数据流 */}
      <DataStreamLine $left="10%" $delay={0} />
      <DataStreamLine $left="25%" $delay={1.5} />
      <DataStreamLine $left="45%" $delay={0.8} />
      <DataStreamLine $left="65%" $delay={2.2} />
      <DataStreamLine $left="85%" $delay={1.2} />
      
      {/* 六边形装饰 */}
      <HexDecor $top="15%" $left="85%" $delay={0} />
      <HexDecor $top="45%" $left="5%" $delay={1} />
      <HexDecor $top="70%" $left="90%" $delay={2} />
      <HexDecor $top="85%" $left="15%" $delay={1.5} />
      
      {/* 角落框架 */}
      <CornerFrame $position="tl" />
      <CornerFrame $position="tr" />
      <CornerFrame $position="bl" />
      <CornerFrame $position="br" />
      
      {/* 发光线条 */}
      <GlowLine $top="30%" $color="#00ff41" $width="60%" />
      <GlowLine $top="70%" $color="#ff2d7b" $width="40%" />
      
      {/* 粒子画布 */}
      <ParticleCanvas ref={canvasRef} />
      
      {/* 扫描线 */}
      <ScanlineEffect />
      
      {/* 渐变叠加 */}
      <TopGlow />
      <BottomGlow />
      
      {/* 噪点 */}
      <NoiseOverlay />
    </BackgroundWrapper>
  );
}
