import styled from 'styled-components';

export type StaticImageProps = {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
  maxWidthSM?: number;
}

const StaticImage = styled.img`
  ${({ bottom }: StaticImageProps) => bottom ? `bottom: ${bottom}px;` : ''}
  ${({ left }: StaticImageProps) => left ? `left: ${left}px;` : ''}
  position: fixed;
  ${({ right }: StaticImageProps) => right ? `right: ${right}px;` : ''}
  ${({ top }: StaticImageProps) => top ? `top: ${top}px;` : ''}
  
  ${({ maxWidthSM }: StaticImageProps) => maxWidthSM ? `max-width: ${maxWidthSM}px;` : 'max-width: 100%'}
`;

export default StaticImage;