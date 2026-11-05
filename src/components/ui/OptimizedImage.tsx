import { memo, useState, type ImgHTMLAttributes } from 'react';

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export const OptimizedImage = memo(function OptimizedImage({ fallbackSrc, onError, ...props }: OptimizedImageProps) {
  const [source, setSource] = useState(props.src);

  const handleError: NonNullable<ImgHTMLAttributes<HTMLImageElement>['onError']> = (event) => {
    if (fallbackSrc && source !== fallbackSrc) {
      setSource(fallbackSrc);
    }
    onError?.(event);
  };

  return <img {...props} src={source} onError={handleError} />;
});
