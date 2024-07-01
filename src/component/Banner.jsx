import { useLang } from "../hooks/useLang"; // Importing a custom hook for language switching.
import enLang from "../langeages/Banner/enLang.json";
import arLang from "../langeages/Banner/arLang.json";

export default function Banner() {
  const lang = useLang(enLang, arLang); // Using the custom hook to get the current language .
  return (
    <section className="banner">
      <div>
        <p>{lang.Becreative}</p>
        <button>{lang.Exploremore}</button>
      </div>
    </section>
  );
}
