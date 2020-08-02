import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import { Badge } from "antd";
import { MediumOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  z-index: 10;
  top: 0;
  left: 0;
  justify-content: center;
  background-color: #171717;
`;

const List1 = styled.ul`
  justify-content: flex-start;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 37px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 10px;
`;
const List2 = styled.ul`
  justify-content: flex-end;
  float: right;
  width: 100%;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  font-size: 18px;
  font-weight: 300;
  height: 44px;
`;
const Item = styled.li`
  width: 80px;
  height: 50px;
  float: right;
  text-align: center;
  border-bottom: 5px solid
    ${(props) => (props.current ? "mediumslateblue" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;

  &:hover {
    background: mediumslateblue;
    cursor: pointer;
  }
`;
const SLink = styled(Link)`
  font-size: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:link {
    text-decoration: none;
    color: white;
  }
  &:visited {
    text-decoration: none;
    color: white;
  }
  &:active {
    text-decoration: none;
    color: white;
  }
  &:hover {
    text-decoration: none;
    color: white;
  }
`;

export default withRouter(
  (
    props //withRouter 때문에 props를 가질 수 있다.
  ) => {
    const user = useSelector((state) => state.user);

    const {
      location: { pathname },
    } = props;
    const logoutHandler = () => {
      Axios.get("/api/users/logout").then((response) => {
        if (response.data.success) {
          console.log(response.data);
          props.history.push("/sign-in");
        } else {
          alert("로그아웃 하는데 실패 했습니다.");
        }
      });
    };

    return (
      <>
        <Header>
          <List1>
            <Item current={pathname === "/"}>
              <SLink to="/">홈</SLink>
            </Item>
            <Item current={pathname === "/search"}>
              <SLink to="/search">검색</SLink>
            </Item>
            <Item current={pathname === "/favorite"}>
              <SLink
                to={
                  user.userData && !user.userData.isAuth
                    ? "/sign-in"
                    : "/favorite"
                }
              >
                찜한 목록
              </SLink>
            </Item>
            <Item current={pathname === "/myscore"}>
              <SLink to="/myscore">평가</SLink>
            </Item>
            <Item current={pathname === "/product"}>
              <SLink to="/product">매점</SLink>
            </Item>
          </List1>
          {user.userData && !user.userData.isAuth ? (
            <List2>
              <Item current={pathname === "/sign-in"}>
                <SLink to="/sign-in">로그인</SLink>
              </Item>
            </List2>
          ) : (
            <List2>
              <Item>
                <SLink to="/mypage/update">
                  {/* 내계정 */}
                  {user.userData && (
                    <div
                      style={{
                        display: "flex",

                        textAlign: "center",
                        margin: "0px auto",
                      }}
                    >
                      <img
                        style={{
                          display: "flex",
                          borderRadius: "70%",

                          overflow: "hidden",
                          objectFit: "cover",
                          // border: "2px solid white",
                          justifyContent: "center",
                        }}
                        src={
                          user.userData.image
                            ? `http://localhost:5000/${user.userData.image}`
                            : "http://localhost:5000/uploads/default.png"
                        }
                        alt="haha"
                        width="25rem"
                        height="25rem"
                      />
                      {user.userData && user.userData.name}
                    </div>
                  )}
                </SLink>
              </Item>
              <Item>
                {user.userData && (
                  <div
                    style={{
                      display: "flex",
                      textAlign: "center",
                      margin: "0px auto",
                    }}
                  >
                    <Badge count={5} style={{ marginBottom: -10 }}>
                      <SLink to="/mymovie" className="head-example">
                        <MediumOutlined
                          style={{ fontSize: 25, marginBottom: 1 }}
                        />
                      </SLink>
                    </Badge>
                  </div>
                )}
              </Item>
              <Item>
                <SLink to="/login" onClick={logoutHandler}>
                  로그아웃
                </SLink>
              </Item>
            </List2>
          )}
        </Header>
      </>
    );
  }
);
//const SLink = styled(Link)``; : React Router에서 주어진 Link, 이런식으로 스타일을 추가 할 수있다.
//npm i styled-reset : SC를 이용해서 CSS를 초기화해서 0의 상태에서 시작하게 하는 거야
//position:fixed 스크롤해도 그자리에 있게 하기 위해
