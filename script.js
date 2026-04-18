function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}
const toggle = document.getElementById("themeToggle");

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
}

/* Back-to-top button behavior */
const backToTop = document.getElementById('backToTop');
const backToTopThreshold = 300; // px scrolled before showing button

function onScroll() {
  if (!backToTop) return;
  if (window.scrollY > backToTopThreshold) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
  
  // Active nav link highlighting
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.navbar nav a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

if (backToTop) {
  window.addEventListener('scroll', onScroll, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // run once in case the page is already scrolled
  onScroll();
}

/* --- Internationalization (i18n) --- */
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'hero.title': 'Hello, I\'m Achraf Bourramane',
    'hero.tagline': 'Web Developer / Network Administrator / IT technicien',
    'hero.cta': 'View My Work',
    'hero.download': 'Download Resume',
    'about.title': 'About Me',
    'about.text': 'I am a Network and System Administrator with a passion for web development. I hold a university degree in Computer Science and constantly learn new technologies to expand my skills.',
    'projects.title': 'Projects',
    'project1.title': 'Representive Website for Meuer Enterprises',
    'project1.desc': 'My first project during my internship at Meuer Company following the provided steps and instructions.',
    'project1.link': 'View',
    'project2.title': 'Home lab with Two DCs',
    'project2.desc': 'A home lab with two domain controllers for testing DNS, Active Directory, DHCP and HTTPS.',
    'project2.link': 'View',
    'project4.title': 'Reservation website For YouLux Cars',
    'project4.desc': 'Write a backend and frontend website; UI/UX is simple and understandable.',
    'project4.link': 'View',
  'project3.title': 'PFE stage website.',
  'project3.desc': 'I created a single-page representative website for a well-known rental company in Marrakech.',
  'project3.link': 'View',
    'skills.title': 'Skills',
    'contact.title': 'Contact',
  'article.title': 'Home Lab - Small work area with two domain controllers.',
  'article.meta': 'By Achraf — March 29, 2026 · 3 min read',
  'article.lead': 'Windows Server Home Lab - Full Technical Refresh.',
      'article.back': '← Back to home',
      // article.body contains HTML; default English content copied from article.html
      'article.body': `
        <p class="lead">Windows Server Home Lab - Full Technical Refresh.</p>

        <h2>Main Goals</h2>
        <p>The goal was to design and deploy a realistic enterprise Windows environment to understand how system interact in real companies. <br> The focus was on Active Directory, DNS, Group Policy management, DHCP, File Service, WSUS, and troubleshooting.</p>

        <blockquote>
          <p>“Experience is the best teacher.”</p>
          <cite>— Achraf Bourramane</cite>
        </blockquote>
      <!--* Phase 1 starts Here -->
        <h3>Phase 1 - Infrastructure &amp; Network</h3>
        <p>Break your content into sections with subheadings. Use lists for steps or short points:</p>
        <ul>
          <li>VirtualBox as the virtualization platform</li>
          <li>DC1 : Windows Server 2019 Core (no GUI)</li>
          <li>DC2 : Windows Server 2022 (GUI)</li>
          <li>Windows 10 client for testing</li>
          <li>Bridged networking to simulate a real corporate networks</li>
          <li>Static IP addresses assigned to servers</li>
        </ul>
      <!--* Phase 2 starts Here -->
        <h3>Phase 2 - Active Directory &amp; Deployment</h3>
        <p>GUI(DC2):</p>
           <ul>
            <li>Server Manager --&gt; Add Roles and Features</li>
            <li>Installed Active Directory Domain Services role</li>
            <li>Promoted DC2 to a domain controller for the new domain</li>
            <li>Join existing domain and configure as a second domain controller</li>
          </ul>
        <p>Non-GUI(DC1) - Key command :</p>
          <ul>
              <li>Install-WindowsFeature AD-Domain-Services</li>
              <li>Install-ADDSForest -DomainName "lab.local"</li>
              <li>Install-ADDSDomainController -DomainName "lab.local"</li>
          </ul>
      <!--* Phase 2 ends Here -->
        <h3>Phase 3 - DNS &amp; DHCP configuration</h3>
          <p>DNS is critical for Active Directory functionality. <br> 
          Non-GUI Commands :</p>
          <ul>
              <li>Get-DnsClientServerAddress</li>
              <li>Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("127.0.0.1","192.168.1.30")</li>
          </ul>
        <p>Lesson : <br> Active Directory WSUS, and domain join operation depends entirely on correct DNS configuration.</p>
      <!--* Phase 4 starts Here -->
        <h3>Phase 4 - Organization Units, Users, and Groups (OU) Structure</h3>
        <p>GUI(Active Directory Users and Computers):</p>
          <ul>
              <li>Created Group Policy Objects (GPOs)</li>
              <li>Linked GPOs to appropriates OUs</li>
              <li>Enforced password policies and user restrictions</li>
          </ul>
        <p>Verification Command:</p>
          <ul>
              <li>Get-GPO -All</li>
              <li>Get-GPLink -Target "OU=Users,DC=lab,DC=local"</li>
          </ul>
      <!--* Phase 5 starts Here -->
        <p>Phase 5 - Group Policy Management</p>
        <p>GUI(Group Policy Management Console):</p>
          <ul>
              <li>Created and linked Group Policy Objects</li>
              <li>Enforced password policies and user restrictions</li>
          </ul>
        <p>Verification Command:</p>
          <ul>
              <li>gpupdate /force</li>
              <li>gpresult /r</li>
          </ul>
      <!--* Phase 6 starts Here -->
          <h3>Phase 6 - DHCP Server</h3>
          <p>GUI(DC2):</p>
          <ul>
              <li>Installed DHCP Server role</li>
              <li>Configured DHCP scopes 192.168.1.20 - 192.168.1.120</li>
              <li>Defined subnet mask, default gateway, and DNS servers</li>
          </ul>
          <p>Lesson:</p>
          <p>DHCP is a supporting service, not a core security control.</p>
      <!--* Phase 7 starts Here -->
          <h3>Phase 7 - File Server &amp; NTFS Permissions</h3>
          <p>GUI:</p>
          <ul>
              <li>Created company Data Structure</li>
              <li>Configure NTFS permission using AD security groups</li>
              <li>Removed 'Everyone' and applied least privilege access</li>
          </ul>
          <p>Concept:</p>
          <p>Active Directory objects are not files system objects. NTFS permissions are managed via File Explorer</p>
      <!--* Phase 8 starts Here -->
      <h3>Phase 8 - WSUS</h3>
          <p>GUI:</p>
          <ul>
              <li>Installed WSUS role</li>
              <li>Resolve post-deployment errors</li>
              <li>Corrected service account permissions</li>
              <li>Ensured DNS was properly configured</li>
          </ul>
          <p>Lesson:</p>
          <p>WSUS provides centralized management of Windows updates through Group Policy.</p>
      <!--* Phase 9 starts Here -->    
          <h3>Phase 9 - Challenge Faced &amp; Solutions</h3>
          <P>DNS Issues:</P>
          <ul>
              <li>Problem:Domain join and WSUS failures.</li>
              <li>Solution: DNS configured to point to itself (127.0.0.1) and partner DC.</li>
              <li>Results: Reliable name resolution and service discovery.</li>
          </ul>
          <P>WSUS Post-Deployment Errors:</P>
          <ul>
              <li>Problem: Service Network Not found.</li>
              <li>Solution: Selected Local Computer context.</li>
              <li>Results: WSUS services could access required folders.</li>
          </ul>
          <p>Networking Confusion:</p>
          <ul>
              <li>Problem: Ping failing using Host-Only networking.</li>
              <li>Solution: Standardized on bridged networking.</li>
              <li>Results: Realistic Enterprise connectivity.</li>
          </ul>
          <p>NTFS Permissions Problems:</p>
          <ul>
              <li>Problem: Groups not visible when assigning permissions.</li>
              <li>Solution: Selected correct domain location.</li>
              <li>Results: Proper access control.</li>
          </ul>
      <!--* Phase 10 starts Here -->
          <h3>Phase 10 - Final Outcomes</h3>
          <p>This lab demonstrates enterprise-level System Integration skills including: <br> Active Directory management, DNS, DHCP, Group Policy, file Services, WSUS, and Structured Troubleshooting. <br> it is fully suitable for my competence</p>

    `
  },
  de: {
    'nav.home': 'Start',
    'nav.about': 'Über mich',
    'nav.projects': 'Projekte',
    'nav.skills': 'Fähigkeiten',
    'nav.contact': 'Kontakt',
    'hero.title': 'Hallo, ich bin Achraf Bourramane',
    'hero.tagline': 'Webentwickler / Netzwerkadministrator / IT-Techniker',
    'hero.cta': 'Meine Arbeit ansehen',
    'hero.download': 'Lebenslauf herunterladen',
    'about.title': 'Über mich',
    'about.text': 'Ich bin Netzwerk- und Systemadministrator mit einer Leidenschaft für Webentwicklung. Ich habe einen Hochschulabschluss in Informatik und lerne ständig neue Technologien.',
    'projects.title': 'Projekte',
    'project1.title': 'Repräsentative Website für Meuer Enterprises',
    'project1.desc': 'Mein erstes Projekt während meines Praktikums bei Meuer Company nach den gegebenen Anweisungen.',
    'project1.link': 'Ansehen',
    'project2.title': 'Home-Lab mit zwei DCs',
    'project2.desc': 'Ein Home-Lab mit zwei Domänencontrollern zum Testen von DNS, Active Directory, DHCP und HTTPS.',
    'project2.link': 'Ansehen',
    'project4.title': 'Reservierungswebsite für YouLux Cars',
    'project4.desc': 'Entwicklung eines Backends und Frontends; UI/UX ist einfach und verständlich.',
    'project4.link': 'Ansehen',
  'project3.title': 'PFE Praktikumswebsite',
  'project3.desc': 'Ich habe eine einseitige repräsentative Website für ein bekanntes Mietunternehmen in Marrakesch erstellt.',
  'project3.link': 'Ansehen',
    'skills.title': 'Fähigkeiten',
    'contact.title': 'Kontakt',
    'article.title': 'Schreibe deinen Text hier',
    'article.meta': 'Von Achraf — 29. März 2026 · 3 Min. Lesezeit',
    'article.lead': 'Beginne hier mit deiner einleitenden Zusammenfassung. Kurz und einladend.',
    'article.back': '← Zurück',
    'article.body': `
      <p class="lead">Windows Server Home-Lab – Vollständige technische Umsetzung.</p>

      <h2>Hauptziele</h2>
      <p>Ziel war es, eine realistische Unternehmensumgebung aufzubauen, um zu verstehen, wie Systeme in echten Firmen zusammenwirken. Der Fokus lag auf Active Directory, DNS, Gruppenrichtlinien, DHCP, Dateidiensten, WSUS und Fehlerbehebung.</p>

      <blockquote>
        <p>„Erfahrung ist der beste Lehrer.“</p>
        <cite>— Achraf Bourramane</cite>
      </blockquote>

      <h3>Phase 1 – Infrastruktur &amp; Netzwerk</h3>
      <p>Wichtige Punkte:</p>
      <ul>
        <li>VirtualBox als Virtualisierungsplattform</li>
        <li>DC1: Windows Server 2019 Core (ohne GUI)</li>
        <li>DC2: Windows Server 2022 (mit GUI)</li>
        <li>Windows 10 Client für Tests</li>
        <li>Bridged Networking zur Simulation eines Unternehmensnetzwerks</li>
        <li>Statische IP-Adressen für Server</li>
      </ul>

      <h3>Phase 2 – Active Directory &amp; Bereitstellung</h3>
      <p>GUI (DC2):</p>
      <ul>
        <li>Server-Manager → Rollen und Features hinzufügen</li>
        <li>Active Directory Domain Services Rolle installiert</li>
        <li>DC2 zur Domänensteuerung befördert</li>
        <li>Als zweiter Domänencontroller zur bestehenden Domäne hinzugefügt</li>
      </ul>
      <p>Non-GUI (DC1) – Wichtige Befehle:</p>
      <ul>
        <li>Install-WindowsFeature AD-Domain-Services</li>
        <li>Install-ADDSForest -DomainName "lab.local"</li>
        <li>Install-ADDSDomainController -DomainName "lab.local"</li>
      </ul>

      <h3>Phase 3 – DNS &amp; DHCP</h3>
      <p>DNS ist entscheidend für Active Directory. Wichtige PowerShell-Befehle:</p>
      <ul>
        <li>Get-DnsClientServerAddress</li>
        <li>Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("127.0.0.1","192.168.1.30")</li>
      </ul>
      <p>Ergebnis: AD, WSUS und Domänenbeitritt sind stark von korrekter DNS-Konfiguration abhängig.</p>

      <h3>Phase 4 – OUs, Benutzer und Gruppen</h3>
      <ul>
        <li>GPOs erstellt und an OUs verknüpft</li>
        <li>Passwortrichtlinien und Benutzerbeschränkungen durchgesetzt</li>
      </ul>

      <h3>Phase 5 – Gruppenrichtlinienverwaltung</h3>
      <ul>
        <li>GPOs erstellt und verknüpft</li>
        <li>Verifikation: gpupdate /force, gpresult /r</li>
      </ul>

      <h3>Phase 6 – DHCP-Server</h3>
      <ul>
        <li>DHCP-Rolle installiert</li>
        <li>Scope 192.168.1.20 - 192.168.1.120 konfiguriert</li>
      </ul>

      <h3>Phase 7 – Dateiserver &amp; NTFS-Rechte</h3>
      <ul>
        <li>Datenstruktur erstellt</li>
        <li>NTFS-Berechtigungen mit AD-Gruppen konfiguriert</li>
      </ul>

      <h3>Phase 8 – WSUS</h3>
      <ul>
        <li>WSUS-Rolle installiert</li>
        <li>Post-Deployment-Probleme behoben</li>
      </ul>

      <h3>Phase 9 – Herausforderungen &amp; Lösungen</h3>
      <p>DNS-Probleme: DNS auf sich selbst und Partner-DC gesetzt → verlässliche Namensauflösung.</p>

      <h3>Phase 10 – Ergebnisse</h3>
      <p>Das Lab zeigt Fähigkeiten in Systemintegration: AD, DNS, DHCP, GPOs, Dateidienste, WSUS und strukturiertes Troubleshooting.</p>
    `
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.contact': 'Contact',
    'hero.title': 'Bonjour, je suis Achraf Bourramane',
    'hero.tagline': 'Développeur Web / Administrateur Réseau / Technicien IT',
    'hero.cta': 'Voir mon travail',
    'hero.download': 'Télécharger CV',
    'about.title': 'À propos',
    'about.text': 'Je suis administrateur réseau et système, passionné par le développement web. J\'ai un diplôme en informatique et j\'apprends constamment de nouvelles technologies.',
    'projects.title': 'Projets',
    'project1.title': 'Site représentatif pour Meuer Enterprises',
    'project1.desc': 'Mon premier projet lors de mon stage chez Meuer Company, suivant les consignes fournies.',
    'project1.link': 'Voir',
    'project2.title': 'Home lab avec deux DCs',
    'project2.desc': 'Un laboratoire domestique avec deux contrôleurs de domaine pour tester DNS, Active Directory, DHCP et HTTPS.',
    'project2.link': 'Voir',
    'project4.title': 'Site de réservation pour YouLux Cars',
    'project4.desc': 'Développement backend et frontend ; UI/UX simple et compréhensible.',
    'project4.link': 'Voir',
  'project3.title': 'Site de stage PFE',
  'project3.desc': 'J\'ai réalisé un site web monopage représentatif pour une société de location bien connue à Marrakech.',
  'project3.link': 'Voir',
    'skills.title': 'Compétences',
    'contact.title': 'Contact',
    'article.title': 'Écrivez votre texte ici',
    'article.meta': 'Par Achraf — 29 mars 2026 · 3 min de lecture',
    'article.lead': 'Commencez votre idée principale ici. Court et engageant.',
    'article.back': '← Retour à l\'accueil',
    'article.body': `
      <p class="lead">Laboratoire Windows Server – Refonte technique complète.</p>

      <h2>Objectifs principaux</h2>
      <p>L'objectif était de concevoir et déployer une véritable infrastructure Windows d'entreprise afin de comprendre l'interaction des systèmes : Active Directory, DNS, stratégies de groupe, DHCP, services de fichiers, WSUS et procédures de dépannage.</p>

      <blockquote>
        <p>« L'expérience est le meilleur professeur. »</p>
        <cite>— Achraf Bourramane</cite>
      </blockquote>

      <h3>Phase 1 – Infrastructure &amp; Réseau</h3>
      <p>Points clés :</p>
      <ul>
        <li>VirtualBox comme plateforme de virtualisation</li>
        <li>DC1 : Windows Server 2019 Core (sans GUI)</li>
        <li>DC2 : Windows Server 2022 (avec GUI)</li>
        <li>Client Windows 10 pour les tests</li>
        <li>Réseau en mode Bridged pour simuler un réseau d'entreprise</li>
        <li>Adresses IP statiques pour les serveurs</li>
      </ul>

      <h3>Phase 2 – Active Directory &amp; Déploiement</h3>
      <p>GUI (DC2) :</p>
      <ul>
        <li>Server Manager → Ajouter des rôles et fonctionnalités</li>
        <li>Installation du rôle Active Directory Domain Services</li>
        <li>Promotion de DC2 en tant que contrôleur de domaine</li>
        <li>Ajout en tant que second contrôleur de domaine si nécessaire</li>
      </ul>
      <p>Non-GUI (DC1) – Commandes :</p>
      <ul>
        <li>Install-WindowsFeature AD-Domain-Services</li>
        <li>Install-ADDSForest -DomainName "lab.local"</li>
        <li>Install-ADDSDomainController -DomainName "lab.local"</li>
      </ul>

      <h3>Phase 3 – DNS &amp; DHCP</h3>
      <p>Le DNS est critique pour le fonctionnement d'Active Directory. Commandes utiles :</p>
      <ul>
        <li>Get-DnsClientServerAddress</li>
        <li>Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("127.0.0.1","192.168.1.30")</li>
      </ul>
      <p>Conclusion : AD, WSUS et les opérations de jonction au domaine dépendent d'une configuration DNS correcte.</p>

      <h3>Phase 4 – OUs, Utilisateurs et Groupes</h3>
      <p>GUI (Active Directory Users and Computers) :</p>
      <ul>
        <li>Création d'Unités d'Organisation (OU)</li>
        <li>Création et liaison de GPOs aux OU appropriées</li>
        <li>Application des politiques de mot de passe et restrictions utilisateurs</li>
      </ul>

      <h3>Phase 5 – Gestion des stratégies de groupe</h3>
      <ul>
        <li>Création et liaison des GPOs</li>
        <li>Vérification : gpupdate /force, gpresult /r</li>
      </ul>

      <h3>Phase 6 – Serveur DHCP</h3>
      <p>GUI (DC2) :</p>
      <ul>
        <li>Installation du rôle DHCP</li>
        <li>Configuration d'un scope 192.168.1.20 - 192.168.1.120</li>
        <li>Définition du masque, de la passerelle et des serveurs DNS</li>
      </ul>

      <h3>Phase 7 – Serveur de fichiers &amp; permissions NTFS</h3>
      <ul>
        <li>Création de la structure de données</li>
        <li>Configuration des permissions NTFS via des groupes AD</li>
        <li>Suppression d'"Everyone" et mise en place du principe du moindre privilège</li>
      </ul>

      <h3>Phase 8 – WSUS</h3>
      <ul>
        <li>Installation du rôle WSUS</li>
        <li>Résolution des erreurs après déploiement</li>
        <li>Correction des permissions des comptes de service</li>
      </ul>

      <h3>Phase 9 – Problèmes rencontrés &amp; solutions</h3>
      <p>Exemples :</p>
      <ul>
        <li>Problème DNS : échec du join et WSUS → solution : configuration DNS pointant vers 127.0.0.1 et le DC partenaire</li>
        <li>Problème WSUS : contexte de service incorrect → solution : sélectionner le contexte Local Computer</li>
        <li>Problème NTFS : groupes non visibles → solution : choisir l'emplacement de domaine correct</li>
      </ul>

      <h3>Phase 10 – Résultats finaux</h3>
      <p>Le laboratoire démontre des compétences d'intégration systèmes de niveau entreprise : gestion d'Active Directory, DNS, DHCP, GPOs, services de fichiers, WSUS et une capacité de dépannage structurée.</p>
    `
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'عني',
    'nav.projects': 'المشاريع',
    'nav.skills': 'المهارات',
    'nav.contact': 'اتصل',
    'hero.title': 'مرحبًا، أنا Achraf Bourramane',
    'hero.tagline': 'مطور ويب / مسؤول شبكات / فني تكنولوجيا المعلومات',
    'hero.cta': 'عرض أعمالي',
    'hero.download': 'تحميل السيرة الذاتية',
    'about.title': 'من أنا',
    'about.text': 'أنا مسؤول شبكات وأنظمة ولدي شغف بتطوير الويب. أحمل شهادة جامعية في علوم الحاسوب وأتعلم تقنيات جديدة باستمرار.',
    'projects.title': 'المشاريع',
    'project1.title': 'موقع تمثيلي لشركة Meuer Enterprises',
    'project1.desc': 'مشروعي الأول خلال فترة التدريب في شركة Meuer حسب التعليمات.',
    'project1.link': 'عرض',
    'project2.title': 'مختبر منزلي مع اثنين من DCs',
    'project2.desc': 'قمت بإنشاء مختبر منزلي مع اثنين من وحدات تحكم النطاق لاختبار DNS وActive Directory وDHCP وHTTPS.',
    'project2.link': 'عرض',
    'project4.title': 'موقع حجز لـ YouLux Cars',
    'project4.desc': 'كتابة واجهة خلفية وأمامية؛ واجهة المستخدم/تجربة المستخدم بسيطة ومفهومة.',
    'project4.link': 'عرض',
  'project3.title': 'موقع PFE لمشروع/تدريب',
  'project3.desc': 'قمت بإنشاء موقع صفحة واحدة تمثيلي لشركة تأجير معروفة في مراكش.',
  'project3.link': 'عرض',
    'skills.title': 'المهارات',
    'contact.title': 'اتصل',
    'article.title': 'اكتب نصك هنا',
    'article.meta': 'بواسطة Achraf — 29 مارس 2026 · 3 دقائق قراءة',
    'article.lead': 'ابدأ بكتابة فكرتك الرئيسية في هذه الفقرة الافتتاحية. اجعلها قصيرة وجذابة.',
    'article.back': '← العودة',
    'article.body': `
      <p class="lead">مختبر Windows Server – تنفيذ تقني كامل.</p>

      <h2>الأهداف الرئيسية</h2>
      <p>الهدف هو تصميم ونشر بيئة Windows واقعية تشبه بيئة الشركات لفهم تفاعل الأنظمة: Active Directory وDNS وسياسات المجموعات (GPO) وDHCP وخدمات الملفات وWSUS وإجراءات استكشاف الأخطاء.</p>

      <blockquote>
        <p>“الخبرة هي أفضل معلم.”</p>
        <cite>— Achraf Bourramane</cite>
      </blockquote>

      <h3>المرحلة 1 – البنية التحتية والشبكة</h3>
      <ul>
        <li>استخدام VirtualBox كمنصة افتراضية</li>
        <li>DC1: Windows Server 2019 Core (بدون واجهة رسومية)</li>
        <li>DC2: Windows Server 2022 (مع واجهة رسومية)</li>
        <li>جهاز عميل Windows 10 للاختبار</li>
        <li>استخدام Bridged networking لمحاكاة شبكة مؤسسة</li>
        <li>تعيين عناوين IP ثابتة للخوادم</li>
      </ul>

      <h3>المرحلة 2 – Active Directory والنشر</h3>
      <p>واجهة رسومية (DC2):</p>
      <ul>
        <li>Server Manager → إضافة الأدوار والميزات</li>
        <li>تنصيب دور Active Directory Domain Services</li>
        <li>ترقية DC2 إلى وحدة تحكم بالمجال</li>
        <li>إضافة وحدة تحكم دومين ثانية عند الحاجة</li>
      </ul>
      <p>بدون واجهة (DC1) – أوامر مهمة:</p>
      <ul>
        <li>Install-WindowsFeature AD-Domain-Services</li>
        <li>Install-ADDSForest -DomainName "lab.local"</li>
        <li>Install-ADDSDomainController -DomainName "lab.local"</li>
      </ul>

      <h3>المرحلة 3 – DNS وDHCP</h3>
      <p>DNS أساسي لعمل Active Directory. أوامر مفيدة:</p>
      <ul>
        <li>Get-DnsClientServerAddress</li>
        <li>Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("127.0.0.1","192.168.1.30")</li>
      </ul>
      <p>الاستنتاج: يعتمد AD وWSUS وانضمام الأجهزة للمجال بشكل كامل على إعداد DNS سليم.</p>

      <h3>المرحلة 4 – وحدات التنظيم (OUs) والمستخدمون والمجموعات</h3>
      <ul>
        <li>إنشاء OUs</li>
        <li>إنشاء وربط GPOs بالـ OUs المناسبة</li>
        <li>فرض سياسات كلمات المرور وقيود المستخدمين</li>
      </ul>

      <h3>المرحلة 5 – إدارة Group Policy</h3>
      <ul>
        <li>إنشاء وربط GPOs</li>
        <li>التحقق: gpupdate /force و gpresult /r</li>
      </ul>

      <h3>المرحلة 6 – خادم DHCP</h3>
      <ul>
        <li>تثبيت دور DHCP</li>
        <li>تهيئة النطاق 192.168.1.20 - 192.168.1.120</li>
        <li>تحديد قناع الشبكة والبوابة وخوادم DNS</li>
      </ul>

      <h3>المرحلة 7 – خادم الملفات وصلاحيات NTFS</h3>
      <ul>
        <li>إنشاء بنية بيانات الشركة</li>
        <li>تكوين صلاحيات NTFS عبر مجموعات AD</li>
        <li>إزالة 'Everyone' وتطبيق مبدأ أقل الامتيازات</li>
      </ul>

      <h3>المرحلة 8 – WSUS</h3>
      <ul>
        <li>تثبيت دور WSUS</li>
        <li>حل أخطاء ما بعد النشر</li>
        <li>تصحيح أذونات حسابات الخدمة</li>
      </ul>

      <h3>المرحلة 9 – التحديات والحلول</h3>
      <ul>
        <li>مشكلة DNS: فشل الانضمام و WSUS → الحل: ضبط DNS ليشير إلى 127.0.0.1 و DC الشريك</li>
        <li>مشكلة WSUS: سياق الخدمة غير صحيح → الحل: اختيار Local Computer</li>
        <li>مشكلة NTFS: عدم ظهور المجموعات → الحل: اختيار موقع الدومين الصحيح عند منح الصلاحيات</li>
      </ul>

      <h3>المرحلة 10 – النتائج النهائية</h3>
      <p>يوضح المختبر مهارات تكامل الأنظمة على مستوى المؤسسة، بما في ذلك إدارة Active Directory وDNS وDHCP وGPO وخدمات الملفات وWSUS، وقدرة منهجية على استكشاف الأخطاء وإصلاحها.</p>
    `
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',
    'hero.title': 'Hola, soy Achraf Bourramane',
    'hero.tagline': 'Desarrollador Web / Administrador de Red / Técnico IT',
    'hero.cta': 'Ver mi trabajo',
    'hero.download': 'Descargar CV',
    'about.title': 'Sobre mí',
    'about.text': 'Soy administrador de redes y sistemas con pasión por el desarrollo web. Tengo un título universitario en Informática y aprendo nuevas tecnologías continuamente.',
    'projects.title': 'Proyectos',
    'project1.title': 'Sitio representativo para Meuer Enterprises',
    'project1.desc': 'Mi primer proyecto durante mi pasantía en Meuer Company siguiendo las instrucciones proporcionadas.',
    'project1.link': 'Ver',
    'project2.title': 'Home lab con dos DCs',
    'project2.desc': 'Un laboratorio doméstico con dos controladores de dominio para probar DNS, Active Directory, DHCP y HTTPS.',
    'project2.link': 'Ver',
    'project4.title': 'Sitio de reservas para YouLux Cars',
    'project4.desc': 'Desarrollar backend y frontend; UI/UX simple y comprensible.',
    'project4.link': 'Ver',
  'project3.title': 'Sitio web PFE de prácticas',
  'project3.desc': 'He creado un sitio web de una sola página representativo para una conocida empresa de alquiler en Marrakech.',
  'project3.link': 'Ver',
    'skills.title': 'Habilidades',
    'contact.title': 'Contacto',
    'article.title': 'Escribe tu texto aquí',
    'article.meta': 'Por Achraf — 29 de marzo de 2026 · 3 min de lectura',
    'article.lead': 'Comienza tu idea principal en este párrafo inicial. Hazlo corto y atractivo.',
    'article.back': '← Volver al inicio',
    'article.body': `
      <p class="lead">Laboratorio Windows Server – Implementación técnica completa.</p>

      <h2>Objetivos principales</h2>
      <p>El objetivo fue diseñar y desplegar un entorno Windows realista para entender cómo interactúan los sistemas en una empresa: Active Directory, DNS, GPO, DHCP, servicios de archivos, WSUS y resolución de problemas.</p>

      <blockquote>
        <p>“La experiencia es el mejor profesor.”</p>
        <cite>— Achraf Bourramane</cite>
      </blockquote>

      <h3>Fase 1 – Infraestructura &amp; Red</h3>
      <ul>
        <li>VirtualBox como plataforma de virtualización</li>
        <li>DC1: Windows Server 2019 Core (sin GUI)</li>
        <li>DC2: Windows Server 2022 (con GUI)</li>
        <li>Cliente Windows 10 para pruebas</li>
        <li>Red en modo Bridged para simular una red empresarial</li>
        <li>Direcciones IP estáticas para los servidores</li>
      </ul>

      <h3>Fase 2 – Active Directory &amp; Despliegue</h3>
      <p>GUI (DC2):</p>
      <ul>
        <li>Server Manager → Agregar roles y características</li>
        <li>Instalar Active Directory Domain Services</li>
        <li>Promover DC2 como controlador de dominio</li>
      </ul>
      <p>Non-GUI (DC1) – Comandos clave:</p>
      <ul>
        <li>Install-WindowsFeature AD-Domain-Services</li>
        <li>Install-ADDSForest -DomainName "lab.local"</li>
        <li>Install-ADDSDomainController -DomainName "lab.local"</li>
      </ul>

      <h3>Fase 3 – DNS &amp; DHCP</h3>
      <p>El DNS es crítico para Active Directory. Comandos útiles:</p>
      <ul>
        <li>Get-DnsClientServerAddress</li>
        <li>Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("127.0.0.1","192.168.1.30")</li>
      </ul>
      <p>Conclusión: AD, WSUS y las operaciones de unión al dominio dependen de una correcta configuración de DNS.</p>

      <h3>Fase 4 – OUs, Usuarios y Grupos</h3>
      <ul>
        <li>Crear Unidades Organizativas (OUs)</li>
        <li>Crear y enlazar GPOs a las OUs apropiadas</li>
        <li>Aplicar políticas de contraseña y restricciones de usuarios</li>
      </ul>

      <h3>Fase 5 – Gestión de directivas de grupo</h3>
      <ul>
        <li>Crear y enlazar GPOs</li>
        <li>Verificación: gpupdate /force, gpresult /r</li>
      </ul>

      <h3>Fase 6 – Servidor DHCP</h3>
      <ul>
        <li>Instalar el rol DHCP</li>
        <li>Configurar el scope 192.168.1.20 - 192.168.1.120</li>
        <li>Definir máscara, gateway y servidores DNS</li>
      </ul>

      <h3>Fase 7 – Servidor de archivos &amp; permisos NTFS</h3>
      <ul>
        <li>Crear la estructura de datos de la compañía</li>
        <li>Configurar permisos NTFS usando grupos de AD</li>
        <li>Eliminar 'Everyone' y aplicar el principio de menor privilegio</li>
      </ul>

      <h3>Fase 8 – WSUS</h3>
      <ul>
        <li>Instalar el rol WSUS</li>
        <li>Resolver errores post-despliegue</li>
        <li>Corregir permisos de cuentas de servicio</li>
      </ul>

      <h3>Fase 9 – Retos encontrados &amp; soluciones</h3>
      <ul>
        <li>Problema DNS: fallos en join y WSUS → Solución: configurar DNS apuntando a 127.0.0.1 y al DC asociado</li>
        <li>Problema WSUS: contexto de servicio incorrecto → Solución: seleccionar Local Computer</li>
        <li>Problema NTFS: grupos no visibles → Solución: elegir la ubicación de dominio correcta</li>
      </ul>

      <h3>Fase 10 – Resultados finales</h3>
      <p>El laboratorio demuestra habilidades de integración de sistemas a nivel empresarial: administración de Active Directory, DNS, DHCP, GPOs, servicios de archivos, WSUS y una capacidad estructurada de resolución de problemas.</p>
    `
  }
};

