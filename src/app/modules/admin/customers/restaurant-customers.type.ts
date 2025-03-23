export interface Customer { // Müşteri
    isDirty: boolean; // Kirli mi (değiştirildi mi?)
    name: string; // Ad
    surname: string; // Soyad
    email: string; // E-posta
    phone: string; // Telefon
    phone2: string; // İkinci Telefon
    credit: number; // Alacak
    debit: number; // Borç
    restaurantCustomerAddressId: number | null; // Restoran Müşteri Adres ID
    addressDescription: string | null; // Adres Açıklaması
    address: string | null; // Adres
    latitude: number; // Enlem
    longitude: number; // Boylam
    isCoordinateVerified: boolean; // Koordinatlar Doğrulandı mı?
    isAddressVerified: boolean; // Adres Doğrulandı mı?
    header: string | null; // Başlık
    town: string | null; // İlçe
    isDefault: boolean; // Varsayılan mı?
    note: string | null; // Not
    foodDeliveryId: number | null; // Yemek Teslimat ID
    foodDeliveryAddressId: number | null; // Yemek Teslimat Adres ID
    externalAppId: number | null; // Harici Uygulama ID
    taxNo: string | null; // Vergi Numarası
    addresses: any[]; // Adresler
    city: string | null; // Şehir
    branchName: string | null; // Şube Adı
    addressIsActive: boolean | null; // Adres Aktif mi?
    roleName: string | null; // Rol Adı
    type: string | null; // Tür
    district: string | null; // Semt
    transferredUserId: number | null; // Aktarılan Kullanıcı ID
    
    paramObject: {
        isDebitCustomer: boolean; // Borçlu Müşteri mi?
        openingBalance: number; // Açılış Bakiyesi
        isNewCustomer: boolean; // Yeni Müşteri mi?
        smsPermitted: boolean | null; // SMS İzni Var mı?
        emailPermitted: boolean | null; // E-posta İzni Var mı?
        pdpaPermitted: boolean | null; // KVKK İzni Var mı?
    };

    userId: number; // Kullanıcı ID
    restaurantId: number; // Restoran ID
    customerId: number | null; // Müşteri ID
    id: number; // ID
    rowVersion: string; // Satır Versiyonu
    guid: string; // Benzersiz Kimlik (GUID)
    isActive: boolean; // Aktif mi?
    insertDate: string; // Eklenme Tarihi
    updateDate: string; // Güncellenme Tarihi
    insertUserId: number; // Ekleyen Kullanıcı ID
    updateUserId: number; // Güncelleyen Kullanıcı ID
    offsetMinute: number; // Zaman Farkı (Dakika)
    objectState: number; // Nesne Durumu
    isError: boolean; // Hata Var mı?
    errorMessage: string | null; // Hata Mesajı
    errorTitle: string | null; // Hata Başlığı
}
