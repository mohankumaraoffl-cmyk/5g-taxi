/* =========================================================================
   GOOGLE MAPS & PLACES API CONFIGURATION
   -------------------------------------------------------------------------
   Optional: Paste your Google Maps JavaScript API Key below to activate
   live Google Places Autocomplete and Google Maps Geocoding.
   
   If left blank (''), the intelligent built-in South India / Tamil Nadu
   location directory handles searches smoothly without breaking any features!
   ========================================================================= */
const GOOGLE_MAPS_API_KEY = '';

/* ------ 1. Mobile Navigation ------ */
const menu = document.getElementById('menu');
const nav  = document.getElementById('nav');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

// Close nav when a link is clicked
document.querySelectorAll('#nav a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  })
);

// Close nav when tapping anywhere outside on mobile
document.addEventListener('click', (e) => {
  if (nav && menu && nav.classList.contains('open')) {
    if (!nav.contains(e.target) && !menu.contains(e.target)) {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }
  }
});

/* =========================================================================
   SMART LOCATION & AUTOCOMPLETE ENGINE (Dual-Mode: Google Places + Built-in)
   ========================================================================= */

// Comprehensive All-38 Districts, Taluks, Towns, Villages & Tourist/Pilgrimage Destinations of Tamil Nadu
const TAMIL_NADU_LOCATIONS = [
  // =========================================================================
  // ALL 38 DISTRICTS OF TAMIL NADU
  // =========================================================================
  { name: 'Ariyalur', sub: 'District, Tamil Nadu', icon: '🏛️', tags: 'ariyalur district cholapuram sendurai udaiyarpalayam andimadam' },
  { name: 'Chengalpattu', sub: 'District, Tamil Nadu', icon: '📍', tags: 'chengalpattu chengalpet district tambaram mahabalipuram' },
  { name: 'Chennai', sub: 'District & Capital City, Tamil Nadu', icon: '🏙️', tags: 'chennai madras metropolitan central egmore airport district' },
  { name: 'Coimbatore', sub: 'District, Tamil Nadu', icon: '🏭', tags: 'coimbatore kovai textile city isha adiyogi district' },
  { name: 'Cuddalore', sub: 'District, Tamil Nadu', icon: '🌊', tags: 'cuddalore district chidambaram pichavaram neyveli panruti virudhachalam vridhachalam' },
  { name: 'Dharmapuri', sub: 'District, Tamil Nadu', icon: '⛰️', tags: 'dharmapuri district hogenakkal harur pennagaram' },
  { name: 'Dindigul', sub: 'District, Tamil Nadu', icon: '🏰', tags: 'dindigul district palani kodaikanal sirumalai oddanchatram' },
  { name: 'Erode', sub: 'District, Tamil Nadu', icon: '🌾', tags: 'erode district turmeric bhavani gobichettipalayam perundurai sathyamangalam' },
  { name: 'Kallakurichi', sub: 'District, Tamil Nadu', icon: '📍', tags: 'kallakurichi district thirukovilur sankarapuram ulundurpet kalrayan' },
  { name: 'Kanchipuram', sub: 'District (Silk City), Tamil Nadu', icon: '🥻', tags: 'kanchipuram kanjeevaram silk temple city district walajabad sriperumbudur' },
  { name: 'Kanyakumari', sub: 'District (Cape Comorin), Tamil Nadu', icon: '🌅', tags: 'kanyakumari nagercoil district vivekananda rock thiruvalluvar' },
  { name: 'Karur', sub: 'District, Tamil Nadu', icon: '🧶', tags: 'karur district textile pasupatheeswarar kulithalai aravakurichi' },
  { name: 'Krishnagiri', sub: 'District, Tamil Nadu', icon: '🥭', tags: 'krishnagiri district hosur dam mango city pochiampalli bargur' },
  { name: 'Madurai', sub: 'District (Temple City), Tamil Nadu', icon: '🏛️', tags: 'madurai district meenakshi amman alagar kovil thiruparankundram' },
  { name: 'Mayiladuthurai', sub: 'District, Tamil Nadu', icon: '🛕', tags: 'mayiladuthurai mayuram district sirkazhi tharangambadi kuthalam poompuhar' },
  { name: 'Nagapattinam', sub: 'District, Tamil Nadu', icon: '🌊', tags: 'nagapattinam district velankanni nagore vedaranyam kilvelur' },
  { name: 'Namakkal', sub: 'District (Egg City), Tamil Nadu', icon: '🥚', tags: 'namakkal district anjaneyar kolli hills rasipuram tiruchengode paramathi' },
  { name: 'Nilgiris (Ooty)', sub: 'District (Queen of Hill Stations), Tamil Nadu', icon: '🌲', tags: 'nilgiris ooty udhagamandalam coonoor kotagiri gudalur district' },
  { name: 'Perambalur', sub: 'District, Tamil Nadu', icon: '📍', tags: 'perambalur district ranjankudi veppanthattai kunnam' },
  { name: 'Pudukkottai', sub: 'District, Tamil Nadu', icon: '🏰', tags: 'pudukkottai district sittannavasal viralimalai aranthangi alangudi avudaiyarkoil' },
  { name: 'Ramanathapuram', sub: 'District, Tamil Nadu', icon: '🏖️', tags: 'ramanathapuram ramnad district rameswaram dhanushkodi paramakudi kilakarai' },
  { name: 'Ranipet', sub: 'District, Tamil Nadu', icon: '📍', tags: 'ranipet district walajah arcot arakkonam sholinghur nemili' },
  { name: 'Salem', sub: 'District (Steel & Mango City), Tamil Nadu', icon: '🥭', tags: 'salem district yercaud mettur dam attur omalur edappadi' },
  { name: 'Sivaganga', sub: 'District (Chettinad), Tamil Nadu', icon: '🏛️', tags: 'sivaganga district karaikudi chettinad devakottai manamadurai kalayarkoil' },
  { name: 'Tenkasi', sub: 'District (Spa of South), Tamil Nadu', icon: '💧', tags: 'tenkasi district courtallam kutralam sankarankovil kadayanallur shenkottai' },
  { name: 'Thanjavur (Tanjore)', sub: 'District (Granary of TN), Tamil Nadu', icon: '🌾', tags: 'thanjavur tanjore district kumbakonam pattukkottai orathanadu thiruvaiyaru' },
  { name: 'Theni', sub: 'District, Tamil Nadu', icon: '🌿', tags: 'theni district bodinayakanur periyakulam cumbum megamalai suruli falls' },
  { name: 'Thoothukudi (Tuticorin)', sub: 'District (Pearl City), Tamil Nadu', icon: '⚓', tags: 'thoothukudi tuticorin district tiruchendur kovilpatti ottapidaram kayalpattinam' },
  { name: 'Tiruchirappalli (Trichy)', sub: 'District, Tamil Nadu', icon: '📍', tags: 'tiruchirappalli trichy district srirangam rockfort manapparai thuraiyur' },
  { name: 'Tirunelveli', sub: 'District (Halwa City), Tamil Nadu', icon: '🍬', tags: 'tirunelveli district nellai nellaiyappar ambasamudram cheranmahadevi radhapuram' },
  { name: 'Tirupathur', sub: 'District, Tamil Nadu', icon: '📍', tags: 'tirupathur district vaniyambadi ambur yelagiri hills natrampalli' },
  { name: 'Tiruppur', sub: 'District (Dollar City), Tamil Nadu', icon: '👕', tags: 'tiruppur district dharapuram avinashi udumalpet kangeyam palladam' },
  { name: 'Tiruvallur', sub: 'District, Tamil Nadu', icon: '📍', tags: 'tiruvallur district poonamallee avadi gummidipoondi ponneri tiruttani' },
  { name: 'Tiruvannamalai', sub: 'District (Temple City), Tamil Nadu', icon: '🔥', tags: 'tiruvannamalai district annamalaiyar girivalam arani chengam polur cheyyar' },
  { name: 'Tiruvarur', sub: 'District, Tamil Nadu', icon: '🛕', tags: 'tiruvarur thiruvarur district mannargudi thiruthuraipoondi nannilam kudavasal' },
  { name: 'Vellore', sub: 'District (Fort City), Tamil Nadu', icon: '🏰', tags: 'vellore district golden temple sripuram fort katpadi gudiyatham' },
  { name: 'Viluppuram', sub: 'District, Tamil Nadu', icon: '📍', tags: 'viluppuram district gingee senji tindivanam vanur marakkanam' },
  { name: 'Virudhunagar', sub: 'District, Tamil Nadu', icon: '📍', tags: 'virudhunagar district srivilliputhur sivakasi rajapalayam aruppukottai sattur' },

  // =========================================================================
  // ARIYALUR & CUDDALORE TALUKS, TOWNS & VILLAGES
  // =========================================================================
  { name: 'Andimadam', sub: 'Taluk, Ariyalur District, Tamil Nadu 621801', icon: '📍', tags: 'andimadam andimadam taluk village varadarajanpettai vilandai kavarapalayam ariyalur' },
  { name: 'Virudhachalam (Vridhachalam)', sub: 'Taluk & Junction, Cuddalore District, Tamil Nadu 606001', icon: '🚆', tags: 'virudhachalam vridhachalam vriddhachalam vriddhagiriswarar kolanjiappar railway junction cuddalore' },
  { name: 'Jayankondam', sub: 'Ariyalur District, Tamil Nadu 621802', icon: '📍', tags: 'jayankondam jayamkondam gangaikonda cholapuram ariyalur town' },
  { name: 'Sendurai', sub: 'Taluk, Ariyalur District, Tamil Nadu 621714', icon: '📍', tags: 'sendurai sendhurai cement mines ariyalur' },
  { name: 'Udayarpalayam', sub: 'Taluk, Ariyalur District, Tamil Nadu 621804', icon: '🏰', tags: 'udayarpalayam udaiyarpalayam palace ariyalur' },
  { name: 'T. Palur', sub: 'Ariyalur District, Tamil Nadu 612904', icon: '📍', tags: 't palur t.palur paloor vikramam ariyalur' },
  { name: 'Thirumanur', sub: 'Ariyalur District, Tamil Nadu 621715', icon: '📍', tags: 'thirumanur coleroon kollidam ariyalur' },
  { name: 'Meensurutti', sub: 'Ariyalur District, Tamil Nadu 612903', icon: '📍', tags: 'meensurutti gangaikonda cholapuram junction ariyalur' },
  { name: 'Pennadam', sub: 'Cuddalore District, Tamil Nadu 606105', icon: '🛕', tags: 'pennadam sudarkozhundeeswarar sugar mill cuddalore' },
  { name: 'Tittakudi (Thittagudi)', sub: 'Taluk, Cuddalore District, Tamil Nadu 606106', icon: '📍', tags: 'tittakudi thittagudi taluk cuddalore vellar' },
  { name: 'Sethiathoppu', sub: 'Cuddalore District, Tamil Nadu 608702', icon: '📍', tags: 'sethiathoppu anicut veeranam anaicut cuddalore' },
  { name: 'Bhuvanagiri', sub: 'Taluk, Cuddalore District, Tamil Nadu 608601', icon: '🛕', tags: 'bhuvanagiri raghavendra swamy birth place cuddalore' },
  { name: 'Kattumannarkoil', sub: 'Taluk, Cuddalore District, Tamil Nadu 608301', icon: '🌾', tags: 'kattumannarkoil veeranam lake veeranarayanapuram cuddalore' },
  { name: 'Srimushnam', sub: 'Taluk, Cuddalore District, Tamil Nadu 608703', icon: '🛕', tags: 'srimushnam bhuvarahaswamy temple swayamvyakta divyadesam cuddalore' },
  { name: 'Kurinjipadi', sub: 'Taluk, Cuddalore District, Tamil Nadu 607302', icon: '📍', tags: 'kurinjipadi handloom silk weavers cuddalore' },
  { name: 'Vadalur', sub: 'Cuddalore District, Tamil Nadu 607303', icon: '🕯️', tags: 'vadalur vallalar sathya gnana sabai jyothi cuddalore' },
  { name: 'Neyveli Township', sub: 'Cuddalore District, Tamil Nadu 607801', icon: '⚡', tags: 'neyveli lignite nlc thermal power township cuddalore block' },
  { name: 'Panruti', sub: 'Taluk (Jackfruit & Cashew City), Cuddalore, TN 607106', icon: '🥜', tags: 'panruti cashew jackfruit thenpennai cuddalore' },
  { name: 'Chidambaram', sub: 'Taluk, Cuddalore District, Tamil Nadu 608001', icon: '🛕', tags: 'chidambaram natarajar temple annamalai university cuddalore' },
  { name: 'Cuddalore Town / Port (OT)', sub: 'Cuddalore District, Tamil Nadu 607001', icon: '⚓', tags: 'cuddalore port ot silver beach cuddalore old town' },
  { name: 'Nellikuppam', sub: 'Cuddalore District, Tamil Nadu 607105', icon: '🌾', tags: 'nellikuppam sugar factory cuddalore' },
  { name: 'Parangipettai (Porto Novo)', sub: 'Cuddalore District, Tamil Nadu 608502', icon: '🌊', tags: 'parangipettai porto novo marine biology beach cuddalore' },
  { name: 'Lalpettai', sub: 'Kattumannarkoil, Cuddalore, Tamil Nadu 608301', icon: '📍', tags: 'lalpettai veeranam lake cuddalore' },

  // =========================================================================
  // KUMBAKONAM & CAUVERY DELTA LOCALITIES, TOWNS & VILLAGES
  // =========================================================================
  { name: 'Kumbakonam Town', sub: 'Kumbakonam, Tamil Nadu 612001', icon: '📍', tags: 'kumbakonam city center town head' },
  { name: 'Kumbakonam Railway Station (KMU)', sub: 'Gandhi Adigal Salai, Kumbakonam, Tamil Nadu', icon: '🚆', tags: 'kumbakonam railway station kmu train junction' },
  { name: 'Kumbakonam New Bus Stand', sub: 'TSR Big Street, Kumbakonam, Tamil Nadu', icon: '🚏', tags: 'kumbakonam new bus stand bs' },
  { name: 'Kumbakonam Old Bus Stand', sub: 'Town Hall, Kumbakonam, Tamil Nadu', icon: '🚏', tags: 'kumbakonam old bus stand' },
  { name: 'Sekkangani Main Gate', sub: 'Sekkangani, Kumbakonam, Tamil Nadu 612001', icon: '⌖', tags: 'sekkangani main gate 5g taxi head office' },
  { name: 'Mahamaham Tank (Kulam)', sub: 'Mahamaham Ghat, Kumbakonam, Tamil Nadu', icon: '🏛️', tags: 'mahamaham kulam tank temple ghat kumbakonam theertham' },
  { name: 'Adi Kumbeswarar Temple', sub: 'Thanjavur Main Road, Kumbakonam, Tamil Nadu', icon: '🛕', tags: 'adi kumbeswarar temple sivan kovil kumbakonam' },
  { name: 'Sarangapani Temple', sub: 'Valayapettai Agraharam, Kumbakonam, Tamil Nadu', icon: '🛕', tags: 'sarangapani temple perumal kovil divyadesam kumbakonam' },
  { name: 'Ramaswamy Temple', sub: 'Kumbakonam, Tamil Nadu', icon: '🛕', tags: 'ramaswamy temple kumbakonam ramar kovil' },
  { name: 'Chakrapani Temple', sub: 'Chakrapani Sannathi, Kumbakonam, Tamil Nadu', icon: '🛕', tags: 'chakrapani temple perumal surya kumbakonam' },
  { name: 'Nageswaran Temple', sub: 'Nageswaran North Street, Kumbakonam, Tamil Nadu', icon: '🛕', tags: 'nageswaran temple sivan kumbakonam' },
  { name: 'Kasi Viswanathar Temple', sub: 'Mahamaham Tank East, Kumbakonam, Tamil Nadu', icon: '🛕', tags: 'kasi viswanathar temple kumbakonam mahamaham' },
  { name: 'Swamimalai Murugan Temple', sub: 'Swamimalai, Kumbakonam, Tamil Nadu 612302', icon: '🛕', tags: 'swamimalai swami malai murugan temple arupadai veedu fourth fourth' },
  { name: 'Uppiliappan Temple (Oppiliappan)', sub: 'Thirunageswaram, Kumbakonam, Tamil Nadu', icon: '🛕', tags: 'uppiliappan oppiliappan temple perumal then tirupati divyadesam' },
  { name: 'Airavatesvara Temple (UNESCO)', sub: 'Darasuram, Kumbakonam, Tamil Nadu 612702', icon: '🏛️', tags: 'darasuram airavatesvara unesco chola temple great living chola' },
  { name: 'Patteeswaram Durga Temple', sub: 'Patteeswaram, Kumbakonam, Tamil Nadu', icon: '🛕', tags: 'patteeswaram dhenupureeswarar durga amman temple chola' },
  { name: 'Thiruvidaimarudur', sub: 'Taluk, Thanjavur District, Tamil Nadu 612104', icon: '🛕', tags: 'thiruvidaimarudur mahalingam sivan temple madhyarjuna' },
  { name: 'Aduthurai (Maruthuvakkudi)', sub: 'Thanjavur District, Tamil Nadu 612101', icon: '🌾', tags: 'aduthurai rice research institute maruthuvakkudi thanjavur' },
  { name: 'Thiruppanandal', sub: 'Taluk, Thanjavur District, Tamil Nadu 612504', icon: '🛕', tags: 'thiruppanandal kasi mutt sivan temple thanjavur' },
  { name: 'Thirunageswaram', sub: 'Kumbakonam, Tamil Nadu 612204', icon: '🐉', tags: 'thirunageswaram rahu sthalam naganathaswamy' },
  { name: 'Nachiyar Koil (Thirunaraiyur)', sub: 'Kumbakonam, Tamil Nadu 612102', icon: '🛕', tags: 'nachiyar koil brass lamp kal garudan thirunaraiyur' },
  { name: 'Thirubuvanam', sub: 'Kumbakonam, Thanjavur District, Tamil Nadu 612103', icon: '🥻', tags: 'thirubuvanam silk sarangapani kampaheswarar sarabeswarar temple' },
  { name: 'Cholapuram', sub: 'Kumbakonam, Tamil Nadu 612503', icon: '📍', tags: 'cholapuram kumbakonam thanjavur' },
  { name: 'Valangaiman', sub: 'Taluk, Tiruvarur District, Tamil Nadu 612804', icon: '🛕', tags: 'valangaiman mariamman temple tinnappar tiruvarur' },
  { name: 'Papanasam', sub: 'Taluk, Thanjavur District, Tamil Nadu 614205', icon: '🛕', tags: 'papanasam 108 sivalayam palaivananathar temple thanjavur' },
  { name: 'Ayyampettai (Pasupathikoil)', sub: 'Thanjavur District, Tamil Nadu 614201', icon: '📍', tags: 'ayyampettai pasupathikoil chakkarappalli thanjavur' },
  { name: 'Kabisthalam', sub: 'Papanasam, Thanjavur District, Tamil Nadu 614203', icon: '🛕', tags: 'kabisthalam gajendra varadha perumal temple' },
  { name: 'Thiruvaiyaru', sub: 'Taluk, Thanjavur District, Tamil Nadu 613204', icon: '🛕', tags: 'thiruvaiyaru thyagaraja aradhana sangeetham aiyarappar cauvery' },
  { name: 'Budalur', sub: 'Taluk, Thanjavur District, Tamil Nadu 613602', icon: '🚆', tags: 'budalur railway station thanjavur' },
  { name: 'Vallam', sub: 'Thanjavur, Tamil Nadu 613403', icon: '🎓', tags: 'vallam periyar maniammai university pmu thanjavur' },
  { name: 'Orathanadu (Mukthambalpuram)', sub: 'Taluk, Thanjavur District, Tamil Nadu 614625', icon: '📍', tags: 'orathanadu chathiram thanjavur' },
  { name: 'Pattukkottai', sub: 'Taluk, Thanjavur District, Tamil Nadu 614601', icon: '📍', tags: 'pattukkottai delta coconut town thanjavur' },
  { name: 'Peravurani', sub: 'Taluk, Thanjavur District, Tamil Nadu 614804', icon: '📍', tags: 'peravurani thanjavur delta coir' },
  { name: 'Madukkur', sub: 'Pattukkottai, Thanjavur District, Tamil Nadu 614903', icon: '📍', tags: 'madukkur thanjavur' },
  { name: 'Sethubhavachatram', sub: 'Thanjavur District, Tamil Nadu 614623', icon: '⚓', tags: 'sethubhavachatram coast seashore thanjavur' },
  { name: 'Ammapettai', sub: 'Papanasam, Thanjavur District, Tamil Nadu 614401', icon: '📍', tags: 'ammapettai thanjavur' },
  { name: 'Poondi', sub: 'Thanjavur District, Tamil Nadu 613105', icon: '⛪', tags: 'poondi madha basilica church our lady of lourdes' },

  // =========================================================================
  // TIRUVARUR, MAYILADUTHURAI & NAGAPATTINAM TALUKS & TOWNS
  // =========================================================================
  { name: 'Mannargudi', sub: 'Taluk, Tiruvarur District, Tamil Nadu 614001', icon: '🛕', tags: 'mannargudi rajagopalaswamy temple dakshina dwaraka haridra nadhi' },
  { name: 'Needamangalam', sub: 'Taluk, Tiruvarur District, Tamil Nadu 614404', icon: '🚆', tags: 'needamangalam junction railway station santhana ramar' },
  { name: 'Kudavasal (Kodavasal)', sub: 'Taluk, Tiruvarur District, Tamil Nadu 612601', icon: '📍', tags: 'kudavasal kodavasal koneswarar temple tiruvarur' },
  { name: 'Koradacheri', sub: 'Tiruvarur District, Tamil Nadu 613703', icon: '📍', tags: 'koradacheri railway station tiruvarur' },
  { name: 'Nannilam', sub: 'Taluk, Tiruvarur District, Tamil Nadu 610105', icon: '🛕', tags: 'nannilam madhuvaneswarar temple tiruvarur' },
  { name: 'Peralam', sub: 'Nannilam, Tiruvarur District, Tamil Nadu 609405', icon: '🚆', tags: 'peralam junction railway station tiruvarur' },
  { name: 'Poonthottam', sub: 'Tiruvarur District, Tamil Nadu 609503', icon: '🛕', tags: 'poonthottam koothanur saraswathi temple tiruvarur' },
  { name: 'Thiruthuraipoondi', sub: 'Taluk, Tiruvarur District, Tamil Nadu 614713', icon: '🛕', tags: 'thiruthuraipoondi piravimarundeeswarar mangrove' },
  { name: 'Muthupet (Muthupettai)', sub: 'Tiruvarur District, Tamil Nadu 614704', icon: '🚣', tags: 'muthupet muthupettai mangrove lagoon dargah' },
  { name: 'Sirkazhi (Seerkazhi)', sub: 'Taluk, Mayiladuthurai District, Tamil Nadu 609110', icon: '🛕', tags: 'sirkazhi seerkazhi sattainathar temple thirugnanasambandar' },
  { name: 'Vaitheeswaran Koil', sub: 'Sirkazhi, Mayiladuthurai District, TN 609117', icon: '🔴', tags: 'vaitheeswaran kovil koil chevvai mars nadi astrology' },
  { name: 'Kuthalam (Kuttalam)', sub: 'Taluk, Mayiladuthurai District, Tamil Nadu 609801', icon: '📍', tags: 'kuthalam kuttalam ukthavedeeswarar temple' },
  { name: 'Tharangambadi (Tranquebar)', sub: 'Taluk, Mayiladuthurai District, Tamil Nadu 609313', icon: '🏰', tags: 'tharangambadi tranquebar danish fort beach' },
  { name: 'Sembanarkoil', sub: 'Mayiladuthurai District, Tamil Nadu 609309', icon: '📍', tags: 'sembanarkoil sembanarkovil mayiladuthurai' },
  { name: 'Poompuhar (Kaveripoompattinam)', sub: 'Sirkazhi, Mayiladuthurai, TN 609105', icon: '🌊', tags: 'poompuhar silappathikaram kannagi beach monument' },
  { name: 'Kollidam', sub: 'Sirkazhi, Mayiladuthurai District, Tamil Nadu 609102', icon: '🌊', tags: 'kollidam coleroon river bridge' },
  { name: 'Manalmedu', sub: 'Mayiladuthurai District, Tamil Nadu 609202', icon: '📍', tags: 'manalmedu mayiladuthurai' },
  { name: 'Anaikkarai (Lower Anicut)', sub: 'Thanjavur / Cuddalore Border, Tamil Nadu 612505', icon: '🌊', tags: 'anaikkarai lower anicut bridge dam cauvery kollidam' },
  { name: 'Velankanni', sub: 'Nagapattinam District, Tamil Nadu 611111', icon: '⛪', tags: 'velankanni basilica church matha beach' },
  { name: 'Nagore', sub: 'Nagapattinam District, Tamil Nadu 611002', icon: '🕌', tags: 'nagore dargah sharif saint nagapattinam' },
  { name: 'Kilvelur', sub: 'Taluk, Nagapattinam District, Tamil Nadu 611104', icon: '📍', tags: 'kilvelur keezhavalur nagapattinam' },
  { name: 'Vedaranyam', sub: 'Taluk, Nagapattinam District, Tamil Nadu 614810', icon: '🦌', tags: 'vedaranyam salt satyagraha point calimere bird sanctuary' },
  { name: 'Thalainayar', sub: 'Nagapattinam District, Tamil Nadu 614712', icon: '📍', tags: 'thalainayar nagapattinam' },

  // =========================================================================
  // ALL 9 NAVAGRAHA TEMPLES
  // =========================================================================
  { name: 'Suriyanar Kovil (1. Sun / Surya Temple)', sub: 'Suriyanar Kovil, Aduthurai, Tamil Nadu 612102', icon: '☀️', tags: 'suriyanar kovil sun surya bhagavan navagraha 1' },
  { name: 'Thingaloor Chandran Temple (2. Moon Temple)', sub: 'Thingaloor, Thanjavur District, Tamil Nadu', icon: '🌙', tags: 'thingaloor moon chandra kailasanathar navagraha 2' },
  { name: 'Vaitheeswaran Kovil (3. Mars / Chevvai Temple)', sub: 'Vaitheeswaran Kovil, Mayiladuthurai District, Tamil Nadu', icon: '🔴', tags: 'vaitheeswaran kovil chevvai mars angarakan vaithiyanathar navagraha 3' },
  { name: 'Thiruvenkadu Budhan Temple (4. Mercury Temple)', sub: 'Thiruvenkadu, Sirkazhi, Mayiladuthurai District', icon: '🟢', tags: 'thiruvenkadu budhan mercury swetharanyeswarar navagraha 4' },
  { name: 'Alangudi Guru Temple (5. Jupiter Temple)', sub: 'Alangudi, Valangaiman, Tiruvarur District, Tamil Nadu', icon: '🟡', tags: 'alangudi guru jupiter apatsahayeswarar dakshinamurthy navagraha 5' },
  { name: 'Kanjanur Sukran Temple (6. Venus Temple)', sub: 'Kanjanur, Thiruvidaimarudur, Tamil Nadu', icon: '⚪', tags: 'kanjanur sukran venus agneeswarar navagraha 6' },
  { name: 'Thirunallar Saneeswaran Temple (7. Saturn Temple)', sub: 'Thirunallar, Karaikal, Puducherry 609607', icon: '🪐', tags: 'thirunallar saneeswaran sani shani saturn darbaranyeswarar navagraha 7' },
  { name: 'Thirunageswaram Rahu Temple (8. Rahu Temple)', sub: 'Thirunageswaram, Kumbakonam, Tamil Nadu', icon: '🐉', tags: 'thirunageswaram rahu raaghu naganathaswamy milk abhishekam navagraha 8' },
  { name: 'Keezhaperumpallam Kethu Temple (9. Ketu Temple)', sub: 'Keezhaperumpallam, Poompuhar, Mayiladuthurai District', icon: '🐍', tags: 'keezhaperumpallam kethu ketu naganathar navagraha 9' },

  // =========================================================================
  // THANJAVUR & CENTRAL TAMIL NADU HERITAGE
  // =========================================================================
  { name: 'Thanjavur Brihadeeswarar Temple (Big Temple)', sub: 'Membalam Road, Thanjavur, Tamil Nadu', icon: '🏛️', tags: 'thanjavur big temple periya kovil brihadeeswara unesco raja raja chola' },
  { name: 'Thanjavur Junction Railway Station (TJ)', sub: 'Railway Station Road, Thanjavur, Tamil Nadu', icon: '🚆', tags: 'thanjavur junction railway station tj train' },
  { name: 'Thanjavur Maratha Palace & Saraswathi Mahal', sub: 'East Main Street, Thanjavur, Tamil Nadu', icon: '🏰', tags: 'thanjavur palace saraswathi mahal library art gallery nayak' },
  { name: 'Gangaikonda Cholapuram Temple (UNESCO)', sub: 'Jayankondam, Ariyalur District, Tamil Nadu', icon: '🏛️', tags: 'gangaikonda cholapuram unesco rajendra chola brihadeeswarar jayankondam ariyalur' },
  { name: 'Kallanai Dam (Grand Anicut)', sub: 'Tiruchirappalli / Thanjavur Border, Tamil Nadu', icon: '🌊', tags: 'kallanai dam grand anicut karikala cholan cauvery river' },

  // =========================================================================
  // TRICHY & SURROUNDING TALUKS
  // =========================================================================
  { name: 'Tiruchirappalli International Airport (TRZ)', sub: 'Airport Road, Trichy, Tamil Nadu 620007', icon: '✈️', tags: 'trichy airport trz international domestic flights terminal' },
  { name: 'Tiruchirappalli Junction Railway Station (TPJ)', sub: 'Junction Road, Trichy, Tamil Nadu', icon: '🚆', tags: 'trichy junction tpj central railway station' },
  { name: 'Srirangam Ranganathaswamy Temple', sub: 'Srirangam, Trichy, Tamil Nadu', icon: '🛕', tags: 'srirangam ranganathar temple perumal first divyadesam largest temple trichy' },
  { name: 'Rockfort Ucchi Pillayar Temple', sub: 'Rockfort, Trichy, Tamil Nadu', icon: '⛰️', tags: 'rockfort ucchi pillayar temple trichy malaikkottai ganesh' },
  { name: 'Samayapuram Mariamman Temple', sub: 'Samayapuram, Trichy, Tamil Nadu', icon: '🛕', tags: 'samayapuram mariamman kovil amman trichy tollgate' },
  { name: 'Thiruvanaikaval Jambukeswarar Temple', sub: 'Thiruvanaikoil, Trichy, Tamil Nadu', icon: '🛕', tags: 'thiruvanaikaval jambukeswarar water appu lingam panchabhoota trichy' },
  { name: 'Manapparai', sub: 'Taluk (Murukku City), Trichy District, Tamil Nadu 621306', icon: '🥨', tags: 'manapparai murukku cattle market trichy' },
  { name: 'Thuraiyur', sub: 'Taluk, Trichy District, Tamil Nadu 621010', icon: '📍', tags: 'thuraiyur prasanna venkatachalapathy temple trichy' },
  { name: 'Musiri', sub: 'Taluk, Trichy District, Tamil Nadu 621211', icon: '📍', tags: 'musiri cauvery river bridge trichy' },
  { name: 'Lalgudi', sub: 'Taluk, Trichy District, Tamil Nadu 621601', icon: '📍', tags: 'lalgudi saptarishishwarar temple trichy' },
  { name: 'Manachanallur', sub: 'Taluk (Ponni Rice), Trichy District, TN 621005', icon: '🌾', tags: 'manachanallur ponni rice mills trichy' },
  { name: 'Thottiyam', sub: 'Taluk, Trichy District, Tamil Nadu 621215', icon: '📍', tags: 'thottiyam banana plantation trichy' },

  // =========================================================================
  // PERAMBALUR & PUDUKKOTTAI TALUKS
  // =========================================================================
  { name: 'Veppanthattai', sub: 'Taluk, Perambalur District, Tamil Nadu 621116', icon: '📍', tags: 'veppanthattai ranjankudi fort perambalur' },
  { name: 'Kunnam', sub: 'Taluk, Perambalur District, Tamil Nadu 621708', icon: '📍', tags: 'kunnam perambalur' },
  { name: 'Poolambadi', sub: 'Perambalur District, Tamil Nadu 621112', icon: '📍', tags: 'poolambadi perambalur' },
  { name: 'Aranthangi', sub: 'Taluk, Pudukkottai District, Tamil Nadu 614616', icon: '📍', tags: 'aranthangi fort railway station pudukkottai' },
  { name: 'Alangudi', sub: 'Taluk, Pudukkottai District, Tamil Nadu 622301', icon: '📍', tags: 'alangudi pudukkottai' },
  { name: 'Viralimalai Murugan Temple', sub: 'Viralimalai, Pudukkottai District, TN 621316', icon: '🛕', tags: 'viralimalai murugan peacock sanctuary pudukkottai' },
  { name: 'Thirumayam Fort & Rock-Cut Temple', sub: 'Thirumayam, Pudukkottai District, TN 622507', icon: '🏰', tags: 'thirumayam fort sathyagiriswarar pudukkottai' },
  { name: 'Avudaiyarkoil (Thirupperunturai)', sub: 'Taluk, Pudukkottai District, TN 614618', icon: '🛕', tags: 'avudaiyarkoil manickavasagar athmanathaswamy pudukkottai' },
  { name: 'Ponnamaravathi', sub: 'Taluk, Pudukkottai District, Tamil Nadu 622407', icon: '📍', tags: 'ponnamaravathi pudukkottai' },
  { name: 'Sittannavasal Cave Paintings', sub: 'Pudukkottai District, Tamil Nadu 622101', icon: '🎨', tags: 'sittannavasal jain cave paintings pudukkottai' },

  // =========================================================================
  // MADURAI, SIVAGANGA & RAMANATHAPURAM
  // =========================================================================
  { name: 'Madurai Meenakshi Amman Temple', sub: 'Madurai, Tamil Nadu 625001', icon: '🛕', tags: 'madurai meenakshi sundareswarar amman temple chithirai' },
  { name: 'Madurai Airport (IXM)', sub: 'Avaniyapuram, Madurai, Tamil Nadu 625022', icon: '✈️', tags: 'madurai airport ixm flights' },
  { name: 'Madurai Junction Railway Station (MDU)', sub: 'Railway Colony, Madurai, Tamil Nadu', icon: '🚆', tags: 'madurai junction mdu railway station' },
  { name: 'Thiruparankundram Murugan Temple', sub: 'Thiruparankundram, Madurai, Tamil Nadu', icon: '🛕', tags: 'thiruparankundram murugan temple first arupadai veedu madurai' },
  { name: 'Pazhamudircholai Murugan Temple', sub: 'Alagar Kovil Hills, Madurai, Tamil Nadu', icon: '🛕', tags: 'pazhamudircholai murugan temple sixth arupadai veedu madurai' },
  { name: 'Alagar Kovil (Kallazhagar Temple)', sub: 'Alagar Kovil, Madurai, Tamil Nadu', icon: '🛕', tags: 'alagar kovil kallalagar vishnu temple madurai' },
  { name: 'Melur', sub: 'Taluk, Madurai District, Tamil Nadu 625106', icon: '📍', tags: 'melur granite agricultural market madurai' },
  { name: 'Thirumangalam', sub: 'Taluk, Madurai District, Tamil Nadu 625706', icon: '📍', tags: 'thirumangalam tollgate kappalur madurai' },
  { name: 'Usilampatti', sub: 'Taluk, Madurai District, Tamil Nadu 625532', icon: '📍', tags: 'usilampatti 58 canal madurai' },
  { name: 'Karaikudi (Chettinad)', sub: 'Taluk, Sivaganga District, Tamil Nadu 630001', icon: '🏰', tags: 'karaikudi chettinad heritage mansions cecri algappa university sivaganga' },
  { name: 'Devakottai', sub: 'Taluk, Sivaganga District, Tamil Nadu 630302', icon: '🏰', tags: 'devakottai chettinad town sivaganga' },
  { name: 'Manamadurai', sub: 'Taluk (Clay Pots & Ghatam), Sivaganga, TN 630606', icon: '🏺', tags: 'manamadurai ghatam potters veera azhagar temple' },
  { name: 'Kalayarkoil', sub: 'Taluk, Sivaganga District, Tamil Nadu 630551', icon: '🛕', tags: 'kalayarkoil maruthu pandiyar swarna kaleeswarar' },
  { name: 'Rameswaram Ramanathaswamy Temple', sub: 'Rameswaram, Ramanathapuram District, Tamil Nadu', icon: '🛕', tags: 'rameswaram temple ramanathaswamy 22 theertham agni theertham jyotirlinga' },
  { name: 'Dhanushkodi Beach & Arichal Munai', sub: 'Dhanushkodi, Rameswaram, Tamil Nadu', icon: '🏖️', tags: 'dhanushkodi arichal munai ghost town ram setu adam bridge' },
  { name: 'Pamban Rail & Road Bridge', sub: 'Pamban, Rameswaram, Tamil Nadu', icon: '🌉', tags: 'pamban bridge sea bridge rameswaram railway' },
  { name: 'Paramakudi', sub: 'Taluk, Ramanathapuram District, Tamil Nadu 623707', icon: '📍', tags: 'paramakudi vaigai river kamal haasan birth ramanathapuram' },
  { name: 'Kilakarai', sub: 'Ramanathapuram District, Tamil Nadu 623517', icon: '🕌', tags: 'kilakarai old jumma mosque pearl city ramanathapuram' },

  // =========================================================================
  // SALEM, NAMAKKAL, ERODE & COIMBATORE TALUKS
  // =========================================================================
  { name: 'Attur', sub: 'Taluk, Salem District, Tamil Nadu 636102', icon: '📍', tags: 'attur sago tapioca fort salem' },
  { name: 'Mettur Dam & Park', sub: 'Mettur, Salem District, Tamil Nadu 636401', icon: '🌊', tags: 'mettur dam stanley reservoir thermal power cauvery salem' },
  { name: 'Omalur', sub: 'Taluk, Salem District, Tamil Nadu 636455', icon: '📍', tags: 'omalur salem airport tollgate' },
  { name: 'Edappadi', sub: 'Taluk, Salem District, Tamil Nadu 637101', icon: '📍', tags: 'edappadi powerloom salem' },
  { name: 'Sankagiri (Sankari Fort)', sub: 'Taluk, Salem District, Tamil Nadu 637301', icon: '🏰', tags: 'sankagiri sankari fort dheeran chinnamalai salem' },
  { name: 'Yercaud Hill Station', sub: 'Shevaroy Hills, Salem District, Tamil Nadu 636601', icon: '🌲', tags: 'yercaud emerald lake ladys seat shevaroy temple poor man ooty salem' },
  { name: 'Tiruchengode Ardhanareeswarar Temple', sub: 'Tiruchengode, Namakkal District, TN 637211', icon: '🛕', tags: 'tiruchengode ardhanareeswarar hill temple rig borewell namakkal' },
  { name: 'Rasipuram', sub: 'Taluk (Ghee City), Namakkal District, TN 637408', icon: '🧈', tags: 'rasipuram ghee weavers kailasanathar namakkal' },
  { name: 'Paramathi Velur', sub: 'Taluk, Namakkal District, Tamil Nadu 637207', icon: '🌾', tags: 'paramathi velur betel leaf banana cauvery river bridge' },
  { name: 'Kolli Hills (70 Hairpin Bends)', sub: 'Namakkal District, Tamil Nadu 637411', icon: '⛰️', tags: 'kolli hills agaya gangai waterfalls 70 hairpin bends seekuparai' },
  { name: 'Bhavani Sangameswarar Temple (Kooduthurai)', sub: 'Bhavani, Erode District, Tamil Nadu 638301', icon: '🛕', tags: 'bhavani kooduthurai sangameswarar triveni sangamam erode carpet' },
  { name: 'Gobichettipalayam (Gobi)', sub: 'Taluk, Erode District, Tamil Nadu 638452', icon: '🌾', tags: 'gobichettipalayam gobi kodiveri dam cinema shooting erode' },
  { name: 'Sathyamangalam (Sathy)', sub: 'Taluk, Erode District, Tamil Nadu 638401', icon: '🐅', tags: 'sathyamangalam sathy tiger reserve bannari amman temple dhimbam ghat' },
  { name: 'Perundurai', sub: 'Taluk (SIPCOT), Erode District, Tamil Nadu 638052', icon: '🏭', tags: 'perundurai sipcot industrial medical college erode' },
  { name: 'Anthiyur', sub: 'Taluk (Horse Fair), Erode District, Tamil Nadu 638501', icon: '🐎', tags: 'anthiyur horse fair gurunathaswamy temple erode' },
  { name: 'Pollachi', sub: 'Taluk (Coconut City), Coimbatore District, TN 642001', icon: '🥥', tags: 'pollachi anaimalai topslip aliyar dam cinema market coimbatore' },
  { name: 'Mettupalayam', sub: 'Taluk (Nilgiri Mountain Railway), Coimbatore, TN 641301', icon: '🚂', tags: 'mettupalayam ooty toy train black thunder bhavani coimbatore' },
  { name: 'Valparai Hill Station', sub: 'Anamalai Hills, Coimbatore District, Tamil Nadu 642127', icon: '🍵', tags: 'valparai tea estates sholayar dam 40 hairpin bends coimbatore' },
  { name: 'Isha Yoga Center (112ft Adiyogi)', sub: 'Velliangiri Foothills, Coimbatore, Tamil Nadu', icon: '🕉️', tags: 'isha yoga center adiyogi shiva statue velliangiri dhyanalinga coimbatore' },
  { name: 'Coimbatore International Airport (CJB)', sub: 'Peelamedu, Coimbatore, Tamil Nadu 641014', icon: '✈️', tags: 'coimbatore airport cjb flights peelamedu' },
  { name: 'Coimbatore Junction Railway Station (CBE)', sub: 'Gopalapuram, Coimbatore, Tamil Nadu', icon: '🚆', tags: 'coimbatore junction cbe central railway station' },

  // =========================================================================
  // TIRUPPUR, KARUR & DINDIGUL
  // =========================================================================
  { name: 'Dharapuram', sub: 'Taluk, Tiruppur District, Tamil Nadu 638656', icon: '📍', tags: 'dharapuram amaravathi river bagavathi amman tiruppur' },
  { name: 'Kangeyam (Kangayam)', sub: 'Taluk (Bull City), Tiruppur District, TN 638701', icon: '🐂', tags: 'kangeyam kangayam bulls coconut oil tiruppur' },
  { name: 'Avinashi', sub: 'Taluk, Tiruppur District, Tamil Nadu 641654', icon: '🛕', tags: 'avinashi avinasilingeswarar temple tollgate tiruppur' },
  { name: 'Palladam', sub: 'Taluk (Broiler City), Tiruppur District, TN 641664', icon: '🐔', tags: 'palladam poultry broiler wind mills tiruppur' },
  { name: 'Udumalpet (Udumalaipettai)', sub: 'Taluk, Tiruppur District, Tamil Nadu 642126', icon: ' windmills', tags: 'udumalpet amaravathi dam thirumoorthy falls amaravathi crocodile farm' },
  { name: 'Kulithalai', sub: 'Taluk, Karur District, Tamil Nadu 639107', icon: '🛕', tags: 'kulithalai kadambavaneswarar temple cauvery karur' },
  { name: 'Aravakurichi', sub: 'Taluk, Karur District, Tamil Nadu 639201', icon: '🌶️', tags: 'aravakurichi red chilli market moringai karur' },
  { name: 'Mayanur', sub: 'Karur District, Tamil Nadu 639108', icon: '🌊', tags: 'mayanur barrage cauvery river park karur' },
  { name: 'Palani Murugan Temple', sub: 'Palani, Dindigul District, Tamil Nadu 624601', icon: '🛕', tags: 'palani dhandayuthapani swamy murugan temple third arupadai veedu panchamirtham' },
  { name: 'Kodaikanal Hill Station', sub: 'Dindigul District, Tamil Nadu 624101', icon: '🌲', tags: 'kodaikanal kodai lake coakers walk pillar rocks bryant park princess of hills' },
  { name: 'Oddanchatram', sub: 'Taluk (Vegetable Market), Dindigul District, TN 624619', icon: '🥦', tags: 'oddanchatram vegetable market dindigul' },
  { name: 'Batlagundu (Vathalagundu)', sub: 'Dindigul District, Tamil Nadu 624202', icon: '📍', tags: 'batlagundu vathalagundu kodaikanal foothills dindigul' },
  { name: 'Chinnalapatti', sub: 'Dindigul District, Tamil Nadu 624301', icon: '🥻', tags: 'chinnalapatti sungudi sarees dindigul' },

  // =========================================================================
  // TIRUNELVELI, TENKASI, THOOTHUKUDI & KANYAKUMARI
  // =========================================================================
  { name: 'Palayamkottai (Oxford of South India)', sub: 'Tirunelveli, Tamil Nadu 627002', icon: '🎓', tags: 'palayamkottai st xaviers college schools tirunelveli' },
  { name: 'Ambasamudram (Ambai)', sub: 'Taluk, Tirunelveli District, Tamil Nadu 627401', icon: '🌾', tags: 'ambasamudram ambai thamirabarani river manimuthar falls' },
  { name: 'Cheranmahadevi', sub: 'Taluk, Tirunelveli District, Tamil Nadu 627414', icon: '📍', tags: 'cheranmahadevi canal thamirabarani' },
  { name: 'Valliyur', sub: 'Tirunelveli District, Tamil Nadu 627117', icon: '🛕', tags: 'valliyur murugan temple bypass tirunelveli' },
  { name: 'Tenkasi Kasi Viswanathar Temple', sub: 'Tenkasi, Tamil Nadu 627811', icon: '🛕', tags: 'tenkasi kasi viswanathar temple wind city courtallam' },
  { name: 'Courtallam Waterfalls (Kutralam)', sub: 'Courtallam, Tenkasi District, Tamil Nadu 627802', icon: '💧', tags: 'courtallam kutralam waterfalls main falls five falls old falls spa tenkasi' },
  { name: 'Sankarankovil (Sankaranayinarkoil)', sub: 'Taluk, Tenkasi District, TN 627756', icon: '🛕', tags: 'sankarankovil sankara narayanan gomathi amman temple tenkasi' },
  { name: 'Kadayanallur', sub: 'Taluk, Tenkasi District, Tamil Nadu 627751', icon: '📍', tags: 'kadayanallur weavers tenkasi' },
  { name: 'Shenkottai (Sengottai)', sub: 'Taluk, Tenkasi District, Tamil Nadu 627809', icon: '🚆', tags: 'shenkottai sengottai aryankavu kerala border railway' },
  { name: 'Tiruchendur Murugan Temple', sub: 'Tiruchendur, Thoothukudi District, Tamil Nadu 628215', icon: '🛕', tags: 'tiruchendur subramanya swamy murugan sea shore arupadai veedu second' },
  { name: 'Kovilpatti (Kadala Mittai City)', sub: 'Taluk, Thoothukudi District, Tamil Nadu 628501', icon: '🥜', tags: 'kovilpatti peanut candy kadala mittai match industry thoothukudi' },
  { name: 'Kayalpattinam', sub: 'Thoothukudi District, Tamil Nadu 628204', icon: '🌊', tags: 'kayalpattinam beach sea coast thoothukudi' },
  { name: 'Nagercoil Town', sub: 'Kanyakumari District, Tamil Nadu 629001', icon: '📍', tags: 'nagercoil nagaraja temple kanyakumari head' },
  { name: 'Kanyakumari (Vivekananda Rock & Thiruvalluvar)', sub: 'Kanyakumari, Tamil Nadu 629702', icon: '🌅', tags: 'kanyakumari vivekananda rock memorial thiruvalluvar statue cape comorin triveni sangamam sunset sunrise' },
  { name: 'Marthandam', sub: 'Kanyakumari District, Tamil Nadu 629165', icon: '🍯', tags: 'marthandam honey market cashew kanyakumari' },
  { name: 'Suchindram Thanumalayan Temple', sub: 'Suchindram, Kanyakumari District, TN 629704', icon: '🛕', tags: 'suchindram thanumalayan temple hanuman musical pillars' },

  // =========================================================================
  // NILGIRIS, DHARMAPURI, KRISHNAGIRI & TIRUPATHUR
  // =========================================================================
  { name: 'Ooty (Udhagamandalam) Hill Station', sub: 'Nilgiris District, Tamil Nadu 643001', icon: '🌲', tags: 'ooty udhagamandalam queen of hill stations nilgiris botanical garden lake doddabetta' },
  { name: 'Coonoor Hill Station', sub: 'Nilgiris District, Tamil Nadu 643101', icon: '🍵', tags: 'coonoor sims park tea estates dolphins nose nilgiris' },
  { name: 'Kotagiri Hill Station', sub: 'Nilgiris District, Tamil Nadu 643217', icon: '🌲', tags: 'kotagiri kodanad viewpoint elks falls nilgiris' },
  { name: 'Gudalur', sub: 'Taluk, Nilgiris District, Tamil Nadu 643212', icon: '🌲', tags: 'gudalur mudumalai tea coffee plantations nilgiris' },
  { name: 'Hogenakkal Waterfalls', sub: 'Pennagaram, Dharmapuri District, Tamil Nadu 636810', icon: '🌊', tags: 'hogenakkal falls cauvery coracle ride niagara of india dharmapuri' },
  { name: 'Harur', sub: 'Taluk, Dharmapuri District, Tamil Nadu 636903', icon: '📍', tags: 'harur theerthamalai dharmapuri' },
  { name: 'Pennagaram', sub: 'Taluk, Dharmapuri District, Tamil Nadu 636810', icon: '📍', tags: 'pennagaram hogenakkal gateway dharmapuri' },
  { name: 'Hosur (Industrial & Rose City)', sub: 'Taluk, Krishnagiri District, Tamil Nadu 635109', icon: '🏭', tags: 'hosur sipcot industrial hub electronics roses bengaluru border krishnagiri' },
  { name: 'Bargur', sub: 'Taluk, Krishnagiri District, Tamil Nadu 635104', icon: '🥭', tags: 'bargur mango granite cattle market krishnagiri' },
  { name: 'Pochampalli', sub: 'Taluk, Krishnagiri District, Tamil Nadu 635206', icon: '📍', tags: 'pochampalli sunday market krishnagiri' },
  { name: 'Denkanikottai (Little England)', sub: 'Taluk, Krishnagiri District, TN 635107', icon: '🌲', tags: 'denkanikottai bettamugilalam krishnagiri' },
  { name: 'Ambur (Leather & Biryani City)', sub: 'Taluk, Tirupathur District, Tamil Nadu 635802', icon: '🍲', tags: 'ambur biryani leather footwear palar river tirupathur' },
  { name: 'Vaniyambadi', sub: 'Taluk, Tirupathur District, Tamil Nadu 635751', icon: '👢', tags: 'vaniyambadi leather industry islamiah college tirupathur' },
  { name: 'Yelagiri Hills', sub: 'Tirupathur District, Tamil Nadu 635853', icon: '⛰️', tags: 'yelagiri hills lake punganoor paragliding swamimalai trek' },
  { name: 'Jolarpettai Junction Railway Station', sub: 'Tirupathur District, Tamil Nadu 635851', icon: '🚆', tags: 'jolarpettai junction railway station train hub' },

  // =========================================================================
  // VELLORE, RANIPET, TIRUVANNAMALAI & VILUPPURAM
  // =========================================================================
  { name: 'Vellore Fort & Jalakandeswarar Temple', sub: 'Vellore, Tamil Nadu 632004', icon: '🏰', tags: 'vellore fort jalakandeswarar cmc hospital' },
  { name: 'Vellore Golden Temple (Sripuram)', sub: 'Sripuram, Thirumalaikodi, Vellore, Tamil Nadu 632055', icon: '🛕', tags: 'vellore golden temple sripuram sri lakshmi narayani' },
  { name: 'Katpadi Junction Railway Station (KPD)', sub: 'Katpadi, Vellore, Tamil Nadu 632007', icon: '🚆', tags: 'katpadi junction railway station vit university' },
  { name: 'Gudiyatham', sub: 'Taluk (Match & Lungi City), Vellore District, TN 632602', icon: '📍', tags: 'gudiyatham match boxes kaundinya river vellore' },
  { name: 'Arcot (Makkan Peda City)', sub: 'Taluk, Ranipet District, Tamil Nadu 632503', icon: '🍬', tags: 'arcot makkan peda palar nawab ranipet' },
  { name: 'Arakkonam Junction (AJJ)', sub: 'Taluk, Ranipet District, Tamil Nadu 631001', icon: '🚆', tags: 'arakkonam junction naval air base ins rajali ranipet' },
  { name: 'Sholinghur (Lakshmi Narasimha Temple)', sub: 'Taluk, Ranipet District, TN 631102', icon: '🛕', tags: 'sholinghur hill temple lakshmi narasimhar ranipet' },
  { name: 'Tiruvannamalai Annamalaiyar Temple', sub: 'Tiruvannamalai, Tamil Nadu 606601', icon: '🔥', tags: 'tiruvannamalai annamalaiyar temple agni lingam girivalam karthigai deepam ramana ashram' },
  { name: 'Arani (Silk City)', sub: 'Taluk, Tiruvannamalai District, Tamil Nadu 632301', icon: '🥻', tags: 'arani arni silk saris rice mills tiruvannamalai' },
  { name: 'Cheyyar (Tiruvetipuram)', sub: 'Taluk (SIPCOT), Tiruvannamalai District, TN 604407', icon: '🏭', tags: 'cheyyar sipcot vedapureeswarar tiruvannamalai' },
  { name: 'Polur', sub: 'Taluk, Tiruvannamalai District, Tamil Nadu 606803', icon: '📍', tags: 'polur sampathgiri hill jain temple tiruvannamalai' },
  { name: 'Chengam', sub: 'Taluk, Tiruvannamalai District, Tamil Nadu 606701', icon: '📍', tags: 'chengam rishabeshwarar manimuktha river tiruvannamalai' },
  { name: 'Gingee Fort (Senji Fort - Troy of East)', sub: 'Taluk, Viluppuram District, Tamil Nadu 604202', icon: '🏰', tags: 'gingee fort senji raja deshignu rajagiri fortress viluppuram' },
  { name: 'Tindivanam', sub: 'Taluk, Viluppuram District, Tamil Nadu 604001', icon: '📍', tags: 'tindivanam junction tollgate nh45 viluppuram' },
  { name: 'Kallakurichi Town', sub: 'Kallakurichi District, Tamil Nadu 606202', icon: '📍', tags: 'kallakurichi sugar mills district' },
  { name: 'Thirukovilur (Ulagalantha Perumal)', sub: 'Taluk, Kallakurichi District, TN 605757', icon: '🛕', tags: 'thirukovilur ulagalantha perumal veeratteswarar kabilar kundru' },
  { name: 'Ulundurpet', sub: 'Taluk, Kallakurichi District, Tamil Nadu 606107', icon: '📍', tags: 'ulundurpet bypass nh45 tollgate kallakurichi' },

  // =========================================================================
  // CHENNAI, CHENGALPATTU, KANCHIPURAM & TIRUVALLUR
  // =========================================================================
  { name: 'Chennai International Airport (MAA)', sub: 'Meenambakkam, Chennai, Tamil Nadu 600027', icon: '✈️', tags: 'chennai airport maa meenambakkam domestic international flights terminal' },
  { name: 'Chennai Central Railway Station (MAS)', sub: 'Kannappar Thidal, Chennai, Tamil Nadu', icon: '🚆', tags: 'chennai central railway station mas mgr puratchi thalaivar' },
  { name: 'Chennai Egmore Railway Station (MS)', sub: 'Egmore, Chennai, Tamil Nadu', icon: '🚆', tags: 'chennai egmore station ms south bound trains' },
  { name: 'Tambaram', sub: 'Chennai, Tamil Nadu 600045', icon: '🚆', tags: 'tambaram railway junction sanatorium outstation gateway chengalpattu' },
  { name: 'Koyambedu CMBT Bus Terminus', sub: 'Koyambedu, Chennai, Tamil Nadu 600107', icon: '🚏', tags: 'koyambedu cmbt mofussil bus stand chennai market' },
  { name: 'Mahabalipuram (Mamallapuram UNESCO)', sub: 'Chengalpattu District, Tamil Nadu 603104', icon: '🏛️', tags: 'mahabalipuram mamallapuram shore temple pancha rathas unesco pallava beach' },
  { name: 'Kanchipuram Kamakshi Amman Temple', sub: 'Kanchipuram, Tamil Nadu 631502', icon: '🛕', tags: 'kanchipuram kamakshi amman ekambareswarar varadaraja perumal silk' },
  { name: 'Sriperumbudur (Auto Hub & Rajiv Memorial)', sub: 'Kanchipuram District, Tamil Nadu 602105', icon: '🏭', tags: 'sriperumbudur sipcot hyundai rajiv gandhi memorial kanchipuram' },
  { name: 'Tiruttani Murugan Temple', sub: 'Tiruttani, Tiruvallur District, Tamil Nadu 631209', icon: '🛕', tags: 'tiruttani subramanya swamy fifth arupadai veedu hill temple tiruvallur' },
  { name: 'Avadi', sub: 'Tiruvallur District, Tamil Nadu 600054', icon: '🏭', tags: 'avadi tank factory hvf heavy vehicles tiruvallur' },
  { name: 'Poonamallee', sub: 'Tiruvallur District, Tamil Nadu 600056', icon: '📍', tags: 'poonamallee outstation gateway tiruvallur' },

  // =========================================================================
  // PUDUCHERRY & OUTSTATION CONNECTIONS
  // =========================================================================
  { name: 'Pondicherry (Puducherry Promenade & Auroville)', sub: 'Puducherry 605001, India', icon: '🏖️', tags: 'pondicherry puducherry promenade beach auroville aurobindo ashram french quarter paradise' },
  { name: 'Bengaluru (Bangalore)', sub: 'Karnataka, India', icon: '🏙️', tags: 'bangalore bengaluru electronic city outstation karnataka' },
  { name: 'Kempegowda International Airport Bengaluru (BLR)', sub: 'Devanahalli, Bengaluru, Karnataka 560300', icon: '✈️', tags: 'bangalore airport blr kempegowda' },
  { name: 'Tirupati (Tirumala Balaji Temple)', sub: 'Tirupati, Andhra Pradesh 517501', icon: '🛕', tags: 'tirupati tirumala venkateswara balaji temple andhra pradesh seven hills' },
  { name: 'Munnar Hill Station', sub: 'Idukki District, Kerala 685612', icon: '🌲', tags: 'munnar tea gardens hill station kerala' },
  { name: 'Guruvayur Sri Krishna Temple', sub: 'Guruvayur, Thrissur District, Kerala 680101', icon: '🛕', tags: 'guruvayur sri krishna temple kerala' },
  { name: 'Cochin International Airport (COK)', sub: 'Nedumbassery, Kochi, Kerala 683111', icon: '✈️', tags: 'cochin airport kochi cok kerala flights' }
];

