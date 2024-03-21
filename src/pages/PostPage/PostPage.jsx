import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { SettingOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";
function PostPage() {
  return (
    <div>
      <Card
        style={{ width: 600 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
          }
          title="Card title"
          description="This is the description"
        />
      </Card>
    </div>
  );
}

export default PostPage;
