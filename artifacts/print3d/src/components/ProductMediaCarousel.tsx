import { useCallback, useEffect, useState } from 'react';
import { Film, ImageOff, Maximize2 } from 'lucide-react';
import { Product, ProductMedia, getPrimaryProductMedia } from '@/data/products';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ProductMediaCarouselProps {
  product: Product;
}

interface ProductMediaFrameProps {
  media: ProductMedia;
  alt: string;
  fullscreen?: boolean;
}

function getPublicMediaUrl(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
}

export function ProductMediaFrame({ media, alt, fullscreen = false }: ProductMediaFrameProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [media.src]);

  if (failed) {
    return (
      <div
        className={cn(
          'relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 px-5 text-center',
          fullscreen ? 'py-12' : 'py-6'
        )}
        style={{ color: '#94A3B8' }}
      >
        {media.type === 'gif' ? (
          <Film className={cn('shrink-0', fullscreen ? 'h-12 w-12' : 'h-8 w-8')} style={{ color: '#22D3EE' }} />
        ) : (
          <ImageOff className={cn('shrink-0', fullscreen ? 'h-12 w-12' : 'h-8 w-8')} style={{ color: '#22D3EE' }} />
        )}
        <span className={cn('font-semibold', fullscreen ? 'text-base' : 'text-xs')} style={{ color: '#CBD5E1' }}>
          {media.label}
        </span>
        <span
          className={cn(
            'max-w-full break-words rounded border px-2 py-1 font-mono leading-relaxed',
            fullscreen ? 'text-sm' : 'text-[10px]'
          )}
          style={{
            borderColor: 'rgba(34,211,238,0.18)',
            backgroundColor: 'rgba(15,23,42,0.72)',
            color: '#64748B',
          }}
        >
          {media.placeholderName}
        </span>
      </div>
    );
  }

  return (
    <img
      src={getPublicMediaUrl(media.src)}
      alt={alt}
      className={cn(
        'relative z-10 h-full w-full object-contain transition-transform duration-500',
        fullscreen ? 'p-4 sm:p-8' : 'p-5 group-hover:scale-105'
      )}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function MediaCarouselBody({
  product,
  fullscreen = false,
  startIndex = 0,
  onOpenFullscreen,
  onActiveIndexChange,
}: {
  product: Product;
  fullscreen?: boolean;
  startIndex?: number;
  onOpenFullscreen?: (index: number) => void;
  onActiveIndexChange?: (index: number) => void;
}) {
  const media = product.media?.length ? product.media : [getPrimaryProductMedia(product)];
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const canNavigate = media.length > 1;

  const updateActiveIndex = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setActiveIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    updateActiveIndex(api);
    api.on('select', updateActiveIndex);
    api.on('reInit', updateActiveIndex);

    return () => {
      api.off('select', updateActiveIndex);
      api.off('reInit', updateActiveIndex);
    };
  }, [api, updateActiveIndex]);

  useEffect(() => {
    onActiveIndexChange?.(activeIndex);
  }, [activeIndex, onActiveIndexChange]);

  return (
    <div className="relative h-full">
      <Carousel
        opts={{ align: 'start', loop: canNavigate, startIndex }}
        setApi={setApi}
        className="h-full"
      >
        <CarouselContent className="ml-0 h-full">
          {media.map((item) => (
            <CarouselItem key={item.placeholderName} className="h-full pl-0">
              {onOpenFullscreen ? (
                <button
                  type="button"
                  className="h-full w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  onClick={() => onOpenFullscreen(activeIndex)}
                  aria-label={`Ver ${product.name} em tela cheia`}
                >
                  <ProductMediaFrame
                    media={item}
                    alt={`${product.name} - ${item.label}`}
                    fullscreen={fullscreen}
                  />
                </button>
              ) : (
                <ProductMediaFrame
                  media={item}
                  alt={`${product.name} - ${item.label}`}
                  fullscreen={fullscreen}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        {canNavigate && (
          <>
            <CarouselPrevious
              className={cn(
                'left-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 border-white/10 bg-black/45 text-white hover:bg-black/65',
                fullscreen && 'left-3 h-10 w-10'
              )}
            />
            <CarouselNext
              className={cn(
                'right-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 border-white/10 bg-black/45 text-white hover:bg-black/65',
                fullscreen && 'right-3 h-10 w-10'
              )}
            />
          </>
        )}
      </Carousel>

      <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
        {media.map((item, index) => (
          <span
            key={item.placeholderName}
            className={cn(
              'h-1.5 rounded-full transition-all',
              index === activeIndex ? 'w-5' : 'w-1.5'
            )}
            style={{
              backgroundColor: index === activeIndex ? '#F97316' : 'rgba(203,213,225,0.45)',
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div
        className="absolute right-2 top-2 z-20 rounded px-2 py-0.5 text-xs font-semibold"
        style={{
          backgroundColor: 'rgba(11,15,20,0.85)',
          color: '#CBD5E1',
          border: '1px solid rgba(148,163,184,0.16)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {activeIndex + 1}/{media.length}
      </div>
    </div>
  );
}

export function ProductMediaCarousel({ product }: ProductMediaCarouselProps) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [fullscreenStartIndex, setFullscreenStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const openFullscreen = (index: number) => {
    setFullscreenStartIndex(index);
    setFullscreenOpen(true);
  };

  return (
    <>
      <MediaCarouselBody
        product={product}
        onOpenFullscreen={openFullscreen}
        onActiveIndexChange={setActiveIndex}
      />

      <button
        type="button"
        className="absolute bottom-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        style={{
          backgroundColor: 'rgba(11,15,20,0.85)',
          borderColor: 'rgba(148,163,184,0.16)',
          color: '#CBD5E1',
          backdropFilter: 'blur(4px)',
        }}
        onClick={() => openFullscreen(activeIndex)}
        aria-label={`Abrir fotos de ${product.name} em tela cheia`}
      >
        <Maximize2 className="h-4 w-4" />
      </button>

      <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-6xl gap-0 overflow-hidden border-slate-700 bg-[#0B0F14] p-0 text-white sm:rounded-xl">
          <div className="border-b border-white/10 px-5 py-4 pr-12">
            <DialogTitle className="text-base font-semibold text-slate-50">
              {product.name}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Carrossel com 3 fotos e 1 GIF do produto.
            </DialogDescription>
          </div>
          <div className="h-[min(78vh,760px)]">
            <MediaCarouselBody
              product={product}
              fullscreen
              startIndex={fullscreenStartIndex}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
