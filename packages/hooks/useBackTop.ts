export default function () {
  const backTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };
  return backTop;
}
