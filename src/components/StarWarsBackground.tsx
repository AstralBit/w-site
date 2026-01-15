'use client';

import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// ========== 动画 ==========
const hyperspace = keyframes`
  0% {
    transform: translateZ(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateZ(200px) scale(2);
    opacity: 0;
  }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const shootingStar = keyframes`
  0% {
    transform: translateX(0) translateY(0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateX(-500px) translateY(500px);
    opacity: 0;
  }
`;

const pulse = keyframes`
  0%, 100% { 
    transform: scale(1);
    opacity: 0.6;
  }
  50% { 
    transform: scale(1.2);
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(2deg); }
  75% { transform: translateY(10px) rotate(-2deg); }
`;

const laserBeam = keyframes`
  0% {
    transform: translateX(-100%) scaleX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateX(200vw) scaleX(1);
    opacity: 0;
  }
`;

const nebulaRotate = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
`;

const planetOrbit = keyframes`
  0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
`;

const warpSpeed = keyframes`
  0% {
    height: 2px;
    opacity: 1;
  }
  100% {
    height: 200px;
    opacity: 0;
  }
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
  background: radial-gradient(ellipse at center, #0a0a1a 0%, #000005 100%);
`;

// 星空画布
const StarCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// 星云效果
const Nebula = styled.div<{ $color: string; $top: string; $left: string; $size: string; $delay: number }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$size};
  height: ${props => props.$size};
  background: radial-gradient(
    ellipse at center,
    ${props => props.$color}40 0%,
    ${props => props.$color}20 30%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
  animation: ${nebulaRotate} ${props => 60 + props.$delay * 10}s linear infinite;
  animation-delay: ${props => props.$delay}s;
`;

// 行星
const Planet = styled.div<{ $color: string; $size: string; $top: string; $left: string; $shadow: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$size};
  height: ${props => props.$size};
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    ${props => props.$color} 0%,
    ${props => props.$shadow} 100%
  );
  box-shadow: 
    inset -10px -10px 30px rgba(0,0,0,0.5),
    0 0 40px ${props => props.$color}40,
    0 0 80px ${props => props.$color}20;
  animation: ${pulse} 8s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    top: 10%;
    left: 20%;
    width: 20%;
    height: 20%;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    filter: blur(5px);
  }
`;

// 行星环
const PlanetRing = styled.div<{ $top: string; $left: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: 120px;
  height: 120px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateX(75deg);
    width: 180px;
    height: 180px;
    border: 3px solid rgba(255, 200, 100, 0.3);
    border-radius: 50%;
    box-shadow: 
      0 0 10px rgba(255, 200, 100, 0.2),
      inset 0 0 20px rgba(255, 200, 100, 0.1);
  }
`;

// 飞船
const Spaceship = styled.div<{ $top: string; $left: string; $delay: number; $direction: 'left' | 'right' }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  font-size: 1.5rem;
  animation: ${float} ${props => 4 + props.$delay}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  transform: ${props => props.$direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'};
  filter: drop-shadow(0 0 10px rgba(0, 200, 255, 0.5));
  opacity: 0.8;

  @media (max-width: 768px) {
    display: none;
  }
`;

// 激光束
const Laser = styled.div<{ $top: string; $color: string; $delay: number }>`
  position: absolute;
  top: ${props => props.$top};
  left: 0;
  width: 100px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    ${props => props.$color},
    ${props => props.$color},
    transparent
  );
  box-shadow: 0 0 10px ${props => props.$color}, 0 0 20px ${props => props.$color};
  animation: ${laserBeam} ${props => 3 + props.$delay}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: 0.8;
`;

// 流星
const ShootingStar = styled.div<{ $top: string; $right: string; $delay: number }>`
  position: absolute;
  top: ${props => props.$top};
  right: ${props => props.$right};
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff, 0 0 20px #fff;
  animation: ${shootingStar} ${props => 2 + props.$delay}s linear infinite;
  animation-delay: ${props => props.$delay * 3}s;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, #fff, transparent);
  }
`;

// 超空间跳跃线
const WarpLine = styled.div<{ $top: string; $left: string; $delay: number }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: 2px;
  height: 2px;
  background: #fff;
  animation: ${warpSpeed} ${props => 1 + props.$delay * 0.5}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  transform-origin: center top;
`;

// 死星装饰
const DeathStar = styled.div`
  position: absolute;
  top: 15%;
  right: 10%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    #4a4a4a 0%,
    #2a2a2a 50%,
    #1a1a1a 100%
  );
  box-shadow: 
    inset -5px -5px 20px rgba(0,0,0,0.8),
    0 0 30px rgba(100, 100, 100, 0.3);
  animation: ${pulse} 10s ease-in-out infinite;

  /* 超级激光凹槽 */
  &::before {
    content: '';
    position: absolute;
    top: 30%;
    left: 20%;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      #0a0a0a 0%,
      #1a1a1a 50%,
      #2a2a2a 100%
    );
    box-shadow: inset 0 0 10px rgba(0,255,0,0.3);
  }

  /* 赤道沟槽 */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3a3a3a, transparent);
    transform: translateY(-50%);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    top: 10%;
    right: 5%;
  }
