import { InputNumber } from 'antd';
import React, { useCallback, useState } from 'react';
import { Theme, ThemeConfig } from '../../types';

export default function ({ theme, themeItem }: { theme: Theme, themeItem: ThemeConfig }) {
    const { id, items } = themeItem;
    const [val, setVal] = useState(theme.get(id) || '2px');
    const onChange = (value: any) => {
        const val = parseInt(value) + 'px;'
        setVal(val);
        theme.set(id, val);
    };

    return (
        <InputNumber
            value={parseInt(val)}
            onChange={onChange}
        />
    );
}