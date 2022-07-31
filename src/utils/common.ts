import { MenuDataItem } from '@umijs/route-utils';
import * as IconMap from '@ant-design/icons';
import React from 'react';
import { history } from 'umi';

export function HandleRemoteMenuIntoLocal(
  result: MenuDataItem[],
  defaultMenuData: MenuDataItem[],
  remoteMenus: any,
  childrenKey: string,
) {
  defaultMenuData?.forEach((item) => {
    const tmpItem: MenuDataItem = { ...item };
    if (tmpItem.key && remoteMenus[tmpItem.key]) {
      tmpItem.access = AccessAllow;
      tmpItem.unaccessible = false;
      if (remoteMenus[tmpItem.key].hideInMenu === false) {
        tmpItem.hideInMenu = false;
      }
    }
    if (tmpItem.icon !== undefined && tmpItem.icon.length > 0 && IconMap[tmpItem.icon]) {
      tmpItem.icon = React.createElement(IconMap[tmpItem.icon]);
    }
    result.push(tmpItem);
    if (item[childrenKey] !== undefined && item[childrenKey].length > 0) {
      tmpItem[childrenKey] = [];
      HandleRemoteMenuIntoLocal(tmpItem[childrenKey], item[childrenKey], remoteMenus, childrenKey);
    }
  });
  return result;
}

export function HandleMenusToMap(result: any, menus: MenuDataItem[], childrenKey: string) {
  menus.forEach((item) => {
    if (item.path !== undefined && item.path !== '') {
      result[item.path] = { access: item.access || AccessAllow };
      if (item[childrenKey] !== undefined && item[childrenKey].length > 0) {
        HandleMenusToMap(result, item[childrenKey], childrenKey);
      }
    }
  });
  return result;
}

export function IsLogin(initialState: any) {
  const token = localStorage.getItem(LocalStorageTokenKey) || initialState?.currentUser?.token;
  return token !== null && token !== undefined && token.length > 0;
}

export function Logout() {
  localStorage.removeItem(LocalStorageTokenKey);
  window.location.href = LoginPath;
}
