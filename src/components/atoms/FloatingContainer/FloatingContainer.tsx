import styled, { css } from 'styled-components';
import COLORS from 'shared/constants/colors';

const { WHITE } = COLORS;

interface IFloatingContainer {
  backgroundColor?: string;
  margin?: string;
  bottom?: string;
  top?: string;
}

const FloatingContainer = styled.div(({
  backgroundColor = WHITE,
  margin = '0 100px',
  bottom = '30px',
  top = 'auto'
}: IFloatingContainer) => css`
  background-color: ${backgroundColor};
  margin: ${margin};
  bottom: ${bottom};
  top: ${top};
  position: absolute;
  width: calc(100vw - 200px);
`);

export default FloatingContainer;