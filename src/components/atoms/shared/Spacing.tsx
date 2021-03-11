import styled from 'styled-components';

export type SpacingPropd = {
  spacing?: number;
}

const Spacing = styled.div`
  display: block;
  padding:  ${({ spacing }: SpacingPropd) => spacing ?? 10}px;
`;

export default Spacing;