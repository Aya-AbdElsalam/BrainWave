import { useSelector } from "react-redux";
export const useLang = (En, Ar) => {
  const langRedux = useSelector((state) => state.langSlice.lang);
  const lang = langRedux === "En" ? En : Ar; // Determine the language object to return based on the current language.
  return lang;
};
