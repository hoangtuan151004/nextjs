"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDanhMuc() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchCategory = async () => {
    try {
      const res = await fetch("http://localhost:3000/category", {
        cache: "no-store",
      });
      const newData = await res.json();
      setData(newData);
    } catch (err) {
      setError("Không thể tải danh mục");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const deleteCategory = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      try {
        const res = await fetch(`http://localhost:3000/category/delete/${id}`, {
          method: "DELETE",
        });
        const result = await res.json();

        if (res.ok) {
          setMessage(result.message);
        } else {
          setError(result.message);
        }
        fetchCategory(); // Cập nhật danh sách sau khi xóa
      } catch (err) {
        setError("Đã xảy ra lỗi khi xóa danh mục");
        console.error(err);
      }
    }
  };

  return (
    <>
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#">
                <b>Danh sách danh mục</b>
              </a>
            </li>
          </ul>
          <div id="clock"></div>
        </div>
        <div className="table-add">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    <Link
                      className="btn btn-add btn-sm"
                      href="/danhmuc/them"
                      title="Thêm"
                    >
                      <i className="fas fa-plus"></i>
                      Tạo mới danh mục
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
                      <th>Stt</th>
                      <th>Tên danh mục</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((category, index) => (
                      <tr key={category._id}>
                        <td width="10">
                          <input type="checkbox" name="check1" value="1" />
                        </td>
                        <td>{index + 1}</td>
                        <td>{category.name}</td>
                        <td className="sua">
                          <button
                            onClick={() => deleteCategory(category._id)}
                            className="icon-delete"
                          >
                            <i className="fa-solid fa-trash"></i>Xóa
                          </button>
                          <Link
                            href={`/danhmuc/sua/${category._id}`}
                            className="icon-edit"
                          >
                            Sửa
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {message && (
                  <div className="alert alert-success">{message}</div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
