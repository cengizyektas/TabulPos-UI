export interface Discount {
    name: string;                        // İndirim adı
    amount: number;                      // İndirim tutarı
    discountType: number;                // İndirim türü (örneğin: yüzdelik, sabit)
    discountStartDate: string | null;     // İndirim başlangıç tarihi
    discountFinishDate: string | null;    // İndirim bitiş tarihi
    usageType: number;                   // Kullanım türü (örneğin: tek kullanım, çok kullanım)
    usedDiscount: number | null;         // Kullanılan indirim miktarı
    remainingDiscount: number | null;    // Kalan indirim miktarı
    userId: number;                      // Kullanıcı ID'si
    restaurantId: number;                // Restoran ID'si
    customerId: number | null;           // Müşteri ID'si
    id: number;                          // İndirim ID'si
    rowVersion: string;                  // Veritabanı satır sürümü
    guid: string;                        // GUID
    isActive: boolean;                   // İndirim aktif mi
    insertDate: string;                  // İndirim eklenme tarihi
    updateDate: string;                  // İndirim güncellenme tarihi
    insertUserId: number;                // İndirim ekleyen kullanıcı ID'si
    updateUserId: number;                // İndirim güncelleyen kullanıcı ID'si
    offsetMinute: number;                // Zaman dilimi farkı (dakika)
    objectState: number;                 // Nesne durumu (örneğin: aktif, silinmiş)
    isError: boolean;                    // Hata durumu
    errorMessage: string | null;         // Hata mesajı (varsa)
    errorTitle: string | null;           // Hata başlığı (varsa)
}



