# Vue 技巧与库



## vue 自定义 v-permission 实现组件级权限控制

1. 在 `src` 目录下创建 `directives` 文件夹，用来存放自定义指令
2. 创建自定义指令文件 `src/directives/v-permission.ts`

```typescript
// v-permission.ts
import type {Method} from "axios";
import type {Directive} from "vue";
import hasAuth from "@/utils/hasAuth";

const vPermission: Directive = {
    mounted(el: HTMLElement, binding: { value: { permission: string, method: Method }[] }) {
        const operations = binding.value;
        if (!hasAuth(operations)) {
            el.parentNode && el.parentNode.removeChild(el)
        }
    }
}

export default vPermission;
```

3. 鉴权方法编写从 `stores` 中获取用户登录后的权限

```typescript
import type {Method} from "axios";
import useUserStore from "@/stores/modules/user";


export default (operations: { permission: string; method: Method }[]) => {
    if (operations && operations.length > 0) {
        const userStore = useUserStore();
        return operations.every(({permission, method}) => {
            if (permission in userStore.permissions) {
                return userStore.permissions[permission].includes(method);
            }
            return false;
        })
    }
    return true
}
```

3. 创建自定义指令注册文件 `src/directives/index.ts`

```typescript
import vPermission from "@/directives/v-permission";
import type {App} from "vue";

const directives = {permission: vPermission};

export const registerDirectives = (app: App) => {
    Object.keys(directives).forEach((key) => {
        app.directive(key, (directives as any)[key]);
    });
};
```

4. 现在可以在 Vue 模板文件中使用了

```vue
<button
    v-permission="[
    {
        permission: `${permission}-delete`,
            method: 'DELETE'
    }
    ]">
    删除
</button>
```

