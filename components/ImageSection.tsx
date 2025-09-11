import ParallaxAnimation from "./ParallaxAnimation";
interface ImageSectionProps {
  imageUrl: string;
}

function ImageSection({ imageUrl }: ImageSectionProps) {
  return (
    <ParallaxAnimation
      imagePath={imageUrl}
      height="h-[430px]"
      overlayColor="rgba(0,74,119,0.4)"
      speed={0.3}
    />
  );
}

export default ImageSection;
