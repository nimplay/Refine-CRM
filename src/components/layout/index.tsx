import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import MainHeader from './header'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={MainHeader}
      Title={(titleProps) => <ThemedTitleV2 {...titleProps} text="Refine" />}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;
