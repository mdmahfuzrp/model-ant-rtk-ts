import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Space,
  Avatar,
  Button,
  Rate,
  Card,
  Row,
  Col,
  Spin,
  Alert,
} from "antd";
import { useGetProductQuery } from "../redux/api/productsApi";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetProductQuery(Number(id));
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Spin style={{ height: "100%" }}>
        <Alert
          message="Wait to see your product details"
          description="You will find your single product details after this loading here."
          type="info"
          style={{
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        />
      </Spin>
    );
  }
  if (error) {
    return (
      <Alert
        message="We have some problem to load your data."
        description="Maybe this is a server issue, try again after sometime - We hope it will be fine after sometime."
        type="error"
      />
    );
  }

  return (
    <Card
      style={{
        padding: "24px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={7}>
          <Avatar
            src={data?.thumbnail}
            shape="square"
            style={{
              width: "100%",
              height: "auto",
              border: "2px solid #f0f0f0",
              padding: "4px",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col xs={24} md={16}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Typography.Title level={3} style={{ margin: "0" }}>
              {data?.title}
            </Typography.Title>
            <Typography.Text>{data?.description}</Typography.Text>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Rate disabled defaultValue={data?.rating} />
              <Typography.Text>{data?.rating}</Typography.Text>
            </div>
            <Row gutter={[16, 16]}>
              <Col>
                <Card
                  style={{
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    backgroundColor: "#fff",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <Typography.Text>
                    {" "}
                    <Typography.Text
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Price:
                    </Typography.Text>{" "}
                    ${data?.price}
                  </Typography.Text>
                </Card>
              </Col>
              <Col>
                <Card
                  style={{
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    backgroundColor: "#fff",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <Typography.Text>
                    {" "}
                    <Typography.Text
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Stock:
                    </Typography.Text>{" "}
                    {data?.stock}
                  </Typography.Text>
                </Card>
              </Col>
              <Col>
                <Card
                  style={{
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    backgroundColor: "#fff",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <Typography.Text>
                    {" "}
                    <Typography.Text
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Brand:
                    </Typography.Text>{" "}
                    {data?.brand}
                  </Typography.Text>
                </Card>
              </Col>
              <Col>
                <Card
                  style={{
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    backgroundColor: "#fff",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <Typography.Text>
                    <Typography.Text
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Category:
                    </Typography.Text>{" "}
                    {data?.category}
                  </Typography.Text>
                </Card>
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>

      <Typography.Title level={4} style={{ marginTop: "30px" }}>
        Reviews
      </Typography.Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {data?.reviews.map((review) => (
          <Card
            key={review?.reviewerName}
            style={{
              border: "1px solid #f0f0f0",
              width: "calc(33.3333% - 16px)",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography.Text style={{ display: "block" }} strong>
              {review.reviewerName}
            </Typography.Text>
            <Typography.Text>{review.comment}</Typography.Text>
            <Rate
              disabled
              defaultValue={review.rating}
              style={{ display: "block" }}
            />
          </Card>
        ))}
      </div>

      <Button
        onClick={() => navigate(`/admin/product/${id}/edit`)}
        type="primary"
        block
        style={{ marginTop: "16px" }}
      >
        Edit Product
      </Button>
    </Card>
  );
};

export default ProductDetail;
