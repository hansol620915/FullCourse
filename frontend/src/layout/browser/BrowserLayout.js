import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../features/user/userSlice';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Wrapper = styled.div`
  width: 93vw;
  height: 95vh;
  margin-right: 3vw;

  border: 0.3rem dashed #0aa1dd;
  border-radius: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #d9d9d9;

  .navStan {
    position: relative;
    width: calc(100% - 20px);
    height: calc(100% - 20px);

    z-index: 1;
  }

  .innerBox {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 1rem;
    border: 0.3rem solid #0aa1dd;
    background: white;

    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 15px;
      border-radius: 1rem;
    }

    &::-webkit-scrollbar-thumb {
      background-clip: padding-box;

      background-color: #0aa1dd;
      /* 스크롤바 둥글게 설정    */
      border-radius: 1rem;
      border: 2px solid transparent;
      width: 5px;
    }

    /* 스크롤바 뒷 배경 설정*/

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: transparent;
    }
  }

  .logButton {
    position: fixed;
    right: 1%;
    bottom: 2rem;
    width: 2.5rem;
    /* height: 2.5rem; */
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

const NavBar = styled.div`
  width: 5rem;
  height: 20rem;

  text-align: right;

  position: absolute;
  left: calc(100% - 3rem);
  top: 5%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .navItem {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 3rem;
    font-size: 1rem;
    position: relative;
    background: white;
    padding: 0.5rem;
    border-radius: 0 1rem 1rem 0;

    font-weight: bold;

    font-size: 0.8rem;

    cursor: pointer;

    &:hover {
      left: 3rem;
    }

    span {
      margin-right: 0.5rem;
    }
  }

  .active {
    background: #0aa1dd;
    color: white;
  }
`;

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userInfo } = useSelector((state) => state.user);
  const [isChecked, setIsChecked] = useState(true);

  const onClickLogout = async (e) => {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      imageUrl: '/img/boogie.jpg',
      imageWidth: 400,
      imageHeight: 280,
      imageAlt: 'character',
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '로그아웃',
      showLoaderOnConfirm: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(logout());
        navigate('/');
      }
    });
  };

  useEffect(() => {
    document.getElementById('outletBox').scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (pathname === '/') {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [pathname]);

  return (
    <Wrapper>
      <div className="navStan">
        <NavBar>
          <div>
            <Link className={'navItem' + (isChecked ? ' active' : '')} to="/">
              <span>
                메인
                <br />
                페이지
              </span>
              🚩
            </Link>
          </div>
          <div>
            <NavLink
              to="/trip/plan"
              activeclassname="active"
              className="navItem"
            >
              <span>
                풀코스
                <br />
                짜기
              </span>
              📝
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/fullcourse"
              activeclassname="active"
              className="navItem"
            >
              <span>
                풀코스
                <br />
                탐색
              </span>
              🔎
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/user/profile/1"
              activeclassname="active"
              className="navItem"
            >
              <span>
                마이
                <br />
                페이지
              </span>
              😎
            </NavLink>
          </div>
        </NavBar>
        <div id="outletBox" className="innerBox">
          <Outlet />
        </div>
      </div>

      {userInfo ? (
        <img
          className="logButton"
          onClick={onClickLogout}
          src="/img/logoutBtn.png"
        />
      ) : (
        <img
          className="logButton"
          onClick={(e) => navigate('/user/login')}
          src="/img/loginBtn.png"
        />
      )}
    </Wrapper>
  );
};

export default Layout;