let googleAutocompleteService = null;
let googleGeocoder = null;
let isGoogleMapsLoaded = false;

// Dynamically load Google Maps Places API if API key is provided
function loadGoogleMapsAPI() {
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY.trim() === '') {
    return;
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(GOOGLE_MAPS_API_KEY)}&libraries=places&language=en&region=IN`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    try {
      if (window.google && google.maps && google.maps.places) {
        googleAutocompleteService = new google.maps.places.AutocompleteService();
        googleGeocoder = new google.maps.Geocoder();
        isGoogleMapsLoaded = true;
      }
    } catch (e) {
      console.warn('Google Places service init error:', e);
    }
  };
  script.onerror = () => {
    console.warn('Google Maps API script load failed. Falling back to built-in smart directory.');
  };
  document.head.appendChild(script);
}

loadGoogleMapsAPI();

/**
 * Setup smart autocomplete for an input field
 */
function setupLocationAutocomplete(inputId, dropdownId, spinnerId, clearBtnId) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  const spinner = document.getElementById(spinnerId);
  const clearBtn = document.getElementById(clearBtnId);

  if (!input || !dropdown) return;

  let debounceTimer = null;
  let activeIndex = -1;
  let currentSuggestions = [];

  // Update clear button visibility
  function updateClearBtn() {
    if (clearBtn) {
      if (input.value.trim().length > 0) {
        clearBtn.classList.add('show');
      } else {
        clearBtn.classList.remove('show');
      }
    }
  }

  // Clear button click
  clearBtn?.addEventListener('click', () => {
    input.value = '';
    updateClearBtn();
    closeDropdown();
    input.focus();
  });

  // Query search (Google Places or Live Online Geocoding + Built-in)
  let currentSearchAbortController = null;

  async function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (q.length === 0) {
      closeDropdown();
      if (spinner) spinner.classList.remove('show');
      return;
    }

    if (spinner) spinner.classList.add('show');

    // Cancel previous in-flight online request if user is still typing
    if (currentSearchAbortController) {
      currentSearchAbortController.abort();
    }
    currentSearchAbortController = new AbortController();

    // 1. If Google Places is loaded with an API key, use Google Places API
    if (isGoogleMapsLoaded && googleAutocompleteService) {
      const request = {
        input: query,
        componentRestrictions: { country: 'in' },
        types: ['geocode', 'establishment']
      };

      googleAutocompleteService.getPlacePredictions(request, (predictions, status) => {
        if (spinner) spinner.classList.remove('show');
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions && predictions.length > 0) {
          const items = predictions.map(p => ({
            name: p.structured_formatting ? p.structured_formatting.main_text : p.description,
            sub: p.structured_formatting && p.structured_formatting.secondary_text ? p.structured_formatting.secondary_text : '',
            icon: '📍',
            full: p.description
          }));
          renderSuggestions(items, query);
        } else {
          searchBuiltInAndLive(q, query, currentSearchAbortController.signal);
        }
      });
      return;
    }

    // 2. Hybrid Search: Instant Built-In + Live Map Database (Covers every village & street in Tamil Nadu)
    searchBuiltInAndLive(q, query, currentSearchAbortController.signal);
  }

  // Hybrid search: Instant Local + Ultra-fast Live OpenStreetMap/Photon Query
  async function searchBuiltInAndLive(q, rawQuery, abortSignal) {
    // A. Local matches for 0ms instantaneous response
    const tokens = q.split(/\s+/).filter(t => t.length > 0);
    const localMatches = TAMIL_NADU_LOCATIONS.filter(item => {
      const fullSearch = (item.name + ' ' + item.sub + ' ' + (item.tags || '')).toLowerCase();
      return tokens.every(token => fullSearch.includes(token));
    });

    localMatches.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aStarts = aName.startsWith(q);
      const bStarts = bName.startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

    // Render local matches immediately
    if (localMatches.length > 0) {
      renderSuggestions(localMatches.slice(0, 8), rawQuery);
    }

    // B. Query live OpenStreetMap Photon API (with Tamil Nadu proximity lat:10.96, lon:79.38)
    try {
      // Primary high-speed autocomplete service (Photon ElasticSearch with South India bias)
      const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(rawQuery)}&lat=10.9607&lon=79.3845&limit=8`;
      const response = await fetch(photonUrl, {
        signal: abortSignal,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.features && data.features.length > 0) {
          const liveItems = data.features.map(f => {
            const p = f.properties || {};
            const mainName = p.name || p.city || p.district || p.county || 'Location';
            const subParts = [];
            if (p.county && p.county !== mainName) subParts.push(p.county);
            if (p.city && p.city !== mainName && !subParts.includes(p.city)) subParts.push(p.city);
            if (p.state) subParts.push(p.state);
            if (p.postcode) subParts.push(p.postcode);
            const subText = subParts.length > 0 ? subParts.join(', ') : (p.country || 'Tamil Nadu, India');

            let icon = '📍';
            if (p.osm_value === 'aerodrome' || p.type === 'aerodrome') icon = '✈️';
            else if (p.osm_value === 'station' || p.type === 'station') icon = '🚆';
            else if (p.osm_value === 'place_of_worship' || p.type === 'temple') icon = '🛕';
            else if (p.type === 'street' || p.osm_value === 'secondary' || p.osm_value === 'primary') icon = '🛣️';

            return {
              name: mainName,
              sub: subText,
              icon: icon,
              full: `${mainName}, ${subText}`
            };
          });

          // Merge without duplicates
          const seen = new Set(localMatches.map(m => m.name.toLowerCase()));
          const combined = [...localMatches];
          liveItems.forEach(item => {
            const key = item.name.toLowerCase();
            if (!seen.has(key)) {
              seen.add(key);
              combined.push(item);
            }
          });

          renderSuggestions(combined.slice(0, 8), rawQuery);
          return;
        }
      }

      // Fallback: OpenStreetMap Nominatim if needed
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(rawQuery)}&countrycodes=in&addressdetails=1&limit=8`;
      const nomResp = await fetch(nominatimUrl, {
        signal: abortSignal,
        headers: { 'Accept': 'application/json' }
      });

      if (nomResp.ok) {
        const liveData = await nomResp.json();
        if (liveData && liveData.length > 0) {
          const liveItems = liveData.map(item => {
            const addr = item.address || {};
            const mainName = item.name || addr.road || addr.village || addr.town || addr.city || item.display_name.split(',')[0];
            const subParts = [];
            if (addr.suburb && addr.suburb !== mainName) subParts.push(addr.suburb);
            if ((addr.city || addr.town || addr.village) && (addr.city || addr.town || addr.village) !== mainName) {
              subParts.push(addr.city || addr.town || addr.village);
            }
            if (addr.state_district && !subParts.includes(addr.state_district)) subParts.push(addr.state_district);
            if (addr.state) subParts.push(addr.state);
            const subText = subParts.length > 0 ? subParts.join(', ') : item.display_name;

            return {
              name: mainName,
              sub: subText,
              icon: item.type === 'station' ? '🚆' : (item.type === 'aerodrome' ? '✈️' : (item.type === 'place_of_worship' ? '🛕' : '📍')),
              full: item.display_name
            };
          });

          const seen = new Set(localMatches.map(m => m.name.toLowerCase()));
          const combined = [...localMatches];
          liveItems.forEach(item => {
            const key = item.name.toLowerCase();
            if (!seen.has(key)) {
              seen.add(key);
              combined.push(item);
            }
          });

          renderSuggestions(combined.slice(0, 8), rawQuery);
        } else if (localMatches.length === 0) {
          renderSuggestions([], rawQuery);
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError' && localMatches.length === 0) {
        renderSuggestions(localMatches.slice(0, 8), rawQuery);
      }
    } finally {
      if (spinner) spinner.classList.remove('show');
    }
  }

  // Render HTML suggestions list
  function renderSuggestions(items, query) {
    currentSuggestions = items;
    activeIndex = -1;
    dropdown.innerHTML = '';

    if (items.length === 0) {
      dropdown.innerHTML = `
        <div class="loc-sugg-empty">
          <strong>No matching locations found</strong>
          <span>You can type your custom address directly.</span>
        </div>
      `;
      dropdown.classList.add('show');
      input.setAttribute('aria-expanded', 'true');
      return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'loc-sugg-item';
      div.setAttribute('role', 'option');
      div.setAttribute('id', `${inputId}-sugg-${index}`);
      div.dataset.index = index;

      // Highlight matched query in title
      let highlightedName = escapeHTML(item.name);
      if (query && query.trim().length > 0) {
        const regex = new RegExp(`(${escapeRegex(query.trim())})`, 'gi');
        highlightedName = highlightedName.replace(regex, '<mark>$1</mark>');
      }

      div.innerHTML = `
        <span class="loc-sugg-icon" aria-hidden="true">${item.icon || '📍'}</span>
        <div class="loc-sugg-text">
          <span class="loc-sugg-main">${highlightedName}</span>
          ${item.sub ? `<span class="loc-sugg-sub">${escapeHTML(item.sub)}</span>` : ''}
        </div>
      `;

      div.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevent input blur before selection
        selectItem(index);
      });

      fragment.appendChild(div);
    });

    dropdown.appendChild(fragment);
    dropdown.classList.add('show');
    input.setAttribute('aria-expanded', 'true');
  }

  // Select an item from suggestions
  function selectItem(index) {
    if (index >= 0 && index < currentSuggestions.length) {
      const item = currentSuggestions[index];
      const selectedValue = item.full || (item.name + (item.sub ? ', ' + item.sub : ''));
      input.value = selectedValue;
      updateClearBtn();
      closeDropdown();
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  // Close dropdown
  function closeDropdown() {
    dropdown.classList.remove('show');
    dropdown.innerHTML = '';
    input.setAttribute('aria-expanded', 'false');
    activeIndex = -1;
  }

  // Input typing with debounce
  input.addEventListener('input', () => {
    updateClearBtn();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performSearch(input.value);
    }, 120);
  });

  // Focus: show suggestions if text exists, or show popular hubs
  input.addEventListener('focus', () => {
    updateClearBtn();
    if (input.value.trim().length >= 1) {
      performSearch(input.value);
    } else {
      // Show top popular Tamil Nadu locations on focus
      const popularPicks = TAMIL_NADU_LOCATIONS.slice(0, 8);
      renderSuggestions(popularPicks, '');
    }
  });

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.loc-sugg-item');
    if (!dropdown.classList.contains('show') || items.length === 0) {
      if (e.key === 'ArrowDown') {
        performSearch(input.value);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActiveItem(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActiveItem(items);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < items.length) {
        e.preventDefault();
        selectItem(activeIndex);
      }
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  function updateActiveItem(items) {
    items.forEach((it, idx) => {
      if (idx === activeIndex) {
        it.classList.add('active');
        it.scrollIntoView({ block: 'nearest' });
      } else {
        it.classList.remove('active');
      }
    });
  }

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target) && !(clearBtn && clearBtn.contains(e.target))) {
      closeDropdown();
    }
  });
}

// Utility: Escape HTML
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// Utility: Escape regex special chars
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Setup High-Accuracy Geolocation Detection for Pickup Location
 */
function setupGeolocationDetection() {
  const btn = document.getElementById('useLocationBtn');
  const btnText = document.getElementById('locBtnText');
  const input = document.getElementById('pickupInput');
  const statusMsg = document.getElementById('locStatusMsg');
  const clearBtn = document.getElementById('clearPickupBtn');
  const spinner = document.getElementById('pickupSpinner');

  if (!btn || !input) return;

  function showStatus(text, type = 'info', duration = 7000) {
    if (!statusMsg) return;
    statusMsg.textContent = text;
    statusMsg.className = `loc-status-msg ${type}`;
    if (duration > 0) {
      setTimeout(() => {
        if (statusMsg.textContent === text) {
          statusMsg.textContent = '';
          statusMsg.className = 'loc-status-msg';
        }
      }, duration);
    }
  }

  btn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showStatus('⚠️ Geolocation is not supported by your browser.', 'error');
      return;
    }

    // Set UI loading state
    btn.classList.add('detecting');
    if (btnText) btnText.textContent = 'Locating...';
    if (spinner) spinner.classList.add('show');
    showStatus('📡 Acquiring high-accuracy GPS coordinates...', 'info', 0);

    const geoOptions = {
      enableHighAccuracy: true, // Request hardware GPS satellite lock
      timeout: 12000,           // 12s timeout
      maximumAge: 0             // Fresh lock, no cache
    };

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon, accuracy } = pos.coords;

        try {
          let resolvedAddress = '';

          // 1. If Google Geocoder is available, use Google Maps API
          if (isGoogleMapsLoaded && googleGeocoder) {
            resolvedAddress = await new Promise((resolve) => {
              googleGeocoder.geocode({ location: { lat, lng: lon } }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                  resolve(results[0].formatted_address);
                } else {
                  resolve('');
                }
              });
            });
          }

          // 2. High-resolution OpenStreetMap reverse geocoding with zoom=18
          if (!resolvedAddress) {
            const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
            const resp = await fetch(osmUrl, {
              headers: { 'Accept': 'application/json' }
            });
            if (resp.ok) {
              const data = await resp.json();
              if (data && data.address) {
                const a = data.address;
                const parts = [];
                const street = a.road || a.pedestrian || a.suburb || a.neighbourhood || a.village;
                const locality = a.city || a.town || a.village || a.county || a.state_district;
                const postcode = a.postcode;
                const state = a.state || 'Tamil Nadu';

                if (street) parts.push(street);
                if (locality && !parts.includes(locality)) parts.push(locality);
                if (state && !parts.includes(state)) parts.push(state);
                if (postcode) parts.push(postcode);

                resolvedAddress = parts.length > 0 ? parts.join(', ') : data.display_name;
              } else if (data.display_name) {
                resolvedAddress = data.display_name;
              }
            }
          }

          // 3. Photon reverse geocoding fallback
          if (!resolvedAddress) {
            const photonRev = `https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`;
            const pResp = await fetch(photonRev);
            if (pResp.ok) {
              const pData = await pResp.json();
              if (pData && pData.features && pData.features[0]) {
                const prop = pData.features[0].properties;
                const pList = [prop.name, prop.city || prop.county, prop.state, prop.postcode].filter(Boolean);
                resolvedAddress = pList.join(', ');
              }
            }
          }

          // Accuracy Guard: If accuracy is poor (>500m, e.g. laptop broadband ISP hub), do not auto-fill wrong town
          if (accuracy > 500) {
            const km = (accuracy / 1000).toFixed(0);
            showStatus(`⚠️ Rough network location detected (~${km}km). For exact pickup, please select or type your location above.`, 'info', 10000);
            return;
          }

          // Fill Pickup input for accurate mobile GPS
          input.value = resolvedAddress;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          if (clearBtn) clearBtn.classList.add('show');

          // Accuracy Feedback
          if (accuracy <= 250) {
            showStatus(`✓ Exact location detected (Accurate to ±${Math.round(accuracy)}m)`, 'success', 8000);
          } else {
            showStatus(`✓ Location detected (±${Math.round(accuracy)}m). You can edit the street name if needed.`, 'success', 8000);
          }

        } catch (err) {
          console.warn('Reverse geocoding error:', err);
          showStatus(`⚠️ Could not resolve address. Please type your location manually.`, 'error', 8000);
        } finally {
          btn.classList.remove('detecting');
          if (btnText) btnText.textContent = 'Use My Location';
          if (spinner) spinner.classList.remove('show');
        }
      },
      (err) => {
        btn.classList.remove('detecting');
        if (btnText) btnText.textContent = 'Use My Location';
        if (spinner) spinner.classList.remove('show');

        let msg = '⚠️ Could not detect location.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = '⚠️ Location access was denied. Please allow location permissions in your browser settings.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = '⚠️ Location information is currently unavailable.';
        } else if (err.code === err.TIMEOUT) {
          msg = '⚠️ GPS location request timed out. Please type your location manually.';
        }
        showStatus(msg, 'error', 9000);
      },
      geoOptions
    );
  });
}

// Initialize autocomplete on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setupLocationAutocomplete('pickupInput', 'pickupSuggestions', 'pickupSpinner', 'clearPickupBtn');
  setupLocationAutocomplete('dropInput', 'dropSuggestions', 'dropSpinner', 'clearDropBtn');
  setupGeolocationDetection();

  // Handle Quick-Pick location chips
  document.querySelectorAll('.loc-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = chip.getAttribute('data-target');
      const locValue = chip.getAttribute('data-loc');
      const targetInput = document.getElementById(targetId);
      if (targetInput && locValue) {
        targetInput.value = locValue;
        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
        // Show clear button
        if (targetId === 'pickupInput') document.getElementById('clearPickupBtn')?.classList.add('show');
        if (targetId === 'dropInput') document.getElementById('clearDropBtn')?.classList.add('show');
      }
    });
  });
});

/* ------ 2. Booking Form — Save to Google Sheet & Trigger Email Notification ------ */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxSeVdBIjL8XNQgRAoV9MRZeiFUL7dcIDn9A9AMSA4M2WmCp3xo5Un9lYzKCn_QrRiK/exec';
const form = document.getElementById('form');
const bookingAlertBox = document.getElementById('bookingAlertBox');

form?.addEventListener('submit', e => {
  e.preventDefault();

  const d = new FormData(form);

  // Collect all booking data
  const bookingData = {
    name:       (d.get('name') || '').trim(),
    mobile:     (d.get('mobile') || '').trim(),
    pickup:     (d.get('pickup') || '').trim(),
    drop:       (d.get('drop') || '').trim(),
    date:       d.get('date'),
    time:       d.get('time'),
    passengers: d.get('passengers') || '1',
    vehicle:    d.get('vehicle')    || 'Any Available',
    trip:       d.get('trip')       || 'Local Trip',
    message:    (d.get('message') || '').trim()
  };

  // Validation check
  if (!bookingData.name || !bookingData.mobile || !bookingData.pickup || !bookingData.drop || !bookingData.date || !bookingData.time) {
    if (bookingAlertBox) {
      bookingAlertBox.className = 'booking-alert-box error';
      bookingAlertBox.innerHTML = '<strong>⚠️ Missing Fields</strong> Please fill in all required booking details (Name, Mobile, Pickup, Drop, Date, Time).';
      bookingAlertBox.style.display = 'block';
    } else {
      alert("Please fill in all required booking fields (Name, Mobile, Pickup, Drop, Date, Time).");
    }
    return;
  }

  // Hide old alert box
  if (bookingAlertBox) {
    bookingAlertBox.style.display = 'none';
  }

  // Show loading state on button
  const submitBtn = document.getElementById('submitBookingBtn') || form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.innerHTML : '💬 Continue to WhatsApp';
  if (submitBtn) {
    submitBtn.innerHTML = '⏳ Opening WhatsApp...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';
  }

  // Build clean WhatsApp booking message
  const waMsg = 
    `*🚖 NEW TAXI BOOKING - 5G TAXI KUMBAKONAM*\n` +
    `----------------------------------------\n` +
    `👤 *Name:* ${bookingData.name}\n` +
    `📱 *Mobile:* ${bookingData.mobile}\n` +
    `📍 *Pickup:* ${bookingData.pickup}\n` +
    `🏁 *Drop:* ${bookingData.drop}\n` +
    `📅 *Date:* ${bookingData.date}\n` +
    `⏰ *Time:* ${bookingData.time}\n` +
    `👥 *Passengers:* ${bookingData.passengers}\n` +
    `🚗 *Vehicle:* ${bookingData.vehicle}\n` +
    `🗺️ *Trip Type:* ${bookingData.trip}\n` +
    (bookingData.message ? `📝 *Notes:* ${bookingData.message}\n` : '') +
    `----------------------------------------\n` +
    `_Sent via 5G Taxi Website_`;

  const waUrl = `https://wa.me/918148157275?text=${encodeURIComponent(waMsg)}`;

  // Optional background log to Google Sheet
  if (SHEET_URL) {
    const queryParams = new URLSearchParams(bookingData).toString();
    fetch(SHEET_URL + '?' + queryParams, { method: 'GET', mode: 'no-cors' }).catch(() => {});
  }

  // Open WhatsApp directly
  window.open(waUrl, '_blank');

  handleBookingSuccess(bookingData, submitBtn, originalText);
});

