"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Tên danh mục là bắt buộc"),
});

export default function AddCategory() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch("http://localhost:3000/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const result = await res.json();
        console.log("Response result:", result); // Kiểm tra phản hồi từ API

        if (result.error) {
          formik.setErrors({ general: result.error });
        } else {
          formik.setStatus({ message: "Danh mục đã được thêm thành công!" });
          router.push("/danhmuc");
        }
      } catch (error) {
        console.error("Lỗi khi thêm danh mục:", error);
        formik.setErrors({ general: "Có lỗi xảy ra khi thêm danh mục" });
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
              <h3 className="tile-title">Tạo mới Danh mục</h3>
              <div className="tile-body">
                <form className="row" onSubmit={formik.handleSubmit}>
                  <div className="form-group col-md-3">
                    <label className="control-label">Tên danh mục</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                  </div>

                  <div className="form-group col-md-12"></div>
                  <button type="submit" className="btn btn-add btn-sm">
                    Thêm danh mục
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
