import React from 'react';
import { X, ZoomIn, Download } from 'lucide-react';

export default function ImageModal({ isOpen, imageSrc, title, onClose }) {
  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-white border border-slate-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl text-slate-800">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="font-heading font-bold text-slate-900 text-xs sm:text-base truncate pr-3">
            {title || 'แสดงรูปภาพ'}
          </h3>
          <div className="flex items-center space-x-1.5">
            <a
              href={imageSrc}
              download
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition"
              title="เปิดในแท็บใหม่ / ดาวน์โหลด"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 overflow-auto p-3 sm:p-4 flex items-center justify-center bg-slate-100/70">
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[72vh] sm:max-h-[78vh] w-auto object-contain rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
