import { FastAverageColor } from "fast-average-color";

export const getDominantColor = async (imageSrc) => {
  const fac = new FastAverageColor();
  try {
    const color = await fac.getColorAsync(imageSrc);
    return color.hex + "27";
  } catch (error) {
    console.error("Error extracting color:", error);
    return "#000"; // Default color
  }
};
