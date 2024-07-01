import React, { useState } from "react";
import { Avatar, Button, Rate, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productsApi";
import { Product } from "../types";
import { FiEye } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  const handlePaginationChange = (
    page: number,
    pageSize: number | undefined
  ) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5); // Fallback to default page size if undefined
  };

  const columns: ColumnsType<Product> = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (thumbnail: string) => <Avatar src={thumbnail} />,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => <span>${price}</span>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (rating: number) => <Rate value={rating} allowHalf disabled />,
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            style={btn}
            onClick={() => navigate(`/admin/product/${record.id}`)}
          >
            <FiEye size={15} />
          </Button>
          <Button
            style={btn}
            onClick={() => navigate(`/admin/product/${record.id}/edit`)}
          >
            <FiEdit size={15} />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space size={20} direction="vertical" style={{ width: "100%" }}>
      <Typography.Title className="pageTitle">
        Product Inventory
      </Typography.Title>
      <Table<Product>
        loading={isLoading}
        columns={columns}
        dataSource={data?.products}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data?.total,
          onChange: handlePaginationChange,
        }}
        style={tableStyle}
      />
    </Space>
  );
};

// Styles
const tableStyle = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "0px",
  boxShadow: "0 2px 5px rgba(97, 97, 97, 0.15)",
  maxWidth: "100%",
  fontFamily: '"Poppins", sans-serif',
};

const btn = {
  backgroundColor: "rgba(0,115,255,0.1)",
  borderRadius: "5px",
  height: "30px",
  width: "30px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  padding: "0px",
};

export default ProductList;
