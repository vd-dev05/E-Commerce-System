import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect } from "react";

// params:
//  slides: mang cac anh cua slide
//  currentSlide: so thu tu cua slide hien tai
//  setCurrentSlide: ham set lai gia tri cua currentSlide


export const SilderHome = ({slides,currentSlide ,setCurrentSlide}) => {
 
    
    return ( 
        <div className={`relative h-[300px] overflow-hidden `}>
        {
            slides.map((slide, index) =>
            (
                <img
                    src={slide}
                    key={index}
                    className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'}  absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                    alt={`Slide ${index}`}
                />
            )
            )

        }
        <Button
        
        variant='outline' size='icon' className='absolute top-1/2 left-4 transform -translate-y-1/2  ' onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
            <ChevronLeftIcon className='size-4' />
        </Button>
        <Button variant='outline' size='icon' className='absolute top-1/2 right-4 transform -translate-y-1/2  ' onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} >
            <ChevronRightIcon className='size-4' />
        </Button>
    </div>
     );
}
 
