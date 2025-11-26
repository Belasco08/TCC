import React from "react";
import "../styles/Servicos.css";
import Navbar from "../components/Navbar";

const Servicos: React.FC = () => {
  return (
    <div className="servicos-page">
      <Navbar activePage="servicos" />

      {/* Serviços */}
      <section className="services-section">
        <h2>Nossos Serviços</h2>
        <p>Conheça os serviços exclusivos que oferecemos para o conforto do seu pet.</p>

        <div className="services-grid">
          <div className="service-card">
            <i className="fas fa-dog icon"></i>
            <h3>Hospedagem</h3>
            <p>Ambientes confortáveis e seguros para seu pet se sentir em casa.</p>
          </div>

          <div className="service-card">
            <i className="fas fa-bone icon"></i>
            <h3>Alimentação Especial</h3>
            <p>Refeições balanceadas e adaptadas às necessidades do seu pet.</p>
          </div>

          <div className="service-card">
            <i className="fas fa-bath icon"></i>
            <h3>Banho</h3>
            <p>Cuidados estéticos com todo carinho e atenção que seu pet merece.</p>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="sobre-section">
        <div className="sobre-container">
          <div className="sobre-texto">
            <h2>Sobre Nós</h2>
            <p>
              O <strong>PetPalace</strong> nasceu da paixão pelos animais e do desejo
              de oferecer a eles um espaço confortável, seguro e cheio de carinho.
            </p>
            <p>
              Nossa missão é proporcionar momentos únicos para os pets e tranquilidade
              para seus donos, sabendo que seus companheiros estão em boas mãos.
            </p>
            <p>
              Contamos com uma equipe especializada e instalações modernas que fazem
              do PetPalace o lugar ideal para seu pet.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;
