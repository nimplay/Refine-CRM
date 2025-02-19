import { Layout, Space } from "antd";
import CurrentUser from "./current-user";

const MainHeader = () => {
  const headerStyles:React.CSSProperties = {
    background: 'rgba(145, 158, 165, 1)',
    display:'flex',
    justifyContent: 'flex-end',
    alignItems:'center',
    padding: '0 24px',
    position: 'sticky',
    top:0,
    zIndex: 999
  }
  return (
    <Layout.Header style={headerStyles}>
      <Space align="center" size='middle'>
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default MainHeader;
