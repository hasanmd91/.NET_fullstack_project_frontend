import { useState } from 'react';

type useButtonWithDelayReturnType = [boolean, () => void];

const useButtonWithDelay = (
  initialDisabled = false,
  delay = 200
): useButtonWithDelayReturnType => {
  const [isDisabled, setIsDisabled] = useState(initialDisabled);

  const disabledButtonForASecond = () => {
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, delay);
  };

  return [isDisabled, disabledButtonForASecond];
};

export default useButtonWithDelay;
