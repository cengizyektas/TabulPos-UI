export interface Task {
    id?: string;
    content?: string;
    completed?: string;
}

export interface Kategori {
    id?: string;
    baslik?: string;
}

export interface Urun {
    urunId: number;
    firmaId: number;
    urunKodu: string;
    barkod?: string | null;
    urunAdi: string;
    aciklama?: string | null;
    kategoriId?: string | null;
    birimId: number;
    maliyet?: number | null;
    fiyat?: number | null;
    vergiOrani?: number | null;
    resim?: string | null;
    tarif?: string | null;
    hazirlanmaSuresi?: number | null;
    aktif?: boolean;
    stokTakibiYapiliyorMu?: boolean;
    minStokSeviyesi?: number | null;
    sira?: number;
    olusturulmaTarihi?: Date;
    guncellenmeTarihi?: Date;
    kategori?: Kategori;
  }
