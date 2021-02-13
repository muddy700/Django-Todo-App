import { UserOutlined } from '@ant-design/icons';
import React , { useState } from 'react'
import { Typography, Card, Avatar, Row, Col, Modal, Button  } from 'antd';
import { PasswordForm} from './passwordForm'
import { ProfileForm} from './profileForm'

const { Title} = Typography

export const ProfilePage = (props) => {

  const { currentUser, userProfile} = props
  const [showModal, setShowModal] = useState(false)
  const [activeForm, setActiveForm] = useState(0)

  const password_Form = <PasswordForm currentUser={currentUser} setShowModal={setShowModal} />
  const profile_Form = <ProfileForm />

  const form = {
      1: password_Form,
      2: profile_Form
  }

  const handleFormDisplay = (id) => {
      setActiveForm(id)
      setShowModal(true)

  }
    return (
         <>
        <div className="login-container">
          <Modal
          visible={showModal}
          title= {activeForm === 1 ? "Change Your Password" : "Change Profile Info" }
        //   closable={false}
          width={300}
          style={{textAlign: 'center'}}
          footer={null}
          onCancel={() => setShowModal(false)}
        >
        {form[activeForm]}
        </Modal>
        <Row>
            <Col xs={{offset: 0, span:24}} sm={4} md={4} lg={4} xl={{offset: 8, span: 8}}>
            <Card style={{width: '100%', marginBottom: '15%'}} bordered={false}
                    title = "Profile Informations" >
                <Avatar size={200} icon={<UserOutlined />} style={{marginBottom: '5%'}}/>
                <Card style={{width: '100%', textAlign: 'left'}} headStyle={{color:'red'}}>
                    <Row>
                        <Col span={8}>
                            <Title level={4}>Name : </Title>
                        </Col>
                        <Col span={16}>
                            <Title level={4}> {currentUser.username} </Title>
                        </Col>
                    </Row>
                    {/* <Row > */}
                    <Row hidden={userProfile.phone ? false : true}>
                        <Col span={8}>
                            <Title level={4}>Phone : </Title>
                        </Col>
                        <Col span={16}>
                            <Title level={4}> {userProfile.phone} </Title>
                        </Col>
                    </Row>
                    <Row hidden={currentUser.email ? false : true}>
                        <Col span={8}>
                            <Title level={4}>Email : </Title>
                        </Col>
                        <Col span={16}>
                            <Title level={4}> {currentUser.email} </Title>
                        </Col>
                    </Row>
                </Card>
                <Row style={{paddingTop: '5%'}}>
                    <Col span={12}>
                        <Button type="primary" onClick={() => handleFormDisplay(2)}>Edit Profile</Button>
                    </Col>
                    <Col span={12}>
                        <Button type="primary" onClick={() => handleFormDisplay(1)}>Change Password</Button>
                    </Col>
                </Row>

            </Card>
            </Col>
            </Row>
        </div>
          </>
    )
}
