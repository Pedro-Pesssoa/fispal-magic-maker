import { CheckCircle2 } from "lucide-react";
import naturalBotLogo from "@/assets/natural-bot-logo.png";

const Obrigado = () => {
  return (
    <main className="min-h-screen bg-background">
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

      {/* Confirmation */}
      <section className="relative overflow-hidden">
        <div className="relative container py-24 flex items-center justify-center">
          <div className="bg-gradient-pink rounded-2xl p-10 md:p-16 shadow-card-pink text-center max-w-lg w-full">
            <div className="rounded-2xl bg-white p-10">
              <CheckCircle2 className="mx-auto mb-6 size-16 text-brand-pink" />
              <h1 className="font-display text-3xl font-extrabold text-brand-dark mb-3">
                Pronto!
              </h1>
              <p className="text-muted-foreground text-lg">
                Em instantes você receberá seu <strong className="text-brand-dark">CÓDIGO VIP</strong> por e-mail.
              </p>
            </div>
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

export default Obrigado;
