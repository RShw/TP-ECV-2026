export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
export function randomColor() {
    const h = randomInt(0, 360);
    const s = randomInt(60, 85);
    const l = randomInt(45, 65);
    return `hsl(${h} ${s}% ${l}%)`;
}

export const isNumber = (value: any) => {
    return typeof value === "number" && !isNaN(value);
}