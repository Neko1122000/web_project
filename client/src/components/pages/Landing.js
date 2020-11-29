import React from 'react'
import { Pane, Button } from 'evergreen-ui'

class Landing extends React.Component {
  render() {
    return (
      <Pane>
        <Pane
          height={500}
          width={615}
          padding={170}
          style={{
            backgroundColor: 'gray',
            float: 'left',
            textAlign: 'center',
          }}
        >
          <Button
            width={200}
            height={100}
            style={{ textAlign: 'center', justifyContent: 'center' }}
            appearance="primary"
          >
            Bắt đầu học
          </Button>
        </Pane>
        <img
          style={{}}
          src="https://znews-photo.zadn.vn/w660/Uploaded/fcivbqmv/2019_06_15/gg_zing_2.jpg"
          width="600"
          height="500"
          alt="lul"
        />
        <Pane height={200} padding={50}>
          <h1
            style={{ fontFamily: 'Arial', fontSize: '20', textAlign: 'center' }}
          >
            90% người dùng Quizlet cho biết họ đã cải thiện được điểm số{' '}
          </h1>
        </Pane>
        <Pane
          height={400}
          width={615}
          padding={100}
          style={{
            fontFamily: 'Arial',
            color: 'midnightblue',
            backgroundColor: 'white',
            float: 'left',
            textAlign: 'center',
          }}
        >
          <h2>Bạn chỉ cần động não, còn mọi thứ khác đã có chúng tôi lo </h2>
        </Pane>
        <img
          src="https://znews-photo.zadn.vn/w660/Uploaded/fcivbqmv/2019_06_15/gg_zing_2.jpg"
          width="600"
          height="400"
          alt="kekw"
        />
        <img
          src="https://images.prismic.io/quizlet-prod/63a034d5-9f01-4024-a6bf-e36996575fd1_bannecker-benefit3.png?auto=compress,format"
          width="600"
          height="400"
          alt="kapp"
        />
        <Pane
          height={400}
          width={615}
          padding={100}
          style={{
            fontFamily: 'Arial',
            color: 'midnightblue',
            backgroundColor: 'white',
            float: 'right',
            textAlign: 'center',
          }}
        >
          <h2>Đừng nản lòng. Cùng nỗ lực nào. </h2>
        </Pane>
        <Pane
          height={60}
          paddingTop={5}
          paddingRight={30}
          style={{
            fontFamily: 'Arial',
            backgroundColor: 'midnightblue',
            color: 'white',
            textAlign: 'right',
          }}
        >
          <p>© 2020 Group 15 </p>
        </Pane>
      </Pane>
    )
  }
}
export default Landing
