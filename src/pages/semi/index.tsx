import React, { Component } from 'react';
import { Button, Toast } from '@douyinfe/semi-ui';

export default function SemiApp() {
    return (
        <Button onClick={() => Toast.warning({ content: 'welcome' })}>Hello Semi</Button>
    )
}