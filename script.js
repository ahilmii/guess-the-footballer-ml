import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1';

let FUTBOLCU_LISTE = [];
let model; // başka fonksiyonlarda da erişebilmek için global olarak tanımlıyoruz.
let secilenFutbolcu;
let bilgiSablonlari;
let sablonVektorleri; // şablon soruların hesaplanmış vektörlerini burada tutacağız. böylece her fonksiyondan erişebileceğiz ve her seferiende hesaplamak zorunda kalmayacağız.
let sorulanSoruSayisi = 0;

let   skorListesi = [];  
const chats       = document.getElementById("chats");
const userStatus  = document.getElementById("status");
const futbolcuIsimAlani = document.getElementById("futbolcu-isim-alani");


// Şablon Soruları ve Veri Anahtarlarını Oluşturma
// Bu yapı, hangi sorunun hangi veriyi kontrol edeceğini belirliyruz
bilgiSablonlari = [
    { anahtar: 'milliyet:Türk', sablon_soru: 'Türk müsün' },
    { anahtar: 'milliyet:Arjantin', sablon_soru: 'Arjantinli misin' },
    { anahtar: 'milliyet:Portekiz', sablon_soru: 'Portekizli misin' },
    { anahtar: 'milliyet:Alman', sablon_soru: 'Alman mısın' },
    { anahtar: 'milliyet:Nijeryalı', sablon_soru: 'Nijeryalı mısın' },
    { anahtar: 'milliyet:Belçikalı', sablon_soru: 'Belçikalı mısın' },
    { anahtar: 'milliyet:İngiliz', sablon_soru: 'İngiliz misin' },
    { anahtar: 'milliyet:Fransız', sablon_soru: 'Fransız mısın' },
    { anahtar: 'milliyet:Hollandalı', sablon_soru: 'Hollandalı mısın' },
    { anahtar: 'milliyet:İsviçreli', sablon_soru: 'İsviçreli mısın' },
    { anahtar: 'milliyet:Faslı', sablon_soru: 'Faslı mısın' },
    { anahtar: 'milliyet:Alman', sablon_soru: 'Alman mısın' },
    { anahtar: 'milliyet:Hollandalı', sablon_soru: 'Hollandalı mısın' },
    { anahtar: 'milliyet:İspanyol', sablon_soru: 'İspanyol musun' },
    { anahtar: 'milliyet:İtalyan', sablon_soru: 'İtalyan mısın' },
    { anahtar: 'milliyet:Polonyalı', sablon_soru: 'Polonyalı mısın' },
    { anahtar: 'milliyet:Norveçli', sablon_soru: 'Norveçli misin' },
    { anahtar: 'milliyet:Hırvat', sablon_soru: 'Hırvat mısın' },


    // serie a
    { anahtar: 'takim:İnter', sablon_soru: 'İnterde oynadın mı' }, // 20
    { anahtar: 'takim:AC Milan', sablon_soru: 'Milanda oynadın mı' },
    { anahtar: 'takim:Napoli', sablon_soru: 'Napolide oynadın mı' },
    { anahtar: 'takim:Roma', sablon_soru: 'Romada oynadın mı' },
    { anahtar: 'takim:Juventus', sablon_soru: 'Juventusda oynadın mı' },
    { anahtar: 'takim:Cagliari', sablon_soru: 'Cagliaride oynadın mı' },
    { anahtar: 'takim:Sampdoria', sablon_soru: 'Sampdoriada oynadın mı' },
    { anahtar: 'takim:Atalanta', sablon_soru: 'Atalantada oynadın mı' },
    { anahtar: 'takim:Lazio', sablon_soru: 'Lazioda oynadın mı' },
    { anahtar: 'takim:Fiorentina', sablon_soru: 'Fiorentinada oynadın mı' },


    // bundesliga
    { anahtar: 'takim:Bayer Leverkusen', sablon_soru: 'Leverkusende oynadın mı' },
    { anahtar: 'takim:Bayer Leverkusen', sablon_soru: 'Bayer Leverkusende oynadın mı' },
    { anahtar: 'takim:Werder Bremen', sablon_soru: 'Werder Bremende oynadın mı' },
    { anahtar: 'takim:Wolfsburg', sablon_soru: 'Wolfsburgda oynadın mı' },
    { anahtar: 'takim:Salzburg', sablon_soru: 'Salzburgda oynadın mı' },
    { anahtar: 'takim:Bayern Münih', sablon_soru: 'Bayern Münihde oynadın mı' },
    { anahtar: 'takim:Bayern Münih', sablon_soru: 'Bayernde oynadın mı' },
    { anahtar: 'takim:Borussia Dortmund', sablon_soru: 'Borussia Dortmundda oynadın mı' },
    { anahtar: 'takim:Borussia Dortmund', sablon_soru: 'Dortmundda oynadın mı' },
    { anahtar: 'takim:Borussia Dortmund', sablon_soru: 'Dortmuntda oynadın mı' },
    { anahtar: 'takim:Schalke', sablon_soru: 'Schalkede oynadın mı' },
    { anahtar: 'takim:Borussia Mönchengladbach', sablon_soru: 'Mönchengladbachda oynadın mı' },
    { anahtar: 'takim:Frankfurt', sablon_soru: 'Frankfurtda oynadın mı' },
    { anahtar: 'takim:Leipzig', sablon_soru: 'Leipzigde oynadın mı' },

    
    // çeşitli
    { anahtar: 'takim:Dinamo Zagreb', sablon_soru: 'Dinamo Zagrebde oynadın mı' },
    { anahtar: 'takim:Birmingham', sablon_soru: 'Birminghamda oynadın mı' },
    { anahtar: 'takim:Molde', sablon_soru: 'Moldede oynadın mı' },
    { anahtar: 'takim:Lech Poznan', sablon_soru: 'Lech Poznanda oynadın mı' },
    { anahtar: 'takim:Ajax', sablon_soru: 'Ajaxda oynadın mı' }, // 40
    { anahtar: 'takim:Al Gharafa', sablon_soru: 'Al Gharafada oynadın mı' },
    { anahtar: 'takim:Genk', sablon_soru: 'Genkde oynadın mı' },
    { anahtar: 'takim:Sporting', sablon_soru: 'Sportingde oynadın mı' },
    { anahtar: 'takim:Al Nassr', sablon_soru: 'Al Nassrda oynadın mı' },
    { anahtar: 'takim:Basel', sablon_soru: 'Baselde oynadın mı' },
    { anahtar: 'takim:Celtic', sablon_soru: 'Celticde oynadın mı' },


    // süper lig
    { anahtar: 'takim:Fenerbahçe', sablon_soru: 'Fenerde oynadın mı' },
    { anahtar: 'takim:Fenerbahçe', sablon_soru: 'Fenerbahçede oynadın mı' },
    { anahtar: 'takim:Galatasaray', sablon_soru: 'Galatasarayda oynadın mı' },
    { anahtar: 'takim:Beşiktaş', sablon_soru: 'Beşiktaşda oynadın mı' },
    { anahtar: 'takim:Trabzon', sablon_soru: 'Trabzonda oynadın mı' },
    { anahtar: 'takim:Konyaspor', sablon_soru: 'Konyasporda oynadın mı' },
    { anahtar: 'takim:Başakşehir', sablon_soru: 'Başakşehirde oynadın mı' },
    { anahtar: 'takim:Göztepe', sablon_soru: 'Göztepede oynadın mı' },


    
    // la liga
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Realde oynadın mı' },
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Real Madridde oynadın mı' },
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Real Madridde forma giydin mi' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Barcelonada forma giydin mi' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Barçada oynadın mı' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Barcelonada oynadın mı' },
    { anahtar: 'takim:Villarreal', sablon_soru: 'Villarrealde oynadın mı' },
    { anahtar: 'takim:Atletico Madrid', sablon_soru: 'Atletico Madridde oynadın mı' },
    { anahtar: 'takim:Atletico Madrid', sablon_soru: 'Atleticoda oynadın mı' },
    { anahtar: 'takim:Valencia', sablon_soru: 'Valenciada oynadın mı' },
    { anahtar: 'takim:Sevilla', sablon_soru: 'Sevillada oynadın mı' },
    { anahtar: 'takim:Atletic Bilbao', sablon_soru: 'Atletic Bilbaoda oynadın mı' },



    // premier lig
    { anahtar: 'takim:Manchester United', sablon_soru: 'Manchester United forması giydin mi' },
    { anahtar: 'takim:Manchester United', sablon_soru: 'Manchester Unitedda oynadın mı' },
    { anahtar: 'takim:Manchester United', sablon_soru: 'Unitedda oynadın mı' },
    { anahtar: 'takim:Manchester City', sablon_soru: 'Manchester City forması giydin mi' },
    { anahtar: 'takim:Manchester City', sablon_soru: 'Manchester Cityde oynadın mı' },
    { anahtar: 'takim:Manchester City', sablon_soru: 'Cityde oynadın mı' },
    { anahtar: 'takim:Chelsea', sablon_soru: 'Chelseade oynadın mı' },
    { anahtar: 'takim:Liverpool', sablon_soru: 'Liverpoolda oynadın mı' },
    { anahtar: 'takim:Southampton', sablon_soru: 'Southamptonda oynadın mı' },
    { anahtar: 'takim:Tottenham', sablon_soru: 'Tottenhamda oynadın mı' },
    { anahtar: 'takim:West Ham United', sablon_soru: 'West Ham Unitedda oynadın mı' },
    { anahtar: 'takim:Arsenal', sablon_soru: 'Arsenalda oynadın mı' },
    { anahtar: 'takim:Everton', sablon_soru: 'Evertonda oynadın mı' },
    { anahtar: 'takim:Aston Villa', sablon_soru: 'Aston Villada oynadın mı' },
    { anahtar: 'takim:Newcastle United', sablon_soru: 'Newcastle Unitedda oynadın mı' },
    { anahtar: 'takim:Wolves', sablon_soru: 'Wolvesda oynadın mı' },

    // ligue 1
    { anahtar: 'takim:Paris Saint-Germain', sablon_soru: 'Pariste oynadın mı' },
    { anahtar: 'takim:Paris Saint-Germain', sablon_soru: 'PSGde oynadın mı' },
    { anahtar: 'takim:Monaco', sablon_soru: 'Monacoda oynadın mı' },
    { anahtar: 'takim:Lille', sablon_soru: 'Lillede oynadın mı' },
    { anahtar: 'takim:Nice', sablon_soru: 'Niceda oynadın mı' },
    { anahtar: 'takim:Lyon', sablon_soru: 'Lyonda oynadın mı' },
    { anahtar: 'takim:Marsilya', sablon_soru: 'Marsilyada oynadın mı' },
    { anahtar: 'takim:Nantes', sablon_soru: 'Nantesde oynadın mı' },
    { anahtar: 'takim:Rennes', sablon_soru: 'Rennesde oynadın mı' },


    { anahtar: 'isim:Lionel Messi', sablon_soru: 'Sen Lionel Messi misin' }, // 24
    { anahtar: 'isim:Arda Güler', sablon_soru: 'Sen Arda Güler misin' }, 
    { anahtar: 'isim:Cristiano Ronaldo', sablon_soru: 'Sen Cristiano Ronaldo musun' }, 
    { anahtar: 'isim:Mauro Icardi', sablon_soru: 'Sen Mauro İcardi misin' }, 
    { anahtar: 'isim:Victor Osimhen', sablon_soru: 'Sen Victor Osimhen misin' }, 
    { anahtar: 'isim:İlkay Gündoğan', sablon_soru: 'Sen İlkay Gündoğan mısın' }, 
    { anahtar: 'isim:Hakan Çalhanoğlu', sablon_soru: 'Sen Hakan Çalhanoğlu musun' }, 
    { anahtar: 'isim:Kylian Mbappe', sablon_soru: 'Sen Kylian Mbappe misin' }, 
    { anahtar: 'isim:Kevin De Bruyne', sablon_soru: 'Sen Kevin De Bruyne misin' }, 
    { anahtar: 'isim:Virgil van Dijk', sablon_soru: 'Sen Virgil van Dijk mısın' }, 
    { anahtar: 'isim:Gianluigi Donnarumma', sablon_soru: 'Sen Gianluigi Donnarumma mısın' }, 
    { anahtar: 'isim:Pedri', sablon_soru: 'Sen Pedri misin' }, 
    { anahtar: 'isim:Harry Kane', sablon_soru: 'Sen Harry Kane misin' }, 
    { anahtar: 'isim:Thomas Müller', sablon_soru: 'Sen Thomas Müller misin' }, 
    { anahtar: 'isim:Luka Modric', sablon_soru: 'Sen Luka Modric misin' }, 
    { anahtar: 'isim:Francesco Totti', sablon_soru: 'Sen Francesco Totti misin' }, 
    { anahtar: 'isim:Phil Foden', sablon_soru: 'Sen Phil Foden mısın' }, 
    { anahtar: 'isim:Kenan Yıldız', sablon_soru: 'Sen Kenan Yıldız mısın' }, 
    { anahtar: 'isim:Jude Bellingham', sablon_soru: 'Sen Jude Bellingham mısın' }, 
    { anahtar: 'isim:Nicolo Barella', sablon_soru: 'Sen Nicolo Barella mısın' }, 
    { anahtar: 'isim:Erling Haaland', sablon_soru: 'Sen Erling Haaland mısın' }, 
    { anahtar: 'isim:Robert Lewandowski', sablon_soru: 'Sen Robert Lewandowski misin' }, 
    { anahtar: 'isim:Declan Rice', sablon_soru: 'Sen Declan Rice mısın' }, 
    { anahtar: 'isim:Frank Lampard', sablon_soru: 'Sen Frank Lampard mısın' }, 
    { anahtar: 'isim:Rodri', sablon_soru: 'Sen Rodri misin' }, 
    { anahtar: 'isim:Toni Kroos', sablon_soru: 'Sen Toni Kroos musun' }, 
    { anahtar: 'isim:Victor Osimhen', sablon_soru: 'Sen Victor Osimhen misin' }, 
    { anahtar: 'isim:Wesley Sneijder', sablon_soru: 'Sen Wesley Sneijder misin' }, 
    { anahtar: 'isim:Leroy Sane', sablon_soru: 'Sen Leroy Sane misin' }, 
    { anahtar: 'isim:Achraf Hakimi', sablon_soru: 'Sen Achraf Hakimi misin' }, 
    { anahtar: 'isim:Thibaut Courtois', sablon_soru: 'Sen Thibaut Courtois mısın' }, 
    { anahtar: 'isim:Yann Sommer', sablon_soru: 'Sen Yann Sommer misin' }, 


    { anahtar: 'kupa:Şampiyonlar Ligi', sablon_soru: 'Şampiyonlar Ligi kazandın mı' },
    { anahtar: 'kupa:Şampiyonlar Ligi', sablon_soru: 'Şampiyonlar Ligi şampiyonu oldun mu' },
    { anahtar: 'kupa:UEFA Avrupa Ligi', sablon_soru: 'Avrupa Ligi kazandın mı' },
    { anahtar: 'kupa:UEFA Avrupa Ligi', sablon_soru: 'Avrupa Ligi şampiyonu oldun mu' },
    { anahtar: 'kupa:UEFA Süper Kupa', sablon_soru: 'Süper kupa kazandın mı' }, // 113
    { anahtar: 'kupa:Konferans Ligi', sablon_soru: 'Konferans Ligi kazandın mı' },

    { anahtar: 'kupa:Avrupa Şampiyonası', sablon_soru: 'EURO kazandın mı' },
    { anahtar: 'kupa:Ballon dor', sablon_soru: 'Ballon dor kazandın mı' },


    { anahtar: 'kupa:La Liga', sablon_soru: 'La Liga kupasını kazandın mı' },
    { anahtar: 'kupa:La Liga', sablon_soru: 'La Liga şampiyonu oldun mu' },
    
    { anahtar: 'kupa:Premier Lig', sablon_soru: 'Premier Ligi kupası kazandın mı' },
    { anahtar: 'kupa:Premier Lig', sablon_soru: 'Premier Ligi şampiyonu oldun mu' },

    { anahtar: 'kupa:Ligue 1', sablon_soru: 'Ligue 1 kupasını kazandın mı' },
    { anahtar: 'kupa:Ligue 1', sablon_soru: 'Ligue 1 şampiyonu oldun mu' },

    { anahtar: 'kupa:Süper Lig', sablon_soru: 'Süper Lig kupasını kazandın mı' },
    { anahtar: 'kupa:Süper Lig', sablon_soru: 'Süper Lig şampiyonu oldun mu' },

    { anahtar: 'kupa:Serie A', sablon_soru: 'Serie A kupasını kazandın mı' },
    { anahtar: 'kupa:Serie A', sablon_soru: 'Serie A şampiyonu oldun mu' },

    { anahtar: 'kupa:Polonya Kupası', sablon_soru: 'Polonya Kupası kazandın mı' },

    { anahtar: 'kupa:Bundesliga', sablon_soru: 'Bundesliga kupasını kazandın mı' },
    { anahtar: 'kupa:Bundesliga', sablon_soru: 'Bundesliga şampiyonu oldun mu' },

    { anahtar: 'kupa:Dünya Kupası', sablon_soru: 'Dünya kupasını kazandın mı' },


    // ligler
    { anahtar: 'lig:Premier Lig', sablon_soru: 'Premier Ligde oynadın mı' },
    { anahtar: 'lig:Süper Lig', sablon_soru: 'Süper Ligde oynadın mı' },
    { anahtar: 'lig:Serie A', sablon_soru: 'Serie A da oynadın mı' },
    { anahtar: 'lig:Ligue 1', sablon_soru: 'Ligue 1de oynadın mı' },
    { anahtar: 'lig:Bundesliga', sablon_soru: 'Bundesligada oynadın mı' },
    { anahtar: 'lig:La Liga', sablon_soru: 'La Ligada oynadın mı' }, // 134


    { anahtar: 'durum:aktif', sablon_soru: 'Aktif bir oyuncu musun'},
    { anahtar: 'durum:aktif', sablon_soru: 'Aktif bir futbolcu musun'},
    { anahtar: 'durum:aktif', sablon_soru: 'Hala aktif futbol oynuyor musun'}, // halen aktif olarak futbol oynuyor musun -> 0.86 aldım
    { anahtar: 'durum:aktif', sablon_soru: 'Hala oynuyor musun'},

    { anahtar: 'mevki:kaleci', sablon_soru: 'kaleci misin'},
    { anahtar: 'mevki:defans', sablon_soru: 'defans mısın '},
    { anahtar: 'mevki:orta saha', sablon_soru: 'orta saha mısın'},
    { anahtar: 'mevki:forvet', sablon_soru: 'forvet misin'},

    { anahtar: 'mevki:kaleci', sablon_soru: 'kalede mi oynuyorsun'},
    { anahtar: 'mevki:defans', sablon_soru: 'defansta mı oynuyorsun '},
    { anahtar: 'mevki:orta saha', sablon_soru: 'orta sahada mı oynuyorsun'},
    { anahtar: 'mevki:forvet', sablon_soru: 'forvette mi oynuyorsun'},
];

