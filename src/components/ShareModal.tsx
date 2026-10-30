import React, { useState } from 'react';
import { X, Copy, Check, Share2, Facebook, MessageSquare, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, language }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPost, setCopiedPost] = useState(false);

  if (!isOpen) return null;

  const websiteUrl = 'https://ais-pre-k7hkvbohdvfe5ygdvgxni5-736838799983.asia-northeast1.run.app';
  
  const readyFacebookCaption = `⚡ لائبک سولر سلوشن ساہیوال (Laibak Solar Solution) ⚡
سولر انورٹر فٹنگ، نیٹ میٹرنگ گرین میٹر، ہاؤس وائرنگ، 3 فیز موٹر اور انڈسٹریل الیکٹرک کام تسلی بخش کروائیں۔

👨‍🔧 انجینئر: ایم اویس قرنی (M. Awais Qarni)
📍 پتہ: عارف روڈ، 135/9-ایل، ساہیوال
📞 موبائل / واٹس ایپ: 0305-7182735

ہماری آفیشل ویب سائٹ وزٹ کریں اور مفت لوڈ کیلکولیٹر اور ریٹ لسٹ چیک کریں:
👉 ${websiteUrl}

#Sahiwal #SolarEnergy #Electrician #LaibakSolarSolution #AwaisQarni #SolarPanels #Pakistan`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Assalam-o-Alaikum! Engr. M. Awais Qarni - Laibak Solar Solution Sahiwal ki official website check karein:\n${websiteUrl}\nPhone: 0305-7182735`
  )}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(websiteUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyPost = async () => {
    try {
      await navigator.clipboard.writeText(readyFacebookCaption);
      setCopiedPost(true);
      setTimeout(() => setCopiedPost(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-neutral-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {language === 'ur' ? 'ویب سائٹ شیئر کریں' : language === 'ur_roman' ? 'Website Facebook / WhatsApp Par Share Karein' : 'Share Website'}
              </h3>
              <p className="text-xs text-neutral-400">
                Laibak Solar Solution · Engr. M. Awais Qarni
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 pt-4">
          
          {/* 1-Click Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Facebook Button */}
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-3 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-sm rounded-xl shadow-lg transition-transform active:scale-95"
            >
              <Facebook className="w-5 h-5 fill-current" />
              <span>Facebook Par Post Karein</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* WhatsApp Button */}
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm rounded-xl shadow-lg transition-transform active:scale-95"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>WhatsApp Par Bhejein</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Website Link Box */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3">
            <div className="text-[11px] font-medium text-neutral-400 mb-1.5 flex items-center justify-between">
              <span>{language === 'ur' ? 'ویب سائٹ کا لنک:' : 'Official Website Link:'}</span>
              <span className="text-amber-400 font-mono text-[10px]">Live & Public</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={websiteUrl}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-neutral-200 select-all focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1.5 transition-colors ${
                  copiedLink
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
                }`}
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Ready-made Post Text for Facebook */}
          <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300">
                📝 Facebook Post Ka Tayar Text (Copy & Paste)
              </span>
              <button
                type="button"
                onClick={handleCopyPost}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                {copiedPost ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPost ? 'Text Copied!' : 'Copy Post Text'}</span>
              </button>
            </div>
            <div className="max-h-32 overflow-y-auto text-[11px] text-neutral-300 leading-relaxed font-sans bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-800/60 select-all whitespace-pre-line">
              {readyFacebookCaption}
            </div>
            <p className="text-[10px] text-neutral-400">
              💡 <strong className="text-neutral-200">Tip:</strong> Facebook open karein, &quot;What&apos;s on your mind?&quot; par yeh text paste karein, sath apni solar installation wali tasweer lagayein aur Post kar dein!
            </p>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-neutral-800 text-center">
          <p className="text-[11px] text-neutral-400">
            Arif Road, 135/9-L, Sahiwal · Phone: <span className="text-amber-400 font-mono">0305-7182735</span>
          </p>
        </div>

      </div>
    </div>
  );
};
