const durumParagrafi = document.getElementById("durum");
let FUTBOLCU_LISTE = [];
let model; // başka fonksiyonlarda da erişebilmek için global olarak tanımlıyoruz.
let secilenFutbolcu;
let bilgiSablonlari;
let sablonVektorleri; // şablon soruların hesaplanmış vektörlerini burada tutacağız. böylece her fonksiyondan erişebileceğiz ve her seferiende hesaplamak zorunda kalmayacağız.

const chats = document.getElementById("chats");



// Şablon Soruları ve Veri Anahtarlarını Oluşturma
// Bu yapı, hangi sorunun hangi veriyi kontrol edeceğini belirler.
bilgiSablonlari = [
    { anahtar: 'milliyet:Türk', sablon_soru: 'Bu oyuncu Türk mü?' },
    { anahtar: 'milliyet:Arjantin', sablon_soru: 'Bu oyuncu Arjantinli mi?' },
    { anahtar: 'milliyet:Portekiz', sablon_soru: 'Bu oyuncu Portekizli mi?' },
    { anahtar: 'milliyet:Alman', sablon_soru: 'Bu oyuncu Alman mı?' },
    { anahtar: 'milliyet:Nijerya', sablon_soru: 'Bu oyuncu Nijeryalı mı?' },
    { anahtar: 'milliyet:Belçika', sablon_soru: 'Bu oyuncu Belçikalı mı?' },
    { anahtar: 'milliyet:İngiliz', sablon_soru: 'Bu oyuncu İngiltereli mi?' },


    { anahtar: 'takim:Fenerbahçe', sablon_soru: 'Bu oyuncu Fenerbahçede oynadı mı?' },
    { anahtar: 'takim:Galatasaray', sablon_soru: 'Bu oyuncu Galatasarayda oynadı mı?' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Bu oyuncu Barcelonada oynadı mı?' },
    { anahtar: 'takim:Manchester United', sablon_soru: 'Bu oyuncu Manchester Unitedda oynadı mı?' },
    
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Bu oyuncu Madridde oynadı mı?' },
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Bu oyuncu Real Madridde oynadı mı?' },
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Bu oyuncu Real Madridde forma giydi mi?' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Bu oyuncu Barcelonada top koşturdu mu?' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Bu oyuncu Barcelonada forma giydi mi?' },


    { anahtar: 'takim:Manchester United', sablon_soru: 'Bu oyuncu Manchester United forması giydi mi?' },
    { anahtar: 'kupa:Şampiyonlar Ligi', sablon_soru: 'Bu oyuncu Şampiyonlar Ligi kazandı mı?' },
    { anahtar: 'kupa:La Liga', sablon_soru: 'Bu oyuncu İspanya La Liga kupasını kaldırdı mı?' },
    { anahtar: 'kupa:Premier Lig', sablon_soru: 'Bu oyuncu İngiltere Premier Ligi şampiyonu oldu mu?' },
    { anahtar: 'kupa:Avrupa Ligi', sablon_soru: 'Bu oyuncu Avrupa Ligi kazandı mı?' },
    { anahtar: 'durum:aktif', sablon_soru: 'Aktif bir futbolcu mu?'},
    { anahtar: 'durum:aktif', sablon_soru: 'Hala aktif futbol oynuyor mu?'},

    { anahtar: 'mevki:kaleci', sablon_soru: 'Bu oyuncunun mevkisi kaleci mi?'},
    { anahtar: 'mevki:defans', sablon_soru: 'Bu oyuncunun mevkisi defans mı? '},
    { anahtar: 'mevki:orta saha', sablon_soru: 'Bu oyuncunun mevkisi orta saha mı?'},
    { anahtar: 'mevki:forvet', sablon_soru: 'Bu oyuncunun mevkisi forvet mi?'},



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

  const ESIK_DEGERİ = 0.82; 
  console.log("skor" + skor)
  console.log("index " + index);

  if (skor < ESIK_DEGERİ) {
    console.log("Üzgünüm, bu soruyu anlayamadım veya bu konuda bir bilgim yok.");
    // Fonksiyonun devam etmesini engelle
    return; 
  }


  const eslesenSablon = bilgiSablonlari[index];
  console.log(eslesenSablon["anahtar"])

  const sablonAnahtar      = eslesenSablon["anahtar"];
  const [veriTipi, deger]  = sablonAnahtar.split(":"); // : ile içeriği böldük, split iki elemanli bir dizi döndürür, ilki veriTipi'ne atanır, ikincisi deger'e atanır. 


  // yanlış pozitif filtresii


  /* bu filtreyi yaptık ancak şöyle bir problem var: bu oyuncu fenerhabçede oynadı mı? diye sorduğumda yazım hatasından dolayı bu filtreden geçemiyor. 
  ancak normalde sablonsoru ile doğru eşleştirmişti*/



  switch (veriTipi) {
    case "isim":
      if (secilenFutbolcu.isim.toLowerCase() == deger.toLowerCase()) {
        console.log("evet");
      } else {
        console.log("hayır");
      }
      break;

    case "milliyet":
      if (secilenFutbolcu.milliyet.toLowerCase() == deger.toLowerCase()) {
        console.log("evet");
      } else {
        console.log("hayır");
      }
      break;    

    case "durum":
      if (secilenFutbolcu.durum.toLowerCase() == deger.toLowerCase()) {
        console.log("Evet, aktif futbol hayatına devam ediyor.");
      } else {
        console.log("Hayır, artık aktif olarak oynamıyor.");
      }
      break;    

    case "mevki":
      if (secilenFutbolcu.mevki.toLowerCase() == deger.toLowerCase()) {
        console.log("evet");
      } else {
        console.log("hayır");
      }
      break;  
      
    case "takim":

        // Takım isimlerini içeren yeni bir dizi oluşturup hepsini küçük harfe çevir
        const kucukHarfTakimlar = secilenFutbolcu.oynadigi_takimlar.map(takim => takim.toLowerCase());
        if (kucukHarfTakimlar.includes(deger.toLowerCase())) {
          console.log("evet");
        } else {
          console.log("hayır");
        }
      break;

    case "kupa":

        const kucukHarfKupalar = secilenFutbolcu.kazandigi_kupalar.map(kupa => kupa.toLowerCase());
        if (kucukHarfKupalar.includes(deger.toLowerCase())) {
          console.log("evet");
        } else {
          console.log("hayır");
        }
      break;

      default:
      break;
  }



}




const soruInput = document.getElementById("soru-input");
const sorButonu = document.getElementById("sor-butonu");


function soruSor() {

  let div = document.createElement('div');
  div.innerText = soruInput.value; 

  if (soruInput.value) {
    soruyuAnalizEt(soruInput.value);
  }

  div.setAttribute('class', 'my-chat');
  chats.appendChild(div);

  soruInput.value = ''; // soruInput.innerText yazmıştım, ancak input için .innerText değil .value kullanılır
  console.log("burası çalıştı")
  /* 
  bu fonksiyonu ilk kullandığımda şöyle bir hata yapmıştım:

  let div ... -> div elemanı oluşturduktan sonra "div = soruInput.value" diyerek içerisine
  bir string değer atadım. artık div DOM elemanı olma özelliğini kaybetti. dolasyısıyla
  div.setAttribute('class', 'my-chat'); yazdığımda div.setAttribute is not a function
  hatası aldım. çünkü div artık bir string, dom elemanı değil. yukarıda gördüğün kod düzeltilmiş halde.
  */


}

sorButonu.addEventListener('click', soruSor);