function applyTranslations(lang) {
  const map = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const txt = map[key] || translations.en[key] || '';
    // preserve inner markup for links that have children (but here we only set textContent)
    el.textContent = txt;
  });
  // allow injecting HTML for elements that use data-i18n-html (trusted content)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (!key) return;
    const html = map[key] || translations.en[key] || '';
    el.innerHTML = html;
  });
  // set html lang and dir
  document.documentElement.lang = lang;
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
  // enhance article (build TOC, start reveal animations) after translations are injected
  if (typeof enhanceArticle === 'function') enhanceArticle();
}

// wire up selector and persist choice
const langSelects = document.querySelectorAll('#langSelect');
// --- Article enhancements: TOC generation and reveal animations ---
let _articleObserver = null;
function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function enhanceArticle() {
  const content = document.querySelector('.article-content');
  const toc = document.querySelector('.article-toc');
  if (!content) return;

  // build TOC from h2 and h3
  const headings = content.querySelectorAll('h2, h3');
  if (toc) {
    toc.innerHTML = '';
    if (headings.length) {
      const h = document.createElement('h4');
      h.textContent = 'On this page';
      toc.appendChild(h);
      const ul = document.createElement('ul');
      let lastLi = null;
      headings.forEach(node => {
        let id = node.id || slugify(node.textContent);
        if (!node.id) node.id = id;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = node.textContent;
        a.addEventListener('click', e => {
          e.preventDefault();
          document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', '#' + id);
        });
        // nest h3 under previous h2 for a simple TOC
        if (node.tagName.toLowerCase() === 'h3' && lastLi) {
          let nested = lastLi.querySelector('ul');
          if (!nested) {
            nested = document.createElement('ul');
            nested.style.listStyle = 'none';
            nested.style.paddingLeft = '10px';
            lastLi.appendChild(nested);
          }
          const nli = document.createElement('li');
          nli.appendChild(a);
          nested.appendChild(nli);
        } else {
          li.appendChild(a);
          ul.appendChild(li);
          lastLi = li;
        }
      });
      toc.appendChild(ul);
    }
  }

  // reveal animations
  const nodes = content.querySelectorAll('h2,h3,p,ul,blockquote');
  // disconnect previous observer
  if (_articleObserver) { _articleObserver.disconnect(); _articleObserver = null; }
  nodes.forEach((n, i) => {
    n.classList.add('reveal');
    n.style.transitionDelay = (i * 40) + 'ms';
  });
  _articleObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.09 });
  nodes.forEach(n => _articleObserver.observe(n));
}
function initLanguage() {
  const saved = localStorage.getItem('site_lang');
  const browser = (navigator.language || 'en').slice(0,2);
  const lang = saved || (['de','fr','ar','es'].includes(browser) ? browser : 'en');
  // set all selects
  langSelects.forEach(s => { s.value = lang; s.addEventListener('change', e => {
    const v = e.target.value;
    localStorage.setItem('site_lang', v);
    applyTranslations(v);
  });
  });
  applyTranslations(lang);
}

