import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Button } from '_tosslib/components/Button';
import { Input } from '_tosslib/components/Input';
import { Spacing } from '_tosslib/components/Spacing';
import { Txt } from '_tosslib/components/Txt';
import colors from '_tosslib/constants/colors';
import { createKeypad, submitPassword } from './remotes';
import { Keypad } from 'components/Keypad';
import { useRef } from 'react';
import { useKeypad } from 'hooks/useKeypad';

export function KeypadPage() {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { data: passwordKeypad, refetch: refetchPasswordKeypad } = useSuspenseQuery({
    queryKey: ['password'],
    queryFn: () => createKeypad(),
  });
  const { data: confirmPasswordKeypad, refetch: refetchConfirmPasswordKeypad } = useSuspenseQuery({
    queryKey: ['confirmpassword'],
    queryFn: () => createKeypad(),
  });

  const {
    keypadRef: passwordKeypadRef,
    open: isOpenPasswordKeypad,
    handleFocus: handlePasswordFocus,
    handleClickKeypad: handleClickPassword,
    handleSubmit: handleSubmitPassword,
    keys: passwords,
    handleBackKey: handleBackKeyPassword,
    handleRemoveAll: handleRemoveAllPassword,
    handleKeyDown: handleKeyDownPassword,
  } = useKeypad(passwordRef, refetchPasswordKeypad, passwordKeypad);

  const {
    open: isOpenConfirmPasswordKeypad,
    keypadRef: confirmPasswordKeypadRef,
    handleFocus: handleConfirmPasswordFocus,
    handleClickKeypad: handleClickConfirmPasswordKeypad,
    handleSubmit: handleSubmitConfirmPassword,
    keys: confirmPasswords,
    handleBackKey: handleBackKeyConfirmPassword,
    handleRemoveAll: handleRemoveAllConfirmPassword,
    handleKeyDown: handleKeyDownConfirmPassword,
  } = useKeypad(confirmPasswordRef, refetchConfirmPasswordKeypad, confirmPasswordKeypad);

  const { mutate: submit } = useMutation({
    mutationFn: async () => {
      const passwordResult = {
        uid: passwordKeypad.uid,
        coords: passwords,
      };
      const confirmPasswordResult = {
        uid: confirmPasswordKeypad.uid,
        coords: confirmPasswords,
      };
      await submitPassword(passwordResult, confirmPasswordResult);
      return true;
    },
  });

  return (
    <section>
      <Txt typography="h1" color={colors.black}>
        토스 보안키패드 기술과제
      </Txt>
      <Input label="비밀번호" onFocus={handlePasswordFocus} onKeyDown={handleKeyDownPassword}>
        <Input.TextField value={'●'.repeat(passwords.length)} ref={passwordRef} readOnly />
      </Input>
      {isOpenPasswordKeypad && (
        <Keypad
          ref={passwordKeypadRef}
          data={passwordKeypad}
          onClickKeypad={handleClickPassword}
          onSubmit={handleSubmitPassword}
          onBackKey={handleBackKeyPassword}
          onRemoveAll={handleRemoveAllPassword}
          onKeyDown={handleKeyDownPassword}
        />
      )}

      <Spacing size={24} />
      <Input label="비밀번호 확인" onFocus={handleConfirmPasswordFocus} onKeyDown={handleKeyDownConfirmPassword}>
        <Input.TextField value={'●'.repeat(confirmPasswords.length)} ref={confirmPasswordRef} readOnly />
      </Input>
      {isOpenConfirmPasswordKeypad && (
        <Keypad
          ref={confirmPasswordKeypadRef}
          data={confirmPasswordKeypad}
          onClickKeypad={handleClickConfirmPasswordKeypad}
          onSubmit={handleSubmitConfirmPassword}
          onBackKey={handleBackKeyConfirmPassword}
          onRemoveAll={handleRemoveAllConfirmPassword}
          onKeyDown={handleKeyDownConfirmPassword}
        />
      )}

      <Spacing size={24} />
      <Button
        disabled={passwords.length !== 6 || confirmPasswords.length !== 6}
        css={{ width: '100%' }}
        onClick={() => submit()}
      >
        완료
      </Button>
    </section>
  );
}
