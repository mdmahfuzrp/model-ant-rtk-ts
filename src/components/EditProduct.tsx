import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Space, message } from "antd";
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <Form
      initialValues={data}
      onFinish={onFinish}
      layout="vertical"
      style={formStyle}
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="price" label="Price">
        <Input type="number" />
      </Form.Item>
      <Form.Item name="stock" label="Stock">
        <Input type="number" />
      </Form.Item>
      <Form.Item name="brand" label="Brand">
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
};

const spaceStyle = {
  display: "flex",
  marginBottom: 8,
};

export default EditProduct;
