import jsPDF from "jspdf";

export function generateDepressionEbook(): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 30;

  const addTitle = (text: string, size = 22) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", "bold");
    doc.text(text, pageWidth / 2, y, { align: "center" });
    y += size * 0.6;
  };

  const addSubtitle = (text: string) => {
    y += 8;
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text(text, margin, y);
    y += 10;
  };

  const addParagraph = (text: string) => {
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, contentWidth);
    if (y + lines.length * 6 > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(lines, margin, y);
    y += lines.length * 6 + 4;
  };

  const addBullet = (text: string) => {
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, contentWidth - 10);
    if (y + lines.length * 6 > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text("•", margin, y);
    doc.text(lines, margin + 8, y);
    y += lines.length * 6 + 2;
  };

  // Cover
  addTitle("Simptomele Clinice", 24);
  y += 4;
  addTitle("ale Depresiei", 24);
  y += 10;
  doc.setFontSize(13);
  doc.setFont("helvetica", "italic");
  doc.text("Ghid informativ complet", pageWidth / 2, y, { align: "center" });
  y += 20;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Acest ebook are scop exclusiv informativ.", pageWidth / 2, y, { align: "center" });
  y += 6;
  doc.text("Consultati intotdeauna un specialist.", pageWidth / 2, y, { align: "center" });

  // Page 2
  doc.addPage();
  y = 30;

  addSubtitle("1. Ce este Depresia?");
  addParagraph(
    "Depresia este o tulburare de dispozitie care provoaca un sentiment persistent de tristete si pierdere a interesului. Afecteaza modul in care ganditi, va simtiti si va comportati si poate duce la o varietate de probleme emotionale si fizice. Este mai mult decat o simpla stare de tristete - este o afectiune medicala care necesita tratament."
  );
  addParagraph(
    "Depresia afecteaza aproximativ 280 de milioane de oameni la nivel mondial, conform Organizatiei Mondiale a Sanatatii. Este una dintre principalele cauze de dizabilitate in intreaga lume."
  );

  addSubtitle("2. Simptome Emotionale");
  addBullet("Tristete persistenta, anxietate sau senzatia de gol interior");
  addBullet("Sentimente de lipsa de speranta si pesimism");
  addBullet("Iritabilitate, frustrare, chiar si pentru lucruri marunte");
  addBullet("Sentimente de vinovatie, lipsa de valoare sau neajutorare");
  addBullet("Pierderea interesului sau a placerii pentru hobby-uri si activitati");
  addBullet("Ganduri de moarte sau sinucidere");

  addSubtitle("3. Simptome Fizice");
  addBullet("Oboseala si lipsa de energie");
  addBullet("Insomnie, trezire dimineata devreme sau somn excesiv");
  addBullet("Modificari ale apetitului - scadere sau crestere in greutate");
  addBullet("Dureri de cap, crampe sau probleme digestive fara cauza fizica clara");
  addBullet("Miscari sau vorbire incetinite");
  addBullet("Nelinistate sau incapacitate de a sta linistit");

  doc.addPage();
  y = 30;

  addSubtitle("4. Simptome Cognitive");
  addBullet("Dificultati de concentrare, memorare si luare a deciziilor");
  addBullet("Gandire incetinita");
  addBullet("Ganduri negative recurente");
  addBullet("Dificultati in planificarea si organizarea activitatilor");

  addSubtitle("5. Simptome Comportamentale");
  addBullet("Retragere sociala si izolare");
  addBullet("Neglijarea responsabilitatilor");
  addBullet("Scaderea performantei la locul de munca sau la scoala");
  addBullet("Consum excesiv de alcool sau alte substante");
  addBullet("Renuntarea la activitatile care odata aduceau placere");

  addSubtitle("6. Tipuri de Depresie");
  addParagraph(
    "Tulburarea depresiva majora: Simptome severe care afecteaza capacitatea de a lucra, dormi, studia, manca si de a va bucura de viata. Poate aparea o singura data, dar mai frecvent apare de mai multe ori pe parcursul vietii."
  );
  addParagraph(
    "Tulburarea depresiva persistenta (Distimie): Dispozitie depresiva care dureaza cel putin 2 ani. Persoana poate avea episoade de depresie majora impreuna cu perioade de simptome mai putin severe."
  );
  addParagraph(
    "Depresia postpartum: Depresie majora care apare in timpul sarcinii sau dupa nastere. Implica tristete extrema, anxietate si epuizare care pot face dificila ingrijirea de sine sau a copilului."
  );

  doc.addPage();
  y = 30;

  addSubtitle("7. Factori de Risc");
  addBullet("Istoric familial de depresie");
  addBullet("Traume sau evenimente stresante din viata");
  addBullet("Anumite afectiuni medicale (boli cronice, durere)");
  addBullet("Anumite medicamente");
  addBullet("Abuz de alcool sau droguri");
  addBullet("Trasaturi de personalitate (stima de sine scazuta, pesimism)");

  addSubtitle("8. Cand sa Cereti Ajutor");
  addParagraph(
    "Daca experimentati simptome ale depresiei, este important sa cautati ajutor profesional. Consultati un medic sau un specialist in sanatate mintala daca simptomele dureaza mai mult de doua saptamani si afecteaza activitatile zilnice."
  );
  addParagraph(
    "Daca aveti ganduri de auto-vatamare sau sinucidere, contactati imediat serviciile de urgenta sau o linie de asistenta in caz de criza."
  );

  addSubtitle("9. Optiuni de Tratament");
  addBullet("Psihoterapie (terapie cognitiv-comportamentala, terapie interpersonala)");
  addBullet("Medicatie antidepresiva");
  addBullet("Combinatie de psihoterapie si medicatie");
  addBullet("Exercitii fizice regulate");
  addBullet("Tehnici de relaxare si mindfulness");
  addBullet("Suport social si grupuri de sprijin");

  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  const disclaimer =
    "Disclaimer: Acest ebook are scop exclusiv informativ si educational. Nu inlocuieste consultul medical profesional, diagnosticul sau tratamentul. Consultati intotdeauna un medic sau un specialist calificat.";
  const dLines = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(dLines, margin, y);

  return doc;
}
