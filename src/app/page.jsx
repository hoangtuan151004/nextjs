import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="app-content">
        <div className="row">
          <div className="col-md-12">
            <div className="app-title">
              <ul className="app-breadcrumb">
                <li className="breadcrumb-item">
                  <b>Bảng điều khiển</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="roww">
          <div className="col-md-6">
            <div className="widget-small">
              <i className="icon bx bxs-user-account fa-3x"></i>
              <div className="info">
                <h4>Tổng khách hàng</h4>
                <p>56 khách hàng</p>
                <p className="info-tong">Tổng số khách hàng được quản lý.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="widget-small">
              <i className="icon bx bxs-data fa-3x"></i>
              <div className="info">
                <h4>Tổng sản phẩm</h4>
                <p>1850 sản phẩm</p>
                <p className="info-tong">Tổng số sản phẩm được quản lý.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="widget-small">
              <i className="icon bx bxs-shopping-bags fa-3x"></i>
              <div className="info">
                <h4>Tổng đơn hàng</h4>
                <p>247 đơn hàng</p>
                <p className="info-tong">
                  Tổng số hóa đơn bán hàng trong tháng.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="widget-small">
              <i className="icon bx bxs-error-alt fa-3x"></i>
              <div className="info">
                <h4>Sắp hết hàng</h4>
                <p>4 sản phẩm</p>
                <p className="info-tong">
                  Số sản phẩm cảnh báo hết cần nhập thêm.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="title">Tình trạng đơn hàng</h3>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID đơn hàng</th>
                      <th>Tên khách hàng</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Khách hàng mới</h3>
              <div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên khách hàng</th>
                      <th>Ngày sinh</th>
                      <th>Số điện thoại</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
