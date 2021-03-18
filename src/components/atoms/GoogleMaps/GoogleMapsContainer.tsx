import styled from 'styled-components';

export const GoogleMapsContainer = styled.div`
  height: calc(100vh - 134px);
  width: 100%;

  @media print and (min-width: 480px) {
    max-height: 450px
  }
`;