// ekleyebileceğim sorular: 5 büyük lig de oynadı mı?
// ingilterede en iyi 6 da oynadı mı?

async function fetchData() {
  try {
    const response = await fetch("./futbolcular-guncellenmis.json");
    if (!response.ok) {
      throw new Error("JSON dosyası yüklenemedi");
    }
    FUTBOLCU_LISTE = await response.json();

    return FUTBOLCU_LISTE;
  } catch (error) {
    console.error("Hata:", error);
  }
}


function cevapVer(mesaj) {
  let div = document.createElement("div");
  div.setAttribute('class', 'footballer-chat');
  div.innerText = mesaj;
  chats.appendChild(div);
  scrollToBottom();
}


async function oyunKur() {

  await fetchData();

  try {
    
    cevapVer("Bir dakika bekle, hazırlanmam lazım!");
    console.log("Model yüklemesi başlatılıyor...");
    model = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {quantized: true}) 


    console.log("Model başarıyla yüklendi!");

    // Şablon Soruların Vektörlerini HESAPLA ve SAKLA
    console.log("Bilgi şablonlarının vektörleri hesaplanıyor...");
    let sablonCumleleri = bilgiSablonlari.map(s => s.sablon_soru.toLowerCase()); // toLowerCase() orijinal stringi değiştirmez, sadece yeni bir string döndürür.

    const ciktilar = await model(sablonCumleleri, {pooling: 'mean', normalize: false})
    // hesaplanan vektörleri global değişkene atadım
    const rawData = ciktilar.data;
    const dimensions = ciktilar.dims;
    sablonVektorleri = tf.tensor(rawData, dimensions);    
    
    console.log("Şablon vektörleri hafızaya alındı.");
    futbolcuIsimAlani.innerText = "Guess who I am";
    userStatus.innerText = "online"; 

    while(chats.hasChildNodes()) {
      chats.removeChild(chats.firstChild);
    }


    cevapVer("Hey! Benim kim olduğumu bulabilir misin?");


    // rastgele bir futbolcu seçiyoruz
    const rastgeleIndex = Math.floor(Math.random() * FUTBOLCU_LISTE.length);
    secilenFutbolcu     = FUTBOLCU_LISTE[rastgeleIndex];
    console.log(`Bilgisayarın tuttuğu futbolcu: ${secilenFutbolcu.isim}`); 

  } catch (error) {
    console.error("Model yüklenirken bir hata oluştu:", error);
  }


}


