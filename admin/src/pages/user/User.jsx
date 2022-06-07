import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PublishIcon from '@mui/icons-material/Publish'
import { useState, useContext, useEffect } from 'react'
import storage from "../../firebase"
import { Link, useParams } from 'react-router-dom'
import { updateUser } from '../../context/userContext/apiCalls'
import { UserContext } from '../../context/userContext/UserContext'
import axios from 'axios'

import './user.scss'

const User = () => {
    const { userId } = useParams()

    const [ user, setUser]  = useState([])

    useEffect(() => {
   
            const getUser = async () => {
                try {
                    const res = await axios.get(`/users/find/${userId}`)
                    console.log('ok')
                    setUser(res.data.payload)
                } catch (err) {
                    console.log(err)
                }
            }
    
            getUser()

    }, [])
    

    const [imgUpdate, setImgUpdate] = useState(null)
    const [userUpdated, setUserUpdated] = useState(null)
    const [uploaded, setUploaded] = useState(0)
    const { dispatch } = useContext(UserContext)


    useEffect(() => {
        
        return () => {
            imgUpdate && URL.revokeObjectURL(imgUpdate.preview)
        }
    }, [imgUpdate])

    const handlePreviewImg = (e) => {

        const file = e.target.files[0]
        file && (file.preview = URL.createObjectURL(file))
        setImgUpdate(file)
    }

    const handleChange = (e) => {

        const value = e.target.value
        setUserUpdated({ ...userUpdated, [e.target.name]: value })
    }

    const upload = (items) => {
        items.forEach((item) => {

            const fileName = new Date().getTime() + item.label + item.file.name
            const uploadTask = storage.ref(`/items/${fileName}`).put(item.file)
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + ' % done.')
            }, err => {console.log(err)}, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    setUserUpdated(prev => {
                        return {...prev, [item.label]:url }
                    })

                    setUploaded((prev) => prev + 1)
                })
            })
        })
    }

    const handleUpload = (e) => {
        e.preventDefault()
        upload([
            { file: imgUpdate, label: "profilePicture" },
        ])
    }
  
    const handleSubmit = (e) => {
        
        e.preventDefault()
        updateUser(user._id , userUpdated, dispatch)
    }
   
    return (
        <div className="user">
            <div className="titleContainer">
                <h1 className="title">Thông tin người dùng</h1>
                <Link to="/newUser">
                    <button className="userAddBtn">Tạo mới</button>
                </Link>
            </div>

            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={
                                user ? user.profilePicture : 
                                "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            }
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user ? user.username : '...'}</span>
                        </div>

                    </div>  
                    
                    <div className="userShowBottom">
                        <span className="userShowTitle">Thông tin liên hệ</span>
                        <div className="userShowInfo">
                            <PhoneAndroidIcon className="userShowIcon"/>
                            <span className="userShowInfoTitle">SĐT: ....</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutlineIcon className="userShowIcon" />
                            <span className="userShowInfoTitle">{user ? user.email : '...'}</span>
                        </div>
                    </div>
                </div>

                <div className="userUpdate">
                    <span className="userUpdateTitle">Chỉnh sửa</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Tên đăng nhập</label>
                                <input
                                    type="text"
                                    placeholder={user ? user.username : '...'}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                    name='username'
                                />
                            </div>

                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder={user ? user.email : '...'}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                    name='email'
                                />
                            </div>

                            <div className="userUpdateItem">
                                <label>Mật khẩu</label>
                                <input
                                    type="text"
                                    placeholder={user ? user.password : '...'}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                    name='password'
                                />
                            </div>
                        </div>

                        <div className="userUpdateRight">
                            <p>Ảnh đại diện</p>
                            <div className="userUpdateUpload">
                                {/* <img
                                    className="userUpdateImg"
                                    // src={imgUpdate ? imgUpdate.preview : user.profilePicture}
                                    alt=""
                              
                                /> */}

                                {user &&
                                    <img
                                        className="userUpdateImg"
                                        src={imgUpdate ? imgUpdate.preview : user.profilePicture}
                                        alt=""
                                    />
                                }   
                                <label htmlFor="file">
                                    <PublishIcon className="userUpdateIcon" />
                                </label>
                                <input 
                                    type="file" 
                                    id="file" 
                                    style={{ display: "none" }} 
                                    name="profilePicture"
                                    onChange={handlePreviewImg}
                                />
                            </div>
                            <div>
                                {uploaded === 1 ? (
                                    <p>Tải ảnh thành công</p>
                                    ) : (
                                    <button className="userUpdateButton" onClick={handleUpload}>
                                        Tải ảnh lên
                                    </button>
                                )}
                                <button className="userUpdateButton" onClick={handleSubmit}>
                                Cập nhật
                                </button>
                            </div>
                        </div>

                        
                    </form>
                </div>

            </div>


        </div>
    )
}

export default User