"use client"

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'

const Carousel = ({ data }: { data: { image: string; text: string }[] }) => {
    const [currentImg, setCurrentImg] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)

    const [startPos, setStartPos] = useState(0) // Starting position of the drag/swipe
    const [isDragging, setIsDragging] = useState(false) // To track if dragging is in progress

    // Function to go to the next image
    const nextImage = () => {
        setCurrentImg((prev) => (prev === data.length - 1 ? 0 : prev + 1))
    }

    // Function to go to the previous image
    const prevImage = () => {
        setCurrentImg((prev) => (prev === 0 ? data.length - 1 : prev - 1))
    }

    useEffect(() => {
        // When the image changes, slide the carousel to the new image
        if (carouselRef.current) {
            carouselRef.current.style.transform = `translateX(-${currentImg * 100}%)`
        }
    }, [currentImg])

    // Handle mouse/touch start
    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        setIsDragging(true)
        if ('touches' in e) {
            setStartPos(e.touches[0].clientX)
        } else {
            setStartPos((e as React.MouseEvent).clientX)
        }
    }

    // Handle mouse/touch move
    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return
        let currentPos = 0
        if ('touches' in e) {
            currentPos = e.touches[0].clientX
        } else {
            currentPos = (e as React.MouseEvent).clientX
        }
        const diff = startPos - currentPos

        if (diff > 50) {
            // Swipe left - move to the next image
            nextImage()
            setIsDragging(false)
        } else if (diff < -50) {
            // Swipe right - move to the previous image
            prevImage()
            setIsDragging(false)
        }
    }

    // Handle mouse/touch end
    const handleTouchEnd = () => {
        setIsDragging(false)
    }

    return (
        <div
            className="flex flex-col items-center justify-center my-8"
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Carousel container */}
            <div className="relative w-full max-w-4xl overflow-hidden rounded-lg">
                {/* Flex container for sliding images */}
                <div
                    ref={carouselRef}
                    className="flex transition-transform duration-500 ease-in-out w-full"
                >
                    {/* Image rendering */}
                    {data.map((item, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-20">
                            <Image
                                src={item.image}
                                alt={'Could not load the image'}
                                layout="responsive"
                                width={1600}  // Set a realistic width
                                height={900}  // Set a realistic height to preserve aspect ratio
                                className="rounded-lg pointer-events-none"
                            />
                            <p className='text-center text-lg mt-6'>{item.text}</p>
                        </div>
                    ))}
                </div>

                {/* Navigation buttons */}
                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 opacity-75 hover:opacity-100"
                    onClick={prevImage}
                >
                    {"<"}
                </button>
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 opacity-75 hover:opacity-100"
                    onClick={nextImage}
                >
                    {">"}
                </button>
            </div>

            {/* Image index indicator */}
            <div className="mt-4">
                {data.map((_, index) => (
                    <span
                        key={index}
                        className={`mx-1 inline-block h-2 w-2 rounded-full ${
                            index === currentImg ? 'bg-blue-500' : 'bg-gray-400'
                        }`}
                    ></span>
                ))}
            </div>
        </div>
    )
}

export default Carousel;
