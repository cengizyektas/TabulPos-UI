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
        id: 'divider-1',
        type: 'divider',
        classes: {
            wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
        }
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
        id: 'divider-2',
        type: 'divider',
        classes: {
            wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
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
                id: 'tanimlamalar.divider-1',
                type: 'divider',
                classes: {
                    wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
                }
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
                id: 'tanimlamalar.divider-2',
                type: 'divider',
                classes: {
                    wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
                }
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
                id: 'tanimlamalar.divider-3',
                type: 'divider',
                classes: {
                    wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
                }
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
                id: 'tanimlamalar.divider-4',
                type: 'divider',
                classes: {
                    wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
                }
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
                id: 'tanimlamalar.divider-5',
                type: 'divider',
                classes: {
                    wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
                }
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
                id: 'tanimlamalar.divider-6',
                type: 'divider',
                classes: {
                    wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
                }
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
        id: 'divider-3',
        type: 'divider',
        classes: {
            wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
        }
    },
    {
        id: 'siparis',
        title: 'Sipariş',
        type: 'basic',
        icon: 'mat_outline:shopping_basket',
        link: '/order-panel',
    },
    {
        id: 'divider-4',
        type: 'divider',
        classes: {
            wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
        }
    },
    {
        id: 'kitchen-detail',
        title: 'Mutfak',
        type: 'basic',
        icon: 'mat_solid:kitchen',
        link: '/kitchen-detail',
    },
    {
        id: 'divider-5',
        type: 'divider',
        classes: {
            wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
        }
    },
    {
        id: 'islemler',
        title: 'İşlemler',
        type: 'collapsable',
        icon: 'mat_outline:article',
        children: [],
    },
    {
        id: 'divider-6',
        type: 'divider',
        classes: {
            wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
        }
    },
    {
        id: 'raporlar',
        title: 'Raporlar',
        type: 'collapsable',
        icon: 'mat_outline:assessment',
        children: [],
    },
    {
        id: 'divider-7',
        type: 'divider',
        classes: {
            wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
        }
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
                id: 'kullanicilar.divider-1',
                type: 'divider',
                classes: {
                    wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
                }
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
        id: 'divider-8',
        type: 'divider',
        classes: {
            wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
        }
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
                id: 'ayarlar.divider-1',
                type: 'divider',
                classes: {
                    wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
                }
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
                id: 'ayarlar.divider-2',
                type: 'divider',
                classes: {
                    wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
                }
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
        id: 'divider-9',
        type: 'divider',
        classes: {
            wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
        }
    },
    {
        id: 'entegrasyonlar',
        title: 'Entegrasyonlar',
        type: 'basic',
        icon: 'mat_outline:integration_instructions',
        link: '/integrations',
    },
    {
        id: 'divider-10',
        type: 'divider',
        classes: {
            wrapper: 'my-0 border-t border-gray-300 dark:border-gray-700 opacity-50'
        }
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