function handleBookingSuccess(bookingData, submitBtn, originalText) {
  if (submitBtn) {
    submitBtn.innerHTML = '✓ Opening WhatsApp...';
    submitBtn.style.background = '#168b4b';
  }

  if (bookingAlertBox) {
    bookingAlertBox.className = 'booking-alert-box success';
    bookingAlertBox.innerHTML = `
      <strong>✓ Direct WhatsApp Booking Initiated!</strong>
      Your ride details from <b>${escapeHTML(bookingData.pickup)}</b> to <b>${escapeHTML(bookingData.drop)}</b> on <b>${escapeHTML(bookingData.date)}</b> have been prepared. Please click send in WhatsApp to confirm.
      <div style="margin-top:6px;font-size:12.5px;color:#15803d;">
        📞 Or call directly at <b>+91 81481 57275</b> for instant 24/7 confirmation.
      </div>
    `;
    bookingAlertBox.style.display = 'block';
  }

  form.reset();
  document.getElementById('clearPickupBtn')?.classList.remove('show');
  document.getElementById('clearDropBtn')?.classList.remove('show');
  document.getElementById('locStatusMsg') && (document.getElementById('locStatusMsg').textContent = '');

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.background = '';
    }
  }, 3000);
}

/* Set date minimum to today */
const dateInput = document.querySelector('input[name="date"]');
if (dateInput) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateInput.min = today.toISOString().split('T')[0];
}

