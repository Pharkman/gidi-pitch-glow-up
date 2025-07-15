import { colors } from '@/design-system/tokens';

export default function Logo({ center = false }: { center?: boolean }) {
  return (
    <div className={center ? 'flex flex-col items-center mb-6' : 'mb-6'}>
      <span
        className="text-2xl font-bold"
        style={{ color: colors.brand, letterSpacing: '1px' }}
      >
        GidiPitch
      </span>
    </div>
  );
} 