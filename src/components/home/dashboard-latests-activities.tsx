import { Card, List, Space } from "antd";
import { Text } from "../text";
import { BarsOutlined } from "@ant-design/icons";
import UpcomingEventsSkeleton from "../skeleton/upcoming-events";
import { useList } from "@refinedev/core";
import {
  DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
  DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
} from "@/graphql/queries";
import dayjs from "dayjs";
import CustomAvatar from "../custom-avatar";

const DashboardLatestActivities = () => {
  const {
    data: audit,
    isLoading: isLoadingAudit,
    isError,
    error,
  } = useList({
    resource: "audits",
    pagination: { pageSize: 4 },
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    },
  });
  const dealsIds = audit?.data?.map((audit) => audit?.targetId);

  const { data: deals, isLoading: isLoadingDeals } = useList({
    resource: "deals",
    queryOptions: { enabled: !!dealsIds?.length },
    pagination: {
      mode: "off",
    },
    filters: [{ field: "id", operator: "in", value: dealsIds }],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
    },
  });

  if (isError) {
    console.log(error);
    return null;
  }

  const isLoading = isLoadingAudit || isLoadingDeals;

  return (
    <Card
      bordered={false}
      style={{ height: "100%", padding: "8px 16px" }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <BarsOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Latest Activities
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={audit?.data}
          renderItem={(item) => {
            const deal =
              deals?.data.find((deal) => deal.id === String(item.targetId)) ||
              undefined;
            return (
              <List.Item>
                <List.Item.Meta
                  title={dayjs(deal?.cretedAt).format("MMM DD YYYY - HH:mm")}
                  avatar={
                    <CustomAvatar
                      shape="square"
                      size={48}
                      src={deal?.company.avatarUrl}
                      name={deal?.company.name}
                    />
                  }
                  description={
                    <Space size={8}>
                      <Text strong>
                        {item.user?.name}
                      </Text>
                      <Text>
                        {item.action === 'CREATED' ? 'created' : 'moved'}
                      </Text>
                      <Text strong>
                        {deal?.title}
                      </Text>
                      <Text>
                        deal
                      </Text>
                      <Text>
                        {item.action === 'CREATED' ? 'in' : 'to'}
                      </Text>
                      <Text strong>
                        {deal?.stage?.title}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};

export default DashboardLatestActivities;
