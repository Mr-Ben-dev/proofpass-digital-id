import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  value: string;
  size?: number;
}

export const QRCode = ({ value, size = 128 }: QRCodeProps) => {
  return (
    <div className="p-4 bg-white rounded-lg">
        <QRCodeSVG value={value} size={size} />
    </div>
  );
};
