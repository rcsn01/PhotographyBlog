import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

// Ensure you're importing CSS correctly (note: .module.css should be imported with a name)
import styles from "./Masonry.module.css";

import NextImage from "next/image";


const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    const index = queries.findIndex((q) => window.matchMedia(q).matches);
    return values[index] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = () => setValue(get);
    const mqls = queries.map((q) => window.matchMedia(q));
    mqls.forEach((mql) => mql.addEventListener("change", handler));

    return () => {
      mqls.forEach((mql) => mql.removeEventListener("change", handler));
    };
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
    const columns = useMedia(
    [
        "(min-width: 1600px)",  // Extra large screens
        "(min-width: 1200px)",  // Large desktop
        "(min-width: 900px)",   // Tablet landscape
        "(min-width: 600px)"    // Tablet portrait
    ],
    [5, 4, 3, 2],  // More columns at each breakpoint
    1              // Single column on mobile
    );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  //const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"];
      direction = directions[
        Math.floor(Math.random() * directions.length)
      ] as typeof animateFrom;
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  /*
  useEffect(() => {
    if (items.length > 0) {
      preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
    }
  }, [items]);
  */

    const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];

    const gapSize = 10; // Match this with your CSS gap
    const colHeights = new Array(columns).fill(0);
    const columnWidth = (width - (columns - 1) * gapSize) / columns;

    return items.map((child) => {
        const col = colHeights.indexOf(Math.min(...colHeights));
        const x = columnWidth * col + gapSize * col; // Add gap offset
        const height = child.height / 2;
        const y = colHeights[col];

        colHeights[col] += height + gapSize; // Add gap to height calculation

        return { ...child, x, y, w: columnWidth, h: height };
    });
    }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    //if (!imagesReady || !containerRef.current) return;
    if (!containerRef.current) return;

    grid.forEach((item, index) => {
      const element = containerRef.current?.querySelector(`[data-key="${item.id}"]`);
      if (!element) return;

      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        gsap.set(element, {
          position: "absolute",
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        });

        gsap.to(element, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: duration,  // Using prop
          ease: ease,         // Using prop
          delay: index * stagger,
        });
      } else {
        gsap.to(element, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [grid, stagger, animateFrom, blurToFocus, duration, ease, containerRef]);

  const handleMouseEnter = (e: React.MouseEvent, item: GridItem) => {
    const element = e.currentTarget as HTMLElement;
    
    if (scaleOnHover) {
      gsap.to(element, {
        scale: hoverScale,
        duration: 0.3,
        ease: "linear",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent, item: GridItem) => {
    const element = e.currentTarget as HTMLElement;
    
    if (scaleOnHover) {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "linear",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  if (!items.length) {
    return <div>No items to display</div>;
  }

  return (
    <div 
      ref={containerRef} 
      className={styles.list}
      style={{
        position: "relative",
        width: "95%",
        minHeight: "100vh",
      }}
    >
      {grid.map((item, index) => (
        <div
          key={item.id}
          data-key={item.id}
          className={styles.itemWrapper}
          style={{
            position: "absolute",
            overflow: "hidden",
            //borderRadius: "0px",
            cursor: "pointer",
            willChange: "transform", // Add this
          }}
          onClick={() => window.open(item.url, "_blank", "noopener")}
          onMouseEnter={(e) => handleMouseEnter(e, item)}
          onMouseLeave={(e) => handleMouseLeave(e, item)}
        >
          <div
            className={styles.itemImg}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <NextImage
              src={item.img}
              alt=""
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
                borderRadius: "0px",
                margin: "0 auto",
              }}
              placeholder="empty"
              loading="lazy"
              // 💡 Pass stagger delay via closure
              onLoadingComplete={() => {
                const element = document.querySelector(`[data-key="${item.id}"]`);
                if (!element) return;

                const initialPos = getInitialPosition(item);

                gsap.set(element, {
                  position: "absolute",
                  opacity: 0,
                  x: initialPos.x,
                  y: initialPos.y,
                  width: item.w,
                  height: item.h,
                  ...(blurToFocus && { filter: "blur(10px)" }),
                });

                gsap.to(element, {
                  opacity: 1,
                  x: item.x,
                  y: item.y,
                  width: item.w,
                  height: item.h,
                  ...(blurToFocus && { filter: "blur(0px)" }),
                  duration,
                  ease,
                  delay: index * stagger, // 🎯 Add stagger here
                });
              }}
            />
            {colorShiftOnHover && (
              <div
                className="color-overlay"
                style={{
                  //position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </div>
      ))}

    </div>
  );
};

export default Masonry;