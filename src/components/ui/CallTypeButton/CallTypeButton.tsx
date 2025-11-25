import { CallType } from '@/types/erc725js';

type Props = {
  callType: CallType;
  isActive: boolean;
  onClick?: () => void;
  size?: 'small' | 'normal';
};

const CallTypeButton: React.FC<Props> = ({
  callType,
  isActive,
  onClick,
  size = 'normal',
}) => {
  const btnClass =
    callType === 'DELEGATECALL'
      ? 'is-red'
      : callType === 'STATICCALL'
      ? 'is-blue'
      : 'is-yellow';
  const isOutlined = !isActive ? 'is-outlined' : '';

  return (
    <button
      className={`button is-${size} ${btnClass} ${isOutlined}`}
      onClick={onClick}
    >
      {callType}
    </button>
  );
};

export default CallTypeButton;
