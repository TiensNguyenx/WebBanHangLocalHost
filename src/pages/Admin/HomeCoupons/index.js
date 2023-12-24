import React, { useState } from 'react';
import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import styles from './HomeCoupons.module.scss';
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { useEffect } from "react";
import { getAllCouponService } from "~/Services/CouponServices";
import { useNavigate } from "react-router-dom";
import { UserContext } from "~/context/UserContext";
import { useContext } from "react";

const cx = classNames.bind(styles);
function HomeCoupons() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/')
        }
    }, [])
    const [coupons, setCoupons] = useState([]);
    const renderCoupons = async () => {
        const res = await getAllCouponService('ship');
        setCoupons(res.data.data);
    }
    useEffect(() => {
        renderCoupons();
    }, []);
    return (
        <div>
            <HeaderAdmin />
            <div className={cx('product-containner')}>
                <Container style={{ maxWidth: '100%' }}>
                    <Row>
                        <Col>ID</Col>
                        <Col>Ảnh</Col>
                        <Col>Tên</Col>
                        <Col>Loại mã giảm giá</Col>
                        <Col>Mô tả</Col>
                        <Col>Ngày bắt đầu</Col>
                        <Col>Ngày kết thúc</Col>
                        <Col>Trị giá</Col>
                        <Col>Actions</Col>
                    </Row>
                    {coupons.map((item, index) => {
                        return (
                            <Row key={index} style={{ border: '1px solid #ccc' }}>
                                <Col style={{ width: '100px', fontSize: '1.3rem', margin: 'auto' }} >{item._id}</Col>
                                <Col style={{ margin: 'auto' }} ><img alt='' className={cx('img')} src={item.image}></img></Col>
                                <Col style={{ margin: 'auto' }}>{item.name}</Col>

                                <Col style={{ marginLeft: '30px' }}>{item.methodDiscount}</Col>
                                <Col style={{ margin: 'auto' }}>{item.description}</Col>
                                <Col style={{ margin: 'auto' }}>{item.dateStart}</Col>
                                <Col style={{ margin: 'auto' }}>{item.dateEnd}</Col>
                                <Col style={{ margin: 'auto' }}>{item.value}</Col>
                                <Col style={{ marginTop: '5px' }}>
                                    <Row> <Button variant="success" size="lg" style={{ width: '100px', marginBottom: '10px' }}>Sửa</Button>{' '}</Row>
                                    <Row><Button variant="danger" size="lg" style={{ width: '100px', marginBottom: '10px' }}>Xóa</Button>{' '}</Row>

                                </Col>

                            </Row>
                        )
                    })}
                </Container>
            </div>
        </div>
    );
}

export default HomeCoupons;