oyunKur();


function scrollToBottom() {
    chats.scrollTop = chats.scrollHeight; // scrollTop: Bir elementin dikey kaydırma çubuğunun en üstten ne kadar aşağıda olduğunu belirtir. bunu chat ekranın yüksekliğine eşitliyoruz.
                                          // dolayısıyla her mesajdan sonra çubuk en aşağıya gider.
}

async function soruyuAnalizEt(kullaniciSorusu) {

  const kucukHarfSoru = kullaniciSorusu.toLowerCase();
  const cikti = await model(kucukHarfSoru, {pooling: 'mean', normalize: false})

  const rawData = cikti.data;
  const dimensions = cikti.dims;

  const kullaniciVektoru = tf.tensor(rawData, dimensions)


  // cosinüs benzerliği
  const normKullaniciVektoru = kullaniciVektoru.div(kullaniciVektoru.norm());
  const normSablonVektorleri = sablonVektorleri.div(sablonVektorleri.norm(2, 1, true));

  // Bu çarpım bize [1, 10] boyutunda bir tensör verir.
  // İçindeki her bir değer, bir şablonla olan benzerlik skorudur.
  const benzerlikSkorlari = tf.matMul(normKullaniciVektoru, normSablonVektorleri, false, true);

  const enYuksekSkorTensor = benzerlikSkorlari.max(1);
  const enYuksekSkorIndex = benzerlikSkorlari.argMax(1);

  const skor = enYuksekSkorTensor.dataSync()[0]; // en yüksek skorun tensör değerini al
  const index = enYuksekSkorIndex.dataSync()[0]; // Index'i bir sayı olarak almak için

  const ESIK_DEGERİ = 0.82; 
  console.log("skor" + skor)
  console.log("index " + index);



  if (skor < ESIK_DEGERİ) {
    cevapVer("Üzgünüm, bu soruyu anlayamadım veya bu konuda bir bilgim yok.")
    console.log("Üzgünüm, bu soruyu anlayamadım veya bu konuda bir bilgim yok.");
    return; 
  }


  const eslesenSablon = bilgiSablonlari[index];
  console.log(eslesenSablon["anahtar"])

  const sablonAnahtar      = eslesenSablon["anahtar"];
  const [veriTipi, deger]  = sablonAnahtar.split(":"); // : ile içeriği böldük, split iki elemanli bir dizi döndürür, ilki veriTipi'ne atanır, ikincisi deger'e atanır. 


  switch (veriTipi) {
    case "isim":
      if (secilenFutbolcu.isim.toLowerCase() == deger.toLowerCase()) {
        cevapVer(`Tebrikler, doğru bildin! ben ${secilenFutbolcu.isim.toLowerCase()}! ${sorulanSoruSayisi} soruda bildin! 
        ismini ve skorunu liderlik tablosuna eklemek ister misin?`);

        futbolcuIsimAlani.innerText = `${secilenFutbolcu.isim}`;
        setTimeout(() => {
          liderlikTablosunaEkle(sorulanSoruSayisi);
        }, 0);

        console.log("oyun bitti");
      } else {
        cevapVer(`Hayır, ben ${deger.toLowerCase()} değilim, tekrar denemelisin :) `)
        console.log("hayır");
      }
      break;

    case "milliyet":
      if (secilenFutbolcu.milliyet.toLowerCase() == deger.toLowerCase()) {
        cevapVer("evet");
        console.log("evet");
      } else {
        cevapVer("hayır");
        console.log("hayır");
      }
      break;    

    case "durum":
      if (secilenFutbolcu.durum.toLowerCase() == deger.toLowerCase()) {
        cevapVer("Evet, aktif futbol hayatıma devam ediyorum.")
        console.log("Evet, aktif futbol hayatına devam ediyor.");
      } else {
        cevapVer("Hayır, artık aktif olarak oynamıyorum.")
        console.log("Hayır, artık aktif olarak oynamıyor.");
      }
      break;    

    case "mevki":
      if (secilenFutbolcu.mevki.toLowerCase() == deger.toLowerCase()) {
        cevapVer("evvet");
        console.log("evet");
      } else {
        cevapVer("hayır");
        console.log("hayır");
      }
      break;  
      
    case "takim":

        const kucukHarfTakimlar = secilenFutbolcu.oynadigi_takimlar.map(takim => takim.toLowerCase());
        if (kucukHarfTakimlar.includes(deger.toLowerCase())) {
          cevapVer(`evet, ${deger.toLowerCase()} takımında oynadım`);
          console.log("evet");
        } else {
          cevapVer(`hayır, ${deger.toLowerCase()} takımında oynamadım`);
          console.log("hayır");
        }
      break;

    case "kupa":

        const kucukHarfKupalar = secilenFutbolcu.kazandigi_kupalar.map(kupa => kupa.toLowerCase());
        if (kucukHarfKupalar.includes(deger.toLowerCase())) {
          cevapVer("evet");
          console.log("evet");
        } else {
          cevapVer("hayır")
          console.log("hayır");
        }
      break;

    case "lig":

        const kucukHarfLigler = secilenFutbolcu.oynadigi_ligler.map(kupa => kupa.toLowerCase());
        if (kucukHarfLigler.includes(deger.toLowerCase())) {
          cevapVer(`evet ${deger.toLowerCase()} liginde oynadım`);
          console.log("evet");
        } else {
          cevapVer(`hayır, ${deger.toLowerCase()} liginde oynamadım.`)
          console.log("hayır");
        }
      break;

      default:
      break;
  }

  scrollToBottom();


}



