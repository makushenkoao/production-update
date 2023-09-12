import { SVGProps, VFC } from 'react';

export interface SidebarItemTypes {
    path: string;
    text: string;
    icon: VFC<SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}