/* ------ 3. Fleet Tab Filter & Book Buttons ------ */
const tabs  = document.querySelectorAll('.fleet-tab');
const cards = document.querySelectorAll('.fleet-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Update active tab
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;

    cards.forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Book This Car buttons
document.querySelectorAll('.fleet-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const carName = btn.getAttribute('data-car');
    const vehicleSelect = document.getElementById('vehicleSelect');
    if (vehicleSelect && carName) {
      vehicleSelect.value = carName;
    }
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ------ 4. FAQ Accordion ------ */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer   = btn.nextElementSibling;
    const isOpen   = btn.getAttribute('aria-expanded') === 'true';

    // Close all others
    document.querySelectorAll('.faq-q').forEach(other => {
      other.setAttribute('aria-expanded', 'false');
      other.nextElementSibling.classList.remove('open');
    });

    // Toggle clicked item
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

/* ------ 5. Scroll Reveal Animation (IntersectionObserver) ------ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ------ 6. Scroll-to-Top Button ------ */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}, { passive: true });

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ------ 7. Interactive Photo Gallery & Admin-Only Upload Engine ------ */
const galleryGrid = document.getElementById('galleryGrid');
const galleryUploadBar = document.getElementById('galleryUploadBar');
const adminLoginBar = document.getElementById('adminLoginBar');
const btnOpenAdminAuth = document.getElementById('btnOpenAdminAuth');
const btnAdminLogout = document.getElementById('btnAdminLogout');
const galleryUploadInput = document.getElementById('galleryUploadInput');
const photoCaptionInput = document.getElementById('photoCaptionInput');
const btnSaveUploadedPhoto = document.getElementById('btnSaveUploadedPhoto');
const selectedFileName = document.getElementById('selectedFileName');
const galleryUploadPreview = document.getElementById('galleryUploadPreview');
const previewImg = document.getElementById('previewImg');

