/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'anasayfa',
        title: 'Ana Sayfa',
        type: 'basic',
        icon: 'mat_solid:home',
        link: '/dashboard',
    },
    {
        id: 'dijital-menu',
        title: 'Dijital Menu',
        type: 'basic',
        icon: 'mat_solid:menu_book',
        link: '/digital-menu',
        badge: {
            title: 'Yepyeni',
            classes: 'px-2 bg-red-600 text-white rounded-full'
        }
    },
    {
        id: 'tanimlamalar',
        title: 'Tanımlamalar',
        type: 'collapsable',
        icon: 'mat_solid:assignment_turned_in',
        children: [
            {
                id: 'tanimlamalar.masalar.bolgeler',
                title: 'Masa / Bölgeler',
                type: 'basic',
                icon: 'mat_solid:view_quilt',
                link: '/table-area-definition',
                exactMatch: true,
            },
            {
                id: 'tanimlamalar.menu-urunler',
                title: 'Menü / Ürünler',
                type: 'basic',
                icon: 'mat_solid:restaurant_menu',
                link: '/product-definition',
                exactMatch: true,
            },
            {
                id: 'tanimlamalar.customer',
                title: 'Müşteriler',
                type: 'basic',
                icon: 'mat_outline:people',
                link: '/restaurant-customers',
                exactMatch: true,
            },
            {
                id: 'tanimlamalar.complimentary',
                title: 'Ödenmezler',
                type: 'basic',
                icon: 'mat_outline:money_off',
                link: '/restaurant-complimentary',
                exactMatch: true,
            },
            {
                id: 'tanimlamalar.discounts',
                title: 'İndirimler',
                type: 'basic',
                icon: 'mat_outline:local_offer',
                link: '/restaurant-discounts',
                exactMatch: true,
            },
            {
                id: 'tanimlamalar.product-properties',
                title: 'Özellikler',
                type: 'basic',
                icon: 'mat_outline:list_alt',
                link: '/product-properties',
                exactMatch: true,
            },
            {
                id: 'tanimlamalar.waiter',
                title: 'Kuver/Garsoniye',
                type: 'basic',
                icon: 'mat_outline:person',
                link: '/waiter-settings',
                exactMatch: true,
            },
        ],
    },
    {
        id: 'siparis',
        title: 'Sipariş',
        type: 'basic',
        icon: 'mat_outline:shopping_basket',
        link: '/order-panel',
    },
    {
        id: 'kitchen-detail',
        title: 'Mutfak',
        type: 'basic',
        icon: 'mat_solid:kitchen',
        link: '/kitchen-detail',
    },
    {
        id: 'islemler',
        title: 'İşlemler',
        type: 'collapsable',
        icon: 'mat_outline:article',
        children: [],
    },
    {
        id: 'raporlar',
        title: 'Raporlar',
        type: 'collapsable',
        icon: 'mat_outline:assessment',
        children: [],
    },
    {
        id: 'kullanicilar',
        title: 'Kullanıcılar',
        type: 'collapsable',
        icon: 'mat_solid:people',
        children: [
            {
                id: 'kullanicilar.list',
                title: 'Kullanıcılar',
                type: 'basic',
                icon: 'mat_solid:people',
                link: '/users-list',
                exactMatch: true,
            },
            {
                id: 'kullanicilar.permissions',
                title: 'Yetkiler',
                type: 'basic',
                icon: 'mat_solid:verified_user',
                link: '/app-permission',
                exactMatch: true,
            },
        ],
    },
    {
        id: 'ayarlar',
        title: 'Ayarlar',
        type: 'collapsable',
        icon: 'mat_solid:settings',
        children: [
            {
                id: 'customer-display-settings',
                title: 'Müşteri Bilgi Ekranı',
                type: 'basic',
                icon: 'mat_solid:wysiwyg',
                link: '/customer-display-settings',
                exactMatch: true,
            },
            {
                id: 'printer-settings',
                title: 'Yazıcı Ayarları',
                type: 'basic',
                icon: 'mat_solid:print',
                link: '/printer-settings',
                exactMatch: true,
            },
            {
                id: 'company-settings',
                title: 'Restaurant Ayarları',
                type: 'basic',
                icon: 'mat_solid:restaurant',
                link: '/company-settings',
                exactMatch: true,
            },
        ],
    },
    {
        id: 'entegrasyonlar',
        title: 'Entegrasyonlar',
        type: 'basic',
        icon: 'mat_outline:integration_instructions',
        link: '/integrations',
    },
    {
        id: 'cikis',
        title: 'Çıkış Yap',
        type: 'basic',
        icon: 'mat_outline:logout',
        link: '/sign-out',
    },
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
