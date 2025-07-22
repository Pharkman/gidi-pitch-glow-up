import { colors } from '@/design-system/tokens';
import GidiLogo from '@/assets/Frame 481473.png'

export default function Logo({ center = false }: { center?: boolean }) {
  return (
    <div className={center ? 'flex flex-col items-center mb-6' : 'mb-6'}>
      <img src={GidiLogo} alt="" />
    </div>
  );
} 