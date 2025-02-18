/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ["var(--font-inter)"],
    },
    extend: {
      fontSize: {
        32: "2rem", //32px
        "3xl": "1.875rem", //30px
        "2xl": "1.5rem", //24px
        xl: "1.25rem", //20px
        lg: "1.125rem", //18px
        base: "1rem", //16px
        15: "0.938rem", //15px
        sm: "0.875rem", //14px
        13: "0.8125rem", //13px
        xs: "0.75rem", //12px
        10: "0.625rem", //10px
      },
      fontWeight: {
        black: 900,
        extrabold: 800,
        bold: 700,
        semibold: 600,
        medium: 500,
        normal: 400,
        light: 300,
        extralight: 200,
      },
      lineHeight: {
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      colors: {
        // Base colors
        tc_primary: "#333333", // Dark black
        tc_secondary: "#4B5462", // Light black
        tc_accent: "#A5A9B1", // Gray
        tc_success: "#4AB07C", // Green
        tc_warning: "#DB8C15", // Orange
        tc_error: "#D45058", // Red
        tc_info: "#1890ff", // Blue
        tc_muted: "#d1d5db", // Muted gray
        tc_white: "#FFFFFF", // Pure white
        tc_black: "#000000", // Pure black
        // tc_transparent: rgba(0, 0, 0, 0), // Transparent

        tc_background_light: "#f6f9ff", // Light gray for background
        tc_background_dark: "#f0f0f0", // Medium gray for surfaces

        // Text colors
        tc_text_primary: "#333333", // Dark black text
        tc_text_secondary: "#4B5462", // Light black text
        tc_text_accent: "#A5A9B1", // Gray
        tc_text_muted: "#8C9097", // Muted gray for less important text

        // State colors
        tc_info: "#4586D7", // Soft blue for informational messages
        tc_warning: "#E6B800", // Warm yellow for warnings
        tc_error: "#E05353", // Muted red for errors
        tc_success: "#4CAF50", // Muted green for success messages

        // Border and outline
        tc_border: "#D1D5DB", // Dark gray for borders
        tc_outline: "#666666", // Medium gray for outlines

        // Custom accent palette
        tc_custom: {
          purple: "#6366f1", // Creamy purple
          green: "#00c696", // Creamy green
          yellow: "#FFFF00", // Creamy yellow
          indigo: "#484C7F", // Soft indigo
          red: "#E05353",
          blue: "#4A90E2",
          orange: "#D6883E", // Muted orange
        },

        // Shadows and highlights
        tc_shadow: "#1A1A1A88", // Semi-transparent black for shadows
        tc_highlight: "#E5E5E588", // Semi-transparent white for highlights

        // Overlay
        tc_ol_1: "rgba(20, 20, 20, 0.75)", // Dark overlay
      },

      backgroundImage: {
        // 'auth-pattern': 'linear-gradient(45deg, #473888 0%, #7C62EE 100%)',
        "border-pattern":
          "linear-gradient(to right, #37C6DE, #F39E3E, #EA407D, #C2D527)",
      },
      boxShadow: {
        "ds-1": "0 5px 10px 0 rgba(30, 41, 59, 0.05)",
        "ds-2": "0 2px 4.6px 0 rgba(22, 51, 98, 0.08)",
      },
    },
  },
  plugins: [],
};
