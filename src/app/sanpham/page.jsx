"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminSanPham() {
  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000", {
      cache: "no-store",
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      fetchProducts();
    }
  };

  return (
    <>
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#">Danh sách sản phẩm</a>
            </li>
          </ul>
          <div id="clock"></div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    <Link
                      className="btn btn-add btn-sm"
                      href="/sanpham/them"
                      title="Thêm"
                    >
                      <i className="fas fa-plus"></i>
                      Tạo mới sản phẩm
                    </Link>
                  </div>
                </div>

                <table
                  className="table table-hover table-bordered"
                  id="sampleTable"
                >
                  <thead>
                    <tr>
                      <th width="10">
                        <input type="checkbox" id="all" />
                      </th>
                      <th>STT</th>
                      <th>Tên sản phẩm</th>
                      <th>Ảnh</th>
                      <th>Số lượng</th>
                      <th>Giá tiền</th>
                      <th>Danh mục</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product, index) => (
                      <tr key={product._id}>
                        <td width="10">
                          <input type="checkbox" name="check1" value="1" />
                        </td>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>
                          <img
                            className="product-image"
                            src={`http://localhost:3000/images/${product.img}`}
                            width="100px"
                            alt={product.name}
                          />
                        </td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                        <td>{product.category.categoryName}</td>
                        <td className="sua">
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="icon-delete"
                          >
                            <i className="fa-solid fa-trash"></i>Xóa
                          </button>
                          <Link
                            href={`/sanpham/sua/${product._id}`}
                            className="icon-edit"
                          >
                            Sửa
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
