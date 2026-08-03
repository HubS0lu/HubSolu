import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Users, Package, Wallet, Bot, Star, Check, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f8f9fa] font-body text-[#212529] antialiased">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full bg-[#f8f9fa]/90 shadow-sm backdrop-blur-xl border-b border-[#e9ecef]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <a
            className="font-headline text-2xl font-black tracking-tighter text-[#212529]"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Hubcontrole
          </a>
          <div className="hidden items-center space-x-8 md:flex">
            <a
              className="border-b-2 border-[#343a40] pb-1 font-headline font-bold text-[#212529]"
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('inicio');
              }}
            >
              Início
            </a>
            <a
              className="font-headline text-[#6c757d] transition-colors hover:text-[#212529]"
              href="#funcionalidades"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('funcionalidades');
              }}
            >
              Funcionalidades
            </a>
            <a
              className="font-headline text-[#6c757d] transition-colors hover:text-[#212529]"
              href="#planos"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('planos');
              }}
            >
              Planos
            </a>
            <a
              className="font-headline text-[#6c757d] transition-colors hover:text-[#212529]"
              href="#depoimentos"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('depoimentos');
              }}
            >
              Depoimentos
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              className="hidden font-body text-sm font-semibold text-[#495057] transition-colors hover:text-[#212529] md:block"
              to="/cadastro"
            >
              Entrar
            </Link>
            <Link
              className="rounded-xl bg-[#343a40] px-6 py-2.5 font-body text-sm font-semibold text-[#f8f9fa] transition-all hover:bg-[#212529] shadow-sm active:scale-95"
              to="/registro"
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section
          className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center lg:py-32"
          id="inicio"
        >
          {/* Subtle Background Accent */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e9ecef] blur-[100px]"></div>
          
          <h1 className="mb-6 max-w-4xl font-headline text-5xl font-extrabold leading-[1.1] tracking-tight text-[#212529] lg:text-[4rem]">
            Controle seu negócio pelo <span className="text-[#495057]">celular</span>
          </h1>
          <p className="mb-10 max-w-2xl font-body text-lg leading-relaxed text-[#6c757d]">
            A gestão financeira e de estoque que cabe na palma da sua mão. Esqueça planilhas
            complexas, foque no que importa: fazer sua empresa crescer.
          </p>
          <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row justify-center">
            <Link
              className="rounded-xl bg-[#343a40] px-8 py-4 text-lg font-semibold text-[#f8f9fa] shadow-md transition-all hover:bg-[#212529] hover:shadow-lg active:scale-95"
              to="/registro"
            >
              Começar grátis agora
            </Link>
            <Link
              className="flex items-center gap-2 rounded-xl border border-[#ced4da] bg-[#f8f9fa] px-8 py-4 text-lg font-semibold text-[#212529] transition-all hover:border-[#adb5bd] hover:bg-[#f1f3f5]"
              to="/registro"
            >
              <span className="material-symbols-outlined">play_circle</span>
              Ver Demonstração Delivery
            </Link>
          </div>
          
          {/* Stats/Social Proof */}
          <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 border-t border-[#e9ecef] pt-10 text-sm font-medium text-[#6c757d] md:flex-row mx-auto">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#495057]" />
              Mais de 11 milhões em vendas geridas
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#495057]" />
              Empreendedores em todo o Brasil
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#f1f3f5] border-y border-[#e9ecef] px-6 py-24" id="funcionalidades">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-headline text-3xl font-bold tracking-tight text-[#212529] md:text-4xl">
                Tudo que você precisa,<br />nada que você não usa
              </h2>
              <p className="mx-auto max-w-2xl font-body text-[#6c757d]">
                Ferramentas essenciais projetadas para a realidade do pequeno empreendedor.
              </p>
            </div>
            <div className="mb-16 grid gap-6 md:grid-cols-3">
              {/* Feature Card 1 */}
              <div className="bg-[#f8f9fa] rounded-2xl border border-[#dee2e6] p-8 shadow-sm transition-all hover:border-[#adb5bd] hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9ecef] text-[#343a40]">
                  <Package size={24} />
                </div>
                <h3 className="mb-3 font-headline text-xl font-bold text-[#212529]">
                  Estoque Inteligente
                </h3>
                <p className="font-body text-sm leading-relaxed text-[#6c757d]">
                  Acompanhe entradas e saídas em tempo real. Saiba exatamente o que vender e quando repor.
                </p>
              </div>
              {/* Feature Card 2 */}
              <div className="bg-[#f8f9fa] rounded-2xl border border-[#dee2e6] p-8 shadow-sm transition-all hover:border-[#adb5bd] hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9ecef] text-[#343a40]">
                  <Wallet size={24} />
                </div>
                <h3 className="mb-3 font-headline text-xl font-bold text-[#212529]">
                  Controle Financeiro
                </h3>
                <p className="font-body text-sm leading-relaxed text-[#6c757d]">
                  Contas a pagar, receber e fluxo de caixa simplificados. Visão clara da saúde do seu negócio.
                </p>
              </div>
              {/* Feature Card 3 */}
              <div className="bg-[#f8f9fa] rounded-2xl border border-[#dee2e6] p-8 shadow-sm transition-all hover:border-[#adb5bd] hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9ecef] text-[#343a40]">
                  <Bot size={24} />
                </div>
                <h3 className="mb-3 font-headline text-xl font-bold text-[#212529]">
                  Assistente com IA
                </h3>
                <p className="font-body text-sm leading-relaxed text-[#6c757d]">
                  Insights automáticos sobre seus dados. Receba dicas personalizadas para otimizar suas vendas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative px-6 py-24" id="depoimentos">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center font-headline text-3xl font-bold tracking-tight text-[#212529]">
              Quem já usa, aprova
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-[#f1f3f5] rounded-2xl border border-[#e9ecef] p-8">
                <div className="mb-4 flex gap-1 text-[#495057]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-6 font-body text-sm leading-relaxed text-[#495057]">
                  "Antes eu usava caderno. Agora controlo tudo pelo celular em 5 minutos por dia."
                </p>
                <div>
                  <p className="text-sm font-bold text-[#212529]">Ana Paula</p>
                  <p className="text-xs text-[#6c757d]">Food Truck - SP</p>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-[#f1f3f5] rounded-2xl border border-[#e9ecef] p-8">
                <div className="mb-4 flex gap-1 text-[#495057]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-6 font-body text-sm leading-relaxed text-[#495057]">
                  "Parei de perder dinheiro com estoque furado. O Hubcontrole me avisou antes de acabar."
                </p>
                <div>
                  <p className="text-sm font-bold text-[#212529]">Ricardo M.</p>
                  <p className="text-xs text-[#6c757d]">Depósito de Bebidas - RJ</p>
                </div>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-[#f1f3f5] rounded-2xl border border-[#e9ecef] p-8">
                <div className="mb-4 flex gap-1 text-[#495057]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-6 font-body text-sm leading-relaxed text-[#495057]">
                  "Super fácil de usar, mesmo sem experiência com tecnologia."
                </p>
                <div>
                  <p className="text-sm font-bold text-[#212529]">Fernanda L.</p>
                  <p className="text-xs text-[#6c757d]">Cafeteria - BH</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative border-y border-[#e9ecef] bg-[#f1f3f5] px-6 py-24" id="planos">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-headline text-3xl font-bold tracking-tight text-[#212529] md:text-4xl">
                Planos simples e honestos
              </h2>
              <p className="font-body text-[#6c757d]">
                Sem letras miúdas. Sem surpresas no boleto.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Free Plan */}
              <div className="bg-[#f8f9fa] flex flex-col rounded-2xl border border-[#ced4da] p-8 shadow-sm">
                <h3 className="mb-2 font-headline text-xl font-bold text-[#212529]">Gratuito</h3>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#212529]">R$ 0</span>
                  <span className="text-sm text-[#6c757d]">/para sempre</span>
                </div>
                <ul className="mb-8 flex-1 space-y-4">
                  <li className="flex items-center gap-3 text-sm text-[#495057]">
                    <Check size={16} className="text-[#adb5bd]" />
                    Até 20 produtos
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#495057]">
                    <Check size={16} className="text-[#adb5bd]" />
                    Controle básico de estoque
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#495057]">
                    <Check size={16} className="text-[#adb5bd]" />
                    Registro de vendas
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#495057]">
                    <Check size={16} className="text-[#adb5bd]" />
                    Dashboard simples
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#495057]">
                    <Check size={16} className="text-[#adb5bd]" />
                    Acesso mobile
                  </li>
                </ul>
                <Link
                  className="w-full text-center rounded-xl border border-[#ced4da] py-3.5 text-sm font-semibold text-[#212529] transition-colors hover:bg-[#e9ecef] block"
                  to="/registro"
                >
                  Começar grátis
                </Link>
              </div>
              
              {/* Pro Plan */}
              <div className="relative bg-[#ffffff] flex flex-col rounded-2xl border-2 border-[#343a40] p-8 shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#343a40] px-4 py-1 text-xs font-bold tracking-wide text-[#f8f9fa]">
                  Mais popular
                </div>
                <h3 className="mb-2 font-headline text-xl font-bold text-[#212529]">Pro</h3>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#212529]">R$ 29</span>
                  <span className="text-sm text-[#6c757d]">/por mês</span>
                </div>
                <ul className="mb-8 flex-1 space-y-4">
                  <li className="flex items-center gap-3 text-sm text-[#212529]">
                    <Check size={16} className="text-[#495057]" />
                    Produtos ilimitados
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#212529]">
                    <Check size={16} className="text-[#495057]" />
                    Alertas de estoque baixo
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#212529]">
                    <Check size={16} className="text-[#495057]" />
                    Assistente com IA
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#212529]">
                    <Check size={16} className="text-[#495057]" />
                    Relatórios avançados
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#212529]">
                    <Check size={16} className="text-[#495057]" />
                    Gráficos de evolução
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#212529]">
                    <Check size={16} className="text-[#495057]" />
                    Suporte prioritário
                  </li>
                </ul>
                <Link
                  className="w-full text-center rounded-xl bg-[#343a40] py-3.5 text-sm font-semibold text-[#f8f9fa] shadow-md transition-all hover:bg-[#212529] block"
                  to="/registro"
                >
                  Assinar Pro
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-6 py-32 text-center bg-[#f8f9fa]">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 font-headline text-3xl font-bold tracking-tight text-[#212529] md:text-4xl">
              Seu negócio merece organização
            </h2>
            <p className="mb-10 font-body text-lg text-[#6c757d]">
              Comece hoje. Grátis. Sem complicação.
            </p>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#343a40] px-8 py-4 text-sm font-semibold text-[#f8f9fa] shadow-md transition-all hover:scale-105 hover:bg-[#212529] active:scale-95"
              to="/registro"
            >
              Criar minha conta grátis
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto mt-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 border-t border-[#e9ecef] bg-[#f1f3f5] px-8 py-12 md:flex-row">
        <div className="font-headline text-xl font-bold tracking-tighter text-[#212529]">Hubcontrole</div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="font-['Inter'] text-sm text-[#6c757d] transition-colors hover:text-[#212529]" href="#">Termos de Uso</a>
          <a className="font-['Inter'] text-sm text-[#6c757d] transition-colors hover:text-[#212529]" href="#">Privacidade</a>
          <a className="font-['Inter'] text-sm text-[#6c757d] transition-colors hover:text-[#212529]" href="#">Cookies</a>
          <a className="font-['Inter'] text-sm text-[#6c757d] transition-colors hover:text-[#212529]" href="#">Contato</a>
        </div>
        <div className="font-['Inter'] text-sm text-[#6c757d]">
          © 2026 Hubcontrole. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
