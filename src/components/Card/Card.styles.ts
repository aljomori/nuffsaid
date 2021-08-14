import styled from '@emotion/styled';
import { Paper } from '@material-ui/core';
import { Priority } from '../../mocks/messageGenerator';

export const CustomCard = styled(Paper)<{ priority: Priority }>`
  height: 100px;
  padding: 20px;
  background-color: ${({ priority, theme }) => {
    if (priority === Priority.info) {
      return theme.colors.info;
    }
    if (priority === Priority.warning) {
      return theme.colors.warning;
    }
    if (priority === Priority.error) {
      return theme.colors.error;
    }
    return 'white';
  }};
  margin-bottom: 10px;
`;