const soruInput = document.getElementById("soru-input");
const sorButonu = document.getElementById("sor-butonu");


async function soruSor() {

  let div = document.createElement('div');

  if (soruInput.value) {
    div.innerText = soruInput.value; 
    div.setAttribute('class', 'my-chat');
    chats.appendChild(div);
    scrollToBottom();    

    sorulanSoruSayisi++;
    await soruyuAnalizEt(soruInput.value); // Soruyu işlemek için gönder ve tamamlanmasını bekle

  } else {
    cevapVer("Hey, beni tanımak için soru sorman gerekiyor!");

  }




  if (sorulanSoruSayisi > 0 && sorulanSoruSayisi % 5 == 0) {
    let pesMesaji = document.createElement('div');
    let sonucMesaji = document.createElement('div');
    let kalanSure = document.createElement("div");


    cevapVer("Hey biraz zorlanıyor gibisin, Pes etmeye ne dersin :) ");

    let devamButon = butonOlustur("DEVAM", "green", () => {
      
      setTimeout(() => {
        devamButon.remove(); // gayet güzel çalışıyor.
        pesButon.remove();

      }, 500)
      

    });


    let pesButon = butonOlustur("PES", "red", () => {

      kalanSure.setAttribute('class', 'footballer-chat');

      let counter = 10;
      let intervalId = setInterval(() => {
        counter--;

        if (counter > 0) {
          kalanSure.textContent = `Yeni oyunun başlamasına ${counter} saniye kaldı, hazırlan!!`;
        } else {
          clearInterval(intervalId); // Zamanlayıcıyı durdur
          kalanSure.textContent = "Oyun başladı!";
        }
      }, 1000); 

      // while döngüsü, koşul sağlandığı sürece sürekli çalışır ve diğer işlemlerin (örneğin, DOM güncellemeleri veya kullanıcı etkileşimleri) 
      // gerçekleşmesine izin vermez. Bu, tarayıcının yanıt vermemesine ve uygulamanın donmasına neden olur.

      // setInterval asenkron bir yapıya sahiptir ve belirli aralıklarla bir işlem yapar. Bu sırada diğer işlemler de çalışmaya devam eder.

      futbolcuIsimAlani.innerText = `${secilenFutbolcu.isim}`;
      cevapVer(`ben ${secilenFutbolcu.isim.toLowerCase()}! Daha çok pratik yapmalısın.!`)
      sorulanSoruSayisi = 0;

      setTimeout(() => {
        devamButon.remove(); // gayet güzel çalışıyor.
        pesButon.remove();

      }, 500);


      setTimeout(() => {
        oyunBitir();
      }, 10000);

      // setTimeout fonksiyonları birbirinden bağımsızdır. İlk setTimeout ve ikinci setTimeout aynı anda başlatılır, 
      // ancak süreleri farklı olduğu için sırayla tamamlanır.  her biri kendi zamanlamasına göre çalışır.

    });

    chats.appendChild(pesMesaji);
    chats.appendChild(sonucMesaji);
    chats.appendChild(devamButon);
    chats.appendChild(pesButon);
    chats.appendChild(kalanSure);
    scrollToBottom();

  }

  soruInput.value = ''; // soruInput.innerText yazmıştım, ancak input için .innerText değil .value kullanılır
  console.log("soru sayısı" + sorulanSoruSayisi)

  /* 
  bu fonksiyonu ilk kullandığımda şöyle bir hata yapmıştım:

  let div ... -> div elemanı oluşturduktan sonra "div = soruInput.value" diyerek içerisine
  bir string değer atadım. artık div DOM elemanı olma özelliğini kaybetti. dolasyısıyla
  div.setAttribute('class', 'my-chat'); yazdığımda div.setAttribute is not a function
  hatası aldım. çünkü div artık bir string, dom elemanı değil. innerText ile düzelttik.
  */

}

