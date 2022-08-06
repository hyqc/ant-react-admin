import { ResponseAdminMenuListItemType } from '@/services/apis/admin/menu';
import { Select } from 'antd';
import { useEffect, useState } from 'react';

export type AddModalPropsType = {
  data: ResponseAdminMenuListItemType[];
  needAll: boolean;
  value?: number;
  disabled?: boolean;
  onChange?: (parentid: number) => void;
};

const MenuTreeSelect: React.FC<AddModalPropsType> = (props) => {
  const { data, value, disabled, onChange } = props;
  const [menuId, setMenuId] = useState<number>(value || 0);
  const triggerChange = (id: number) => {
    onChange?.(id);
  };

  function onMenuIdChange(id: number) {
    setMenuId(id);
    triggerChange(id);
  }

  useEffect(() => {}, [data]);

  return (
    <Select
      showSearch
      style={{ offset: 0, width: 120 }}
      filterOption={(input, option) =>
        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
      }
      onChange={onMenuIdChange}
      disabled={disabled}
      value={value || menuId}
    >
      {
        <Select.Option key={0} value={0}>
          全部
        </Select.Option>
      }
      {data?.map((item: ResponseAdminMenuListItemType) => {
        return (
          <Select.Option key={item.menuId} value={item.menuId}>
            {item.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default MenuTreeSelect;
