import colors from 'shared/constants/colors';
import styled from 'styled-components';

const SPACING = '134px';
const ZonesSidebarContainer = styled.div`
  background-color: ${colors.WHITE};
  box-shadow: 5px 0 10px -2px #888;
  height: calc(100vh - ${SPACING});
  overflow-y: scroll;
  padding: 0 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 270px;
  z-index: 1;
`;

export default ZonesSidebarContainer;