const durumParagrafi = document.getElementById("durum");
let FUTBOLCU_LISTE = [];
let model; // başka fonksiyonlarda da erişebilmek için global olarak tanımlıyoruz.
let secilenFutbolcu;
let bilgiSablonlari;
let sablonVektorleri; // şablon soruların hesaplanmış vektörlerini burada tutacağız. böylece her fonksiyondan erişebileceğiz ve her seferiende hesaplamak zorunda kalmayacağız.
let sorulanSoruSayisi = 0;


const chats      = document.getElementById("chats");
const userStatus = document.getElementById("status");


// Şablon Soruları ve Veri Anahtarlarını Oluşturma
// Bu yapı, hangi sorunun hangi veriyi kontrol edeceğini belirler.
bilgiSablonlari = [
    { anahtar: 'milliyet:Türk', sablon_soru: 'Türk müsün?' },
    { anahtar: 'milliyet:Arjantin', sablon_soru: 'Arjantinli misin?' },
    { anahtar: 'milliyet:Portekiz', sablon_soru: 'Portekizli misin?' },
    { anahtar: 'milliyet:Alman', sablon_soru: 'Alman mısın?' },
    { anahtar: 'milliyet:Nijerya', sablon_soru: 'Nijeryalı mısın?' },
    { anahtar: 'milliyet:Belçika', sablon_soru: 'Belçikalı mısın?' },
    { anahtar: 'milliyet:İngiliz', sablon_soru: 'İngiliz misin?' },

    { anahtar: 'takim:Fenerbahçe', sablon_soru: 'Fenerde oynadın mı?' },
    { anahtar: 'takim:Fenerbahçe', sablon_soru: 'Fenerbahçede oynadın mı?' },
    { anahtar: 'takim:Galatasaray', sablon_soru: 'Galatasarayda oynadın mı?' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Barcelonada oynadın mı?' },
    
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Madridde oynadın mı?' },
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Real Madridde oynadın mı?' },
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Real Madridde forma giydin mi?' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Barcelonada top koşturdun mu?' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Barcelonada forma giydin mi?' },


    { anahtar: 'takim:Manchester United', sablon_soru: 'Manchester United forması giydin mi?' },
    { anahtar: 'takim:Manchester United', sablon_soru: 'Manchester Unitedda oynadın mı?' },
    { anahtar: 'takim:Manchester United', sablon_soru: 'Unitedda oynadın mı?' },


    { anahtar: 'takim:Manchester City', sablon_soru: 'Manchester City forması giydin mi?' },
    { anahtar: 'takim:Manchester City', sablon_soru: 'Manchester Cityde oynadın mı?' },
    { anahtar: 'takim:Manchester City', sablon_soru: 'Cityde oynadın mı?' },


    { anahtar: 'takim:Paris Saint-Germain', sablon_soru: 'Pariste oynadın mı?' },
    { anahtar: 'takim:Paris Saint-Germain', sablon_soru: 'PSG de oynadın mı?' },


    { anahtar: 'kupa:Şampiyonlar Ligi', sablon_soru: 'Şampiyonlar Ligi kazandın mı?' },
    { anahtar: 'kupa:Şampiyonlar Ligi', sablon_soru: 'Şampiyonlar Ligi şampiyonu oldun mu?' },
    { anahtar: 'kupa:Avrupa Ligi', sablon_soru: 'Avrupa Ligi kazandın mı?' },
    { anahtar: 'kupa:Avrupa Ligi', sablon_soru: 'Avrupa Ligi şampiyonu oldun mu?' },


    { anahtar: 'kupa:La Liga', sablon_soru: 'La Liga kupasını kazandın mı?' },
    { anahtar: 'kupa:La Liga', sablon_soru: 'La Liga şampiyonu oldun mu?' },
    
    { anahtar: 'kupa:Premier Lig', sablon_soru: 'Premier Ligi kupası kazandın mı?' },
    { anahtar: 'kupa:Premier Lig', sablon_soru: 'Premier Ligi şampiyonu oldun mu?' },

    { anahtar: 'kupa:Ligue 1', sablon_soru: 'Ligue 1 kupasını kazandın mı?' },
    { anahtar: 'kupa:Ligue 1', sablon_soru: 'Ligue 1 şampiyonu oldun mu?' },

    { anahtar: 'kupa:Süper Lig', sablon_soru: 'Süper Lig kupasını kazandın mı?' },
    { anahtar: 'kupa:Süper Lig', sablon_soru: 'Süper Lig şampiyonu oldun mu?' },

    { anahtar: 'kupa:Serie A', sablon_soru: 'Serie A kupasını kazandın mı?' },
    { anahtar: 'kupa:Serie A', sablon_soru: 'Serie A şampiyonu oldun mu?' },

    { anahtar: 'kupa:Bundesliga', sablon_soru: 'Bundesliga kupasını kazandın mı?' },
    { anahtar: 'kupa:Bundesliga', sablon_soru: 'Bundesliga şampiyonu oldun mu?' },

    { anahtar: 'kupa:Dünya Kupası', sablon_soru: 'Dünya kupasını kazandın mı?' },



    { anahtar: 'durum:aktif', sablon_soru: 'Aktif bir futbolcu musun?'},
    { anahtar: 'durum:aktif', sablon_soru: 'Hala aktif futbol oynuyor musun?'},
    { anahtar: 'durum:aktif', sablon_soru: 'Hala oynuyor musun?'},

    { anahtar: 'mevki:kaleci', sablon_soru: 'kaleci misin?'},
    { anahtar: 'mevki:defans', sablon_soru: 'defans mısın? '},
    { anahtar: 'mevki:orta saha', sablon_soru: 'orta saha mısın?'},
    { anahtar: 'mevki:forvet', sablon_soru: 'forvet misin?'},

    { anahtar: 'mevki:kaleci', sablon_soru: 'kalede mi oynuyorsun?'},
    { anahtar: 'mevki:defans', sablon_soru: 'defansta mı oynuyorsun? '},
    { anahtar: 'mevki:orta saha', sablon_soru: 'orta sahada mı oynuyorsun?'},
    { anahtar: 'mevki:forvet', sablon_soru: 'forvette mi oynuyorsun?'},

];

// ekleyebileceğim sorular: 5 büyük lig de oynadı mı?
// ingilterede en iyi 6 da oynadı mı?

async function fetchData() {
  try {
    const response = await fetch("./futbolcular.json");
    if (!response.ok) {
      throw new Error("JSON dosyası yüklenemedi");
    }
    FUTBOLCU_LISTE = await response.json();

    // console.log(FUTBOLCU_LISTE[0]["oynadigi_takimlar"][0]);
    return FUTBOLCU_LISTE;
  } catch (error) {
    console.error("Hata:", error);
  }
}




async function oyunKur() {
  durumParagrafi.innerText = "Veriler ve model yükleniyor...";

  await fetchData();

  try {
    
    console.log("Model yüklemesi başlatılıyor...");
    model = await use.load();
    userStatus.innerText = "online"; 

    let div = document.createElement("div");
    div.setAttribute('class', 'footballer-chat');

    div.innerText = "Hey! Benim kim olduğumu bulabilir misin?"; // bu soruyu model yüklendikten hemen sonra mı yazdıralım yoksa şablon vektörleri hesaplandıktan sonra mı?
    chats.appendChild(div);



    console.log("Model başarıyla yüklendi!");

    // Şablon Soruların Vektörlerini HESAPLA ve SAKLA
    console.log("Bilgi şablonlarının vektörleri hesaplanıyor...");
    const sablonCumleleri = bilgiSablonlari.map(s => s.sablon_soru);
    
    // for (let i = 0; i < bilgiSablonlari.length; i++) {
    //     sablonCumleleri[i].toLowerCase();              
    // }
        
    sablonVektorleri = await model.embed(sablonCumleleri); // hesaplanan vektörleri global değişkene atadık
    console.log("Şablon vektörleri hafızaya alındı.");

    // rastgele bir futbolcu seç
    const rastgeleIndex = Math.floor(Math.random() * FUTBOLCU_LISTE.length);
    secilenFutbolcu     = FUTBOLCU_LISTE[rastgeleIndex];
    console.log(`Bilgisayarın tuttuğu futbolcu: ${secilenFutbolcu.isim}`); 


    durumParagrafi.innerText = "Model hazır sorunu sorabilirsin."

  } catch (error) {
    console.error("Model yüklenirken bir hata oluştu:", error);
    durumParagrafi.innerText = "Hata: Model yüklenemedi. Konsolu kontrol edin.";
  }


}


oyunKur();

async function soruyuAnalizEt(kullaniciSorusu) {
  console.log(`Kullanıcının sorusu ${kullaniciSorusu}`)

  const kullaniciVektoru = await model.embed([kullaniciSorusu]);



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

  const ESIK_DEGERİ = 0.85; 
  console.log("skor" + skor)
  console.log("index " + index);


  let div = document.createElement('div');
  div.setAttribute('class', 'footballer-chat');


  if (skor < ESIK_DEGERİ) {
    div.innerText = "Üzgünüm, bu soruyu anlayamadım veya bu konuda bir bilgim yok.";
    chats.appendChild(div);

    console.log("Üzgünüm, bu soruyu anlayamadım veya bu konuda bir bilgim yok.");
    // Fonksiyonun devam etmesini engelle
    return; 
  }


  const eslesenSablon = bilgiSablonlari[index];
  console.log(eslesenSablon["anahtar"])

  const sablonAnahtar      = eslesenSablon["anahtar"];
  const [veriTipi, deger]  = sablonAnahtar.split(":"); // : ile içeriği böldük, split iki elemanli bir dizi döndürür, ilki veriTipi'ne atanır, ikincisi deger'e atanır. 


  switch (veriTipi) {
    case "isim":
      if (secilenFutbolcu.isim.toLowerCase() == deger.toLowerCase()) {
        div.innerText = "evet";
        console.log("evet");
      } else {
        div.innerText = "hayır";
        console.log("hayır");
      }
      break;

    case "milliyet":
      if (secilenFutbolcu.milliyet.toLowerCase() == deger.toLowerCase()) {
        div.innerText = "evet";
        console.log("evet");
      } else {
        div.innerText = "hayır";
        console.log("hayır");
      }
      break;    

    case "durum":
      if (secilenFutbolcu.durum.toLowerCase() == deger.toLowerCase()) {
        div.innerText = "Evet, aktif futbol hayatıma devam ediyorum.";
        console.log("Evet, aktif futbol hayatına devam ediyor.");
      } else {
        div.innerText = "Hayır, artık aktif olarak oynamıyorum.";
        console.log("Hayır, artık aktif olarak oynamıyor.");
      }
      break;    

    case "mevki":
      if (secilenFutbolcu.mevki.toLowerCase() == deger.toLowerCase()) {
        div.innerText = "evet";
        console.log("evet");
      } else {
        div.innerText = "hayır";
        console.log("hayır");
      }
      break;  
      
    case "takim":

        // Takım isimlerini içeren yeni bir dizi oluşturup hepsini küçük harfe çevir
        const kucukHarfTakimlar = secilenFutbolcu.oynadigi_takimlar.map(takim => takim.toLowerCase());
        if (kucukHarfTakimlar.includes(deger.toLowerCase())) {
          div.innerText = "evet";
          console.log("evet");
        } else {
          div.innerText = "hayır";
          console.log("hayır");
        }
      break;

    case "kupa":

        const kucukHarfKupalar = secilenFutbolcu.kazandigi_kupalar.map(kupa => kupa.toLowerCase());
        if (kucukHarfKupalar.includes(deger.toLowerCase())) {
          div.innerText = "evet";
          console.log("evet");
        } else {
          div.innerText = "hayır";
          console.log("hayır");
        }
      break;

      default:
      break;
  }

  chats.appendChild(div);

}




const soruInput = document.getElementById("soru-input");
const sorButonu = document.getElementById("sor-butonu");


function soruSor() {

  let div = document.createElement('div');

  if (soruInput.value) {
    soruyuAnalizEt(soruInput.value);
    div.innerText = soruInput.value; 
    div.setAttribute('class', 'my-chat');
    sorulanSoruSayisi++;

  } else {
    div.innerText = "Hey, beni tanımak için soru sorman gerekiyor!"; 
    div.setAttribute('class', 'footballer-chat');
  }

  chats.appendChild(div);

  soruInput.value = ''; // soruInput.innerText yazmıştım, ancak input için .innerText değil .value kullanılır
  console.log("soru sayısı" + sorulanSoruSayisi)

  /* 
  bu fonksiyonu ilk kullandığımda şöyle bir hata yapmıştım:

  let div ... -> div elemanı oluşturduktan sonra "div = soruInput.value" diyerek içerisine
  bir string değer atadım. artık div DOM elemanı olma özelliğini kaybetti. dolasyısıyla
  div.setAttribute('class', 'my-chat'); yazdığımda div.setAttribute is not a function
  hatası aldım. çünkü div artık bir string, dom elemanı değil. yukarıda gördüğün kod düzeltilmiş halde.
  */


}

sorButonu.addEventListener('click', soruSor);




