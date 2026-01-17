import { useEffect, useState } from "react"

type UseIsMobileReturnType = boolean | undefined

export function useIsMobile(breakpoint: number = 768): UseIsMobileReturnType {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // Set initial value
    const mobileQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    setIsMobile(mobileQuery.matches)

    // Update on resize
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mobileQuery.addEventListener("change", handler)
    return () => mobileQuery.removeEventListener("change", handler)
  }, [breakpoint])

  return isMobile
}
