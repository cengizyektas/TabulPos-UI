// Birim Dil Bilgisi
class Locale { 
    localeId: string;
    value: string;
  }
  //Birimler
  export interface Unit {
    name: string;
    nameLocale: Locale[];//Birden fazla dil bilgisi  eklemek istersek
    isStockFollow: boolean;
    userId: number;
    restaurantId: number;
    customerId: any; // null olabilir
    id: number;
    rowVersion: string;
    guid: string;
    isActive: boolean;
    insertDate: string;
    updateDate: string;
    insertUserId: number;
    updateUserId: number;
    offsetMinute: number;
    objectState: number;
}

export interface Category {
    name: string;
    nameLocale: Locale[];
    sortNo: number;
    isShownOnKitchenPage: boolean;
    colorCode: string | null;
    isSalable: boolean;
    type: number;
    productTaxGroup: number;
    products: any[]; // Bu array içeriğine göre daha spesifik bir tip tanımlanabilir
    userId: number;
    restaurantId: number;
    customerId: any; // null olabilir
    id: number;
    rowVersion: string;
    guid: string;
    isActive: boolean;
    insertDate: string;
    updateDate: string;
    insertUserId: number;
    updateUserId: number;
}  
export interface  KitchenGroup {
    name: string;
    kitchenStatusList: number[];
    restaurants: any[]; // Daha spesifik bir tip tanımlanabilir
    userId: number;
    restaurantId: number;
    customerId: any; // null olabilir
    id: number;
    rowVersion: string;
    guid: string;
    isActive: boolean;
    insertDate: string;
    updateDate: string;
    insertUserId: number;
    updateUserId: number;
}
export interface  StockInventory {
    productId: number;       // Ürün ID'si
    productUnitId: number;   // Ürün birim ID'si (ör: "kg", "adet")
    kitchenGroupID: number;  // Mutfak grubu ID'si (hangi mutfakta stoklanıyor?)
    salesChannelId: number;  // Satış kanalı ID'si (online, fiziksel mağaza vb.)
    quantity: number;        // Mevcut stok miktarı
    warningQuantity: number | null; // Stok uyarı eşiği (null olabilir)
    userId: number;          // Kullanıcı ID'si (stok girişini yapan)
    restaurantId: number;    // Restoran ID'si
    customerId: any;         // Müşteri ID'si (genellikle null)
    id: number;              
    rowVersion: string | null;
    guid: string;            // Benzersiz ID (UUID formatında)
    isActive: boolean;       // Aktif/pasif durumu
    insertDate: string;      // Oluşturulma tarihi (ISO format)
    updateDate: string;      // Güncelleme tarihi (ISO format)
    insertUserId: number | null;
    updateUserId: number | null;
}
/**
 * Ürün veri modeli - Restoran/POS sistemlerindeki ürünlerin tam tanımını içerir
 */
class Product {
    // TEMEL BİLGİLER
    name: string; // Ürünün temel adı (ör: "Ayvalık Tostu")
    nameLocale: Locale[]; // Çoklu dil desteği için lokalize adlar
    code: string | null; // Ürün SKU/barkod numarası (stok takibi için)
    description: string | null; // Ürün açıklama metni
    descriptionLocale: Locale[]; // Açıklamanın çoklu dil desteği
    picturePath: string | null; // Ürün resminin dosya yolu/URL'i
  
    // KATEGORİ VE SINIFLANDIRMA
    categoryId: number; // Hangi kategoriye ait olduğu (ör: 495308 "Kahvaltılıklar")
    taxRate: number; // Uygulanan KDV oranı (ör: 10.00)
    kitchenGroupId: number; // Hangi mutfak grubunda hazırlandığı (ör: 78473 "Ana Mutfak")
    defaultProductUnitId:number;
  
    // ÜRÜN ÖZELLİKLERİ
    isFree: boolean; // Ücretsiz ürün mü?
    isStockFollow: boolean; // Stok takibi yapılıyor mu?
    hasWeight: boolean; // Ağırlık bazlı satılıyor mu? (kg/gr)
    isBeverage: boolean; // İçecek kategorisinde mi?
    productType: number; // 1: Normal ürün, 2: Menü, 3: Paket vb.
  
    // SATIŞ AYARLARI
    isProductSalable: boolean; // Satışa açık mı?
    isSalableOnB2b: boolean | null; // Kurumsal satışa açık mı?
    isTaxExcluded: boolean | null; // Fiyat KDV hariç mi?
  
    // FİYATLANDIRMA
    defaultProductUnit: Unit; // Varsayılan satış birimi
    productUnits: Unit[]; // Tüm satış birimleri (Tam/Yarım vb.)
  
    // STOK BİLGİLERİ
    stockInventory: StockInventory; // Anlık stok durumu
    stockInventories: any[]; // Geçmiş stok hareketleri
  
    // GÖRSEL AYARLAR
    colorCode: string | null; // Ürün kartı rengi (HEX kodu)
    sortNo: number; // Sıralama önceliği (düşük sayı önce gösterilir)
  
    // DİĞER TEKNİK ALANLAR
    id: number; // Veritabanı kayıt ID'si
    guid: string; // Global benzersiz ID
    isActive: boolean; // Aktif/pasif durumu
    rowVersion: string; // Optimistic concurrency için
  
  }
  
  /**
   * Ürün birim fiyat bilgileri (ör: "Tam" birim fiyatı)
   */
  class ProductUnitPrice {
    priceListId: number; // Fiyat listesi ID'si
    orderType: number; // 1: Restoran, 3: Paket, 5: Götürme
    price: number; // Gerçek fiyat değeri (ör: 17.50 TL)
  
    constructor(data: any) {
      this.priceListId = data.priceListId || 0;
      this.orderType = data.orderType || 1;
      this.price = data.price || 0;
    }
  }
  
  