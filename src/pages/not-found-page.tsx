import notFoundStyles from "./styles/not-found.module.css";
import { Redirect, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface ILocation extends Location {
  background: ILocation;
  state: ILocation | undefined;
}

export default function NotFoundPage(): JSX.Element {
  const location = useLocation<ILocation>();
  const { pathname } = location;

  useEffect(() => {
    console.log(location);
  }, [location]);

  return pathname !== "/react-burger" ? (
    <div className={notFoundStyles.container}>
      <span className='text text_type_digits-large'>404</span>
      <span className='mt-4 text text_type_main-medium'>
        cтраница не найдена
      </span>
    </div>
  ) : (
    // small tweak to redirect to homepage from gh-pages default page
    <Redirect
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  );
}
