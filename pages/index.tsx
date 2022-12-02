import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Message from "@/ui/Message";
import Button from "@/ui/Button";
import Image from "next/image";

export default function Home() {
  const frameworks = [
    {
      logo: "https://react.docschina.org/favicon.ico",
      name: "React 18",
    },
    {
      logo: "https://nextjs.org/static/favicon/favicon.ico",
      name: "Next JS",
    },
    {
      logo: "https://tailwindcss.com/favicons/favicon-32x32.png?v=3",
      name: "Tailwind CSS",
    },
    {
      logo: "https://turbo.build/images/favicon-light/favicon-32x32.png",
      name: "Turbo",
    },
  ];

  return (
    <div className="container min-h-screen mx-auto px-4 flex justify-center items-center">
      <div>
        <div className="mb-10">
          <h1 className="text-center text-xl mb-4">
            Custom Message and Button component
          </h1>
          <div className="text-sm text-center text-slate-600">
            click button to toast!
          </div>
        </div>
        <div className="py-4 flex [&>*]:mx-4 mb-10">
          <Button
            rounded
            htmlType="submit"
            prefix={<FontAwesomeIcon icon={faSearch} />}
            onClick={() => Message.message("message", { duration: 5000 })}
          >
            default
          </Button>
          <Button
            rounded
            type="primary"
            prefix={<FontAwesomeIcon icon={faSearch} />}
            onClick={() => Message.primary("primary")}
          >
            primary
          </Button>
          <Button
            rounded
            type="danger"
            onClick={() => Message.danger("danger")}
          >
            danger
          </Button>
          <Button rounded type="warn" onClick={() => Message.warn("warn")}>
            warn
          </Button>
          <Button
            rounded
            type="success"
            onClick={() => Message.success("success")}
          >
            success
          </Button>
          <Button rounded type="info" onClick={() => Message.info("info")}>
            info
          </Button>
        </div>
        <h1 className="text-xl text-center mb-10">Frameworks</h1>
        <div className="flex justify-between">
          {frameworks.map((framework) => (
            <div
              className="flex flex-col justify-center items-center w-32 h-32"
              key={framework.name}
            >
              <img
                src={framework.logo as string}
                alt=""
                width="45"
                height="45"
              />
              <div className="mt-4 text-xs text-slate-600">
                {framework.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
