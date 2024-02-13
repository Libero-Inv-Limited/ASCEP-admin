import useDisclosure from "@/hooks/useDisclosure";
import { Dialog, DialogContent } from "../ui/dialog";
import { useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

export default function ReportImagesSlideShow({
  images,
}: {
  images: CommentImage[];
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div>
      <button className="underline text-primary" onClick={onOpen}>
        See Images
      </button>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-[90%] lg:min-w-[70%] !rounded-2xl lg:!rounded-[40px]">
          <div className="h-[500px] lg:h-[700px] overflow-y-auto p-3 ">
            <Swiper
              ref={swiperRef}
              navigation={true}
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={60}
              className="w-full h-full mySwiper"
              direction="horizontal"
              onActiveIndexChange={(e) => setActiveIndex(e.activeIndex)}
            >
              {images.map((image) => (
                <SwiperSlide key={image.id}>
                  <img
                    className="!object-contain w-full h-full"
                    src={image.file_url}
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex justify-center">
            <ImagesPagination
              goNext={goNext}
              goPrev={goPrev}
              activeIndex={activeIndex}
              length={images.length}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ImagesPaginationProps {
  goPrev: () => void;
  goNext: () => void;
  activeIndex: number;
  length: number;
}

const ImagesPagination = ({
  goPrev,
  activeIndex,
  goNext,
  length,
}: ImagesPaginationProps) => (
  <div className="flex items-center gap-4 text-xl">
    <div
      onClick={goPrev}
      className={`tesimonial-pagination !w-10 !h-10 ${
        activeIndex === 0 ? "opacity-30" : ""
      } `}
    >
      <VscChevronLeft />
    </div>
    <div
      onClick={goNext}
      className={`tesimonial-pagination !w-10 !h-10 ${
        activeIndex === length - 1 ? "opacity-30" : ""
      } `}
    >
      <VscChevronRight />
    </div>
  </div>
);
