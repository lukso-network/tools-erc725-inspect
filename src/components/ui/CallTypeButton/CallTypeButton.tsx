import { CallType } from '@/types/erc725js';

type Props = {
  callType: CallType;
  isActive: boolean;
  onClick?: () => void;
};

const CallTypeButton: React.FC<Props> = ({ callType, isActive, onClick }) => {
  const btnClass =
    callType === 'DELEGATECALL'
      ? 'is-red'
      : callType === 'STATICCALL'
      ? 'is-blue'
      : 'is-yellow';
  const isOutlined = !isActive ? 'is-outlined' : '';

  return (
    <button className={`button ${btnClass} ${isOutlined}`} onClick={onClick}>
      {callType}
    </button>
  );
};

export default CallTypeButton;
