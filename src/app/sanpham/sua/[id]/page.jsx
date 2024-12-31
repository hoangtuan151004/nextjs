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
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/category");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Không thể lấy danh mục:", error);
      }
    };

    const getProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        const data = await res.json();
        setProduct(data);
        // Đặt giá trị ban đầu cho form
        setValue("name", data.name);
        setValue("price", data.price);
        setValue("description", data.description);
        setValue("quantity", data.quantity);
        setValue("category", data.category.categoryId);
      } catch (error) {
        console.error("Không thể lấy thông tin sản phẩm:", error);
      }
    };

    if (id) {
      getCategories();
      getProduct();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (data.img[0]) {
      formData.append("img", data.img[0]);
    }

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        body: formData,
      });
      const result = await res.json();
      if (!result.error) {
        router.push("/sanpham");
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Không thể cập nhật sản phẩm:", error);
    }
  };

  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">Sửa sản phẩm</li>
          <li className="breadcrumb-item"></li>
        </ul>
      </div>
      <div className="table-add">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo mới sản phẩm</h3>
            <div className="tile-body">
              <form
                className="row"
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="form-group col-md-3">
                  <label className="control-label">Tên sản phẩm</label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("name", {
                      required: "Tên sản phẩm là bắt buộc",
                    })}
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name.message}</div>
                  )}
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Ảnh sản phẩm</label>
                  {product?.img && (
                    <img
                      src={`http://localhost:3000/images/${product.img}`}
                      width="200px"
                      alt="Product Image"
                    />
                  )}
                  <input
                    type="file"
                    className="form-control"
                    {...register("img")}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Giá bán</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("price", {
                      required: "Giá là bắt buộc",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.price && (
                    <div className="text-danger">{errors.price.message}</div>
                  )}
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Số lượng</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("quantity", {
                      required: "Số lượng là bắt buộc",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.quantity && (
                    <div className="text-danger">{errors.quantity.message}</div>
                  )}
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Mô tả</label>
                  <textarea
                    className="form-control"
                    {...register("description", {
                      required: "Mô tả là bắt buộc",
                    })}
                  />
                  {errors.description && (
                    <div className="text-danger">
                      {errors.description.message}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Danh mục</label>
                  <select
                    className="form-control"
                    {...register("category", {
                      required: "Chọn một danh mục",
                    })}
                  >
                    {categories.map((category) => (
                      <option
                        key={category._id}
                        value={category._id}
                        selected={product?.category.categoryId === category._id} // Đảm bảo danh mục hiện tại được chọn
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <div className="text-danger">
                      {errors.categoryId.message}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-12"></div>
                <button type="submit" className="btn btn-add btn-sm">
                  Sửa sản phẩm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
