"use client"

import { useEffect, useState } from "react"
import type { Variants } from "framer-motion"

export const useAnimate = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // 淡入动画
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  }

  // 向上滑动动画
  const slideUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
        ease: "easeOut",
      },
    }),
  }

  // 向右滑动动画
  const slideIn: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
        ease: "easeOut",
      },
    }),
  }

  // 缩放动画
  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
        ease: [0.34, 1.56, 0.64, 1], // 弹性动画
      },
    }),
  }

  // 弹跳动画
  const bounce: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (custom = 0) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    }),
  }

  // 旋转动画
  const rotate: Variants = {
    hidden: { opacity: 0, rotate: -180 },
    visible: (custom = 0) => ({
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.1,
        ease: "easeOut",
      },
    }),
  }

  // 波浪动画
  const wave: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
        ease: (t) => Math.sin(t * Math.PI * 2) * 0.5 + 0.5,
      },
    }),
  }

  return {
    isLoaded,
    fadeIn,
    slideUp,
    slideIn,
    scaleIn,
    bounce,
    rotate,
    wave,
  }
}

