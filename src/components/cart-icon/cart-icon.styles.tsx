import styled from 'styled-components';
type DivProps = React.HTMLProps<HTMLDivElement>;
export const CartIconContainer = styled.div<DivProps>`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;
