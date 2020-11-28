import React from 'react'
import { Pane, Heading, Button } from 'evergreen-ui'
import { ChevronLeftIcon, AutomaticUpdatesIcon } from 'evergreen-ui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSet, fetchSetsUser } from '../../actions'

class Learn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          _id: '1',
          is_active: true,
          created_at: '2020-11-18T10:58:18.956Z',
          title: 'Friend',
          description: 'Bạn bè',
          language: 'VN',
          __v: 0,
        },
        {
          _id: '2',
          is_active: true,
          created_at: '2020-11-18T10:58:18.956Z',
          title: 'Friend',
          description: 'Bạn bè',
          language: 'VN',
          __v: 0,
        },
        {
          _id: '3',
          is_active: true,
          created_at: '2020-11-18T10:58:18.956Z',
          title: 'Friend',
          description: 'Bạn bè',
          language: 'VN',
          __v: 0,
        },
        {
          _id: '4',
          is_active: true,
          created_at: '2020-11-18T10:58:18.956Z',
          title: 4,
          description: 'số 4',
          language: 'VN',
          __v: 0,
        },
      ],
      cardIndex: 0, //index của thẻ đang được học
      right_ans_1: [], //mảng chứa index của thẻ đã được trả lời đúng 1 lần
      right_ans_2: [], //mảng chứa index của thẻ đã được trả lời đúng 2 lần
      options: [0, 0, 0, 0], // mảng chứa các lựa chọn cho người học
      status: 1, // 1 là câu hỏi title, 0 là câu hỏi description
    }
    var data_length = this.state.data.length
    var arr = []
    for (var i = 0; i < data_length; i++) {
      arr.push(i)
    }
    console.log(arr)
  }

  render() {
    return (
      <Pane display="flex" justifyContent="space-between">
        <Pane
          height={530}
          width={200}
          border="default"
          elevation={4}
          paddingLeft={20}
          paddingTop={30}
          textAlign="center"
        >
          <Link to={'/latest'}>
            <Pane display="flex" borderBottom="default" paddingBottom={10}>
              <ChevronLeftIcon size={20} color="#28A7A7" />
              <Heading size={500} fontWeight={600}>
                Trở về học phần
              </Heading>
            </Pane>
          </Link>
          <Pane marginTop={50}>
            <Pane display="flex" marginLeft={10}>
              <AutomaticUpdatesIcon size={30} />
              <Heading size={600} fontWeight={700} marginLeft={30}>
                Học
              </Heading>
            </Pane>
            <Pane marginLeft={10} marginTop={60}>
              <Heading size={600} fontWeight={700}>
                Còn lại
              </Heading>
              <Heading size={600} fontWeight={700}>
                {this.state.data.length - this.state.right_ans_2.length}
              </Heading>
            </Pane>
            <Pane marginLeft={10} marginTop={60}>
              <Heading size={600} fontWeight={700}>
                Quen thuộc
              </Heading>
              <Heading size={600} fontWeight={700}>
                {this.state.right_ans_1.length}
              </Heading>
            </Pane>
            <Pane marginLeft={10} marginTop={60}>
              <Heading size={600} fontWeight={700}>
                Nắm vững
              </Heading>
              <Heading size={600} fontWeight={700}>
                {this.state.right_ans_2.length}
              </Heading>
            </Pane>
          </Pane>
        </Pane>
        <Pane
          height={500}
          width={1000}
          border="default"
          elevation={4}
          marginLeft={20}
          marginTop={20}
          marginBottom={20}
        >
          <Pane marginTop={50} marginLeft={100} marginRight={30}>
            <Heading size={600} fontWeight={700}>
              {this.state.data[this.state.cardIndex].title}
            </Heading>
          </Pane>
          <Pane display="flex" marginLeft={50} marginTop={200}>
            <Button
              width={150}
              height={80}
              border="default"
              borderRadius={10}
              backgroundColor="#FAE3CD"
              marginTop={20}
              paddingTop={30}
              paddingBottom={30}
              paddingLeft={50}
            >
              <Heading size={600} fontWeight={700} textAlign="center">
                Test
              </Heading>
            </Button>
          </Pane>
        </Pane>
      </Pane>
    )
  }
}
const mapStateToProps = ({ sets }) => {
  return { sets }
}
export default connect(mapStateToProps, { fetchSet, fetchSetsUser })(Learn)
