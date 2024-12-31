"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function EditProduct({ params }) {
  const router = useRouter();
  const id = params.id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/category/${id}`);
        const data = await res.json();
        setProduct(data);
        // Đặt giá trị ban đầu cho form
        setValue("name", data.name);
      } catch (error) {
        console.error("Không thể lấy thông tin danh mục:", error);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`http://localhost:3000/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.error) {
        router.push("/danhmuc");
      } else {
        console.error("Lỗi từ server:", result.error);
      }
    } catch (error) {
      console.error("Không thể cập nhật danh mục:", error);
    }
  };

  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">Sửa danh mục</li>
          <li className="breadcrumb-item"></li>
        </ul>
      </div>
      <div className="table-add">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo mới danh mục</h3>
            <div className="tile-body">
              <form
                className="row"
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="form-group col-md-3">
                  <label className="control-label">Tên danh mục</label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("name", {
                      required: "Tên danh mục là bắt buộc",
                    })}
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name.message}</div>
                  )}
                </div>

                <div className="form-group col-md-12"></div>
                <button type="submit" className="btn btn-add btn-sm">
                  Sửa danh mục
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
