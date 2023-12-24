import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";
import Form from 'react-bootstrap/Form';
import React, { useState, useContext, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import styles from './HomeProduct.module.scss';
import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import { getAllProductService, getProductByNameService } from "~/Services/ProductServices";
import { useNavigate } from "react-router-dom";
import { UserContext } from "~/context/UserContext";
const cx = classNames.bind(styles);
function HomeProduct() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/')
        }
    }, []);
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        getAllProductService(0, 100).then((res) => {
            setProduct(res.data.data);
        })
    }, [])
    const handleTypeSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleSearch = async () => {
        const res = await getProductByNameService(search);
        setProduct(res.data.data);
    }

    return (
        <div className={cx('containner')}>
            <HeaderAdmin />
            <div className={cx('form-containner')}>
                <Form >
                    <Form.Group as={Row} className="mb-3 "  >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Tên sản phẩm
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder=" Tên sản phẩm" size="lg" onChange={(e) => handleTypeSearch(e)} />

                        </Col>
                        <Col sm="2" >
                            <Button variant="success" size="lg" onClick={handleSearch}>Tìm kiếm</Button>{' '}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 "  >
                        <Form.Label column sm="2" style={{ fontSize: '14px' }}>
                            Sắp xếp theo
                        </Form.Label>
                        <Col sm="8">
                            <Form.Select size="lg">
                                <option>Tên A-Z</option>
                                <option>Tên Z-A</option>
                                <option>Mới nhất</option>
                                <option>Cũ nhất</option>
                                <option>Giá tăng dần</option>
                                <option>Giá giảm dần</option>
                                <option>Số lượng còn lại tăng dần</option>
                                <option>Số lượng còn lại giảm dần</option>
                                <option>Đánh giá tăng dần</option>
                                <option>Đánh giá giảm dần</option>
                                <option>Số lượng đã bán tăng dần</option>
                                <option>Số lượng đã bán giảm dần</option>

                            </Form.Select>

                        </Col>
                        <Col sm="2" >
                            <Button variant="success" size="lg" onClick={handleSearch}>Sắp xếp</Button>{' '}
                        </Col>
                    </Form.Group>
                </Form>

            </div>
            <div className={cx('product-containner')}>
                <Container style={{ maxWidth: '100%' }}>
                    <Row>
                        <Col>ID</Col>
                        <Col style={{ textAlign: 'center' }}>Ảnh</Col>
                        <Col>Tên</Col>
                        <Col style={{ marginLeft: '30px' }}>Giá mới</Col>
                        <Col>Giá cũ</Col>
                        <Col>Loại</Col>
                        <Col>Còn lại</Col>
                        <Col>Đã bán</Col>
                        <Col>Actions</Col>
                    </Row>
                    {product.map((item, index) => {
                        return (
                            <Row key={index} style={{ border: '1px solid #ccc' }}>

                                <Col style={{ width: '100px', fontSize: '1.3rem', margin: 'auto' }} >{item._id}</Col>
                                <Col ><img alt='' className={cx('img')} src={item.image}></img></Col>

                                <Col>{item.name}</Col>
                                <Col style={{ marginLeft: '30px' }}>{item.new_price}</Col>
                                <Col>{item.old_price}</Col>
                                <Col>{item.type}</Col>
                                <Col>{item.countInStock}</Col>
                                <Col>{item.sold}</Col>
                                <Col style={{ marginTop: '5px' }}>
                                    <Row> <Button variant="success" size="lg" style={{ width: '100px', marginBottom: '10px' }}>Sửa</Button>{' '}</Row>
                                    <Row><Button variant="danger" size="lg" style={{ width: '100px', marginBottom: '10px' }}>Xóa</Button>{' '}</Row>
                                    <Row> <Button variant="info" size="lg" style={{ width: '100px', marginBottom: '10px' }}>Xem đánh giá </Button>{' '}</Row>
                                </Col>

                            </Row>
                        )
                    })}
                </Container>
            </div>
        </div>
    );
}

export default HomeProduct;