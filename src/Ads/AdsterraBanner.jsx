
import { useEffect, useRef } from "react";
import "./AdsterraBanner.css";

const AdsterraBanner = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    const container = bannerRef.current;

    if (!container) return;

    // Configuración de tu banner
    window.atOptions = {
      key: "b736bdf13da25346f2a7fc99f29cea1d",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    // Cargar el script de Adsterra
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.highrevenueformat.com/" +
      window.atOptions.key +
      "/invoke.js";
    script.async = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <section className="ad-section" aria-label="Publicidad">
      <p className="ad-label">Publicidad</p>

      <div className="ad-container">
        <div ref={bannerRef} className="ad-banner" />
      </div>
    </section>
  );
};

export default AdsterraBanner;