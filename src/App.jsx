import { useEffect, useState } from 'react';
import { REVIEWS_URL, WHATSAPP_NUMBER } from './config.js';

const navItems = [
  ['Início', '#inicio'],
  ['Sobre', '#sobre'],
  ['Serviços', '#servicos'],
  ['Avaliações', '#avaliacoes'],
  ['Contato', '#contato'],
];

const services = [
  {
    id: 'cftv',
    number: '01',
    title: 'CFTV e monitoramento',
    description: 'Mais visibilidade e controle para acompanhar o que acontece no seu imóvel.',
    detail: 'Câmeras, gravação e visualização remota.',
    icon: 'camera',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'cerca',
    number: '02',
    title: 'Cerca elétrica',
    description: 'Uma camada extra de proteção para o perímetro da sua casa ou empresa.',
    detail: 'Projeto, instalação e manutenção.',
    icon: 'zap',
    image: 'https://images.unsplash.com/photo-1549109926-9620d1b9bfa2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
  {
    id: 'automacao',
    number: '03',
    title: 'Automação',
    description: 'Recursos inteligentes para tornar o dia a dia mais prático e conectado.',
    detail: 'Acesso, iluminação e rotinas inteligentes.',
    icon: 'sliders',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=85',
  },
];

function Icon({ name, size = 22, strokeWidth = 1.8 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    arrowUp: <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    camera: <><path d="M14 5h-4l-1.5 2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5L14 5Z"/><circle cx="12" cy="13" r="3"/></>,
    zap: <><path d="m13 2-3 8h7l-6 12 1-9H5l8-11Z"/></>,
    sliders: <><path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    close: <><path d="m18 6-12 12"/><path d="m6 6 12 12"/></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/></>,
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9"/><path d="M9 21v-7h6v7"/></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/></>,
    quote: <><path d="M3 21c3 0 5-2 5-5V5H2v7h4c0 2-1 3-3 3v6Z"/><path d="M14 21c3 0 5-2 5-5V5h-6v7h4c0 2-1 3-3 3v6Z"/></>,
  };
  return <svg {...common}>{paths[name] || paths.shield}</svg>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', property: 'Residencial', service: '', city: '', message: '' });
  const [formNotice, setFormNotice] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFormNotice('');
    setCopied(false);
  };

  const chooseService = (service) => {
    setForm((current) => ({ ...current, service }));
    document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  const makeMessage = () => [
    'Olá! Gostaria de solicitar um atendimento com a MS Soluções.',
    '',
    `Nome: ${form.name}`,
    `Telefone: ${form.phone}`,
    `Tipo de imóvel: ${form.property}`,
    `Serviço de interesse: ${form.service || 'A definir'}`,
    `Cidade/bairro: ${form.city || 'Não informado'}`,
    `Detalhes: ${form.message || 'Gostaria de receber mais informações.'}`,
  ].join('\n');

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = makeMessage();
    if (WHATSAPP_NUMBER.trim()) {
      const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setFormNotice('Sua solicitação foi preparada. Finalize o envio na conversa do WhatsApp.');
    } else {
      setFormNotice('Sua mensagem está pronta. Para encaminhá-la, copie o texto e envie pelo canal de atendimento da MS Soluções.');
      setForm((current) => ({ ...current, message: current.message }));
      window.__msContactMessage = message;
    }
  };

  const copyMessage = async () => {
    const message = window.__msContactMessage || makeMessage();
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setFormNotice('Não foi possível copiar automaticamente. Selecione e copie os dados preenchidos.');
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#inicio" onClick={closeMenu} aria-label="MS Soluções — início">
            <span className="brand-mark"><Icon name="shield" size={24} /></span>
            <span className="brand-copy"><strong>MS<span>.</span></strong><small>SOLUÇÕES</small></span>
          </a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
            <a className="nav-mobile-cta" href="#contato" onClick={closeMenu}>Solicitar orçamento <Icon name="arrow" size={16} /></a>
          </nav>
          <a className="button button-small nav-cta" href="#contato">Solicitar orçamento <Icon name="arrow" size={16} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <Icon name={menuOpen ? 'close' : 'menu'} size={25} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-anchor" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> SEGURANÇA • TECNOLOGIA • AUTOMAÇÃO</div>
              <h1>Proteção inteligente para o que <em>importa.</em></h1>
              <p className="hero-description">Soluções em CFTV, cerca elétrica e automação para casas e empresas. Mais controle, praticidade e tranquilidade no seu dia a dia.</p>
              <div className="hero-actions">
                <a className="button" href="#contato">Solicitar uma avaliação <Icon name="arrow" size={18} /></a>
                <a className="text-link" href="#servicos">Conhecer soluções <Icon name="arrowUp" size={16} /></a>
              </div>
              <div className="hero-points">
                <span><Icon name="check" size={16} /> Para casas e empresas</span>
                <span><Icon name="check" size={16} /> Soluções sob medida</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-wrap">
                <img src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="Câmera de segurança instalada em ambiente moderno" fetchPriority="high" />
                <div className="image-shade" />
                <div className="image-caption"><span className="live-dot" /> Tecnologia a favor da sua segurança</div>
              </div>
              <div className="floating-card floating-card-top"><span className="floating-icon"><Icon name="shield" size={21} /></span><span><strong>Proteção conectada</strong><small>Mais controle para sua rotina</small></span></div>
              <div className="floating-card floating-card-bottom"><span className="floating-number">MS</span><span><strong>Segurança e automação</strong><small>Uma solução para cada espaço</small></span></div>
              <div className="hero-orbit" />
            </div>
          </div>
          <div className="hero-bottom-line"><div className="container hero-bottom-inner"><span>TECNOLOGIA QUE PROTEGE</span><span className="bottom-line"/><span>MS SOLUÇÕES</span></div></div>
        </section>

        <section className="intro-strip" aria-label="Áreas de atuação">
          <div className="container intro-strip-grid">
            <div><span className="strip-icon"><Icon name="camera" /></span><span><strong>CFTV</strong><small>Monitoramento e controle</small></span></div>
            <div><span className="strip-icon"><Icon name="zap" /></span><span><strong>Cerca elétrica</strong><small>Proteção perimetral</small></span></div>
            <div><span className="strip-icon"><Icon name="sliders" /></span><span><strong>Automação</strong><small>Praticidade inteligente</small></span></div>
          </div>
        </section>

        <section className="about section section-anchor" id="sobre">
          <div className="container about-grid">
            <div className="about-visual">
              <div className="about-photo-main"><img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1100&q=85" alt="Profissional trabalhando com tecnologia e instalação" loading="lazy" /></div>
              <div className="about-photo-small"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=650&q=85" alt="Detalhe de componentes eletrônicos" loading="lazy" /></div>
              <div className="about-stamp"><Icon name="shield" size={25} /><span>MS</span><small>SEGURANÇA<br/>E TECNOLOGIA</small></div>
            </div>
            <div className="about-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> SOBRE A MS SOLUÇÕES</div>
              <h2>Tecnologia bem aplicada. <em>Mais tranquilidade</em> no dia a dia.</h2>
              <p>A MS Soluções trabalha com segurança e automação para ambientes residenciais e comerciais. Nosso foco é entender a necessidade de cada espaço e indicar soluções que façam sentido para a rotina de quem utiliza.</p>
              <p>Da escolha dos equipamentos à instalação, cada detalhe deve contribuir para um sistema funcional, prático e confiável.</p>
              <div className="about-checks">
                <div><Icon name="check" size={17}/><span>Atendimento orientado à sua necessidade</span></div>
                <div><Icon name="check" size={17}/><span>Soluções para diferentes tipos de ambiente</span></div>
                <div><Icon name="check" size={17}/><span>Segurança integrada à tecnologia</span></div>
              </div>
              <a className="button button-outline" href="#contato">Converse com a equipe <Icon name="arrow" size={17}/></a>
            </div>
          </div>
        </section>

        <section className="services section section-anchor" id="servicos">
          <div className="container">
            <div className="section-heading services-heading">
              <div><div className="eyebrow"><span className="eyebrow-dot" /> NOSSAS SOLUÇÕES</div><h2>Proteção que acompanha <em>seu espaço.</em></h2></div>
              <p>Escolha o que você precisa hoje. A gente ajuda a encontrar a solução mais adequada para seu imóvel.</p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.id}>
                  <div className="service-image"><img src={service.image} alt={service.title} loading="lazy" /><span className="service-number">{service.number}</span></div>
                  <div className="service-content">
                    <div className="service-title-row"><span className="service-icon"><Icon name={service.icon} size={22}/></span><h3>{service.title}</h3></div>
                    <p>{service.description}</p>
                    <div className="service-detail"><Icon name="check" size={15}/>{service.detail}</div>
                    <button className="service-link" type="button" onClick={() => chooseService(service.title)}>Tenho interesse <Icon name="arrow" size={16}/></button>
                  </div>
                </article>
              ))}
            </div>
            <div className="services-note"><span className="note-mark"><Icon name="shield" size={19}/></span><p><strong>Precisa de mais de uma solução?</strong> Podemos pensar em uma estrutura integrada para seu imóvel.</p><a href="#contato">Fale com a MS <Icon name="arrow" size={15}/></a></div>
          </div>
        </section>

        <section className="reviews section section-anchor" id="avaliacoes">
          <div className="container reviews-layout">
            <div className="reviews-copy">
              <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> AVALIAÇÕES</div>
              <h2>Confiança se constrói em cada <em>atendimento.</em></h2>
              <p>A experiência de cada cliente é importante para aprimorar nosso trabalho. Em breve, este espaço reunirá avaliações verificadas de quem já conta com a MS Soluções.</p>
              <a className="button button-white" href="#contato">Fale com a nossa equipe <Icon name="arrow" size={17}/></a>
            </div>
            <div className="reviews-panel">
              <div className="reviews-panel-top"><span className="reviews-quote"><Icon name="quote" size={27}/></span><span className="review-label">A VOZ DOS CLIENTES</span></div>
              <p className="reviews-card-copy">Em breve, este espaço vai reunir relatos reais de clientes que escolheram a MS Soluções para cuidar da segurança e da tecnologia dos seus espaços.</p>
              <div className="review-placeholder-bottom"><div className="review-avatar"><Icon name="message" size={18}/></div><div><strong>Sua experiência importa</strong><small>Conte para nós como podemos ajudar.</small></div></div>
              {REVIEWS_URL ? <a className="reviews-external" href={REVIEWS_URL} target="_blank" rel="noreferrer">Ver avaliações <Icon name="arrowUp" size={15}/></a> : <span className="reviews-coming">Avaliações verificadas em breve</span>}
            </div>
          </div>
        </section>

        <section className="contact section section-anchor" id="contato">
          <div className="container contact-grid">
            <div className="contact-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> FALE COM A MS SOLUÇÕES</div>
              <h2>Vamos encontrar a proteção ideal para <em>você?</em></h2>
              <p>Conte um pouco sobre o seu espaço e o que precisa. Nossa equipe poderá entender melhor sua necessidade e orientar os próximos passos.</p>
              <div className="contact-benefits">
                <div><span><Icon name="message" size={19}/></span><div><strong>Atendimento próximo</strong><small>Conversa clara, sem complicação.</small></div></div>
                <div><span><Icon name="shield" size={19}/></span><div><strong>Solução adequada</strong><small>Uma recomendação alinhada ao seu cenário.</small></div></div>
              </div>
              <div className="contact-side-note"><span className="contact-side-line"/> <span>SEGURANÇA PARA CASA E EMPRESA</span></div>
            </div>
            <div className="contact-form-card">
              <div className="form-heading"><div><span className="form-kicker">SOLICITE UM CONTATO</span><h3>Conte o que você precisa</h3></div><span className="form-icon"><Icon name="arrowUp" size={20}/></span></div>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>Seu nome<input type="text" name="name" autoComplete="name" placeholder="Como podemos chamar você?" value={form.name} onChange={(e) => updateField('name', e.target.value)} required /></label>
                  <label>WhatsApp<input type="tel" name="phone" autoComplete="tel" placeholder="(00) 00000-0000" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} required /></label>
                </div>
                <div className="form-row">
                  <label>Tipo de imóvel<select value={form.property} onChange={(e) => updateField('property', e.target.value)}><option>Residencial</option><option>Comercial</option><option>Condomínio</option><option>Outro</option></select></label>
                  <label>Serviço de interesse<select value={form.service} onChange={(e) => updateField('service', e.target.value)} required><option value="">Selecione uma opção</option><option>CFTV e monitoramento</option><option>Cerca elétrica</option><option>Automação</option><option>Solução integrada</option><option>Manutenção / suporte</option><option>Ainda não sei</option></select></label>
                </div>
                <label>Cidade ou bairro<input type="text" name="city" placeholder="Onde será o atendimento?" value={form.city} onChange={(e) => updateField('city', e.target.value)} /></label>
                <label>Como podemos ajudar?<textarea name="message" rows="4" placeholder="Conte brevemente o que você precisa..." value={form.message} onChange={(e) => updateField('message', e.target.value)} /></label>
                <button className="button form-submit" type="submit">Enviar solicitação <Icon name="arrow" size={18}/></button>
                {formNotice && <div className="form-notice" role="status">{formNotice}{!WHATSAPP_NUMBER && <button type="button" className="copy-button" onClick={copyMessage}>{copied ? 'Mensagem copiada ✓' : 'Copiar mensagem'}</button>}</div>}
                <p className="form-privacy">Ao enviar, você autoriza o contato da MS Soluções para tratar desta solicitação.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a className="brand footer-brand" href="#inicio"><span className="brand-mark"><Icon name="shield" size={24}/></span><span className="brand-copy"><strong>MS<span>.</span></strong><small>SOLUÇÕES</small></span></a>
          <p>Segurança e tecnologia para proteger o que importa.</p>
          <div className="footer-links">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
          <a className="footer-top" href="#inicio" aria-label="Voltar ao início"><Icon name="arrowUp" size={18}/></a>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} MS Soluções. Todos os direitos reservados.</span><span>CFTV • Cerca elétrica • Automação</span></div>
      </footer>
    </>
  );
}

export default App;
