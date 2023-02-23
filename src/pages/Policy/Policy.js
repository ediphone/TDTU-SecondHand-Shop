import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import styles from './Policy.module.scss';
// import { useState, useEffect } from 'react';

// import { getMethod } from '~/utils/fetchData';
import avatar from '~/assets/images/avatar_post.jpg';

const cx = classNames.bind(styles);

function Policy() {
    return (
        <>
            <div className={cx('container')}>
                <label htmlFor="navbar__mobile-header" className={cx('navigation__mobile')}>
                    <FontAwesomeIcon className={cx('header__item-icon', 'header__item-mobile')} icon={faBars} />
                </label>
                <h3 className={cx('container__title')}>Policy</h3>
                <div className={cx('container__wrapper')}>
                    <div className={cx('container__wrapper-heading')}>
                        Hàng hóa và dịch vụ bị cấm theo pháp luật Việt Nam
                    </div>
                    <ul className={cx('container__list')}>
                        <li className={cx('container__item')}>
                            <b>Hàng hóa bất hợp pháp: </b>Các hàng hóa bị cấm buôn bán theo luật pháp Việt Nam, bao gồm:
                            <ul className={cx('container__list-sub')}>
                                <li>Ma túy.</li>
                                <li>Hàng hóa có chứa hình ảnh liên quan đến cần sa, hoa anh túc.</li>
                                <li>
                                    Vũ khí và các sản phẩm thuộc lĩnh vực quân sự, an ninh quốc phòng khác, bao gồm
                                    nhưng không giới hạn bởi quân trang, quân hiệu, phù hiệu, thiết bị quân sự, cấp
                                    hiệu.
                                </li>
                                <li>Bộ phận cơ thể người.</li>
                                <li>Thực vật, Động vật nguy cấp, quý hiếm.</li>
                            </ul>
                        </li>
                        <li className={cx('container__item')}>
                            <b>Hàng giả, hàng nhập lậu, hàng vi phạm bản quyền: </b>Tất cả các sản phẩm sau đây khi đăng
                            tin trên TDTU SecondHand Shop phải được chứng thực là hàng chính hãng:
                            <ul className={cx('container__list-sub')}>
                                <li>Sản phẩm có thương hiệu.</li>
                                <li>CD/VCD/DVD.</li>
                                <li>Chương trình máy vi tính/ máy chơi trò chơi.</li>
                            </ul>
                        </li>
                        <li className={cx('container__item')}>
                            <b>
                                Danh mục sản phẩm, hàng hóa chuyên ngành công nghệ thông tin và truyền thông không có
                                chứng nhận hợp quy và công bố hợp quy theo quy định pháp luật.
                            </b>
                            Vui lòng tham khảo Danh sách các thiết bị vô tuyến điện không có chứng nhận hợp quy, cấm sử
                            dụng tại Việt Nam (như các thiết bị âm thanh không dây, micro không dây, loa kéo không dây…)
                            theo đường link: www.rfd.gov.vn/tin-tuc/pages/thong-bao.aspx?ItemID=2126 của Cục Tần số Vô
                            tuyến Điện – Bộ Thông tin & Truyền thông.
                        </li>
                    </ul>

                    <div className={cx('container__wrapper-heading')}>
                        Hàng hóa và dịch vụ bị cấm theo quy định của TDTU SECONDHAND SHOP
                    </div>
                    <ul className={cx('container__list')}>
                        <li className={cx('container__item')}>
                            <b>Các sản phẩm trong ngành y tế:</b>
                            <ul className={cx('container__list-sub')}>
                                <li>Các sản phẩm y tế, bao gồm cả máy móc y tế.</li>
                                <li>Thuốc và thuốc bổ cho người lớn/ trẻ em và vật nuôi.</li>
                                <li>Dược phẩm, thảo dược (Ngoại trừ tinh dầu).</li>
                                <li>Y học cổ truyền Ấn Độ.</li>
                                <li>Thuốc theo đơn.</li>
                            </ul>
                        </li>
                        <li className={cx('container__item')}>
                            <b>Các mặt hàng dễ gây dị ứng, có thể ảnh hưởng đến sức khoẻ của người dùng:</b>
                            <ul className={cx('container__list-sub')}>
                                <li>Quần áo lót đã qua sử dụng.</li>
                                <li>Kính áp tròng, kính cận.</li>
                                <li>
                                    Bình sữa, núm vú bình sữa (Ngoại trừ sản phẩm cho mẹ và bé chưa sử dụng: miếng thấm
                                    hút sữa, túi trữ sữa,… hoặc sản phẩm cho bé yêu cầu có tên thương hiệu: máy hâm sữa,
                                    máy vắt sữa …)
                                </li>
                                <li>
                                    Sữa dùng cho trẻ em dưới 24 tháng tuổi, sản phẩm dinh dưỡng dành cho trẻ dưới 6
                                    tháng tuổi (Ngoại Trừ Sữa chưa sử dụng, dạng lỏng như sữa hộp, sữa tươi).
                                </li>
                                <li>Bia, cồn, rượu, thuốc lá, các chất kích thích, gây nghiện khác.</li>
                                <li>
                                    Mỹ phẩm dạng uống, tiêm (Ngoại trừ Mỹ Phẩm chưa sử dụng dạng dùng ngoài da, có tác
                                    dụng làm sạch, làm thơm, dưỡng, trang điểm)
                                </li>
                            </ul>
                        </li>
                        <li className={cx('container__item')}>
                            <b>Các sản phẩm có nội dung người lớn:</b>
                            Đồ chơi tình dục, sản phẩm khiêu dâm.
                        </li>
                        <li className={cx('container__item')}>
                            <b>Sản phẩm được bảo vệ bởi luật sở hữu trí tuệ:</b>
                            <ul className={cx('container__list-sub')}>
                                <li>Bản ghi Radio, bản thu TV và bản thu từ Internet.</li>
                                <li>Sách điện tử</li>
                                <li>Địa chỉ email.</li>
                            </ul>
                        </li>
                        <li className={cx('container__item')}>
                            <b>Các tin đăng không nhằm mục đích mua bán hàng hoá, dịch vụ:</b>
                            <ul className={cx('container__list-sub')}>
                                <li>Sự kiện hội họp.</li>
                                <li>Các tài liệu tuyên truyền.</li>
                                <li>Thư/ Lời chúc mừng/ Thông báo.</li>
                            </ul>
                        </li>
                        <li className={cx('container__item')}>
                            <b>Các sản phẩm mê tín:</b> Bùa hộ mạng hoặc miêu tả mê tín (đuổi tà, đuổi quỷ …) và tất cả
                            các vật thần bí.
                        </li>
                        <li className={cx('container__item')}>
                            <b>Các sản phẩm phục vụ cho mục đích cờ bạc</b> (bao gồm cả máy đánh bài).
                        </li>
                        <li className={cx('container__item')}>
                            <b>Các sản phẩm thuộc về di tích lịch sử.</b>
                        </li>
                        <li className={cx('container__item')}>
                            <b>Hoá chất: </b>bao gồm nhưng không giới hạn bởi a-xít, chất hoá học nông nghiệp, chất
                            phóng xạ, sản phẩm hoá học diệt côn trùng.
                        </li>
                        <li className={cx('container__item')}>
                            <b>Các sản phẩm có chứa a-mi-ăng.</b>
                        </li>
                        <li className={cx('container__item')}>
                            <b>Các mặt hàng khác:</b>
                            <ul className={cx('container__list-sub')}>
                                <li>Số điện thoại di động và thẻ Sim.</li>
                                <li>
                                    Bình hút shisa, cần sa, hoa anh túc (bao gồm sản phẩm có hình cần sa và hoa anh
                                    túc).
                                </li>
                                <li>Vàng thỏi, vàng miếng (Ngoại trừ Vàng trang sức).</li>
                                <li>
                                    Các sản phẩm liên quan đến “Bản đồ” bao gồm sản phẩm bản đồ (bản đồ thế giới, bản đồ
                                    địa phương, …), quả địa cầu, đồ chơi liên quan đến bản đồ, sản phẩm có hình ảnh hoặc
                                    miêu tả về bản đồ (đặc biệt là về “đường lưỡi bò”).
                                </li>
                                <li>
                                    Bánh trung thu không có nguồn gốc rõ ràng, kém chất lượng và không đáp ứng điều kiện
                                    về an toàn thực phẩm.
                                </li>
                                <li>
                                    Sản phẩm rau/củ/quả chuẩn VietGAP nhưng không cung cấp giấy chứng nhận đạt tiêu
                                    chuẩn VietGAP.
                                </li>
                            </ul>
                        </li>
                        <li className={cx('container__item')}>
                            <b>Mặt hàng đã hết hạn sử dụng tại thời điểm đăng tin.</b>
                        </li>
                    </ul>
                    <hr></hr>
                    <div className={cx('container__wrapper-heading', 'mt-32')}>Giá bán sản phẩm:</div>
                    <div className={cx('container__grid')}>
                        <div className={cx('container__grid-item')}>
                            <div className={cx('container__wrapper-heading', 'uppercase')}>Cho phép</div>
                            <ul className={cx('container__list')}>
                                <li>
                                    Theo Pháp lệnh Ngoại hối của Nhà nước, mọi Tin đăng trên website Chợ Tốt chỉ được
                                    niêm yết giá tiền đồng Việt
                                </li>
                            </ul>
                        </div>
                        <div className={cx('container__grid-item')}>
                            <div className={cx('container__wrapper-heading', 'uppercase')}>Không cho phép</div>
                            <ul className={cx('container__list')}>
                                <li>Giá ngoại tệ</li>
                                <li>
                                    Giá bán trong ô giá không điền đầy đủ theo giá tiền VNĐ. Ví dụ: “100 triệu VNĐ” cần
                                    điền đầy đủ là “100.000.000”, không ghi “100.000”
                                </li>
                                <li>Giá bán không hợp lý với thị trường</li>
                            </ul>
                        </div>
                    </div>

                    <div className={cx('container__wrapper-heading', 'mt-32')}>Tiêu đề tin đăng:</div>
                    <div className={cx('container__grid')}>
                        <div className={cx('container__grid-item')}>
                            <div className={cx('container__wrapper-heading', 'uppercase')}>Cho phép</div>
                            <ul className={cx('container__list')}>
                                <li>
                                    Tựa đề tin cần thể hiện rõ sản phẩm cần bán và phải phân biệt được với các tin đã và
                                    đang bán
                                </li>
                                <li>Tựa đề tốt bao gồm: model sản phẩm + màu sắc + tình trạng</li>
                                <li>
                                    Ví dụ: Tranh sơn mài khảm trai Lã Vọng; đàn guitar acoustic đệm hát KP10 màu xanh
                                </li>
                            </ul>
                        </div>
                        <div className={cx('container__grid-item')}>
                            <div className={cx('container__wrapper-heading', 'uppercase')}>Không cho phép</div>
                            <ul className={cx('container__list')}>
                                <li>Giá, website, tên hoặc thông tin liên lạc của Người bán</li>
                                <li>
                                    Các từ ngữ miêu tả nhằm thu hút sự chú ý của Người mua như: siêu rẻ, siêu hot, hot
                                </li>
                                <li>
                                    Theo điều 8 mục 11 của Luật Quảng cáo, không được sử dụng các từ ngữ “nhất”, “duy
                                    nhất”, “tốt nhất”, “số một” hoặc từ ngữ có ý nghĩa tương tự trong nội dung Tin đăng
                                    (nếu sử dụng phải có tài liệu chứng minh)
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={cx('container__wrapper-heading', 'mt-32')}>Nội dung tin đăng:</div>
                    <div className={cx('container__grid')}>
                        <div className={cx('container__grid-item')}>
                            <div className={cx('container__wrapper-heading', 'uppercase')}>Cho phép</div>
                            <ul className={cx('container__list')}>
                                <li>
                                    Cần cung cấp một số đặc điểm nhận diện sản phẩm: tên máy, thương hiệu, model, xuất
                                    xứ (mua tại đâu, hàng Việt Nam hay hàng nhập, nếu nhập thì từ nước nào?)
                                </li>
                                <li>
                                    Miêu tả thêm về các đặc điểm đã sử dụng: sử dụng được bao lâu, máy có zin hay thay
                                    thế gì không, có hư hỏng, trầy xước gì không, sản phẩm còn bảo hành không, có phụ
                                    kiện gì kèm theo không, v.v
                                </li>
                                <li>
                                    Các thông tin khác: giá bán (đồng ý thương lượng không?), lý do bán sản phẩm, có cam
                                    kết gì sau bán không (chế độ bảo hành, đổi trả, v.v), v.v
                                </li>
                            </ul>
                        </div>
                        <div className={cx('container__grid-item')}>
                            <div className={cx('container__wrapper-heading', 'uppercase')}>Không cho phép</div>
                            <ul className={cx('container__list')}>
                                <li>
                                    Theo điều 8 mục 11 của Luật Quảng cáo, không được sử dụng các từ ngữ “nhất”, “duy
                                    nhất”, “tốt nhất”, “số một” hoặc từ ngữ có ý nghĩa tương tự trong nội dung tin đăng
                                    (nếu sử dụng phải có tài liệu chứng minh)
                                </li>
                                <li>Tin rao không nhằm mục đích mua bán</li>
                                <li>
                                    Số điện thoại, các đường dẫn kết nối đến trang khác, email có chứa tên miền website
                                    khác
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Policy;