`;

// 轨道卫星
const OrbitingSatellite = styled.div<{ $size: string; $duration: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.$size};
  height: ${props => props.$size};
  margin: -${props => parseInt(props.$size) / 2}px;
  animation: ${planetOrbit} ${props => props.$duration}s linear infinite;

  &::before {
    content: '🛰️';
    font-size: 1.2rem;
    filter: drop-shadow(0 0 5px rgba(0, 200, 255, 0.5));
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// 星际尘埃
const CosmicDust = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.2), transparent),
    radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.2), transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.2), transparent);
  background-size: 200px 200px;
  animation: ${twinkle} 4s ease-in-out infinite;
`;

// 银河带
const GalaxyBand = styled.div`
  position: absolute;
  top: 30%;
  left: -20%;
  right: -20%;
  height: 200px;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(100, 100, 200, 0.05),
    rgba(150, 100, 200, 0.08),
    rgba(100, 100, 200, 0.05),
    transparent
  );
  transform: rotate(-15deg);
  filter: blur(20px);
`;

// 光晕效果
const LensFlare = styled.div<{ $top: string; $left: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: 100px;
  height: 100px;
  background: radial-gradient(
    circle at center,
    rgba(255, 200, 100, 0.3) 0%,
    rgba(255, 150, 50, 0.1) 30%,
    transparent 70%
  );
  animation: ${pulse} 6s ease-in-out infinite;
`;

// ========== 粒子类型 ==========
interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
  color: string;
}

// 创建星星
function createStar(width: number, height: number): Star {
  const colors = ['#ffffff', '#ffffcc', '#ccccff', '#ffcccc', '#ccffff'];
  return {
    x: Math.random() * width - width / 2,
    y: Math.random() * height - height / 2,
    z: Math.random() * 1000,
    size: Math.random() * 2 + 0.5,
    brightness: Math.random(),
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

// 更新星星位置（模拟超空间效果）
function updateStar(star: Star, width: number, height: number, speed: number): void {
  star.z -= speed;
  if (star.z <= 0) {
    star.z = 1000;
    star.x = Math.random() * width - width / 2;
    star.y = Math.random() * height - height / 2;
  }
}

// 绘制星星
function drawStar(ctx: CanvasRenderingContext2D, star: Star, centerX: number, centerY: number): void {
  const scale = 1000 / (1000 + star.z);
  const x = star.x * scale + centerX;
  const y = star.y * scale + centerY;
  const size = star.size * scale * 2;
  
  // 星星闪烁
  const flicker = 0.7 + Math.sin(Date.now() * 0.001 * star.brightness) * 0.3;
  
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = star.color;
  ctx.globalAlpha = scale * flicker;
  ctx.fill();
  
  // 添加光晕
  if (size > 1.5) {
    ctx.beginPath();
    ctx.arc(x, y, size * 2, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
    gradient.addColorStop(0, star.color);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.globalAlpha = scale * 0.3 * flicker;
    ctx.fill();
  }
  
  ctx.globalAlpha = 1;
}

// ========== 组件 ==========
export default function StarWarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const resizeCanvas = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 创建星星
    const stars: Star[] = [];
    const starCount = Math.min(300, Math.floor(window.innerWidth / 5));
    for (let i = 0; i < starCount; i++) {
      stars.push(createStar(canvasWidth, canvasHeight));
    }

    // 动画速度
    const speed = 0.5;

    // 动画循环
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 5, 0.1)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      stars.forEach(star => {
        updateStar(star, canvasWidth, canvasHeight, speed);
        drawStar(ctx, star, centerX, centerY);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // 固定的超空间跳跃线位置（避免 hydration 错误）
  const warpLines = [
    { top: '5%', left: '10%', delay: 0 },
    { top: '15%', left: '25%', delay: 0.2 },
    { top: '8%', left: '45%', delay: 0.4 },
    { top: '22%', left: '60%', delay: 0.6 },
    { top: '12%', left: '80%', delay: 0.8 },
    { top: '35%', left: '15%', delay: 1 },
    { top: '42%', left: '35%', delay: 1.2 },
    { top: '38%', left: '55%', delay: 1.4 },
    { top: '48%', left: '70%', delay: 1.6 },
    { top: '55%', left: '90%', delay: 1.8 },
    { top: '62%', left: '5%', delay: 2 },
    { top: '68%', left: '20%', delay: 2.2 },
    { top: '58%', left: '40%', delay: 2.4 },
    { top: '72%', left: '65%', delay: 2.6 },
    { top: '78%', left: '85%', delay: 2.8 },
    { top: '85%', left: '12%', delay: 3 },
    { top: '88%', left: '30%', delay: 3.2 },
    { top: '92%', left: '50%', delay: 3.4 },
    { top: '95%', left: '75%', delay: 3.6 },
    { top: '98%', left: '92%', delay: 3.8 },
  ];

  return (
    <BackgroundWrapper>
      {/* 星空画布 */}
      <StarCanvas ref={canvasRef} />
      
      {/* 银河带 */}
      <GalaxyBand />
      
      {/* 星云 */}
      <Nebula $color="#4a0080" $top="10%" $left="5%" $size="400px" $delay={0} />
      <Nebula $color="#004080" $top="60%" $left="70%" $size="350px" $delay={2} />
      <Nebula $color="#800040" $top="40%" $left="40%" $size="300px" $delay={1} />
      <Nebula $color="#008040" $top="80%" $left="10%" $size="250px" $delay={3} />
      
      {/* 行星 */}
      <Planet $color="#ff6b35" $shadow="#8b3a1a" $size="60px" $top="70%" $left="85%" />
      <Planet $color="#4ecdc4" $shadow="#1a6b66" $size="40px" $top="20%" $left="15%" />
      <PlanetRing $top="70%" $left="85%" />
      
      {/* 死星 */}
      <DeathStar />
      
      {/* 飞船 */}
      <Spaceship $top="25%" $left="10%" $delay={0} $direction="right">🚀</Spaceship>
      <Spaceship $top="55%" $left="85%" $delay={1.5} $direction="left">🛸</Spaceship>
      <Spaceship $top="75%" $left="20%" $delay={2} $direction="right">✈️</Spaceship>
      
      {/* 轨道卫星 */}
      <div style={{ position: 'absolute', top: '30%', left: '70%' }}>
        <OrbitingSatellite $size="200px" $duration={20} />
      </div>
      
      {/* 激光束 */}
      <Laser $top="30%" $color="#ff0000" $delay={0} />
      <Laser $top="50%" $color="#00ff00" $delay={2} />
      <Laser $top="70%" $color="#00ffff" $delay={4} />
      
      {/* 流星 */}
      <ShootingStar $top="10%" $right="20%" $delay={0} />
      <ShootingStar $top="30%" $right="40%" $delay={1} />
      <ShootingStar $top="50%" $right="10%" $delay={2} />
      <ShootingStar $top="70%" $right="60%" $delay={0.5} />
      
      {/* 超空间跳跃线 */}
      {warpLines.map((line, i) => (
        <WarpLine key={i} $top={line.top} $left={line.left} $delay={line.delay} />
      ))}
      
      {/* 光晕 */}
      <LensFlare $top="20%" $left="80%" />
      <LensFlare $top="60%" $left="10%" />
      
      {/* 星际尘埃 */}
      <CosmicDust />
    </BackgroundWrapper>
  );
}

