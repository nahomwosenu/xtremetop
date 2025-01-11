import { Navigate, useParams } from "react-router-dom";

const LanguageWrapper = () => {
    const { lang } = useParams(); // Get the language from the URL
    const validLanguages = ["en", "en-uk", "fr", "es", "it"]; // Add all supported languages

    // Check if the language is valid, default to 'en'
    const normalizedLang = validLanguages.includes(lang || "en") ? lang : "en";

    // Strip the language prefix and render the corresponding component
    const subPath = window.location.pathname.replace(`/${lang}`, "") || "/";
    return <></>
};
export default LanguageWrapper;