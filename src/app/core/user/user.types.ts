export interface User {
    id: string | number;
    userName: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    isUserValidated: boolean;
    customerId: string | number | null;
    restaurantId: string | number | null;
    guid: string;
    lastLoginTime: string;
    lastLogoutTime: string | null;
    isUsingNewVersion: boolean;
    isCallerIdUser: boolean;
    createdAt: string;
    updatedAt: string;
    name?: string;
    avatar?: string;
    status?: string;
    userSetting?: UserSetting;
    userRoles?: UserRole[];
    userAreas?: UserArea[];
}

export interface UserSetting {
    id: number;
    userId: number;
    isSmsNotification: boolean;
    isEmailNotification: boolean;
    isWebNotification: boolean;
    hasSeenOrderOnboarding: boolean;
    isNotShowNewPriceMessage: boolean;
    hideNewPriceLastCallMessage: boolean;
    clickedNewVersionLink: boolean;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    previousEmail: string | null;
    previousPhone: string | null;
    isReadInformationMessages: boolean;
    isUserLoginBlocked: boolean;
    isCanUsePatronMobile: boolean;
    autoAssignToAllBranch: boolean;
    lastPasswordDate: string | null;
}

export interface UserRole {
    userId: number;
    roleId: number;
    permissionLevel: number;
    assignedAt: string;
    roleName: string;
    roleDescription: string;
}

export interface UserArea {
    userId: number;
    areaId: number;
    assignedAt: string;
    areaName: string;
    regionCode: string;
}
