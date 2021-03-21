import styled from 'styled-components';
import breakpoints from 'utils/breakpoints';
import devices from 'utils/devices';

export type ContainerProps = {
  minHeight?: string;
  justifyContent?: string;
}

const Container = styled.div`
  padding: 0 20px;

  @media ${devices.laptop} {
    padding: 0 150px;
  }
`;

export default Container;
