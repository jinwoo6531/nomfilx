// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import '@fullcalendar/daygrid/main.css';
// import styled from 'styled-components';

// //calendar css
// export const StyleWrapper = styled.div`
//   .fc td {
//     color: black;
//   }
// `;

// function ReservationsCalendar() {
//   const [Reservation, setReservation] = useState([]);

//   useEffect(() => {
//     axios
//       .post('/api/reservation/getList')
//       .then((response) => {
//         if (response.data.success) {
//           setReservation(response.data.doc);
//         } else {
//           console.log('실패');
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const events = Reservation.map((item) => {
//     let selectday = item.selectDay[0];

//     //달력에 날짜 format : `${selectday.year}-${selectday.month}-${selectday.day}` => ex. 2020-08-06
//     // {year:2020, day:6, month:8} 이런식으로 캘린더에 넘어옴
//     // 6 -> 06, 8->08 식으로 바꿔주는 방법 m1, m2
//     // ** parseInt 못씀-> "06" string을 parseInt로 해주면 다시 6 으로 바뀜..
//     if (selectday.day < 10) {
//       selectday.day = '0' + selectday.day;
//     }
//     if (selectday.month < 10) {
//       selectday.month = '0' + selectday.month;
//     }
//     let reservationdate = `${selectday.year}-${selectday.month}-${selectday.day}`;

//     return {
//       title: item.title,
//       date: reservationdate,
//     };
//   });

//   return (
//     <StyleWrapper>
//       <FullCalendar
//         defaultView="dayGridMonth"
//         header={{
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
//         }}
//         style={{ color: 'black' }}
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         events={events}
//       />
//     </StyleWrapper>
//   );
// }

// export default ReservationsCalendar;