// Default Admin Passcode for 5G Taxi gallery upload
const ADMIN_GALLERY_PIN = '5555';
const GALLERY_STORAGE_KEY = '5g_taxi_uploaded_gallery_v1';
const ADMIN_SESSION_KEY = '5g_admin_gallery_session';

// Check if admin is currently authenticated
function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated';
}

// Update UI based on Admin session status
function updateAdminGalleryUI() {
  const isAdmin = isAdminAuthenticated();
  if (galleryUploadBar) {
    galleryUploadBar.style.display = isAdmin ? 'block' : 'none';
  }
  if (adminLoginBar) {
    adminLoginBar.style.display = isAdmin ? 'none' : 'flex';
  }

  // Toggle delete buttons on custom photos
  document.querySelectorAll('.btn-delete-photo').forEach(btn => {
    btn.style.display = isAdmin ? 'grid' : 'none';
  });
}

// Admin Login Trigger
btnOpenAdminAuth?.addEventListener('click', () => {
  const enteredPin = prompt("🔐 5G Taxi Admin Portal\nEnter Admin PIN to upload photos:");
  if (enteredPin === null) return; // User cancelled

  if (enteredPin.trim() === ADMIN_GALLERY_PIN || enteredPin.trim().toLowerCase() === '5gtaxi') {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
    updateAdminGalleryUI();
    alert("✓ Admin Access Granted! You can now upload and manage tour photos.");
  } else {
    alert("❌ Incorrect Admin PIN. Access denied.");
  }
});

