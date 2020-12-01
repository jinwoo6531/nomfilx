import 'date-fns';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import './style.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import Booking from '../Booking/Booking';
import DatePicker, { utils } from 'react-modern-calendar-datepicker';
import Select from 'react-select';
import styled from 'styled-components';
import Axios from 'axios';

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    borderRadius: '1rem',
    fontSize: '1.1rem',
    width: '250px',
    textAlign: 'center',
    border: '1px solid #9c88ff',
    boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
    color: '#2e2e2e',
    fontWeight: '400',
  }),
  option: (styles, { isDisabled, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? '#d4d4d4' : '#f7f7f7',
      color: '#151515',
      fontSize: '1.1rem',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
};
// 예약 버튼
const Button1 = styled.button`
  position: relative;
  color: #9c88ff;
  border: 3px solid #9c88ff;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  background-color: #151515;
  margin-left: 20px;
  padding: 5px;
  box-shadow: 0 1.5rem 2rem rgba(156, 136, 255, 0.2);
`;
//시간 버튼
const Button2 = styled.button`
  color: black;
  font-weight: 800;
  font-size: 15px;
  margin: 8px;
  padding: 5px 12px 5px 12px;
  border: 1px solid gray;
  outline: none;
  &:hover {
    background: mediumslateblue;
    cursor: pointer;
  }
  &:focus {
    background: mediumslateblue;
  }
`;
const Wrapper = styled.div`
  margin: 0 auto;
  width: max-content;
  padding: 5px;
`;
const TitleWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 8px;
`;
const Title = styled.span`
  font-size: 18px;
  margin: 5px;
`;

const InnerWrapper = styled.div`
  min-height: 200px;
  max-width: 450px;
`;
const Continents1 = [
  { key: 1, label: '11:00', value: '11:00', check: false },
  { key: 2, label: '13:00', value: '13:00', check: false },
  { key: 3, label: '15:00', value: '15:00', check: false },
  { key: 4, label: '17:00', value: '17:00', check: false },
  { key: 5, label: '19:00', value: '19:00', check: false },
  { key: 6, label: '21:00', value: '21:00', check: false },
];
const Continents2 = [
  { key: 1, label: '10:00', value: '10:00', check: false },
  { key: 2, label: '12:00', value: '12:00', check: false },
  { key: 3, label: '14:00', value: '14:00', check: false },
  { key: 4, label: '16:00', value: '16:00', check: false },
  { key: 5, label: '18:00', value: '18:00', check: false },
  { key: 6, label: '20:00', value: '20:00', check: false },
];
const Reservation = ({ userFrom, nowPlaying }) => {
  const movieList = nowPlaying.map((movie, index) => {
    return {
      key: (index + 1) * 2,
      label: movie.title,
      value: movie.title,
      poster: movie.poster_path,
      isDisabled: index > 2 ? true : false,
      id: movie.id,
    };
  });
  const movieOptions = [
    {
      options: movieList,
    },
  ];
  const [selectDay, setSelectedDay] = useState(null);
  const [time, setTime] = useState('');
  const [movie, setMovie] = useState('');
  const [poster, setPoster] = useState('');
  const [id, setID] = useState(0);
  const [visible, setVisible] = useState(false);
  const [theater, setTheater] = useState(0);
  const [key, setKey] = useState(0);
  const [Distinct, setDistinct] = useState([]);
  const [select, setSelect] = useState([]);
  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      placeholder="  날짜를 선택해주세요"
      value={
        selectDay ? `${selectDay.year}-${selectDay.month}-${selectDay.day}` : ''
      }
      style={{
        borderRadius: '1rem',
        fontSize: '1.1rem',
        border: '1px solid #9c88ff',
        boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
        color: '#2e2e2e',
        outline: 'none',
        width: '250px',
        height: '38px',
      }}
      className="my-custom-input-class"
    />
  );
  const onTime = (value) => {
    setTime({ time: value });
  };
  const onMovie = (event) => {
    setMovie(event.value);
    setPoster(event.poster);
    setID(event.id);
    setVisible(true);
    setKey(event.key); //영화관 1관 2관 3관 .... 정하기 위해 씀
    let arr = [];
    Continents1.forEach((item) => {
      arr.push(false);
    });
    setSelect(arr);
  };
  useEffect(() => {
    const movieTitle = {
      title: movie,
    };
    Axios.post('/api/reservation/findSeat', movieTitle)
      .then((response) => {
        if (response.data.success) {
          let seatlist = [];
          response.data.seats.forEach((obj) => {
            if (
              obj.selectDay[0].day === selectDay.day &&
              obj.selectDay[0].month === selectDay.month &&
              obj.selectDay[0].year === selectDay.year
            ) {
              seatlist.push(obj);
            }
          });
          setDistinct(seatlist);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movie, selectDay, time, theater]);

  const countLeftSeats = (time, theater) => {
    let countAllSeats = theater % 2 === 1 ? 55 : 45;
    let count = 0;
    Distinct &&
      Distinct.forEach((obj) => {
        if (obj.time[0].time === time && obj.theater === theater) {
          count = count + obj.continent;
        }
      });
    let myColor = countAllSeats - count > 10 ? '#2e2e2e' : 'red';
    return (
      <span style={{ color: myColor, fontWeight: '500' }}>
        {countAllSeats === count ? `매진` : `${countAllSeats - count}석`}
      </span>
    );
  };

  return (
    <Popup
      trigger={
        <Button1 variant="contained" color="primary">
          간편예매
        </Button1>
      }
      modal
      closeOnDocumentClick={true}
      triggerOn="click"
      contentStyle={{
        backgroundColor: '#242333',
        width: '500px',
        borderRadius: '10px',
        padding: '1%',
        border: '2px solid #848484',
      }}
    >
      <Wrapper>
        <DatePicker
          value={selectDay}
          onChange={setSelectedDay}
          minimumDate={utils().getToday()}
          renderInput={renderCustomInput}
          shouldHighlightWeekends
        />
      </Wrapper>
      <Wrapper>
        {selectDay && (
          <Select
            options={movieOptions}
            placeholder="  영화를 선택해주세요"
            styles={colourStyles}
            onChange={onMovie}
          />
        )}
      </Wrapper>
      <Wrapper>
        {visible ? (
          <InnerWrapper>
            <TitleWrapper style={{ marginTop: '5px' }}>
              <Title>
                {movie}&nbsp;&nbsp;|&nbsp;&nbsp;
                <span style={{ color: '#d8d8d8' }}>{key - 1}관</span>
              </Title>
            </TitleWrapper>
            {Continents1.map((item, index) => {
              const { year, month, day } = selectDay;
              let h = new Date().getHours();
              let today =
                new Date().getFullYear() +
                '-' +
                (new Date().getMonth() + 1) +
                '-' +
                new Date().getDate();
              let pickDay = year + '-' + month + '-' + day;
              if (pickDay === today) {
                if (h < parseInt(item.value.slice(0, 2))) {
                  return (
                    <Button2
                      key={item.value + item.label + ''}
                      onClick={() => {
                        setTheater(key - 1);
                        onTime(item.value);
                      }}
                    >
                      {item.label}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                      {countLeftSeats(item.value, key - 1)}
                    </Button2>
                  );
                } else {
                  return null;
                }
              } else {
                return (
                  <Button2
                    key={item.value + item.label + ''}
                    onClick={() => {
                      setTheater(key - 1);
                      onTime(item.value);
                    }}
                  >
                    {item.label}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    {countLeftSeats(item.value, key - 1)}
                  </Button2>
                );
              }
            })}
            <TitleWrapper>
              <Title>
                {movie}&nbsp;&nbsp;|&nbsp;&nbsp;
                <span style={{ color: '#d8d8d8' }}>{key}관</span>
              </Title>
            </TitleWrapper>
            {Continents2.map((item, index) => {
              const { year, month, day } = selectDay;
              let h = new Date().getHours();
              let today =
                new Date().getFullYear() +
                '-' +
                (new Date().getMonth() + 1) +
                '-' +
                new Date().getDate();
              let pickDay = year + '-' + month + '-' + day;
              if (pickDay === today) {
                if (h < parseInt(item.value.slice(0, 2))) {
                  return (
                    <Button2
                      key={item.value + item.label + ''}
                      onClick={() => {
                        setTheater(key);
                        onTime(item.value);
                      }}
                    >
                      {item.label}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                      {countLeftSeats(item.value, key)}
                    </Button2>
                  );
                } else {
                  return null;
                }
              } else {
                return (
                  <Button2
                    key={item.value + item.label + ''}
                    onClick={() => {
                      setTheater(key);
                      onTime(item.value);
                    }}
                  >
                    {item.label}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    {countLeftSeats(item.value, key)}
                  </Button2>
                );
              }
            })}
          </InnerWrapper>
        ) : (
          <div
            style={{
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <span style={{ fontSize: '20px' }}>
              클릭하면 영화 시간이 보입니다.
            </span>
          </div>
        )}
      </Wrapper>
      <Wrapper>
        <>
          <Popup
            trigger={
              <Button1
                variant="contained"
                color="primary"
                style={{
                  height: '40px',
                  width: '80px',
                  backgroundColor: 'transparent',
                  fontWeight: '1000',
                  fontSize: '15px',
                  padding: '0px',
                  marginLeft: '0px',
                }}
              >
                다음
              </Button1>
            }
            modal
            contentStyle={{
              width: '770px',
              backgroundColor: '#242333',
              borderRadius: '10px',
              padding: '1%',
              border: '2px solid #848484',
            }}
            closeOnDocumentClick={true}
            triggerOn="click"
          >
            <Booking
              id={id}
              title={movie}
              bgImage={poster}
              userFrom={userFrom}
              selectDay={selectDay}
              time={time}
              theater={theater}
            />
          </Popup>
        </>
      </Wrapper>
    </Popup>
  );
};
export default Reservation;
