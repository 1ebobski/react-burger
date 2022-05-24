import { ILoader } from "../../types";
import style from "./loader.module.css";
import { LoaderSvg } from "./loader.svg";

const loaderSizes = {
  small: 16,
  medium: 24,
  large: 120,
};
function Loader({ size, inverse = false }: ILoader) {
  const loaderColor = inverse ? "#fff" : "#4c4cff";

  const wrapperStyleKey = "wrapper_" + size;
  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
    </div>
  );
}

export default Loader;
