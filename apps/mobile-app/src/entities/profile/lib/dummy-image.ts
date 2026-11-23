import men1 from "@urekoi/core/assets/profiles/men-1.webp";
import woman1 from "@urekoi/core/assets/profiles/woman-1.webp";
import woman3 from "@urekoi/core/assets/profiles/woman-3.webp";

// 写真がまだないので、ID でダミー画像を決める
const dummyImages = [woman1, woman3, men1];

export function getDummyImage(id: number) {
  return dummyImages[id % dummyImages.length];
}
