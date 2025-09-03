const durumParagrafi = document.getElementById("durum");
let FUTBOLCU_LISTE = [];
let model; // başka fonksiyonlarda da erişebilmek için global olarak tanımlıyoruz.
let secilenFutbolcu;
let bilgiSablonlari;
let sablonVektorleri; // şablon soruların hesaplanmış vektörlerini burada tutacağız. böylece her fonksiyondan erişebileceğiz ve her seferiende hesaplamak zorunda kalmayacağız.



// Şablon Soruları ve Veri Anahtarlarını Oluşturma
// Bu yapı, hangi sorunun hangi veriyi kontrol edeceğini belirler.
bilgiSablonlari = [
    { anahtar: 'milliyet:Türkiye', sablon_soru: 'Bu oyuncu Türk mü?' },
    { anahtar: 'milliyet:Arjantin', sablon_soru: 'Bu oyuncu Arjantinli mi?' },
    { anahtar: 'milliyet:Portekiz', sablon_soru: 'Bu oyuncu Portekizli mi?' },
    { anahtar: 'takim:Fenerbahçe', sablon_soru: 'Bu oyuncu Fenerbahçede oynadı mı?' },
    { anahtar: 'takim:Real Madrid', sablon_soru: 'Bu oyuncu Real Madrid takımında oynadı mı?' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Bu oyuncu Barcelonada top koşturdu mu?' },
    { anahtar: 'takim:Barcelona', sablon_soru: 'Bu oyuncu Barcelonada forma giydi mi?' },
    { anahtar: 'takim:Manchester United', sablon_soru: 'Bu oyuncu Manchester United forması giydi mi?' },
    { anahtar: 'kupa:Şampiyonlar Ligi', sablon_soru: 'Bu oyuncu Şampiyonlar Ligi kazandı mı?' },
    { anahtar: 'kupa:La Liga', sablon_soru: 'Bu oyuncu İspanya La Liga kupasını kaldırdı mı?' },
    { anahtar: 'kupa:Premier Lig', sablon_soru: 'Bu oyuncu İngiltere Premier Ligi şampiyonu oldu mu?' },
    { anahtar: 'kupa:Avrupa Ligi', sablon_soru: 'Bu oyuncu Avrupa Ligi kazandı mı?' },
    { anahtar: 'durum:aktif', sablon_soru: 'Aktif bir futbolcu mu?'},
    { anahtar: 'durum:degil', sablon_soru: 'Aktif bir futbolcu mu?'},
    { anahtar: 'durum:aktif', sablon_soru: 'Hala oynuyor mu?'},
    { anahtar: 'durum:degil', sablon_soru: 'Hala oynuyor mu?'}

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









/*
Universal Sentence Encoder (USE) modeli, embed fonksiyonuna genellikle string türünde bir cümle veya bir dizi cümle (string array) bekler. 
Ancak, FUTBOLCU_LISTE muhtemelen bir JSON nesnesi veya nesne dizisi içeriyor. Bu nedenle, e.normalize hatası alıyorsunuz; çünkü normalize 
metodu yalnızca string türünde çalışır. bu sebeple "map" kullanıp bir string dizisi oluşturup son haliyle embed metoduna verdik.
*/