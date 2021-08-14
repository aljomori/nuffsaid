import { FC } from 'react';
import * as S from './List.styles';

interface IList {
  title: string;
  counter: number;
}

const List: FC<IList> = ({ title, counter, children }) => {
  return (
    <S.Root>
      <h1>{title}</h1>
      <S.Counter>count: {counter} </S.Counter>
      {children}
    </S.Root>
  );
};

export default List;
