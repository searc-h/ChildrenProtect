import React from "react";

// 角色管理-列表项
export interface RoleListItem {
    key: React.Key,
    Key: number, // 后端说不好返回小写
    Number: number,
    Id: string,
    Name: string,
    Phone: string,
    organization: string,
}

// 新增信息
export interface Role {
    name: string,
    phone: string,
    province: string,
    city: string,   // 市
    district: string,   // 区
    street: string,
}