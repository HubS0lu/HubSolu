import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check } from 'lucide-react';
import getCroppedImg from '../utils/cropImage';

export default function ImageCropModal({ imageSrc, onCropComplete, onClose, aspect = 1 }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error(e);
      alert('Erro ao recortar imagem.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#212529]/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      <div className="bg-[#f8f9fa] w-full max-w-sm rounded-2xl shadow-xl relative z-10 flex flex-col h-[70vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="p-4 border-b border-[#e9ecef] flex justify-between items-center bg-white">
          <h2 className="font-bold text-[#212529]">Ajustar Imagem</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#f1f3f5] text-[#495057] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="relative flex-1 bg-black overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={setZoom}
          />
        </div>

        <div className="p-4 bg-white border-t border-[#e9ecef]">
          <div className="mb-4">
            <label className="text-xs font-semibold text-[#495057] mb-2 block">Zoom</label>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(e.target.value)}
              className="w-full accent-[#343a40]"
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-[#e9ecef] text-[#495057] font-bold text-sm rounded-xl hover:bg-[#dee2e6] transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleCrop}
              disabled={isProcessing}
              className="flex-1 py-3 bg-[#343a40] text-white font-bold text-sm rounded-xl hover:bg-[#212529] transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? 'Cortando...' : 'Aplicar'}
              {!isProcessing && <Check size={16} />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
