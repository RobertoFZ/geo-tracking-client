import styled from 'styled-components';
import COLORS from 'shared/constants/colors';

const { WHITE } = COLORS;

const FloatingContainer = styled.div`
  background-color: ${WHITE};
  margin: 0 100px;
  position: absolute;
  bottom: 100px;
  width: calc(100vw - 200px);
`;

export default FloatingContainer;