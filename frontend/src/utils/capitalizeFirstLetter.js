export default function capitalizeFirstLetter(s) {
  return (s && s[0].toUpperCase() + s.slice(1)) || s;
}
