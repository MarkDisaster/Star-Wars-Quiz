export default function img(file) {
   const image = new Image();
   image.src = 'sprites/divided/' + file;
   return image
}