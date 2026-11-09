import React from 'react';
import { DetectedObject, CATEGORY_META } from '../types/waste';
import { Layers } from 'lucide-react';

interface BoundingBoxOverlayProps {
  imageUrl: string;
  objects: DetectedObject[];
  selectedObjectId: number | null;
  onSelectObject: (id: number) => void;
  showBoxes: boolean;
}

export const BoundingBoxOverlay: React.FC<BoundingBoxOverlayProps> = ({
  imageUrl,
  objects,
  selectedObjectId,
  onSelectObject,
  showBoxes,
}) => {
  // Filter objects with valid coordinates
  const objectsWithBoxes = objects.filter((o) => o.bounding_box !== null && o.bounding_box !== undefined);

  return (
    <div className="relative w-full aspect-4/3 max-h-[520px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-300 shadow-md select-none flex items-center justify-center">
      {/* Base Image */}
      <img
        src={imageUrl}
        alt="Ảnh rác cần quét"
        className="w-full h-full object-contain"
      />

      {/* Bounding Boxes Layer */}
      {showBoxes && (
        <div className="absolute inset-0 pointer-events-none">
          {objectsWithBoxes.map((obj) => {
            const box = obj.bounding_box!;
            const top = `${(box.y_min / 1000) * 100}%`;
            const left = `${(box.x_min / 1000) * 100}%`;
            const width = `${((box.x_max - box.x_min) / 1000) * 100}%`;
            const height = `${((box.y_max - box.y_min) / 1000) * 100}%`;

            const meta = CATEGORY_META[obj.category] || CATEGORY_META.unknown;
            const isSelected = selectedObjectId === obj.id;
            const confidencePercent = Math.round(obj.confidence * 100);

            return (
              <div
                key={obj.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectObject(obj.id);
                }}
                style={{ top, left, width, height }}
                className={`absolute pointer-events-auto border-3 sm:border-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  meta.borderColor
                } ${meta.bgLight} ${
                  isSelected
                    ? 'ring-4 ring-white shadow-2xl z-30 scale-[1.02]'
                    : 'hover:scale-[1.01] hover:shadow-lg z-10'
                }`}
              >
                {/* Badge Label: Object Name + Category + Confidence % */}
                <div
                  className={`absolute -top-4 sm:-top-5 left-1 sm:left-2 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-black shadow-md flex items-center gap-1.5 whitespace-nowrap z-20 ${
                    meta.badgeClass
                  } ${isSelected ? 'ring-2 ring-white scale-105' : ''}`}
                >
                  <span>#{obj.id}</span>
                  <span className="font-extrabold">{obj.name}</span>
                  <span className="opacity-90 hidden sm:inline">| {meta.vietnameseName}</span>
                  <span className="bg-black/20 px-1 rounded-sm text-[10px]">
                    {confidencePercent}%
                  </span>
                </div>

                {/* Reticle corner markers */}
                <span className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full border border-slate-500" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-slate-500" />
                <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full border border-slate-500" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full border border-slate-500" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