sorButonu.addEventListener('click', soruSor);


function liderlikTablosunaEkle(skor) {
  
    let ekleButon  =  butonOlustur("EKLE", "green", () => modalGoster(skor));
    let hayırButon = butonOlustur("HAYIR", "red", oyunBitir);

    chats.appendChild(ekleButon);
    chats.appendChild(hayırButon);
    scrollToBottom();

}




function oyunBitir() {

  sorulanSoruSayisi = 0;

  while(chats.hasChildNodes()) {
    chats.removeChild(chats.firstChild);
  }

  oyunKur(); // kullanıcı doğru bildi, oyun bitti mesajlar silindi. yeni oyun tekrar başlayaccak, yeni bir futbolcu seçilecek. 

}



function butonOlustur(icerik, renk, onClickHandler) {
  let buton = document.createElement("button");

  buton.innerText = icerik;
  buton.style.backgroundColor = renk;
  buton.style.color = "white";
  buton.style.padding = "6px";
  buton.style.margin = "4px";
  buton.style.borderRadius = "4px";
  buton.style.cursor = "pointer";

  if (onClickHandler) {
    buton.onclick = onClickHandler;
  }

  return buton;

}


function modalKapat() {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.opacity = '0'; // opacity: 0 → Element tamamen görünmez.
        modalOverlay.querySelector('.modal-content').style.transform = 'translateY(-50px)'; //  Modal başlangıçta yukarıda (ekran dışında) konumlanır.
        
        setTimeout(() => {
            modalOverlay.remove();
        }, 300);
    }
}


