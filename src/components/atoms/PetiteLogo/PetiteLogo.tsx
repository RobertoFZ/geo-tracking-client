import styled from 'styled-components';
import Logo from 'assets/logo.png';
import Devices from 'utils/devices';

const PetiteLogo = styled.img.attrs({
  src: Logo
})`
  height: auto;
  max-height: 280px;
  max-width: 100%;
  margin: auto;

  @media ${Devices.laptop} { 
    max-width: 450px;
  }
`;

export default PetiteLogo;