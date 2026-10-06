import React from 'react';
import { Html } from '@react-three/drei';
import { Activity, ShieldCheck } from 'lucide-react';

interface MedicalBadgeProps {
  position?: [number, number, number];
  isHovered?: boolean;
}

/**
 * MedicalBadge: Scientific 3D overlay badge annotating anatomical endocrine structures.
 */
export const MedicalBadge: React.FC<MedicalBadgeProps> = ({
  position = [1.2, 0.9, 0],
  isHovered = false,
}) => {
  return (
    <Html
      position={position}
      center
      distanceFactor={7}
      style={{
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <div className="bg-[#06181f]/90 backdrop-blur-md border border-teal-500/40 rounded-xl px-3 py-2 text-white shadow-xl flex items-center gap-2 select-none">
        <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
          <Activity className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <div className="text-[10px] font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1">
            <span>Islet Beta-Cells</span>
            <ShieldCheck className="w-3 h-3 text-amber-400" />
          </div>
          <div className="text-xs text-slate-200 font-medium">
            Endocrine Glucoregulation
          </div>
        </div>
      </div>
    </Html>
  );
};