function modalGoster(skor) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'modal-content';

    modal.innerHTML = `
        <button class="modal-close-btn">&times;</button>
        <h3>Harika Tahmin!</h3>
        <p style="margin-bottom: 15px; color: #666;">Skorunu kaydetmek için adını yaz.</p>
        <input type="text" id="kullanici-adi-input" placeholder="Kullanıcı adınız...">
    `;

    const gonderButon = butonOlustur("GÖNDER", "#77b3d4", () => {
        const kullaniciAdi = document.getElementById('kullanici-adi-input').value;
        console.log(`Liderlik tablosuna eklenecek isim: ${kullaniciAdi} ve sorduğu soru sayısı ${skor}`);
        
        skorListesi.push({username: `${kullaniciAdi}`, score: `${skor}`});
        skorListesi.sort((a, b) => a.score - b.score);

        const tbody = document.getElementById("liderlikTablosu");
        tbody.innerHTML = "";

        skorListesi.forEach(player => {
          let row = document.createElement("tr");
          row.innerHTML = `<td>${player.username}</td><td>${player.score}</td>`;
          tbody.appendChild(row);
        });

        console.log(skorListesi)

        modalKapat();
        oyunBitir(); 
    });
    modal.appendChild(gonderButon);

    overlay.appendChild(modal);     // oluşturulan elemanları birbirine ve body'ye ekle
    document.body.appendChild(overlay);

    setTimeout(() => {  // yumuşak açılma efekti için stilleri ayarla
        overlay.style.opacity = '1';
        modal.style.transform = 'translateY(0)'; // translateY(0) : modal, ekranın ortasına taşınır.
    }, 10);                                     // modal içeriğinin yukarıdan aşağıya doğru kayarak ekrana gelmesini sağlar.


    overlay.querySelector('.modal-close-btn').onclick = modalKapat;     // kapatma olaylarını ekle
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            modalKapat();
        }
    });
}

