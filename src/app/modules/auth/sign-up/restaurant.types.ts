/**
 * Restaurant interface definitions
 */

export interface RegisterRestaurantRequest {
  İşletmeAdı: string;
  İsimSoyisim: string;
  güncelMailAdresiniz: string;
  cepTelefonu: string;
  şifre: string;
  şifreTekrar: string;
  kullanımSözleşmesini: boolean;
}

export interface RegisterRestaurantResponse {
  success: boolean;
  message: string;
  data?: any;
} 