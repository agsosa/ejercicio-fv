import styled from 'styled-components';

const PageContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.silver};
`;

export default PageContainer;