// init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  initLanguage();
}

// Mobile nav toggle wiring
const navToggle = document.getElementById('navToggle');
const navbar = document.querySelector('.navbar');
if (navToggle && navbar) {
  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  // close nav when a nav link is clicked (mobile)
  navbar.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => {
    if (navbar.classList.contains('open')) {
      navbar.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }));
  // close nav on window resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navbar.classList.contains('open')) {
      navbar.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// --- Index page enhancements: reveal animations and small micro-interactions ---
let _indexObserver = null;
function enhanceIndex() {
  // hero elements, project cards, skill badges, and sections
  const heroNodes = document.querySelectorAll('.hero h2, .hero p, .hero button');
  const projectCards = document.querySelectorAll('.project-card');
  const skills = document.querySelectorAll('.skills-list li');
  const sections = document.querySelectorAll('.section');

  const nodes = [...heroNodes, ...projectCards, ...skills, ...sections];
  if (_indexObserver) { _indexObserver.disconnect(); _indexObserver = null; }
  nodes.forEach((n, i) => {
    if (!n) return;
    n.classList.add('reveal');
    n.style.transitionDelay = (i * 60) + 'ms';
    
    // Set skill level CSS variable
    if (n.dataset && n.dataset.level) {
      n.style.setProperty('--level', n.dataset.level);
    }
  });

  _indexObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.08 });

  nodes.forEach(n => { if (n) _indexObserver.observe(n); });
}

