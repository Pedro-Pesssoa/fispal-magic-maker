import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Calendar, MapPin, Check, Bot, Monitor, Languages, Sparkles } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";
import naturalBotLogo from "@/assets/natural-bot-logo.png";

const formSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  celular: z.string().trim().min(8, "Informe um celular válido").max(20),
  delivery: z.enum(["sim", "nao"], { required_error: "Selecione uma opção" }),
  empresa: z.string().trim().min(2, "Informe sua empresa").max(120),
  segmento: z.string().min(1, "Selecione um segmento"),
});

const segmentos = [
  "Açaí / Sorvetes",
  "Culinária oriental",
  "Esfiharia / Árabe",
  "Hamburgueria",
  "Lanches / Saladas",
  "Marmitas / Prato feito",
  "Padaria / Confeitaria",
  "Pizzaria",
  "Outro",
];

const Abrasel = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    celular: "",
    delivery: "" as "sim" | "nao" | "",
    empresa: "",
    segmento: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const WEBHOOK_URL =
    "https://backend.fenil.com.br/webhook-forms/receive/a515386f803594db9d3259214f2724e045facc40fcb0c9ba49e7c2fa8c6539d5";
  const N8N_WEBHOOK_URL =
    "https://n8n.fenil.com.br/webhook/a76baf2b-49d2-47c1-889d-f8f718affae3";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const payload = JSON.stringify({
        nome: form.nome,
        email: form.email,
        celular: "55" + form.celular.replace(/\D/g, ""),
        delivery: form.delivery,
        empresa: form.empresa,
        segmento: form.segmento,
        evento: "Salão Abrasel 2026",
      });
      await fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: payload });
      fetch(N8N_WEBHOOK_URL, { method: "POST", mode: "no-cors", body: payload }).catch((err) => console.error("[n8n]", err));
      navigate("/obrigado");
    } catch {
      toast.error("Ops! Erro ao enviar. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="w-full py-6 bg-white border-b border-border">
        <div className="container flex justify-center">
          <img
            src={naturalBotLogo}
            alt="Natural Bot — Copiloto de Vendas com IA"
            className="h-12 md:h-14 w-auto"
          />
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroFood})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" aria-hidden="true" />

        <div className="relative container py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left column */}
            <div className="space-y-6 min-w-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink/10 border border-brand-pink/20 max-w-full">
                <Sparkles className="w-4 h-4 text-brand-pink flex-shrink-0" />
                <span className="text-sm font-semibold text-brand-pink uppercase tracking-wide break-words">
                  Salão Abrasel 2026
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-brand-dark">
                Garanta seu{" "}
                <span className="text-brand-pink">INGRESSO GRATUITO</span> para o Salão Abrasel 2026!
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                O ecossistema aberto da alimentação fora do lar. Um evento bienal que converge
                exposição, imersão e interação para celebrar o protagonismo de um dos maiores
                setores do Brasil.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-brand-dark">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-pink/10">
                    <Calendar className="w-5 h-5 text-brand-pink" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="font-bold text-lg">15 e 16 de Setembro de 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-brand-dark">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-pink/10">
                    <MapPin className="w-5 h-5 text-brand-pink" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Local</p>
                    <p className="font-bold text-lg">Bienal do Ibirapuera – São Paulo</p>
                  </div>
                </div>
              </div>

              <p className="text-base text-foreground leading-relaxed pt-2">
                A <strong className="text-brand-pink">Natural Bot</strong> é expositora oficial e está
                oferecendo um <strong>CÓDIGO VIP</strong> exclusivo para sua entrada gratuita no evento.
              </p>

              <div className="bg-white/70 backdrop-blur rounded-xl p-5 border border-border">
                <p className="font-display font-bold text-brand-dark mb-3">
                  O que você vai encontrar no Salão Abrasel:
                </p>
                <ul className="space-y-2">
                  {[
                    "Novidades, inovações e tendências da alimentação fora do lar",
                    "Networking com líderes e marcas do setor",
                    "Soluções para impulsionar suas vendas",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-foreground">
                      <Check className="w-5 h-5 text-brand-pink flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="italic font-semibold text-brand-pink">⚡ Convites limitados!</p>
            </div>

            {/* Right column: form */}
            <div className="lg:sticky lg:top-8 min-w-0">
              <div className="bg-gradient-pink rounded-2xl p-6 md:p-8 shadow-card-pink">
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white text-center mb-6 leading-tight">
                  Preencha o formulário para receber o CÓDIGO VIP
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nome*"
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      className="w-full h-12 px-4 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email*"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-3 h-12 rounded-lg bg-white text-foreground">
                      <span className="text-lg">🇧🇷</span>
                      <span className="text-sm font-medium">+55</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Celular*"
                      value={form.celular}
                      onChange={(e) => setForm({ ...form, celular: e.target.value })}
                      className="flex-1 h-12 px-4 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                  </div>

                  <div className="text-white">
                    <p className="text-sm font-medium mb-2">Trabalha com delivery?*</p>
                    <div className="flex gap-4">
                      {[
                        { v: "sim", l: "Sim" },
                        { v: "nao", l: "Não" },
                      ].map((opt) => (
                        <label key={opt.v} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="delivery"
                            value={opt.v}
                            checked={form.delivery === opt.v}
                            onChange={(e) =>
                              setForm({ ...form, delivery: e.target.value as "sim" | "nao" })
                            }
                            className="w-4 h-4 accent-brand-yellow"
                          />
                          <span>{opt.l}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Empresa*"
                      value={form.empresa}
                      onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                      className="w-full h-12 px-4 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                  </div>
                  <div>
                    <select
                      value={form.segmento}
                      onChange={(e) => setForm({ ...form, segmento: e.target.value })}
                      className="w-full h-12 px-4 rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    >
                      <option value="">Segmento de atuação*</option>
                      {segmentos.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 rounded-lg bg-brand-yellow text-brand-dark font-display font-extrabold text-lg uppercase tracking-wide hover:brightness-95 transition-all shadow-yellow-glow disabled:opacity-60"
                  >
                    {loading ? "Enviando..." : "Receber Código VIP"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pink divider */}
      <div className="bg-gradient-pink py-6">
        <div className="container text-center">
          <p className="text-white font-display font-bold text-lg md:text-xl">
            🎟️ Venha nos visitar no Salão Abrasel 2026 — 15 e 16 de Setembro, Bienal do Ibirapuera
          </p>
        </div>
      </div>

      {/* About Natural Bot */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-4">
              Sobre a <span className="text-brand-pink">Natural Bot</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Somos o <strong className="text-brand-dark">1° Copiloto de Vendas com IA</strong> para
              restaurantes do Brasil!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Bot,
                title: "Inteligência Artificial",
                desc: "Automação de atendimento, cobrança e ordens de serviço.",
              },
              {
                icon: Monitor,
                title: "Integração com Monitores",
                desc: "Pedidos seguem direto para o KDS após o pagamento.",
              },
              {
                icon: Languages,
                title: "Atendimento Multilíngue",
                desc: "Mais de 60 línguas para atender clientes do mundo todo.",
              },
              {
                icon: Sparkles,
                title: "Linguagem Personalizada",
                desc: "Propósito, arquétipo e tom de voz da sua marca.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-border hover:shadow-card-pink hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-pink flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-dark mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://naturalbot.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-14 px-10 rounded-lg bg-gradient-pink text-white font-display font-extrabold text-lg uppercase tracking-wide hover:brightness-110 transition-all shadow-card-pink"
            >
              Saiba Mais
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-brand-dark text-white/70 text-center text-sm">
        <div className="container">
          © {new Date().getFullYear()} Natural Bot — Copiloto de Vendas com IA para restaurantes.
        </div>
      </footer>
    </main>
  );
};

export default Abrasel;
