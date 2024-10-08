import React from 'react';
import Image, { StaticImageData} from 'next/image';

interface ImageProps {
  src: StaticImageData;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const CustomImage: React.FC<ImageProps> = ({ src, alt, width, height, className }) => {
  return <Image src={src} alt={alt} width={width} height={height} className={className} />;
};

export default CustomImage;
