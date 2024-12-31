<div className="m-3">
  <h2>Chỉnh sửa sản phẩm</h2>
  <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
    <div className="form-group my-2">
      <label className="form-label">Tên sản phẩm</label>
      <input
        type="text"
        className="form-control"
        {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
      />
      {errors.name && <div className="text-danger">{errors.name.message}</div>}
    </div>
    <div className="form-group my-2">
      <label className="form-label">Giá</label>
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
    <div className="form-group my-2">
      <label className="form-label">Mô tả</label>
      <textarea
        className="form-control"
        {...register("description", { required: "Mô tả là bắt buộc" })}
      />
      {errors.description && (
        <div className="text-danger">{errors.description.message}</div>
      )}
    </div>
    <div className="form-group my-2">
      <label className="form-label">Hình ảnh</label>
      <br />
      {product?.image && (
        <img
          src={`http://localhost:3000/img/${product.image}`}
          width="200px"
          alt="Product Image"
        />
      )}
      <input type="file" className="form-control" {...register("image")} />
    </div>
    <div className="form-group my-2">
      <label className="form-label">Danh mục</label>
      <select
        className="form-control"
        {...register("categoryId", { required: "Chọn một danh mục" })}
      >
        <option value="">Chọn danh mục</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.categoryId && (
        <div className="text-danger">{errors.categoryId.message}</div>
      )}
    </div>
    <button type="submit" className="btn btn-primary my-3">
      Cập nhật sản phẩm
    </button>
  </form>
</div>;
