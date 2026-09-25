import eyebrush from "@/assets/eyebrush_image.jpg";
import { MapPin } from "lucide-react";
import { useState } from "react";
export const MakeNote = () => {
  const [step, setStep] = useState(0);
  const stepTitles = [
    "Выберите услугу",
    "Дата и время",
    "Проверьте запись"
  ];
  const handleSetStep = () => {
    setStep((value) => value++);
  };
  return (
    <div className="flex flex-col gap-4 ">
      {step == 0 && (
        <div className="flex flex-col items-start gap-2">
          <img
            src={eyebrush}
            alt="eyebrush_image"
            className="w-full rounded-3xl object-cover h-36 md:h-44"
          />
          <h2 className="text-3xl w-[70%]">
            Брови, которые{" "}
            <span className="italic text-textsecond ">
              подчеркивают Вас
            </span>
          </h2>
          <span className="flex flex-row gap-1 items-center text-textsecond opacity-80 text-sm">
            <MapPin />
            <a
              href="https://maps.app.goo.gl/spuJ2s85kG7bScbJ9"
              rel="noopener noreferrer"
              target="_blank"
            >
              {" "}
              Елизавета Чиндо | пр. Фрунзе, 23к2 | 5 этаж,
              102A
            </a>
          </span>
        </div>
      )}

      <div className="flex flex-col w-full">
        <div className="flex gap-1.5" aria-hidden>
          {stepTitles.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-200 ${i <= step ? "bg-textsecond" : "bg-line"}`}
            />
          ))}
        </div>
      </div>
      <div className="py-2 border-t-2 border-secondbg absolute bottom-0 w-full max-w-110">
        <button
          className="w-full rounded-xl cursor-pointer text-white bg-textsecond sticky h-10 disabled:opacity-45"
          onClick={handleSetStep}
          disabled
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};
