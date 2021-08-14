import { FC, useCallback } from 'react';
import * as S from './Card.styles';
import { Priority } from '../../mocks/messageGenerator';

interface ICard {
  id: string;
  message: string;
  priority: Priority;
  onClear: (messageId: string) => void;
}
const Card: FC<ICard> = ({ id, message, priority, onClear }) => {
  const handleOnClick = useCallback(() => {
    onClear(id);
  }, [id, onClear]);

  return (
    <S.CustomCard priority={priority}>
      {message}
      <span onClick={handleOnClick}> clear </span>
    </S.CustomCard>
  );
};

export default Card;
