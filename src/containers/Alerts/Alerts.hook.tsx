import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MessageGenerator, { IMessage, Priority } from '../../mocks/messageGenerator';

type TUseAlerts = () => IUseAlertsProps;
type THandleOnClearMessage = (messageId: string) => void;
type THandleOnAddMessage = (message: IMessage) => void;
interface IError {
  id: string;
  message: string;
}

interface IUseAlertsProps {
  error: IError | null;
  messageError: IMessage[];
  messageWarning: IMessage[];
  messageInfo: IMessage[];
  onAddMessage: THandleOnAddMessage;
  onClearMessage: THandleOnClearMessage;
  onClearAll: () => void;
  onToggleReceivingMessage: () => void;
  isMessageGeneratorRunning: boolean;
}

let errorCleanerTimeout: ReturnType<typeof setTimeout> | null = null;

const useAlerts: TUseAlerts = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState<IError | null>(null);
  const [isMessageGeneratorRunning, setIsMessageGeneratorRunning] = useState(false);
  const messageGenerator = useRef<MessageGenerator | null>(null);

  const handleOnAddMessage: THandleOnAddMessage = useCallback(newMessage => {
    if (newMessage.priority === Priority.error) {
      !!errorCleanerTimeout && clearTimeout(errorCleanerTimeout);

      setError({
        id: newMessage.id,
        message: newMessage.message,
      });

      errorCleanerTimeout = setTimeout(() => {
        setError(null);
      }, 2000);
    }
    setMessages(stateMessages => [...stateMessages, newMessage]);
  }, []);

  const handleOnClearMessage: THandleOnClearMessage = useCallback(messageId => {
    setMessages(stateMessages => stateMessages.filter(({ id }) => id !== messageId));
  }, []);

  const handleOnClearAll = useCallback(() => {
    setError(null);
    setMessages([]);
  }, []);

  const handleOnStartReceivingMessage = useCallback(() => {
    messageGenerator.current?.start();
    setIsMessageGeneratorRunning(true);
  }, []);

  const handleOnStopReceivingMessage = useCallback(() => {
    messageGenerator.current?.stop();
    setIsMessageGeneratorRunning(false);
  }, []);

  const handleOnToggleReceivingMessage = useCallback(() => {
    if (!messageGenerator.current) {
      return;
    }
    messageGenerator.current?.stopGeneration ? handleOnStartReceivingMessage() : handleOnStopReceivingMessage();
  }, [handleOnStartReceivingMessage, handleOnStopReceivingMessage]);

  useEffect(
    () => {
      messageGenerator.current = new MessageGenerator({
        messageCallback: handleOnAddMessage,
      });
      return () => {
        messageGenerator.current && messageGenerator.current.stop();
        !!errorCleanerTimeout && clearTimeout(errorCleanerTimeout);
      };
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [],
  );

  useEffect(() => {
    handleOnStartReceivingMessage();
  }, [messageGenerator.current]);

  const messageError = useMemo(() => messages.filter(({ priority }) => priority === Priority.error), [messages]);
  const messageWarning = useMemo(() => messages.filter(({ priority }) => priority === Priority.warning), [messages]);
  const messageInfo = useMemo(() => messages.filter(({ priority }) => priority === Priority.info), [messages]);

  return {
    error,
    messageError,
    messageInfo,
    messageWarning,
    onAddMessage: handleOnAddMessage,
    onClearAll: handleOnClearAll,
    onClearMessage: handleOnClearMessage,
    onToggleReceivingMessage: handleOnToggleReceivingMessage,
    isMessageGeneratorRunning,
  };
};
export default useAlerts;