// Admin Logout Trigger
btnAdminLogout?.addEventListener('click', () => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  updateAdminGalleryUI();
});

// Load previously saved uploaded photos from localStorage
function loadCustomGalleryPhotos() {
  if (!galleryGrid) return;
  try {
    const saved = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!saved) return;
    const photos = JSON.parse(saved);

    photos.forEach((item, index) => {
      renderGalleryItem(item.imgSrc, item.caption, index);
    });

    updateAdminGalleryUI();
  } catch (err) {
    console.warn('Error loading custom gallery photos:', err);
  }
}

// Render photo item into grid
function renderGalleryItem(imgSrc, caption, index) {
  const div = document.createElement('div');
  div.className = 'gallery-item custom-upload';
  const isAdmin = isAdminAuthenticated();

  div.innerHTML = `
    <img src="${imgSrc}" alt="${caption || 'Custom Tour Photo'}" loading="lazy">
    <div class="gallery-overlay">
      <span>${caption || '5G Taxi Pilgrimage & Tour Moment'}</span>
    </div>
    <span class="custom-photo-badge">NEW</span>
    <button type="button" class="btn-delete-photo" title="Delete photo (Admin only)" data-index="${index}" style="display: ${isAdmin ? 'grid' : 'none'};">✕</button>
  `;

  // Prepend so latest uploads appear first
  if (galleryGrid.firstChild) {
    galleryGrid.insertBefore(div, galleryGrid.firstChild);
  } else {
    galleryGrid.appendChild(div);
  }

  // Delete listener (Admin only)
  const delBtn = div.querySelector('.btn-delete-photo');
  delBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!isAdminAuthenticated()) {
      alert("⚠️ Only the Admin can delete gallery photos.");
      return;
    }
    if (confirm("Remove this photo from the 5G Taxi customer gallery?")) {
      deleteCustomPhoto(index);
    }
  });
}

