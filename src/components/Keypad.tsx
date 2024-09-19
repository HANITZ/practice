import { Button } from '_tosslib/components/Button';
import { Spacing } from '_tosslib/components/Spacing';
import { Txt } from '_tosslib/components/Txt';
import colors from '_tosslib/constants/colors';
import { CreateKeypad } from 'pages/remotes';
import React, { HTMLAttributes, forwardRef } from 'react';

interface KeypadProps extends HTMLAttributes<HTMLDivElement> {
  data: CreateKeypad;
  onClickKeypad: (rowIdx: number, colIdx: number) => void;
  onSubmit: () => void;
  onBackKey: () => void;
  onRemoveAll: () => void;
}

export const Keypad = forwardRef<HTMLDivElement, KeypadProps>(
  ({ data, onClickKeypad, onSubmit, onBackKey, onRemoveAll, ...props }, ref) => {
    const svgRows = data.keypad.svgGrid;

    return (
      <div
        css={{
          position: 'fixed',
          width: '500px',
          padding: '20px',
          fontSize: '15px',
          borderRadius: '20px',
          backgroundColor: colors.white,
          boxShadow: `inset 0 0 0 1px ${colors.greyOpacity200}`,
        }}
        ref={ref}
        {...props}
      >
        {React.Children.toArray(
          svgRows.map((svgRow, rowIdx) => (
            <div css={{ display: 'flex', width: '100%' }}>
              {svgRow.map((svg, colIdx) => (
                <Button
                  onClick={() => onClickKeypad(rowIdx, colIdx)}
                  css={{ margin: '4px' }}
                  variant="secondary"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              ))}
              {rowIdx === 0 && (
                <Button
                  css={{
                    backgroundColor: colors.blue50,
                    color: colors.blue700,
                    margin: '4px',
                  }}
                  onClick={onBackKey}
                >
                  ←
                </Button>
              )}
              {rowIdx === 1 && (
                <Button
                  css={{ backgroundColor: colors.blue50, color: colors.blue700, margin: '4px' }}
                  onClick={onRemoveAll}
                >
                  전체삭제
                </Button>
              )}
              {rowIdx === 2 && (
                <Button variant="primary" onClick={onSubmit}>
                  확인
                </Button>
              )}
            </div>
          ))
        )}
        <Spacing size={4} />
        <Txt color={colors.grey700}>비밀번호를 입력해주세요</Txt>
        <Spacing size={12} />
        <Txt color={colors.grey700}>6자리로 입력해주세요</Txt>
      </div>
    );
  }
);
