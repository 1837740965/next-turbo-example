import { createRoot } from "react-dom/client";
import { clsx } from "clsx";
import styles from "./styles/message.module.css";

type MessageType =
  | "primary"
  | "success"
  | "warn"
  | "danger"
  | "info"
  | undefined;

type TemplateProps = {
  children?: React.ReactNode;
  type?: MessageType;
};

type Props = {
  type?: MessageType;
  duration?: number;
  callback?: () => void;
};

type Options = Omit<Props, "type">;

/**
 * message template component
 */
function Template({ children, type }: TemplateProps) {
  return (
    <div
      className={clsx(
        "z-[999] inline-block leading-8 px-4 my-2 text-xs text-white rounded-sm shadow-lg pointer-events-auto cursor-pointer",
        {
          "bg-gray-100 !text-slate-600": !type,
          "bg-blue-500": type === "primary",
          "bg-green-500": type === "success",
          "bg-red-500": type === "danger",
          "bg-yellow-500": type === "warn",
          "bg-gray-500": type === "info",
        }
      )}
    >
      {children}
    </div>
  );
}

class Message {
  private type?: MessageType;

  private callback?: () => void;

  private duration?: number;

  constructor(props: Props) {
    this.type = props.type;
    this.callback = props.callback;
    this.duration = props.duration;
  }

  /**
   *
   * create message dom container
   *
   * @returns dom element
   */
  createMessageContainer() {
    const id = "message-container";

    let container = document.getElementById(id);

    if (!container) {
      container = document.createElement("div");
      container.id = id;
      container.className = styles.messageContainer;
      document.body.appendChild(container);
    }

    const messageContainer = document.createElement("div");

    container.appendChild(messageContainer);
    return {
      container: messageContainer,
      animateOpen() {
        messageContainer.className = styles.messageOpen;
      },
      animateClose() {
        messageContainer.className = styles.messageClose;
      },
    };
  }

  /**
   * render message component
   */
  render(content: string) {
    const { type, duration = 3000, callback } = this;

    const timeArr: NodeJS.Timeout[] = [];

    const messageContainer = this.createMessageContainer();

    const syncClose = () => {
      if (duration > 300) {
        timeArr.push(
          setTimeout(() => {
            messageContainer.animateClose();
          }, duration - 300)
        );
      }
      timeArr.push(
        setTimeout(() => {
          messageContainer.container.remove();
        }, duration)
      );
    };

    messageContainer.container.addEventListener("mouseenter", () => {
      timeArr.forEach((index) => clearTimeout(index));
    });

    messageContainer.container.addEventListener("mouseleave", () => {
      syncClose();
    });

    const root = createRoot(messageContainer.container);

    root.render(<Template type={type}>{content}</Template>);

    messageContainer.animateOpen();

    syncClose();

    callback && callback();
  }
}

const _Message = {
  message(msg: string, options?: Options) {
    new Message({ ...options }).render(msg);
  },
  primary(msg: string, options?: Options) {
    new Message({ type: "primary", ...options }).render(msg);
  },
  success(msg: string, options?: Options) {
    new Message({ type: "success", ...options }).render(msg);
  },
  danger(msg: string, options?: Options) {
    new Message({ type: "danger", ...options }).render(msg);
  },
  warn(msg: string, options?: Options) {
    new Message({ type: "warn", ...options }).render(msg);
  },
  info(msg: string, options?: Options) {
    new Message({ type: "info", ...options }).render(msg);
  },
};
export default _Message;