// Save a new photo to localStorage and render
function saveCustomPhoto(imgSrc, caption) {
  try {
    let photos = [];
    const saved = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (saved) photos = JSON.parse(saved);

    photos.push({ imgSrc, caption });
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(photos));

    refreshGalleryGrid();
  } catch (err) {
    alert("⚠️ Photo storage limit reached! Please resize or compress the image before uploading.");
  }
}

// Delete custom photo
function deleteCustomPhoto(idxToRemove) {
  try {
    let photos = [];
    const saved = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (saved) photos = JSON.parse(saved);

    photos.splice(idxToRemove, 1);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(photos));
    refreshGalleryGrid();
  } catch (err) {}
}

// Re-render gallery keeping default items intact
function refreshGalleryGrid() {
  document.querySelectorAll('.gallery-item.custom-upload').forEach(el => el.remove());
  loadCustomGalleryPhotos();
}

let selectedFileDataUrl = null;

// Handle image selection with live preview
galleryUploadInput?.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("Please select a photo under 5MB.");
    return;
  }

  if (selectedFileName) {
    selectedFileName.textContent = file.name;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    selectedFileDataUrl = event.target.result;
    if (previewImg && galleryUploadPreview) {
      previewImg.src = selectedFileDataUrl;
      galleryUploadPreview.style.display = 'flex';
    }
  };
  reader.readAsDataURL(file);
});

