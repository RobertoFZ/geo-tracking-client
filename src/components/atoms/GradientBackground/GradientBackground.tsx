import styled from 'styled-components';
import { GradientAnimation } from '../GradientAnimation';

export type GradientBackgroundProps = {
  firstColor: string;
  secondColor: string;
}
const GradiantBackground = styled.div`
  -webkit-animation: ${GradientAnimation} 30s ease infinite;
  -moz-animation: ${GradientAnimation} 30s ease infinite;
  -o-animation: ${GradientAnimation} 30s ease infinite;

  animation: ${GradientAnimation} 30s ease infinite;
  align-items: center;
  background: linear-gradient(223deg, ${({ firstColor }: GradientBackgroundProps) => firstColor}, ${({ secondColor }: GradientBackgroundProps) => secondColor});
  background-size: 400% 400%;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export default GradiantBackground;