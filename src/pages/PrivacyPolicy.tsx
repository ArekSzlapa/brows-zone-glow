import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-glow">
                Polityka Prywatności
              </span>
            </h1>
            <p className="text-lg text-foreground/80">
              Informacje o przetwarzaniu danych osobowych
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-foreground/80">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                1. Administrator danych osobowych
              </h2>
              <p>
                Administratorem Twoich danych osobowych jest Aleksandra Szłapa
                {/* prowadząca działalność gospodarczą pod nazwą "Brows•Zone" z
                siedzibą w Polsce. */}
              </p>
              <p>
                Kontakt:{" "}
                <a
                  href="mailto:asbrows.zone@gmail.com"
                  className="text-primary hover:underline"
                >
                  asbrows.zone@gmail.com
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                2. Podstawa prawna przetwarzania
              </h2>
              <p className="mb-2">
                Twoje dane osobowe przetwarzane są na podstawie:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Art. 6 ust. 1 lit. b) RODO - w celu wykonania umowy
                  (realizacji usługi kosmetycznej)
                </li>
                <li>
                  Art. 6 ust. 1 lit. f) RODO - w celu prowadzenia dokumentacji
                  medycznej zgodnie z wymogami prawa
                </li>
                <li>
                  Art. 6 ust. 1 lit. a) RODO - Twoja zgoda na kontakt w celach
                  marketingowych (opcjonalnie)
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                3. Zakres przetwarzanych danych
              </h2>
              <p className="mb-2">Przetwarzamy następujące dane osobowe:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Imię i nazwisko</li>
                <li>Numer telefonu</li>
                <li>Adres email (opcjonalnie)</li>
                <li>Wybrana usługa</li>
                <li>Data i godzina wizyty</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                4. Cel przetwarzania danych
              </h2>
              <p className="mb-2">Twoje dane osobowe przetwarzamy w celu:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Umówienia i realizacji wizyty</li>
                <li>Kontaktu w sprawie wizyty</li>
                <li>Prowadzenia dokumentacji zgodnie z wymogami prawa</li>
                <li>Wysyłania informacji marketingowych (tylko za zgodą)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                5. Okres przechowywania danych
              </h2>
              <p className="mb-2">
                Twoje dane osobowe będą przechowywane przez okres:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Do realizacji usługi oraz przez okres przedawnienia roszczeń
                  (3 lata)
                </li>
                <li>
                  W przypadku dokumentacji medycznej - zgodnie z wymogami prawa
                  (5 lat)
                </li>
                <li>
                  Do odwołania zgody w przypadku marketingu bezpośredniego
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                6. Twoje prawa
              </h2>
              <p className="mb-2">Przysługują Ci następujące prawa:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Prawo dostępu do swoich danych osobowych</li>
                <li>Prawo do sprostowania danych</li>
                <li>Prawo do usunięcia danych</li>
                <li>Prawo do ograniczenia przetwarzania</li>
                <li>Prawo do przenoszenia danych</li>
                <li>Prawo sprzeciwu wobec przetwarzania</li>
                <li>Prawo wniesienia skargi do organu nadzorczego (PUODO)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                7. Odbiorcy danych
              </h2>
              <p className="mb-2">
                Twoje dane osobowe mogą być przekazywane następującym odbiorcom:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Dostawcy usług księgowych (w razie konieczności wystawienia
                  faktury)
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                8. Bezpieczeństwo danych
              </h2>
              <p>
                Stosujemy odpowiednie środki techniczne i organizacyjne w celu
                ochrony Twoich danych osobowych przed nieuprawnionym dostępem,
                utratą, zniszczeniem lub uszkodzeniem.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                9. Kontakt
              </h2>
              <p className="mb-2">
                W sprawach dotyczących ochrony danych osobowych możesz
                skontaktować się z nami:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:asbrows.zone@gmail.com"
                    className="text-primary hover:underline"
                  >
                    asbrows.zone@gmail.com
                  </a>
                </li>
                <li>Osobiście w trakcie wizyty</li>
              </ul>
            </section>

            <div className="mt-12 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground/60">
                Ostatnia aktualizacja: 01.09.2025
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
