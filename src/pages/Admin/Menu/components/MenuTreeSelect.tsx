import { ResponseAdminMenuListItemType } from '@/services/apis/admin/menu';
import { Select } from 'antd';
import { useState } from 'react';

export function menuTreeItemMake(item: ResponseAdminMenuListItemType, level: number) {
  const data = {
    ...item,
    level: level,
    hasChildren: item.children !== undefined && item.children.length > 0,
  };
  data.children = [];
  return data;
}

export function menuTreeMake(
  result: ResponseAdminMenuListItemType[],
  data: ResponseAdminMenuListItemType[],
  level: number,
  menuId?: number,
) {
  data.map((item: ResponseAdminMenuListItemType) => {
    if (menuId !== undefined && item.menuId === menuId) {
      return;
    }
    result.push(menuTreeItemMake(item, level));
    if (item.children !== undefined && item.children.length > 0) {
      menuTreeMake(result, item.children, level + 1, menuId);
    }
  });
  return result;
}

export function menuTreeData(data: ResponseAdminMenuListItemType[], menuId?: number) {
  const result: ResponseAdminMenuListItemType[] = [];
  return menuTreeMake(result, data, 0, menuId);
}

export type AddModalPropsType = {
  data: ResponseAdminMenuListItemType[];
  value?: number;
  disabled?: boolean;
  onChange?: (parentid: number) => void;
};

const MenuTreeSelect: React.FC<AddModalPropsType> = (props) => {
  const { data, value, disabled, onChange } = props;
  const [menuId, setMenuId] = useState<number>(value || 0);
  const triggerChange = (parentid: number) => {
    onChange?.(parentid);
  };

  function onMenuIdChange(parentid: number) {
    setMenuId(parentid);
    triggerChange(parentid);
  }

  function makeSelectOptionStyle(level: number, hasChildren: boolean) {
    const styleCss = { paddingLeft: `${level + 1}rem` };
    if (hasChildren) {
      styleCss['borderTop'] = '1px solid #F0F0F0';
    }
    return styleCss;
  }

  return (
    <Select
      value={value || menuId}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
      }
      onChange={onMenuIdChange}
      disabled={disabled}
    >
      {data?.map((item: ResponseAdminMenuListItemType) => (
        <Select.Option
          key={item.menuId}
          value={item.menuId}
          style={makeSelectOptionStyle(item.level || 0, item.hasChildren)}
        >
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default MenuTreeSelect;
