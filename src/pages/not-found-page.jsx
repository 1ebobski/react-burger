import notFoundStyles from "./styles/not-found.module.css";

export default function NotFoundPage() {
  return (
    <div className={notFoundStyles.container}>
      <span className='text text_type_digits-large'>404</span>
      <span className='mt-4 text text_type_main-medium'>
        cтраница не найдена
      </span>
    </div>
  );
}
