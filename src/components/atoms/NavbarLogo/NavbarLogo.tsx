import styled from 'styled-components';
import Logo from 'assets/logo.png';
import Devices from 'utils/devices';

export const NavbarLogo = styled.img.attrs({
  src: Logo
})`
  filter: brightness(0) invert(1);
  float: left;
  height: 40px;

  @media ${Devices.laptop} { 
    
  }
`;