// Handle "Add Photo to Gallery" click
btnSaveUploadedPhoto?.addEventListener('click', function() {
  if (!isAdminAuthenticated()) {
    alert("⚠️ Admin authorization required to add photos.");
    return;
  }

  if (!selectedFileDataUrl) {
    alert("Please click 'Choose Tour Photo' and select an image first!");
    return;
  }

  const caption = (photoCaptionInput?.value || '').trim() || '5G Taxi Pilgrimage & Tour';

  saveCustomPhoto(selectedFileDataUrl, caption);

  // Reset controls
  selectedFileDataUrl = null;
  if (galleryUploadInput) galleryUploadInput.value = '';
  if (photoCaptionInput) photoCaptionInput.value = '';
  if (selectedFileName) selectedFileName.textContent = 'No photo selected';
  if (galleryUploadPreview) galleryUploadPreview.style.display = 'none';

  alert("🎉 Photo successfully published to the customer Gallery!");
});

// Initial load on startup
document.addEventListener('DOMContentLoaded', () => {
  loadCustomGalleryPhotos();
  updateAdminGalleryUI();

  // 1-Click Tour Package Booking Auto-fill Handler
  document.querySelectorAll('.btn-pkg-book').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pickupVal = btn.getAttribute('data-pickup') || '';
      const dropVal = btn.getAttribute('data-drop') || '';
      const vehicleVal = btn.getAttribute('data-vehicle') || '';

      const pickupInput = document.getElementById('pickupInput');
      const dropInput = document.getElementById('dropInput');
      const vehicleSelect = document.getElementById('vehicleSelect');

      if (pickupInput && pickupVal) pickupInput.value = pickupVal;
      if (dropInput && dropVal) dropInput.value = dropVal;
      if (vehicleSelect && vehicleVal) vehicleSelect.value = vehicleVal;

      // Smooth scroll to booking form
      const bookingSec = document.getElementById('booking');
      if (bookingSec) {
        bookingSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Focus on customer name field
      setTimeout(() => {
        const nameInput = document.querySelector('input[name="name"]');
        if (nameInput) nameInput.focus();
      }, 600);
    });
  });

  // Gallery Expand / Minimize Toggle
  const btnToggleGallery = document.getElementById('btnToggleGallery');
  const galleryToggleText = document.getElementById('galleryToggleText');
  let isGalleryExpanded = false;

  btnToggleGallery?.addEventListener('click', () => {
    isGalleryExpanded = !isGalleryExpanded;
    const extraItems = document.querySelectorAll('.gallery-extra');
    
    extraItems.forEach(item => {
      item.style.display = isGalleryExpanded ? 'block' : 'none';
    });

    if (galleryToggleText) {
      galleryToggleText.textContent = isGalleryExpanded ? 'Show Less Photos ↑' : 'View More Photos (4+) ↓';
    }
  });
});


