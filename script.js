const durumParagrafi = document.getElementById("durum");
let FUTBOLCU_LISTE = [];
let model; // başka fonksiyonlarda da erişebilmek için global olarak tanımlıyoruz.
let secilenFutbolcu;
let bilgiSablonlari;
let sablonVektorleri; // şablon soruların hesaplanmış vektörlerini burada tutacağız. böylece her fonksiyondan erişebileceğiz ve her seferiende hesaplamak zorunda kalmayacağız.
let sorulanSoruSayisi = 0;


const chats      = document.getElementById("chats");
const userStatus = document.getElementById("status");
const futbolcuIsimAlani = document.getElementById("futbolcu-isim-alani");


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
    
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Madridde oynadın mı?' },
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Real Madridde oynadın mı?' },
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Real Madridde forma giydin mi?' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Barcelonada forma giydin mi?' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Barçada oynadın mı?' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Barcelonada oynadın mı?' },


    { anahtar: 'takim:Manchester United', sablon_soru: 'Manchester United forması giydin mi?' },
    { anahtar: 'takim:Manchester United', sablon_soru: 'Manchester Unitedda oynadın mı?' },
    { anahtar: 'takim:Manchester United', sablon_soru: 'Unitedda oynadın mı?' },


    { anahtar: 'takim:Manchester City', sablon_soru: 'Manchester City forması giydin mi?' },
    { anahtar: 'takim:Manchester City', sablon_soru: 'Manchester Cityde oynadın mı?' },
    { anahtar: 'takim:Manchester City', sablon_soru: 'Cityde oynadın mı?' },


    { anahtar: 'takim:Paris Saint-Germain', sablon_soru: 'Pariste oynadın mı?' },
    { anahtar: 'takim:Paris Saint-Germain', sablon_soru: 'PSGde oynadın mı?' },


    { anahtar: 'isim:Lionel Messi', sablon_soru: 'Sen Lionel Messi misin?' }, // 24
    { anahtar: 'isim:Arda Güler', sablon_soru: 'Sen Arda Güler misin?' }, 
    { anahtar: 'isim:Cristiano Ronaldo', sablon_soru: 'Sen Cristiano Ronaldo musun?' }, 
    { anahtar: 'isim:Mauro Icardi', sablon_soru: 'Sen Mauro İcardi misin?' }, 
    { anahtar: 'isim:Victor Osimhen', sablon_soru: 'Sen Victor Osimhen misin?' }, 
    { anahtar: 'isim:İlkay Gündoğan', sablon_soru: 'Sen İlkay Gündoğan mısın?' }, 


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
    { anahtar: 'durum:aktif', sablon_soru: 'Hala aktif futbol oynuyor musun?'}, // halen aktif olarak futbol oynuyor musun -> 0.86 aldım
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

    console.log("Model başarıyla yüklendi!");
    futbolcuIsimAlani.innerText = "Guess who I am";

    // Şablon Soruların Vektörlerini HESAPLA ve SAKLA
    console.log("Bilgi şablonlarının vektörleri hesaplanıyor...");
    let sablonCumleleri = bilgiSablonlari.map(s => s.sablon_soru);

    sablonCumleleri = sablonCumleleri.map(cumle => cumle.toLowerCase()); // toLowerCase() orijinal stringi değiştirmez, sadece yeni bir string döndürür.


    sablonVektorleri = await model.embed(sablonCumleleri); // hesaplanan vektörleri global değişkene atadık
    console.log("Şablon vektörleri hafızaya alındı.");


    while(chats.hasChildNodes()) {
      chats.removeChild(chats.firstChild);
    }



    div.innerText = "Hey! Benim kim olduğumu bulabilir misin?"; // bu soruyu model yüklendikten hemen sonra mı yazdıralım yoksa şablon vektörleri hesaplandıktan sonra mı?
    chats.appendChild(div);
    scrollToBottom();


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


function scrollToBottom() {
    chats.scrollTop = chats.scrollHeight; // scrollTop: Bir elementin dikey kaydırma çubuğunun en üstten ne kadar aşağıda olduğunu belirtir. bunu chat ekranın yüksekliğine eşitliyoruz.
                                          // dolayısıyla her mesajdan sonra çubuk en aşağıya gider.
}

async function soruyuAnalizEt(kullaniciSorusu) {

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
    scrollToBottom();

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
        div.innerText = `Tebrikler, doğru bildin! ben ${secilenFutbolcu.isim.toLowerCase()}! ${sorulanSoruSayisi} soruda bildin! 
        ismini ve skorunu liderlik tablosuna eklemek ister misin?`;
        
        futbolcuIsimAlani.innerText = `${secilenFutbolcu.isim}`;
        setTimeout(() => {
          liderlikTablosunaEkle();
        }, 0);
        sorulanSoruSayisi = 0;

        console.log("oyun bitti");
      } else {
        div.innerText = `Hayır, ben ${deger.toLowerCase()} değilim, tekrar denemelisin :)`;
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
    div.innerText = "Hey, beni tanımak için soru sorman gerekiyor!"; 
    div.setAttribute('class', 'footballer-chat');

    chats.appendChild(div);
    scrollToBottom();
  }




  if (sorulanSoruSayisi == 5 || sorulanSoruSayisi == 10 || sorulanSoruSayisi == 15 || sorulanSoruSayisi == 20) {
    let pesMesaji = document.createElement('div');
    let sonucMesaji = document.createElement('div');
    let kalanSure = document.createElement("div");


    pesMesaji.innerText = "Hey biraz zorlanıyor gibisin, Pes etmeye ne dersin :)";
    pesMesaji.setAttribute('class', 'footballer-chat');

    let devamButon = butonOlustur("devam", "DEVAM", "green", () => {
      
      setTimeout(() => {
        devamButon.remove(); // gayet güzel çalışıyor.
        pesButon.remove();

      }, 500)
      

    });


    let pesButon = butonOlustur("pes", "PES", "red", () => {

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


      sonucMesaji.innerText = `ben ${secilenFutbolcu.isim.toLowerCase()}! Daha çok pratik yapmalısın.!`;
      sonucMesaji.setAttribute('class', 'footballer-chat');
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


function liderlikTablosunaEkle() {
  
  let ekleButon  = butonOlustur("EKLE", "green", () => {
    // burada bir modal açıp liderlik tablosuna ekleyeceksin
  });

  let hayırButon = butonOlustur("HAYIR", "red", oyunBitir);
 // eklebutonuna tıklandığında modal gelmeli. modalda bir input olacak, inputtan gelen bilgi tabloya yazdırılmalı. ekledikten sonra ekran temizlenmeli

  chats.appendChild(ekleButon);
  chats.appendChild(hayırButon);
  scrollToBottom();

}




function oyunBitir() {

  while(chats.hasChildNodes()) {
    chats.removeChild(chats.firstChild);
  }

  oyunKur(); // kullanıcı doğru bildi, oyun bitti mesajlar silindi. yeni oyun tekrar başlayaccak, yeni bir futbolcu seçilecek. 

}



function butonOlustur(id, icerik, renk, onClickHandler) {
  let buton = document.createElement("button");

  buton.id = id;

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
