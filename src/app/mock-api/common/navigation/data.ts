/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Test',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
    {
        id: 'tanimlamalar',
        title: 'Tanımlamalar',
        type: 'collapsable',
        icon: 'mat_solid:assignment_turned_in',
        link: '/product-definition',
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
                icon: 'mat_outline:assignment_ind',
                link: '/restaurant-customers',
                exactMatch: true,
            },
            {
                id: 'tanimlamalar.complimentary ',
                title: 'Ödenmezler -İkramlar',
                type: 'basic',
                icon: 'mat_outline:badge',
                link: '/restaurant-complimentary',
                exactMatch: true,
            },
            {
                id: 'tanimlamalar.discounts ',
                title: 'İndirimler',
                type: 'basic',
                icon: 'mat_outline:trending_down',
                link: '/restaurant-discounts',
                exactMatch: true,
            },
            {
                id: 'tanimlamalar.product-properties',
                title: ' Özellikler',
                type: 'basic',
                icon: 'mat_outline:view_list',
                link: '/',
                exactMatch: true,
            },
        ],
    },
    {
        id: 'tanimlamalar',
        title: 'Kullanıcılar',
        type: 'collapsable',
        icon: 'mat_solid:people',
        link: '/product-definition',
        children: [
            {
                id: 'tanimlamalar.masalar.bolgeler',
                title: 'Kullanıcılar',
                type: 'basic',
                icon: 'mat_solid:people',
                link: '/users',
                exactMatch: true,
            },
            {
                id: 'tanimlamalar.menu-urunler',
                title: 'Yetkiler',
                type: 'basic',
                icon: 'mat_solid:verified_user',
                link: '',
                exactMatch: true,
            },
        ],
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
