import { Component, ErrorInfo, ReactNode } from "react";

export default class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean; } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log("Возникла ошибка!", error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // если возникла ошибка, сообщаем об этом пользователю в специальном компоненте:
      return (
        <section>
          <h1>Что-то пошло не так :(</h1>
          <p>
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
        </section>
      );
    }
    // если всё работает штатно, рендерим дочерние компоненты
    return this.props.children;
  }
}
