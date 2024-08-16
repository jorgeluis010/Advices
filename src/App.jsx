import React, { useState } from 'react';
import './App.css';


const App = () => {
  const [advice, setAdvice] = useState('');
  const [translatedAdvice, setTranslatedAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      const adviceText = data.slip.advice;
      setAdvice(adviceText);

      // Verifique se existe uma tradução disponível
      const translatedText = translations[adviceText] || "Tradução não disponível";
      setTranslatedAdvice(translatedText);

    } catch (error) {
      console.error("Erro ao buscar conselho:", error);
    } finally {
      setLoading(false);
    }
  };

  const openGoogleTranslator = () => {
    const url = `https://www.google.com/search?q=tradutor&rlz=1C1GCEU_pt-BRBR1123&oq=tradutor&gs_lcrp=EgZjaHJvbWUyDwgAEEUYORiDARixAxiABDINCAEQABiDARixAxiABDIHCAIQABiABDINCAMQABiDARixAxiABDINCAQQABiDARixAxiABDINCAUQABiDARixAxiABDINCAYQABiDARixAxiABDINCAcQABiDARixAxiABDINCAgQABiDARixAxiABDIHCAkQABiPAtIBCTI2ODZqMGoxNagCCLACAQ&sourceid=chrome&ie=UTF-8`;
    window.open(url, '_blank');
  };

  return (
    <div className="container">
      <h1 className="title">Gerador de Conselhos</h1>
      <div className="card">
        <p className="advice">
          {loading ? 'Carregando...' : advice || 'Clique no botão para obter um conselho!'}
        </p>
        <p className="translation">
          {loading ? '' : translatedAdvice}
        </p>
        {advice && (
          <button
            className="translate-button"
            onClick={openGoogleTranslator}
          >
            Traduzir com Google Tradutor
          </button>
        )}
        <button className="button" onClick={fetchAdvice} disabled={loading}>
          {loading ? 'Buscando...' : 'Obter Conselho'}
        </button>
      </div>
    </div>
  );
};

export default App;
