import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Space, message, Spin, Alert } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useGetCategoriesQuery,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../redux/api/productsApi";
import { ProductFormValues, Review } from "../types";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductQuery(Number(id));
  const { data: categories } = useGetCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ProductFormValues) => {
    setLoading(true);
    try {
      const updatedProduct: Partial<ProductFormValues> = {
        ...values,
        reviews: values.reviews.map((review: Review) => ({
          reviewerName: review.reviewerName,
          rating: review.rating,
          comment: review.comment,
        })),
      };

      await updateProduct({ id: Number(id), data: updatedProduct }).unwrap();
      message.success("Product updated successfully");
      navigate(`/admin/product/${id}`);
    } catch (error) {
      console.error("Failed to update product", error);
      message.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

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
    <Form
      initialValues={data}
      onFinish={onFinish}
      layout="vertical"
      style={formStyle}
    >
      <Form.Item style={itemStyle} name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item style={itemStyle} name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item style={itemStyle} name="price" label="Price">
        <Input type="number" />
      </Form.Item>
      <Form.Item style={itemStyle} name="stock" label="Stock">
        <Input type="number" />
      </Form.Item>
      <Form.Item style={itemStyle} name="brand" label="Brand">
        <Input />
      </Form.Item>
      <Form.Item name="category" label="Category">
        <Select>
          {categories?.map((category) => (
            <Select.Option key={category.slug} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.List name="reviews">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={spaceStyle} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, "reviewerName"]}
                  rules={[{ required: true, message: "Missing user" }]}
                >
                  <Input placeholder="Reviewer Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "comment"]}
                  rules={[{ required: true, message: "Missing comment" }]}
                >
                  <Input placeholder="Comment" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "rating"]}
                  rules={[{ required: true, message: "Missing rating" }]}
                >
                  <Input placeholder="Rating" type="number" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Review
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update Product
        </Button>
      </Form.Item>
    </Form>
  );
};

// Styles
const formStyle = {
  padding: "24px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  fontFamily: '"Poppins", sans-serif',
};

const spaceStyle = {
  display: "flex",
  marginBottom: "0px",
};

const itemStyle = {
  marginBottom: "10px",
};

export default EditProduct;
