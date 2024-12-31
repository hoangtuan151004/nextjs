import Link from "next/link";

export default function AdminHeader() {
  return (
    <>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src={`http://localhost:3000/images/2.png`}
            alt="User Image"
          />
        </div>
        <ul className="app-menu">
          <li>
            <Link className="app-menu__item " href="/">
              <i className="app-menu__icon bx bx-tachometer"></i>
              <span className="app-menu__label">Bảng điều khiển</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" href="danhmuc">
              <i className="app-menu__icon bx bx-purchase-tag-alt"></i>
              <span className="app-menu__label">Quản lý danh mục</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" href="sanpham">
              <i className="app-menu__icon bx bx-purchase-tag-alt"></i>
              <span className="app-menu__label">Quản lý sản phẩm</span>
            </Link>
          </li>
          <li>
            <a className="app-menu__item" href="../index.html">
              <i className="app-menu__icon bx bx-purchase-tag-alt"></i>
              <span className="app-menu__label">Đăng xuất</span>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