// run enhanceIndex on load and after translations change
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { enhanceIndex(); });
} else {
  enhanceIndex();
}

// ensure applyTranslations triggers both enhancements
const _origApply = applyTranslations;
applyTranslations = function(lang) {
  _origApply(lang);
  if (typeof enhanceArticle === 'function') enhanceArticle();
  if (typeof enhanceIndex === 'function') enhanceIndex();
};

// Contact Form Handling - Saves directly to server messages.json file
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      alert('Please fill all fields');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    const feedbackEl = document.getElementById('contactFeedback');

    try {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Send message to backend API
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
      });

      const result = await response.json();

      if (result.success) {
        submitBtn.textContent = '✅ Message Saved!';
        if (feedbackEl) feedbackEl.textContent = 'Message sent — thank you!';
        console.log('%c✅ Message saved successfully to messages.json', 'color: green; font-weight: bold');
      } else {
        throw new Error(result.error);
      }

    } catch(error) {
      submitBtn.textContent = '❌ Error! Please try again';
      if (feedbackEl) feedbackEl.textContent = 'Failed to send — please try again later.';
      console.error('%c❌ Error saving message', 'color: red; font-weight: bold', error);
    }
    
    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 5000);
  });
}

// Smooth page exit transition for internal links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.href && link.host === window.location.host && !link.target) {
    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(-10px)';
    document.body.style.transition = 'all 200ms ease';
    
    setTimeout(() => {
      window.location.href = link.href;
    }, 200);
  }
});
