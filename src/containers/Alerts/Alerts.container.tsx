import { FC, useMemo } from 'react';
import { Alert, Button, Grid, Snackbar } from '@material-ui/core';
import List from '../../components/List/List';
import Card from '../../components/Card/Card';
import useAlerts from './Alerts.hook';
import { Priority } from '../../mocks/messageGenerator';
import * as S from './Alerts.styles';

const AlertsContainer: FC = () => {
  const {
    error,
    messageError,
    messageInfo,
    messageWarning,
    onClearMessage,
    onClearAll,
    onToggleReceivingMessage,
    isMessageGeneratorRunning,
  } = useAlerts();

  const startStopLabel = useMemo(() => (isMessageGeneratorRunning ? 'stop' : 'start'), [isMessageGeneratorRunning]);

  return (
    <S.Root>
      {error && (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open>
          <Alert severity="error">{error.message}</Alert>
        </Snackbar>
      )}
      <Grid container>
        <Grid item xs={12}>
          <h1>nuffsaid.com Coding Challenge</h1>
          <hr />
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" gap="10px" padding="10px" alignItems="center">
            <Button onClick={onToggleReceivingMessage}>{startStopLabel}</Button>
            <Button onClick={onClearAll}>clear</Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Grid xs={12} sm={12} md={6} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <List title="Error Type 1" counter={messageError.length}>
                  {messageError.map(message => (
                    <Card
                      key={message.id}
                      id={message.id}
                      message={message.message}
                      onClear={onClearMessage}
                      priority={Priority.error}
                    />
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <List title="Error Type 2" counter={messageInfo.length}>
                  {messageInfo.map(message => (
                    <Card
                      key={message.id}
                      id={message.id}
                      message={message.message}
                      onClear={onClearMessage}
                      priority={Priority.warning}
                    />
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <List title="Error Type 3" counter={messageWarning.length}>
                  {messageWarning.map(message => (
                    <Card
                      key={message.id}
                      id={message.id}
                      message={message.message}
                      onClear={onClearMessage}
                      priority={Priority.info}
                    />
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </S.Root>
  );
};

export default AlertsContainer;
