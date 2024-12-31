"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  // Xác định schema xác thực cho biểu mẫu sử dụng Yup.
  name: Yup.string().required("Tên sản phẩm là bắt buộc"),
  price: Yup.number()
    .positive("Giá phải là số dương")
    .required("Giá bán là bắt buộc"),
  description: Yup.string().required("Mô tả là bắt buộc"),
  quantity: Yup.number()
    .positive("Số lượng phải là số dương")
    .integer("Số lượng phải là số nguyên")
    .required("Số lượng là bắt buộc"),
  category: Yup.string().required("Danh mục là bắt buộc"),
  img: Yup.mixed().required("Ảnh sản phẩm là bắt buộc"),
});

export default function AddProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/category");
      const data = await res.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  const formik = useFormik({
    // Khởi tạo hook useFormik để quản lý trạng thái và xử lý xác thực biểu mẫu.
    initialValues: {
      name: "",
      price: "",
      description: "",
      quantity: "",
      category: "",
      img: null,
    },
    validationSchema, // Cung cấp schema xác thực từ Yup.
    onSubmit: async (values) => {
      // Hàm xử lý khi biểu mẫu được gửi.
      const data = new FormData();
      data.append("name", values.name);
      data.append("price", values.price);
      data.append("description", values.description);
      data.append("category", values.category);
      data.append("img", values.img);
      data.append("quantity", values.quantity);

      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.error) {
        // Kiểm tra nếu có lỗi từ phản hồi API.
        formik.setErrors({ general: result.error });
      } else {
        formik.setStatus({ message: result.message });
        router.push("/sanpham");
      }
    },
  });

  return (
    <>
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">Danh sách sản phẩm</li>
            <li className="breadcrumb-item">
              <a href="#">Thêm sản phẩm</a>
            </li>
          </ul>
        </div>
        <div className="table-add">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo mới sản phẩm</h3>
              <div className="tile-body">
                <form
                  className="row"
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="form-group col-md-3">
                    <label className="control-label">Tên sản phẩm</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={formik.values.name} // Liên kết giá trị của trường với state Formik.
                      onChange={formik.handleChange} // Xử lý thay đổi trường nhập liệu.
                      onBlur={formik.handleBlur} // Xử lý khi trường nhập liệu bị mất tiêu điểm.
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-3">
                    <label className="control-label">Ảnh sản phẩm</label>
                    <input
                      type="file"
                      name="img"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "img",
                          event.currentTarget.files[0] // Cập nhật giá trị của trường ảnh khi tệp được chọn.
                        )
                      }
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.img && formik.errors.img ? (
                      // Hiển thị lỗi nếu trường đã bị chạm và có lỗi.
                      <div className="text-danger">{formik.errors.img}</div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-3">
                    <label className="control-label">Giá bán</label>
                    <input
                      className="form-control"
                      type="text"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price ? (
                      // Hiển thị lỗi nếu trường đã bị chạm và có lỗi.
                      <div className="text-danger">{formik.errors.price}</div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-3">
                    <label className="control-label">Số lượng</label>
                    <input
                      className="form-control"
                      type="text"
                      name="quantity"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.quantity && formik.errors.quantity ? (
                      // Hiển thị lỗi nếu trường đã bị chạm và có lỗi.
                      <div className="text-danger">
                        {formik.errors.quantity}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-3">
                    <label className="control-label">Mô tả</label>
                    <input
                      className="form-control"
                      type="text"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div className="text-danger">
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-3">
                    <label className="control-label">Danh mục</label>
                    <select
                      className="form-control"
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Chọn danh mục</option>{" "}
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.category && formik.errors.category ? (
                      // Hiển thị lỗi nếu trường đã bị chạm và có lỗi.
                      <div className="text-danger">
                        {formik.errors.category}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-12"></div>
                  <button type="submit" className="btn btn-add btn-sm">
                    Thêm sản phẩm
                  </button>
                  {formik.status?.message && (
                    <div className="text-success">{formik.status.message}</div>
                  )}
                  {formik.errors.general && (
                    <div className="text-danger">{formik.errors.general}</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
