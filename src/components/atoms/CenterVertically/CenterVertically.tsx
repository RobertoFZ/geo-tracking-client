import styled from 'styled-components';

export type CenterVerticallyProps = {
  minHeight?: string;
  justifyContent?: string;
}

const CenterVertically = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  ${({ minHeight = '100vh' }: CenterVerticallyProps) => `min-height: ${minHeight};`}
  ${({ justifyContent = 'center' }: CenterVerticallyProps) => `justify-content: ${justifyContent};`}
`;

export default CenterVertically;