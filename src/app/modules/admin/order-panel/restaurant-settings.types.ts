interface Address {
    countryId: number;      // Ülke referans ID'si
    cityId: number;         // Şehir referans ID'si
    townId: number;         // İlçe referans ID'si
    districtId: number;     // Mahalle referans ID'si
    address: string;        // Tam adres açıklaması
    streetName: string;     // Sokak adı
    buildingNumber: string; // Bina numarası
    postalCode: string;     // Posta kodu
    restaurantId: number;   // İlişkili restoran referans ID'si
    restaurant: null;       // Restoran nesnesi (bu örnekte null)
    objectState: number;    // Nesne durumu (1 = aktif)
    id: number;             // Bu adres kaydı için benzersiz tanımlayıcı
    guid: string;           // Global benzersiz tanımlayıcı (UUID)
    isActive: boolean;      // Bu adres kaydının aktif olup olmadığını belirtir
    insertDate: string;     // Kaydın oluşturulduğu tarih ve saat
    updateDate: string;     // Kaydın son güncellendiği tarih ve saat
    insertUserId: number;   // Bu kaydı oluşturan kullanıcının ID'si
    updateUserId: number;   // Bu kaydı son güncelleyen kullanıcının ID'si
  }
  interface Country {
    name: string;           // Ülke adı
    code: string;           // Ülke kodu (ISO kodu)
    cities: any[];          // Ülkeye ait şehirler listesi (bu örnekte boş dizi)
    objectState: number;    // Nesne durumu (1 = aktif)
    id: number;             // Bu ülke kaydı için benzersiz tanımlayıcı
    guid: string;           // Global benzersiz tanımlayıcı (UUID)
    isActive: boolean;      // Bu kaydın aktif olup olmadığını belirtir
    insertDate: string;     // Kaydın oluşturulduğu tarih ve saat
    updateDate: string;     // Kaydın son güncellendiği tarih ve saat
    insertUserId: number;   // Bu kaydı oluşturan kullanıcının ID'si
    updateUserId: number;   // Bu kaydı son güncelleyen kullanıcının ID'si
    rowVersion: string;     // Eşzamanlılık kontrolü için sürüm takibi
    offsetMinute: number;   // Saat dilimi farkı (dakika cinsinden)
  }

  interface Currency {
    name: string;           // Para biriminin tam adı
    shortName: string;      // Para biriminin kısa kodu (ISO kodu)
    symbol: string;         // Para birimi sembolü
    exchangeRate: number;   // Döviz kuru
    isSelected: boolean;    // Seçili olup olmadığı
    userId: number;         // Kullanıcı referans ID'si
    restaurantId: number;   // Restoran referans ID'si
    customerId: null;       // Müşteri referans ID'si (bu örnekte null)
    id: number;             // Bu para birimi kaydı için benzersiz tanımlayıcı
    rowVersion: string;     // Eşzamanlılık kontrolü için sürüm takibi
    guid: string;           // Global benzersiz tanımlayıcı (UUID)
    isActive: boolean;      // Bu kaydın aktif olup olmadığını belirtir
    insertDate: string;     // Kaydın oluşturulduğu tarih ve saat
    updateDate: string;     // Kaydın son güncellendiği tarih ve saat
    insertUserId: number;   // Bu kaydı oluşturan kullanıcının ID'si
    updateUserId: number;   // Bu kaydı son güncelleyen kullanıcının ID'si
  }