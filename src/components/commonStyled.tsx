import styled, { keyframes } from "styled-components";

export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

// 像素装饰
export const PixelDecoration = styled.div<{
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

export const PageWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  /* 添加初始背景色，避免异步加载时的白屏闪烁 */
  background: radial-gradient(ellipse at center, #0a0a1a 0%, #000005 100%);
`;
